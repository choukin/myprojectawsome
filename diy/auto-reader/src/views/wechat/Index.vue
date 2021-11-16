<template>
  <div class="index">
    <div class="content index">
      <!-- closeable 模式，在右侧显示关闭按钮 
      <van-notice-bar mode="closeable">
        各位尊敬的用户您好，因本平台处于公测阶段，目前平 台开放阅读的时间调整为每天的19：00至第二天的上午11：00，请您在
        该时间段内光临我们平台阅读，非阅读时间内，平台开放的阅读文章除 鉴权文章外，数量为零，谢谢！
      </van-notice-bar>-->
      <div class="info-guide">
        <div class="guid">
          <div class="user-info">
            <img
              class="avatar"
              :src="userInfo.headimgurl"
            >
            <div class="name-id">
              <span class="name">{{ userInfo.nickname }}</span>
              <div style="display: flex;align-items: center;justify-content: center">
                <span class="id">ID:{{ userInfo.idcode }}</span>
                <router-link
                  class="copy"
                  :to="{
                    name: 'bindUser'
                  }"
                >
                  <span
                    class="user_token"
                  >认证身份 </span>
                </router-link>
              </div>
            </div>
          </div>
          <a
            class="guid-instance"
            :href="$tutorial"
            style="pointer-events: auto"
          >
            <div class="circle" />
            <span>教程</span>
          </a>
        </div>
        <div class="line" />
        <div class="reward-info">
          <router-link
            class="balancer"
            :to="{ name: 'withdraw', query: { sumAmount: withdrawInfo.sumAmount, minAmount: withdrawInfo.minAmount } }"
          >
            <div class="title">
              余额提现<van-icon
                name="arrow"
                size=".2rem"
              />
            </div>
            <div class="salary">
              <span class="unit">￥</span><span class="count">{{ withdrawInfo.allowWithdraw }}</span>
            </div>
          </router-link>
          <a
            class="friend-donate"
            href="javascript:void(0)"
          >
            <div class="title">已提现收益</div>
            <div class="salary">
              <span class="unit">￥</span><span class="count">{{ withdrawInfo.withdrawSum }}</span>
            </div>
          </a>
          <a
            class="friend-donate"
            href="javascript:void(0)"
          >
            <div class="title">总收益</div>
            <div class="salary">
              <span class="unit">￥</span><span class="count">{{ withdrawInfo.sumAmount }}</span>
            </div>
          </a>
        </div>
      </div>

      <div class="check-read-ability">
        <div class="left">
          <router-link
            class="ctn-box"
            to="/read"
          >
            <div class="top">
              <div class="title">
                自动任务
              </div>
              <!-- <div class="desc">
                每篇{{ earningsThreshold }}秒
              </div> -->
            </div>
            <img
              src="@/assets/img/try-play.png"
              class="bg"
            >
            <button class="btm">
              GO
            </button>
          </router-link>
        </div>
        <div class="right">
          <router-link
            class="read"
            to="tasklist"
          >
            <div class="title">
              手动任务
            </div>
            <img
              src="@/assets/img/read.png"
              class="bg"
            >
          </router-link>
          <router-link
            to="qa"
            class="register"
          >
            <div class="title">
              常见问题
            </div>
            <!-- <img src="@/assets/img/register.png" class="bg" /> -->
          </router-link>
        </div>
      </div>
      <!-- share & personal-center -->
      <div
        class="share-personal"
      >  
        <div
          id="download-app"
          class="personal-center"
          @click="openDownload"
        >
          <van-icon
            name="down"
          />
          <div class="txt">
            下载助手<br>
            <span style="font-size:.15rem;color:grey;">自动任务必须下载助手才能完成</span>
          </div>
        </div>
        <a
          class="personal-center"
          :href="$tutorial"
        >
          <van-icon name="question-o" />
          <div class="txt">
            使用教程
          </div>
        </a>
      </div>    
      <div
        
        class="share-personal"
      >
        <div
          v-if="$channelCode!='CS2'"
          class="dialog-container animated infinite headShake"
        >
          <div
            class="dialog-content"
          >
            邀请好友<br>
            奖励{{ $channelCode==='CS2'?'20':'30' }}%
          </div>
          <s />
        </div>  
        <a
          v-if="$channelCode!='CS2'"
          class="share"
          href="javascript:void(0)"
          @click="shareFriends"
        >
          <img
            src="@/assets/img/share.png"
            class="bg"
          >
          <div class="txt">分享赚钱</div>
        </a>

        <router-link
          class="personal-center"
          :to="{ name: 'userCenter', query: { sumAmount: withdrawInfo.sumAmount, minAmount: withdrawInfo.minAmount } }"
        >
          <img
            src="@/assets/img/personal-center.png"
            class="bg"
          >
          <div class="txt">
            个人中心
          </div>
        </router-link>
      </div>        
      <div class="tips">
        {{ message }}
        <!-- 公告：各位尊敬的用户您好，因本平台处于公测阶段，目前平
        台开放阅读的时间调整为每天的19：00至第二天的上午11：00，请您在
        该时间段内光临我们平台阅读，非阅读时间内，平台开放的阅读文章除 鉴权文章外，数量为零，谢谢！ -->
      </div>
      <div
        id="topbar"
        class="tobar"
      >
        <router-link to="contact">
          <div class="assistant">
            <van-icon
              name="service"
              size=".4rem"
            />
          </div>
        </router-link>
      </div>
    </div>
    <van-dialog
      v-model="showTips"
      title="长按发送给好友"
      message-align="center"
      class-name="content-center"
      confirm-button-text="我知道了"
    >
      <div
        ref="dialogContent"
        class="dialog-content"
      >
        <img :src="spreadImage">
      </div>
    </van-dialog>
  </div>
</template>
<script lang="ts">

import BigNumber from 'bignumber.js'
import Driver from "driver.js"
import "driver.js/dist/driver.min.css"
import QRCode from 'qrcode'
// import html2canvas from 'html2canvas'
import { getIdCodeTipsKey, setIdCodeTipsKey } from '@/utils/cookies'
import { Component, Mixins } from 'vue-property-decorator'
import {
  Button,
  Panel,
  Grid,
  GridItem,
  Tag,
  GoodsAction,
  GoodsActionButton,
  Overlay,
  Toast,
  Icon,
  Notify,
  Dialog,
  NoticeBar
} from 'vant'
import { UserModule } from '@/store/modules/user'
import { getURLParam,replaceURL } from '@/utils/tool'
import WeChat from '@/plugins/wechatMixin'
import copy from 'copy-text-to-clipboard'

// eslint-disable-next-line no-unused-vars
import { IUserBase, IUserState,getShowSteps,setShowSteps } from '@/utils/cookies'
import steps from './step'
import * as Sentry from '@sentry/browser'
const { VUE_APP_HOST } = process.env
interface AuthModel {
  codeId?: string
  parentId?: string
}
@Component({
  name: 'Index',
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Panel.name]: Panel,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tag.name]: Tag,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [Overlay.name]: Overlay,
    [Dialog.Component.name]: Dialog.Component,
    [NoticeBar.name]: NoticeBar
  }
})
export default class Index extends Mixins(WeChat) {
  public driver: Driver | null = null
  public qrcodeOpt = {
    //  二维码配置参数
    rendererOpts: {
      quality: 0.3
    }
  }
  showTips:boolean = false
  public message: string = ''
  // 推广图片链接
  public spreadImage: string = ''
  // 邀请链接
  public inviteUrl: string = ''
  public percentageTop: string = '0' // 二级伴读收益率
  public percentageParent: string = '0' // 一级伴读收益率
  public earningsThreshold: number = 2 // 阅读时间
  public userInfo: any = {
    headimgur: '',
    nickname: '',
    id: '',
    idcode:''
  }
  public withdrawInfo: any = {
    withdrawSum:0, // 已提现收益
    allowWithdraw:0, // 可提现收益
    earningsAmount: 0, // 阅读收益
    endEarningsAmount: 0,
    minAmount: 0, // 最小提现金额
    sumPrentice: 0, // 邀请金额
    sumAmount: 0 // 总收益
  }
  // 获取code
  get codeId() {
    return getURLParam('code') //this.$route.query.code || ''
  }
  // 获取parentId
  get parentId() {
    return getURLParam('parentId') // this.$route.query.parentId
  } 
  get target() {
    return getURLParam('router')
  }
  get showsteps(){
    return getURLParam('showsteps')||false
  }
  public async created() {
    // this.$intro().setOption({showStepNumbers:false})
    // 每次进入默认阅读都设置成false
    this.autoReader = false
    if (process.env.NODE_ENV === 'development') {
      let userbase: IUserBase = {
        "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJluoNCYp2sbcNIqcppPxTuueKY40oWX1TAFYeCto8TT3zwuB3YPjUXgDd62whNFdYd9n5C4MAJ9w/132",
        "id":16747,
        "idcode":"5mllpv",
        "nickname":"鑫",
        "resettype":0,
      }
      let userInfo: IUserState = {
        autoReader: false,
        randomKey: "013081",
        token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyOTAiLCJuYmNobXlkcHQwMDMiOiJudW5sZjEiLCJleHAiOjE1OTMzNDgzOTksImlhdCI6MTU5Mjc0MzU5OX0.PxCPLjU2xn_xtcFqAL75Sg5jCpQ6Otw-u2kLTiRfQsoGGzowpObj86x-egeAynXHzUC-tNLI8ZHxEqwS7stT8g",
        usertoken:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyOTAiLCJuYmNobXlkcHQwMDMiOiJudW5sZjEiLCJleHAiOjE1OTMzNDgzOTksImlhdCI6MTU5Mjc0MzU5OX0.PxCPLjU2xn_xtcFqAL75Sg5jCpQ6Otw-u2kLTiRfQsoGGzowpObj86x-egeAynXHzUC-tNLI8ZHxEqwS7stT8g',
        userbase: userbase
      }
      UserModule.setUserInfo(userInfo)
    }

    // 初始化页面信息
    this.pageInit()
  }

  mounted() {
    let localshowsteps = getShowSteps()
    if(localshowsteps){
      return false
    }
    this.driver = new Driver({
      allowClose: true,
      animate: true,
      showButtons: false,
      className: 'scoped-class',})
    if(this.showsteps) {
      this.$nextTick(()=>{
        
          this.driver?.defineSteps(steps)
          this.driver?.start()
          document.getElementById("#driver-popover-item")?.addEventListener('click',()=>{
            this.driver?.reset()
          })
          setShowSteps('1')
      })
    }
  }
  public async createQR(textUrl: string) {
    let url = ''
    try {
      url = await QRCode.toDataURL(textUrl)
    } catch (e) {
      console.error(e)
    }
    return url
  }

  public async pageInit() {
    let hastips = getIdCodeTipsKey()
    if (hastips) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
    } else {
      Dialog.alert({
        title: '温馨提示',
        message: `身份认证码是您身份认证的唯一凭证，平台迁移后需重新输入认证码和安全码，找回原账户，一旦丢失，不可找回，您可在提现页面初次设置安全码，如已设置请牢记安全码，安全码不做修改；强烈建议您在初次设置安全码时截图保存，谢谢配合！`,
        confirmButtonText: '我知道了'
      })
      setIdCodeTipsKey('true')
    }

    let params: AuthModel = {}
    // if (!this.token) {
    this.codeId && (params.codeId = this.codeId as string)
    params.parentId = this.parentId
    // if(this.parentId === 'attendance' ) {
    //   params.parentId = ''
    // } 
    // if(this.parentId.indexOf('download') > -1){
    //   params.parentId = parseInt(this.parentId)+''
    // }
    // this.parentId && (params.parentId = (this.parentId==='attendance'?'':this.parentId) as string)
    if (!this.codeId && !this.token) {
      Notify({
        type: 'warning',
        message: '无效页面链接,链接恢复中',
        onClose: () => {
          // TODO:
          if (process.env.NODE_ENV !== 'development') {
            window.location.replace(`${VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect`)
          }
        }
      })
      return false
    }
    // }
    let userInfo = await this.$get(`${VUE_APP_HOST}/gunsApi/auth`, { ...params })
    this.userInfo = userInfo.wechatUserView
    let userbase: IUserBase = userInfo.wechatUserView
    let _userInfo: IUserState = {
      token: userInfo.token,
      usertoken: userInfo.token,
      autoReader: false,
      randomKey: userInfo.randomKey,
      userbase
    }
    UserModule.setUserInfo(_userInfo)
    if (this.target) {
      let router = this.target
      Sentry.captureMessage('redrect_router'+router,  Sentry.Severity.Info)
      replaceURL(`${router}?idcode=${this.userInfo.idcode}`)
      // this.$router.push({path:router, query: { idcode: this.userInfo.idcode }})
      return false
    } 
    const ruleData = await this.$get(`${VUE_APP_HOST}/gunsApi/brushRuleApi/getBrushRuleInfo`)
    // 设置客服链接
    UserModule.setServiceImgURL(ruleData.serviceUrl)
    let percentageParent = new BigNumber(ruleData.percentageParent || 0)
    // 二级伴读收益率
    this.percentageTop = new BigNumber(ruleData.percentageTop || 0).multipliedBy(100) + '%'
    // 一级伴读收益率
    this.percentageParent = percentageParent.multipliedBy(100) + '%'
    this.earningsThreshold = ruleData.earningsThreshold
    this.inviteUrl = `${VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userInfo.id}` // `http://wechat03.nblh.24527e.cn/gunsApi/redirectIndexApi/redirect?parentId=${this.userInfo.id}`

    const data = await this.$get(`${VUE_APP_HOST}/gunsApi/withdrawApi/withdrawInfo`)
    this.withdrawInfo = data
    //  验证签名
    if(this.$channelCode!='CS2') {
      this.installWXbridge(this.inviteUrl)
    }
    const notifyInfo = await this.$get(`${VUE_APP_HOST}/gunsApi/notifyApi/getNotifyInfo`)
    // 第一次进入页面弹框提示
    this.message = notifyInfo.msg
    let diaMessage = window.sessionStorage.getItem('diaMessage')
    if (!diaMessage && this.message) {
      window.sessionStorage.setItem('diaMessage','1')
      Dialog.alert({
        title: '温馨提示',
        message: notifyInfo.msg,
        confirmButtonText: '我知道了'
      })
    }

    Toast.clear()
  }
  private async shareFriends() {
    // 如果是阅读就弹出二维码
    this.$router.push({ path: '/share' })
  }
  private toastInfo() {
    Toast('内容建设中，尽请期待！😊')
  }
  private copyText(str: string = '') {
    let isSuccess = copy(str)
    if (isSuccess) {
      Toast('复制成功')
    }
  }
  openDownload() {
    Sentry.captureMessage('gotodownload',  Sentry.Severity.Info)
    replaceURL(`download?idcode=${this.userInfo.idcode}`)
  }
}
</script>
<style >
  div#driver-popover-item.scoped-class{
      background:transparent;
      min-height: 8.5rem;
      max-width:100%;
      width:100%;
}
div#driver-popover-item.scoped-class  .driver-popover-description{
  text-align: center;
}
div#driver-popover-item.scoped-class .driver-popover-tip.bottom {
  display:none;
}
</style>
<style scoped lang="scss">

.index .content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 15px;
}
.index.content .info-guide {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background: #2c8bff;
  height: 320px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 40px 0;
  border-radius: 17px;
  background-image: url(~@/assets/img/blue-bg-2.png);
  background-size: 100% 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  font-size: 12px;
  -webkit-box-shadow: 0px 20px 30px -20px #3890fa;
  box-shadow: 0px 20px 30px -20px #3890fa;
}

.index.content .info-guide .guid {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.index.content .info-guide .guid .user-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 24px;
  .name-id {
    margin-left: 0.24rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.2rem 0;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 0.26rem;
    color: #fff;
  }
  .name {
    font-size: 0.28rem;
  }
  .copy {
    height: 0.3rem;
    padding: 0 0.2rem;
    text-align: center;
    line-height: 0.3rem;
    color: #000000;
    font-size: 0.24rem;
    margin-left: 0.32rem;
    background-size: 100% 100%;
    border-radius: 0.2rem;
    background-color: white;
    border-bottom-left-radius: 0;
  }
}

.index.content .info-guide .guid .user-info .avatar {
  height: 0.88rem;
  width: 0.88rem;
  border-radius: 50%;
  background: #86c5e2;
  border: 2px solid #fff;
}

.index.content .info-guide .guid .user-info .nickname {
  color: #fff;
  margin-left: 10px;
  font-size: 26px;
}

.index.content .info-guide .guid .guid-instance {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  font-size: 22px;
  height: 38.4px;
  width: 92px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 3px;
  background: #2782ff;
  border-radius: 18px 0 0 18px;
}

.index.content .info-guide .guid .guid-instance .circle {
  border-radius: 50%;
  background: #00ffdc;
  height: 18px;
  width: 18px;
}

.index.content .info-guide .line {
  margin: 24px;
  height: 1px;
  background: #48afff;
}

.index.content .info-guide .reward-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 24px 0 24px;
  color: #fff;
}

.index.content .info-guide .reward-info .title {
  color: #fff;
  font-size: 24px;
  font-weight: 300;
}

.index.content .info-guide .reward-info .unit {
  font-size: 12px;
}

.index.content .info-guide .reward-info .count {
  font-size: 36px;
  font-weight: 500;
}

.index.content .info-guide .reward-info .salary {
  color: #fff;
  margin-top: 3px;
}
.index.content .check-read-ability {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 48px 0 0;
}

.index.content .check-read-ability .left {
  position: relative;
  height: 340px;
  width: 45%;
  padding: 20px 24px 44px;
  background: -webkit-gradient(linear, left top, left bottom, from(#ffbc26), to(#ffeb4e));
  background: -o-linear-gradient(top, #ffbc26, #ffeb4e);
  background: linear-gradient(to bottom, #ffbc26, #ffeb4e);
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.index.content .check-read-ability .left .ctn-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}

.index.content .check-read-ability .left .ctn-box .top {
  color: #fff;
}

.index.content .check-read-ability .left .ctn-box .top .title {
  font-size: 28px;
}

.index.content .check-read-ability .left .ctn-box .top .desc {
  margin-top: 3px;
  font-size: 12px;
  font-weight: 300;
}

.index.content .check-read-ability .left .ctn-box .btm {
  padding: 6px 30px;
  border-radius: 60px;
  color: #ffbd26;
  background: #fff;
  font-size: 32px;
}

.index.content .check-read-ability .left .ctn-box .bg {
  position: absolute;
  height: 144px;
  width: 120px;
  right: 0;
  bottom: 20px;
}

.index.content .check-read-ability .right {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 340px;
  width: 45%;
}

.index.content .check-read-ability .right .read {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  position: relative;
  height: 200px;
  width: 100%;
  background: -webkit-gradient(linear, left top, left bottom, from(#039ce0), to(#43e2ff));
  background: -o-linear-gradient(top, #039ce0, #43e2ff);
  background: linear-gradient(to bottom, #039ce0, #43e2ff);
  border-radius: 10px;
}

.index.content .check-read-ability .right .read .bg {
  position: absolute;
  height: 140px;
  width: 120px;
  right: 0;
  bottom: 0;
}

.index.content .check-read-ability .right .register {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  position: relative;
  height: 120px;
  width: 100%;
  background: -webkit-gradient(linear, left top, left bottom, from(#00c67a), to(#00fa9a));
  background: -o-linear-gradient(top, #00c67a, #00fa9a);
  background: linear-gradient(to bottom, #00c67a, #00fa9a);
  border-radius: 10px;
}

.index.content .check-read-ability .right .register .bg {
  position: absolute;
  height: 112px;
  width: 92px;
  right: 0;
  bottom: -0.02px;
}

.index.content .check-read-ability .right .title {
  width: 100%;
  font-size: 28px;
  text-indent: 24px;
}

.index.content .check-read-ability .right .desc {
  width: 100%;
  margin-top: 3px;
  font-size: 12px;
  text-indent: 24px;
  font-weight: 300;
}
.van-panel__content {
  padding: 20px;
}
.van-panel__content div {
  text-align: center;
}
.van-cell-group + .van-cell-group {
  margin-top: 10px;
}

.van-grid-item__text {
  margin-top: 5px;
}
.van-overlay img {
  width: 100%;
}
.van-popup.van-notify {
  padding: 10px 20px;
}
.index.content .share-personal {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 48px 0px 0;
  position: relative;
  .dialog-container{
    z-index: 999;
    position:absolute;
    top    :-.8rem; 
    border-radius:20px;
   left    :2rem; 
   display   :block; 
   height   :.75rem; 
   width   :1.5rem; 
   background-color:red; 
   s{ 
   position  :absolute; 
   top   :.7rem;
  left   :.2rem; 
   display  :block; 
  height  :0; 
  width  :0; 
  font-size : 0; 
   line-height : 0; 
   border-color :red transparent transparent  transparent; 
   border-style :dashed dashed solid dashed; 
   border-width :.2rem; 
  } 
 i{
   position  :absolute; 
  top   :-0.5rem; 
  left   :-10px; 
  display  :block; 
   height  :0; 
   width  :0; 
   font-size : 0; 
   line-height : 0; 
   border-color :red transparent transparent  transparent; 
   border-style :dashed dashed solid dashed; 
   border-width :10px; 
  } 
  .dialog-content{ 
   position    :absolute; 
   background-color:red; 
   border-radius: 30%;
   text-align: center;
   color:white;
   font-size: .2rem;
   width     :100%; 
   height    :100%; 
  padding    :5px; 

  /* For IE 8 */ 
  }
  }
}

.index.content .share-personal .bg {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-left: 20px;
}

.index.content .share-personal .gif {
  position: absolute;
  height: 2rem;
  width: 120px;
  left: 40px;
  bottom: 64px;
}

.index.content .share-personal .txt {
  margin-left: 16px;
  font-size: 22px;
  color: #000;
}

.index.content .share-personal .share {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100px;
  width: 45%;
  -webkit-box-shadow: 0 0 20px #c3c3c3;
  box-shadow: 0 0 20px #c3c3c3;
  border-radius: 5px;
  position: relative;
}

.index.content .share-personal .share .tips {
  position: absolute;
  background-size: 100% 100%;
  left: 60px;
  bottom: 68px;
  font-size: 12px;
  color: #fff;
  padding: 0 8px;
  font-weight: 300;
  // background-image: url(/assets/h5_v2/tips-60424dcf5c734b60e68a924ece293d84348f1ad0a6219aa14c086bed27366941.png);
}

.index.content .share-personal .personal-center {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100px;
  width: 45%;
  -webkit-box-shadow: 0 0 20px #c3c3c3;
  box-shadow: 0 0 20px #c3c3c3;
  border-radius: 5px;
  .van-icon{
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    margin-left: 0.2rem;
    font-size: .5rem;
    color:#00c67a;
  }
}

.test_triangle_border {
  /* width: 200px;
  margin: 0 auto 20px; */
  position: relative;
}
.test_triangle_border a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}
.test_triangle_border .popup {
  width: 100px;
  background: #ff0508;
  padding: 10px 20px;
  color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 12px;
}
.test_triangle_border .popup span {
  font-size: 12px;
  display: block;
  width: 0;
  height: 0;
  border-width: 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent transparent;
  position: absolute;
  top: -10px;
  left: 50%; /* 三角形居中显示 */
  margin-left: -10px; /* 三角形居中显示 */
}
.test_triangle_border .popup em {
  display: block;
  width: 0;
  height: 0;
  border-width: 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent #ff0508;
  position: absolute;
  top: 1px;
  left: -10px;
}
.tips {
  padding: 60px 15px 15px;
  font-size: 24px;
  text-align: justify;
  color: #9e9e9e;
  .van-tag--large {
    font-size: 24px !important;
  }
}
@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  -webkit-animation-name: shake;
  animation-name: shake;
}
@keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

.headShake {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-name: headShake;
  animation-name: headShake;
}
.animated {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
</style>
