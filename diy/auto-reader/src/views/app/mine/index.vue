<template>
  <div class="mine-page">
    <div class="mine-top">
      <div class="mine-top-left">
        <van-image
          radius="50%"
          fit="fill"
          width=".9rem"
          :src="myPageInfo.headimgurl||'https://b.yzcdn.cn/vant/icon-demo-1126.png'"
        />
        <div class="main-top-content">
          <div>{{ myPageInfo.nickname }}</div>
          <van-tag
            ref="copytext"
            round
            @click="copyText(myPageInfo.idcode)"
          >
            ID：{{ myPageInfo.idcode }}
          </van-tag>
          <van-button
            type="info"
            size="mini"
            color="#FFB800"
            @click="copyText(myPageInfo.idcode)"
          >
            复制
          </van-button>
        </div>
      </div>      
      <div> 
        <div
          class="top-link"
          @click="pushWindow('withdraw')"
        >
          <van-icon
            name="gold-coin-o"
            color="#ffffff"
          />
          &nbsp;&nbsp;我要提现&nbsp;
          <van-icon name="arrow" />
        </div>
      </div>
    </div>  
    <van-cell-group class="mine-goup-cell">
      <van-cell
        title="今日收益"
        :value="myPageInfo.unWithdrawSumAmount"
        @click="pushWindow('today')"
      />

      <van-cell
        title="历史收益"
        :value="myPageInfo.earningsAmount"
        @click="pushWindow('apphistory')"
      /> 
      <van-cell
        title="我的徒弟"
        :value="myPageInfo.subUserCount"
        @click="pushWindow('apprentice')"
      /> 
      <van-cell
        title="昨日贡献"
        :value="myPageInfo.yesterdaySubPayTribute"
        @click="pushWindow('appFriends')"
      />                  
    </van-cell-group>     
    <!-- <van-grid>
      <van-grid-item
        text="今日收益"
        @click="pushWindow('today')"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ myPageInfo.unWithdrawSumAmount }}
          </div>
        </template>
      </van-grid-item>
      <van-grid-item
        text="累计收益"
        @click="pushWindow('apphistory')"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ myPageInfo.earningsAmount }}
          </div>
        </template>
      </van-grid-item>
      <van-grid-item
        text="我的徒弟"
        @click="pushWindow('apprentice')"
      >
        <template slot="icon">
          <div>{{ myPageInfo.subUserCount }}</div>
        </template>
      </van-grid-item>
      <van-grid-item
        text="昨日贡献"
        @click="pushWindow('appFriends')"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ myPageInfo.yesterdaySubPayTribute }}
          </div>
        </template>
      </van-grid-item>            
    </van-grid> -->
    <!-- v-if="adInfo && adInfo.length" -->
    <van-swipe
     
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="ad in adInfo"
        :key="ad.imageUrl"
        @click="handleSwipe(ad)"
      >
        <van-image
          width="100%"
          fit="contain"
          lazy-load
          :src="ad.imageUrl"
        />
      </van-swipe-item>
    </van-swipe>    

    <van-grid
      :column-num="4"
    >
      <van-grid-item
        text="提现记录"
        @click="pushWindow('apprecording')"
      >
        <template #icon>
          <van-icon
            color="#D81E06"
            name="balance-o"
            size="2em"
          />
        </template>
      </van-grid-item>
      <van-grid-item
        text="签到"
        @click="pushWindow('attendance')"
      >      
        <template #icon>
          <van-icon
            color="#D81E06"
            name="sign"
            size="2em"
          />
        </template>
      </van-grid-item>
      <van-grid-item
        text="新手指南"
        @click="pushWindow('qa')"
      >
        <template #icon>
          <van-icon
            color="#D81E06"
            name="comment-o"
            size="2em"
          />
        </template>
      </van-grid-item>
      <!-- http://192.168.1.6:8080/index.html#mine -->
      <van-grid-item
        text="在线客服"
        :url="myPageInfo.serviceUrl"
      >
        <template #icon>
          <van-icon
            color="#D81E06"
            name="service"
            size="2em"
          />
        </template>
      </van-grid-item>            
    </van-grid> 
    <van-cell-group class="mine-goup-cell">
      <van-cell
        title="隐私协议"
        is-link
        size="large"
        @click="pushWindow('protocol',{type:2})"
      >
        <template #icon>
          <van-icon
            color="#D81E06"
            name="umbrella-circle"
            size="2em"
          />
        </template>
      </van-cell>

      <van-cell
        title="用户协议"
        is-link
        size="large"
        @click="pushWindow('protocol',{type:1})"
      >
        <template #icon>
          <van-icon
            color="#D81E06"
            name="manager"
            size="2em"
          />
        </template>
      </van-cell>   
    </van-cell-group>
    <!-- <van-cell
      title="手动任务"
      icon="todo-list-o"
      is-link
      @click="pushWindow('tasklist')"
    />         -->
    <div class="version">
      当前版本：v1.0.0
    </div>
    <van-dialog
      v-model="modelShow"
      title="请选择提现账户"
      show-cancel-button="false"
      @confirm="pushWindow('withdraw','idcode')"
    >
      <van-radio-group
        v-model="idcode"
        class="group-radio"
      >
        <van-radio
          v-for="(idcode, index) in idcodes"
          :key="index"
          :name="idcode"
        >
          {{ idcode }}
        </van-radio>
      </van-radio-group>
    </van-dialog>    
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Toast, Tab, Tabs, List, Cell,Image as VanImage, Icon, Grid, GridItem, Swipe, SwipeItem, Tag, Dialog,Lazyload , RadioGroup, Radio,CellGroup  } from 'vant'
// eslint-disable-next-line no-unused-vars
import { IRanking, MyPageInfo, ADInfo } from '@/types/index'
import {openBrowser, pushWindowByRouter,openPage} from '@/utils/app.ts'
import copy from 'copy-text-to-clipboard'
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});
const { VUE_APP_HOST } = process.env
@Component({
  name: 'ranking',
  components:{
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]:CellGroup,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe, 
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
    [Dialog.Component.name]: Dialog.Component,
    [ RadioGroup.name ]: RadioGroup, 
    [Radio.name]:Radio 
  }
})
export default class Ranking extends Vue {

  public myPageInfo: MyPageInfo = {
    earningsAmount: 0,
    subUserCount: 0,
    unWithdrawSumAmount:0,
    yesterdaySubPayTribute:0
  }

  adInfo:Array<ADInfo> = []

  idcode:string = '1'
  idcodes:Array<string>=['1','2']
  modelShow:boolean = false



  
  public async created() {
    try{
      await this.fetchMyPageInfo()
    }catch(e){
      console.log(e)
    }
    await this.fetchAD()
  }
  /**
   * 获取我的页面信息
   */
  async fetchMyPageInfo() {
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/appEarningsInfo/myPageInfo'
      ,{}
      ,{codeHandle:'skip'})
    this.myPageInfo = data as MyPageInfo  
    let idcode = this.myPageInfo?.idcode?.replace(/ /g,'') || ''
    idcode = idcode.trim()
    this.idcodes = idcode.split('/')
    this.idcode = this.idcodes[0]
  }
  /**
   * 获取广告
   */
  async fetchAD(){
    ///gunsApi/readAppApi/getAdByType
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/readAppApi/getAdByType'
      ,{positionType:1}
      ,{codeHandle:'skip'})
    console.log(data)
    this.adInfo = data
      
  }

  // TODO:
  toWithdraw() {
    Dialog.alert({
      title: '温馨提示',
      message: `功能建设中，目前只支持公众号端提现`,
      confirmButtonText: '我知道了'
    })
  }
  toLink() {
    this.$router.push({ path: '/invite' })
  }
  pushWindow(url:string,query:any) {
    if(url === 'withdraw' && !query &&this.idcodes.length>1) {
      this.modelShow = true
    } else {
      if(url==='withdraw') {
        query = {idcode:this.idcode}
      }
      pushWindowByRouter(url, query)
    }
  }
  /**
   * 跳转到浏览器打开
   */
  openService(){
    openBrowser('https://u.wechat.com/MGRz1PwZDTc9KQCyRxY7YWY')
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
  copyText(copyText:string) {
    copy(copyText)
    Toast('复制成功')
  }

  
}
</script>
<style lang="scss" scoped>
.mine-goup-cell .van-cell--large {
    align-items: center;
}
.group-radio{
  padding:30px 0;
  .van-radio{
    padding:15px 0;
  }
}

.van-cell:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: .16rem;
    border-bottom: 2px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
.mine-page{
  min-height: 100vh;

  .van-radio{
    justify-content: center;
  }
  .mine-top{
    padding:.3rem;
    padding-right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:white;
    .mine-top-left{
      display: flex;
      flex-direction: row;
    }
    .main-top-content{
      padding-left:.1rem;
    }
    .top-link{
      color:#ffffff;
          display: flex;
    align-items: center;
    border-radius: 9rem;
    background-color: #ecd195;
    padding:.1rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    }
  }
  .van-grid {
    .van-grid-item {
      .van-grid-item__text{
        color:gold;
        font-size: .4rem;
      }
    }
  }
   .my-swipe .van-swipe-item {
    color: #fff;
    // font-size: 20px;
    // line-height: 150px;
    // text-align: center;
    // background-color: #39a9ed;
    // border-radius: .5rem;
  }
  .mine-swipe .van-swipe .van-image .van-image__img{
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 240px;
    padding: 30px 60px;
    background-color: #fff;
    pointer-events: none;
}
  .version{
    padding:.3rem 0;
    font-size: .2rem;
    text-align: center;
    color:gray;
  }
}
.van-grid-item__text {
    color: gold;
    font-size: 0.24rem;
    word-wrap: break-word;
}
</style>
