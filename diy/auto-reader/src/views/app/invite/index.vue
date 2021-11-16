<template>
  <div class="invite-page">
    <div class="top-banner">
      邀请好友得好礼
    </div>
    <div class="content-box">
      <div
        ref="copytext"
        class="content"
      >
        全自动任务平台[阴险][阴险]最近我发现一个，玩游戏、阅读也能赚钱💰💰的自动任务平台哦~只要下载后打开，就有收益！实时提现微信秒到💰💰👉👉点开链接加入我们！{{ inviteUrl }}
      </div>      
      <van-button
        type="info"
        round
        size="large"
        class="downloadbtn"
        text="复制链接"
        @click="copyText"
      />
    </div>
    <div style="text-align:center;padding-top:.15rem;">
      <van-button
        type="primary"
        text="查看海报"
        @click="show = true"
      />
    </div>
    <van-overlay
      :show="show"
      @click="show = false"
    >
      <div class="wrapper">
        <img
          :src="src"
          alt=""
          class="share-image"
          @click.once.stop="saveImage(src)"
        >
      </div>
    </van-overlay>
    <canvas-poster
      :draw-data="drawData"
      @success="success"
    />
  </div> 
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { Overlay,Toast, Tab, Tabs, List, Cell,Image as VanImage, Icon, Grid, GridItem, Swipe, SwipeItem,Button  } from 'vant'
// eslint-disable-next-line no-unused-vars
import { IRanking } from '@/types/index'
const { VUE_APP_HOST,VUE_APP_CHANNEL } = process.env
import copy from 'copy-text-to-clipboard'
import vueCanvasPoster from 'vue-canvas-poster'
import {downloadPic} from '@/utils/app'
@Component({
  name: 'ranking',
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
    [Button.name]: Button,
    [Overlay.name]:Overlay,
    vueCanvasPoster
  }
})
export default class Invite extends Vue {

  public posterData: any = {
    RWZ:{
      // url: require('./img/posterrwz.png'),
      // width: 3543,
      // height: 5315,
      // top: 2973,
      // left: 1340,
      // qrwidth: 846,
      // qrheight: 846,
      url: require('./img/posterrwz.png'),
      width: 750,
      height: 1196,
      top: 674,
      left: 283,
      qrwidth: 180,
      qrheight: 180,      
    },
    CS2:{
      url: require('./img/poster.png'),
      width: 750,
      height: 1196,
      top: 296,
      left: 233,
      qrwidth: 289,
      qrheight: 285,
    }
  }

  /**
   * 根据渠道获取海报参数信息
   */
  get posterInfo() {
    console.log(VUE_APP_CHANNEL,'VUE_APP_CHANNEL')
    
    return this.posterData[VUE_APP_CHANNEL as string]
  }
  // 邀请链接
  public inviteUrl: string = ''
  public userId:number | undefined = 0
  public show:boolean = false
  public src:string = ''
  drawData:any ={
    width: this.posterInfo.width,
    height: this.posterInfo.heigth,
    backgroundColor: '#fff',
    views: [
      // 绘制本地图片
      {
        type: 'image',
        url: this.posterInfo.url,// require('./img/poster.png'), // 远程图片可以直接改为图片地址
        top: 0,
        left: 0,
        width: this.posterInfo.width,
        height: this.posterInfo.height,
      },
      // 绘制带圆角+边框的图片
      // {
      //   type: 'image',
      //   url: require('@/assets/img/app/down-top.png'),
      //   top: 58,
      //   left: 165,
      //   width: 30,
      //   height: 30,
      //   borderRadius: 5,
      //   borderWidth: 2,
      //   borderColor: '#f0efefea',
      // },
      // 绘制文字
      // {
      //   type: 'text',
      //   content: 'vue-canvas-poster-yufan简单快速的绘制canvas海报~~这是一段比较长的标题文字',
      //   fontSize: 14,
      //   color: '#f7f7f7',
      //   textAlign: 'center',
      //   top: 262,
      //   left: 180,
      //   width: 200,
      //   lineNum: 3,
      //   lineHeight: 20,
      //   baseLine: 'top',
      // },
      // 绘制二维码
      {
        type: 'qcode',
        text: 'http://test.h5.youngbazaar.cn/index.html#/download',
        top: this.posterInfo.top,
        left: this.posterInfo.left,
        width: this.posterInfo.qrwidth,
        height: this.posterInfo.qrheight,
      },
      // 绘制一条分割线
      // {
      //   type: 'line',
      //   color: '#999',
      //   startX: 30,
      //   startY: 580,
      //   endX: 330,
      //   endY: 580,
      //   width: 2,
      //   lineCap: 'round',
      // },
      // // 绘制一个简易矩形
      // {
      //   type: 'rect',
      //   width: 200,
      //   height: 200,
      //   x: 20,
      //   y: 50,
      //   paddingLeft: 10,
      //   paddingRight: 10,
      //   backgroundColor: '#fff',
      // }
    ]
  }
  public async created() {
    this.userId = this.userBase.id// getUserId()
    let reInviteUrl = `${VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userId}&router=download`
    // //http://lnurl.cn/weixin/short?url_long=http://www.baidu.com 
    // this.inviteUrl = 'http://www.baidu.com'
    let [,data] = await  this.$fetchGet(`${VUE_APP_HOST}/gunsApi/shareForSignatureApi/getShortUrl?url=`+ encodeURI(reInviteUrl))
    this.inviteUrl = data
    // let downUrl = 'http://test.h5.youngbazaar.cn/index.html#/download'
    this.drawData = this.initDrawData(reInviteUrl)
  }
  public initDrawData(inviteUrl:string) {
    return {
      width: this.posterInfo.width,
      height: this.posterInfo.height,
      backgroundColor: '#fff',
      views: [
      // 绘制本地图片
        {
          type: 'image',
          url: this.posterInfo.url, // 远程图片可以直接改为图片地址
          top: 0,
          left: 0,
          width: this.posterInfo.width,
          height: this.posterInfo.height,
        },
        // 绘制带圆角+边框的图片
        // {
        //   type: 'image',
        //   url: require('@/assets/img/app/down-top.png'),
        //   top: 58,
        //   left: 165,
        //   width: 30,
        //   height: 30,
        //   borderRadius: 5,
        //   borderWidth: 2,
        //   borderColor: '#f0efefea',
        // },
        // 绘制文字
        // {
        //   type: 'text',
        //   content: 'vue-canvas-poster-yufan简单快速的绘制canvas海报~~这是一段比较长的标题文字',
        //   fontSize: 14,
        //   color: '#f7f7f7',
        //   textAlign: 'center',
        //   top: 262,
        //   left: 180,
        //   width: 200,
        //   lineNum: 3,
        //   lineHeight: 20,
        //   baseLine: 'top',
        // },
        // 绘制二维码
        {
          type: 'qcode',
          text: inviteUrl,
          top: this.posterInfo.top,
          left: this.posterInfo.left,
          width: this.posterInfo.qrwidth,
          height: this.posterInfo.qrheight,
        },
      // 绘制一条分割线
      // {
      //   type: 'line',
      //   color: '#999',
      //   startX: 30,
      //   startY: 580,
      //   endX: 330,
      //   endY: 580,
      //   width: 2,
      //   lineCap: 'round',
      // },
      // // 绘制一个简易矩形
      // {
      //   type: 'rect',
      //   width: 200,
      //   height: 200,
      //   x: 20,
      //   y: 50,
      //   paddingLeft: 10,
      //   paddingRight: 10,
      //   backgroundColor: '#fff',
      // }
      ]
    }
  }
  success(src:string) {
    // 设置img的src
    this.src = src
  }

  fail(err:Error) {
    console.log('fail', err)
  }  
  copyText() {
    if (this.userId){
      let copytext = (this.$refs.copytext as HTMLElement).innerText
      copy(copytext)
      Toast('复制成功')
    } else {
      Toast('复制失败，缺少用户信息')
    }
  }
  saveImage(src:string) {
    downloadPic(src,0)
  }


  
}
</script>
<style lang="scss" scoped>
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .share-image{
      width:90%;
      height:auto;
    }
  }

.invite-page{
  .top-banner{
    padding:.3rem;
    text-align: center;
    font-size: .48rem;
    min-height: 1.5rem;
  }
  .content-box{
    padding:.3rem;
    background-color:#ffffff;
    box-shadow: 0 0.18rem 0.26rem #d3d3d3;
  .content{
    margin-top: .3rem;
    padding: .3rem;
    font-size: .28rem;
    background-color: #ededed;
    margin-bottom: .3rem;
    word-break: break-all;
  }
  }

}
</style>
