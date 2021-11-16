<template>
  <div class="mine-page">
    <div class="card">
      <div>
        当前积分：<span class="point">{{ userSignInfo.point }}</span>
        <van-button
          type="info"
          size="mini"
          color="#FFB800"
          @click="pushWindow($isApp?'pointexchange':'',{showsteps:true})"
        >
          去兑换
        </van-button>
      </div>
      <sign
        :sign-date-list="signDateList"
      />
    </div>      
    <van-calendar
      :show-title="false"
      :poppable="false"
      :show-confirm="false"
      :min-date="minDate"
      :max-date="maxDate"
      type="multiple"
      color="#FDDB8C"
      :default-date="signDate"
    />
    <div style="text-align:center;padding-top:.3rem">
      <!-- 居中 -->
      <van-row
        type="flex"
        justify="space-around"
      >
        <van-col>
          <van-button
            round
            :loading="signLoading"
            :disabled="signFlag"
            size="normal"
            type="primary"
            loading-text="签到中..." 
            :text="signFlag?'今日已签到':'签到领积分'"
            @click="userSign"
          />
        </van-col>
        <van-col v-if="signAllTimes >=3 ">
          <van-button
            type="info"
            round
            @click="earningMore"
          >
            赚取更多
          </van-button>
        </van-col>
      </van-row>
    </div>
    <van-dialog
      v-model="showTurnTable"
      show-cancel-button
      title="恭喜你！获得抽奖机会"
      confirm-button-text="抽奖"
      :before-close="beforeClose"
      @confirm.once="doublePoints"
    >
      <trun-table
        ref="turntable"
        @turntable="fetchUserSign"
      />
    </van-dialog>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Toast, Tab, Tabs, List, Cell,Image as VanImage, Icon, Grid, GridItem, Swipe, SwipeItem, Tag, Dialog,Lazyload,Calendar,Button, Col, Row  } from 'vant'
import sign from './components/sign.vue'
import trunTable from './components/turntable.vue'
// eslint-disable-next-line no-unused-vars
import { IRanking, MyPageInfo, ADInfo } from '@/types/index'
import {openBrowser, pushWindowByRouter,openPage} from '@/utils/app.ts'
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});
const { VUE_APP_HOST } = process.env
@Component({
  name: 'attendance',
  components:{
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe, 
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
    [Dialog.Component.name]: Dialog.Component,
    [Calendar.name]:Calendar,
    [Button.name]:Button,
    [Col.name]:Col,
    [Row.name]:Row,
    sign,
    trunTable
  }
})
export default class Attendance extends Vue {

  public userSignInfo:any = {}
  public showTurnTable:boolean = false

  adInfo:Array<ADInfo> = []
  signLoading:boolean = false
  signFlag:boolean = true
  signDate:Array<Date> = []
  signDateList:Array<Date> = []
  signAllTimes:number = 0
  get channel() :string {
    if(this.$isApp) {
      return 'APP'
    }
    return 'H5'
  }
  get minDate():Date {
    const nowDate = new Date();
    const month = nowDate.getMonth()
    return new Date(nowDate.getFullYear(),month,1 )
  }
  get maxDate():Date{
    const nowDate = new Date();
    const month = nowDate.getMonth() 
    const endOfMonth = new Date(nowDate.getFullYear(), month+1, 0).getDate(); 
    return new Date(nowDate.getFullYear(),month, endOfMonth)
  }



  
  public async created() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    await this.fetchUserSign()
    Toast.clear()
  }
  /**
   * 获取用户签到信息
   */
  async fetchUserSign() {
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/userSignApi/info'
      ,{channel:this.channel}
      ,{
        codeHandle:'skip',
        tokenflag: this.$isApp
      })
    this.showTurnTable = false
    this.userSignInfo = data 
    this.signFlag = data.todayStatus === 1
    this.signDate = data.monthDateList.map((item:string)=>{
      item = item.replace(/-/g,'/')
      return new Date(item)
    })
    // 如果不是app环境才进行前三次跳转引导
    if(!this.$isApp){
      this.signAllTimes = data.signAllTimes
    }
    this.signDateList = data.signDateList.map((item:string)=>{
      item = item.replace(/-/g,'/')
      return item //
    })
    this.signDateList.sort()
  }
  /**
   * 
   */
  async userSign() {
    this.signLoading = true
    const [error,data] = await this.$fetchPost(VUE_APP_HOST + '/gunsApi/userSignApi/sign'
      ,{channel:'H5'}
      ,{
        data:{}, //channel:this.channel
        codeHandle:'skip',
        tokenflag: this.$isApp // app环境用web的tokan
      })
    this.signLoading = false
    if(error){
      Toast.fail(error.message)
      return false
    }
    await this.fetchUserSign()
    Toast.success({
      message:`签到成功！获得${data.point}积分`,
      onClose:()=>{
        if(!this.$isApp && data.perfect >= 2){
          this.showTurnTable = true
        }
      }
    })
    
  }

  /**
   * 积分翻倍
   * /gunsApi/userSignApi/signAdd
   */
  async doublePoints() {
    const [error,data] = await this.$fetchPost(VUE_APP_HOST + '/gunsApi/userSignApi/signAdd'
      ,{channel:'H5'}
      ,{
        data:{}, //channel:this.channel
        codeHandle:{1:'skip'},
        tokenflag: this.$isApp // app环境用web的tokan
      })
    // this.signLoading = false
    if(error.message) {
      Toast.fail(error.message)
      this.showTurnTable = false
      return false
    }    
    const truntable = this.$refs.turntable as any
    truntable.rotation(data)        
  }
  beforeClose(action:any, done:any){
    if(action === 'confirm'){
      done(false)
    }else {
      done()
    }
     
  }
  /**
 * /gunsApi/userSignApi/signrule
 */

  /**
   * 获取广告
   */
  async fetchAD(){
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/readAppApi/getAdByType'
      ,{positionType:1}
      ,{codeHandle:'skip'})
    this.adInfo = data
      
  }
  toLink() {
    this.$router.push({ path: '/invite' })
  }
  pushWindow(url:string,query:any) {
    if(this.$isApp) {
      pushWindowByRouter(url, query)
    } else {
      this.$replaceURL('?showsteps=true')
    }
  }
  earningMore(){
    this.$replaceURL('?showsteps=true')
  }

  /**
   * banner点击逻辑
   * 返回值showType：0:App内url webview展示 1:app内路由 2外链http开头的 3无点击事件
   */
  handleSwipe(item: any) {
    let showType = item.showType
    if(showType === 0) {
      openPage(item.link)
    }else if(showType === 1) {
      console.log('执行原生路由', item.link)
    } else if(showType===2){
      openBrowser(item.link)
    }
  }

}
</script>
<style >
.mine-page .van-calendar__selected-day {
    width: .64rem;
    height: .64rem;
    color: #fff;
    background-color: #ee0a24;
    border-radius: 0.08rem;
}
.van-calendar__day {
  height:.6rem;
}
.attendance-btn{
  background-color: #FCAC12;
}
.card .sign{
  padding-top:30px;
  padding-bottom: 30px;
}
</style>
<style lang="scss" scoped>



.mine-page{
  min-height: 100vh;
  background-color: #fff;
  .van-calendar__selected-day {
    width: .64rem;
    height: .64rem;
    color: #fff;
    background-color: #ee0a24;
    border-radius: 0.08rem;
}
  .card {
      padding: 24px;
      background-color: #F96E53;
      box-shadow: 0 8px 12px #ebedf0;
      color:#ffffff;
      font-size: .24rem;
      span.point{
        color:#F7B158;
        margin-right:60px;
        font-size: 60px;

      }
  }
}

</style>
