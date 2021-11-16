/* eslint-disable vue/no-v-html */
<template>
  <div class="mine-page">
    <div class="mine-top">
      <div class="main-top-content">
        <van-image
          fit="fill"
          round
          width=".9rem"
          height=".9rem"
          :src="task.contUrl"
        />
        <div style="padding-left:.15rem;">
          {{ task.contName }}
        </div>
      </div>
      <div> 
        <div class="gold-text">
          赚{{ task.earningsPrice }}元
        </div>
      </div>
    </div>  
    <van-notice-bar
      :text="noticeText"
      left-icon="volume-o"
    />    
    <van-grid>
      <van-grid-item
        text="已完成数"
      >
        <template slot="icon">
          {{ task.exposureIng }}
        </template>
      </van-grid-item>
      <van-grid-item
        text="审核周期"
      >
        <template slot="icon">
          {{ task.auditCycle||'3' }}天
        </template>
      </van-grid-item>
      <van-grid-item
        text="限时完成"
      >
        <template slot="icon">
          3小时
        </template>
      </van-grid-item>
      <van-grid-item
        text="托管赏金"
      >
        <template
          slot="icon"
        >
          <div class="gold-text">
            ¥{{ sumAmount }}
          </div>
        </template>
      </van-grid-item>            
    </van-grid>  

    <div
      class="content"
      v-html="htmlContent"
    />
    <van-field
      v-if="task.userState=='-2'"
      v-model="tel"
      type="tel"
      :label="task.addInfo"
      required
      clickable
      :placeholder="'请输入'+task.addInfo"
      :error-message="telerrormessage"
    />
    <div style="padding:.3rem;text-align:center;">
      <van-uploader
        v-if="task.userState=='-2'"
        v-model="fileList"
        accept="image/*"
        :after-read="afterRead"
        upload-text="上传数据图"
      />
    </div>
    <div
      v-if="imgList && imgList.length"
      style="padding:.1rem;text-align:center;"
    >
      <van-image
        v-for="item in imgList"
        :key="item.createTime"
        width="80%"
        fit="contain"
        :src="item.url"
      />
    </div>
  
    <div ref="bottomplaceholder" />
    <van-grid
      ref="bottomBtn"
      class="flxed-bottom"
      :column-num="1"
    >
      <van-grid-item
        :text="task.statusName"
        
        @click="watchManually(task.userState+'')"
      />
    </van-grid>  
    <van-number-keyboard
      ref="numberKeyboard"
      v-model="tel"
      :show="keyBoardShow"
      :maxlength="11"
      @blur="keyBoardShow = false"
      @show="showKeyBoard"
      @hide="closeKeyBoard"
    />      
  </div>
</template>
<script lang="ts">
import BigNumber from 'bignumber.js'
import {Vue, Component} from 'vue-property-decorator'
import { Tab, Tabs, List, Cell,Image as VanImage, Icon, Grid, GridItem,NoticeBar, Uploader,Field, Toast, NumberKeyboard} from 'vant'
const { VUE_APP_HOST } = process.env
// eslint-disable-next-line no-unused-vars
import { Task, UploadFile } from '@/types/index'
import {unescapeHTML} from '@/utils/tool'

let status: any = {
  '-3':'watchManually',
  '-2':'submitManually'
}
let statusTexts: any = {
  '-3':'报名悬赏',
  '-2':'提交结果数据',
  '1':'收益已到账',
  '0':'审核中'
}

@Component({
  name: 'taskdetail',
  filters:{unescapeHTML},
  components:{
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [NoticeBar.name]: NoticeBar,
    [Uploader.name]: Uploader,
    [Field.name]:Field,
    [NumberKeyboard.name]:NumberKeyboard
  }
})
export default class Ranking extends Vue {
  keyBoardShow:boolean = false
  tel:string = ''
  telerrormessage:string = ''
  fileList: Array<UploadFile>=  [];
  imgList: Array<string> = []
  noticeText: string = '先报名=>再做任务，打钱或涉及支付的任务千万别做!'
  task:Task = {
    addInfo:'手机号',
    audit: "",
    contId: 4,
    contName: "手动任务0012",
    contUrl: "http://file.sayyouideas.com/002923772d3948.png",
    createTime: "2020-05-10 14:11:19",
    createUser: 0,
    exposureIng: 0,
    id: 4,
    remarks: "是,允许",
    statusName: "未领取任务",
    targetExposure: 10,
    userPrice: 0.3,
    userState: "",
    userTime: "",
    wxUserId: "",
  }
  // @Watch('keyBoardShow')
  // boardHeight(ewVal: boolean, oldVal: boolean) {
  //   if(ewVal==true){
  //     console.log(document.querySelector('.van-number-keyboard')?.offsetHeight)
  //   }
  //   console.log(oldVal)
    
  //   // debugger
  //   // this.$refs.numberKeyboard.$el.offsetHeight
  //   return 0
  // }
  get htmlContent() {
    return unescapeHTML(this.task.remarks||'')
  }
  get textBtn() {
    // status0audit0未审核，status0audit1审核失败，status1audit1审核成功
    // 未领取-3   -2是已领取任务  0，该任务未获取收益，，1是获取到了收益
    return statusTexts[this.task.userState as string]
  }
  get sumAmount() {
    let sum = new BigNumber(this.task.userPrice||0)
    sum = sum.multipliedBy(this.task.targetExposure||0)
    return sum
  }
  async created() {
    await this.fetchDetail()
  }
  mounted() {
    // 设置底部按钮的站位空间高度
    this.$nextTick(()=>{
      let placeHolder = this.$refs.bottomplaceholder as HTMLElement;
      let bottomBtn = (this.$refs.bottomBtn as Vue).$el as HTMLElement;      
      placeHolder.style.height = bottomBtn.offsetHeight + 'px'
    })
  }
  showKeyBoard() {
    const keyBoardHeight = (document.querySelector('.van-number-keyboard') as HTMLElement)?.offsetHeight
    let placeHolder = this.$refs.bottomplaceholder as HTMLElement;
    let bottomBtn = (this.$refs.bottomBtn as Vue).$el as HTMLElement;      
    placeHolder.style.height = (bottomBtn.offsetHeight + keyBoardHeight) + 'px'
    // window.scrollTo(0, document.documentElement.clientHeight);
    const t = document.body.clientHeight;
    window.scroll({ top: t, left: 0, behavior: 'smooth' });
  }
  closeKeyBoard() {
    debugger
    let placeHolder = this.$refs.bottomplaceholder as HTMLElement;
    let bottomBtn = (this.$refs.bottomBtn as Vue).$el as HTMLElement;      
    placeHolder.style.height = bottomBtn.offsetHeight + 'px'
  }
  /**
   * 
   */
  async fetchDetail() {
    let id = this.$route.query.id
    let data = await this.$get(VUE_APP_HOST + `/gunsApi/taskManuallyApi/getManuallyInfoById`,{id:id},{tokenflag: true})
    this.task = data
    this.task.addInfo = this.task.addInfo || '手机号'
    if ((this.task.userState+'') !== '-3' || (this.task.userState+'') !== '-2' ){
      await this.getFileInfoListByUserIdCentId()
    }
  }


  afterRead(file:any) {
    file.status = 'uploading';
    file.message = '上传中...';
    let param = new FormData()  // 创建form对象
    param.append('id', this.task.id +'') 
    param.append('file', file.file)  // 通过append向form对象添加数据
    let config = {
      tokenflag:  true,
      postType: 'file',
      headers: {'Content-Type': 'multipart/form-data'}
    }
    this.$post(VUE_APP_HOST + `/gunsApi/taskManuallyApi/files?id=${this.task.id}`, param, config)
      .then((res:any)=>{
        file.status = 'done';
        console.log(res,'上传成功')
        
      }).catch((e:Error)=>{
        console.error(e)
        file.status = 'failed';
        file.message = '上传失败';
      })
      
  }

  /**
   * 任务报名
   */
  async watchManually(state:string) {
    if(state !== '-3' && state !== '-2'){
      return false
    }
    if(state === '-2') {
      // if(!/^1[0-9]{10}$/.test(this.tel)){
      if(!this.tel) {
        this.telerrormessage = `请输入正确的${this.task.addInfo}`
        return false
      }
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    let id = this.$route.query.id || ''
    let additional = this.tel || ''
    let str = status[state]
    const [error] = await this.$fetchGet(VUE_APP_HOST + `/gunsApi/taskManuallyApi/${str}`,{id,additional},{tokenflag: true})
    if(!error){
      await this.fetchDetail()
    }
    Toast.clear()

  }
  /**
   * 获取用户上传的图片
   */
  async getFileInfoListByUserIdCentId() {
    let id = this.$route.query.id
    let data = await this.$get(VUE_APP_HOST + `/gunsApi/taskManuallyApi/getFileInfoListByUserIdCentId`,{id:id},{tokenflag: true})
    this.imgList  = data
    console.log(data)
  }
  
}
</script>
<style lang="scss">

.mine-page{
  min-height: 100vh;
  .content {
  font-size:.28rem;
  padding:.3rem;
  img{
    width:100%;
  }
}
  .gold-text{
    color:#ed6a0c;
  }
  .van-grid {
    .van-grid-item {
      .van-grid-item__text{
        font-size: .2rem;
      }
    }
  }
  .flxed-bottom.van-grid {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-grid-item__content {
      background-color: #07c160;
      }
      .van-grid-item__text{
        font-size: .26rem;
        color: white;
      }
  }
  .mine-top{
    .main-top-content{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    padding:.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:white;
  }

}
</style>