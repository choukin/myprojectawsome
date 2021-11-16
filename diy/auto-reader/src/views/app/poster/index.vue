<template>
  <div id="app">
    <img
      :src="src"
      alt=""
      class="share-image"
    >
    <!-- <vue-canvas-poster
      class="poster"
      :width-pixels="1000"
      :painting="painting"
      @success="success"
      @fail="fail"
    /> -->
    <!-- // 页面 -->
    <canvas-poster
      :draw-data="drawData"
      @success="success"
    />
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import vueCanvasPoster from 'vue-canvas-poster'
import { Toast, Tab, Tabs, List, Cell,Image as VanImage, Icon, Grid, GridItem, Swipe, SwipeItem,Button  } from 'vant'
// eslint-disable-next-line no-unused-vars
import { IRanking } from '@/types/index'
const { VUE_APP_HOST } = process.env
// import copy from 'copy-text-to-clipboard'
// import { UserModule } from '@/store/modules/user'
import {drawPoster} from './painter'
@Component({
  name: 'poster',
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
    vueCanvasPoster,
  }
})
export default class Poster extends Vue {
  public str: string = ''
  public painting:any ={}
  userId:string=''
  src:string = ''
  drawData:any ={
    width: 750,
    height: 1196,
    backgroundColor: '#fff',
    views: [
      // 绘制本地图片
      {
        type: 'image',
        url: require('./img/poster.png'), // 远程图片可以直接改为图片地址
        top: 0,
        left: 0,
        width: 750,
        height: 1196,
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
        text: '',
        top: 296,
        left: 233,
        width: 289,
        height: 285,
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
  mounted() {
    const params={
      type:'base' // 尝试换一下base,image
    }
    drawPoster(params).then(res=>{
      debugger
      this.painting = res
      console.log(this.painting,'this.painting')
      
    })
  }
  public async created() {
    let inviteUrl = `${VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}`
    this.drawData = this.initDrawData(inviteUrl)
    // // //http://lnurl.cn/weixin/short?url_long=http://www.baidu.com 
    // // this.inviteUrl = 'http://www.baidu.com'
    // let [,data] = await  this.$fetchGet(`${VUE_APP_HOST}/gunsApi/shareForSignatureApi/getShortUrl?url=`+ encodeURI(reInviteUrl))
    // this.inviteUrl = data
  }

  public initDrawData(inviteUrl:string) {
    return {
      width: 750,
      height: 1196,
      backgroundColor: '#fff',
      views: [
      // 绘制本地图片
        {
          type: 'image',
          url: require('./img/poster.png'), // 远程图片可以直接改为图片地址
          top: 0,
          left: 0,
          width: 750,
          height: 1196,
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
          top: 296,
          left: 233,
          width: 289,
          height: 285,
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
    // if (this.userId){
    //   let copytext = (this.$refs.copytext as HTMLElement).innerText
    //   copy(copytext)
    //   Toast('复制成功')
    // } else {
    Toast('复制失败，缺少用户信息')
    // }
  }


  
}
</script>
<style lang="scss" scoped>
.share-image{
  width:100vw;
  height:100vh;
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
  }
  }

}
</style>
