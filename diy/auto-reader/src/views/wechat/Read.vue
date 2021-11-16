<template>
  <div class="index read_article_page">
    <div class="content read">
      <div class="info-guide">
        <div class="info-title">
          <span class="id">ID:{{ userBase.idcode }}</span>        
          <div class="guid">
            <a
              class="guid-instance"
              :href="$tutorial"
              style="pointer-events: auto"
            >
              <div class="circle" />
              <span>教程</span>
            </a>
          </div>
        </div>
        <div class="reward">
          <div class="white-content">
            <span class="txt">点亮中国梦知识改变命运，阅读收获财富</span>
          </div>
        </div>
        <div class="info">
          <div class="info-item today-readed">
            <span class="num"><span class="unit">￥</span>{{ withdrawInfo.sumAmount }}</span>
            <span>总收益</span>
          </div>
          <div class="line" />
          <div class="info-item today-reward">
            <span class="num"><span class="unit">￥</span>{{ withdrawInfo.allowWithdraw }}</span>
            <span>可提现收益</span>
          </div>
        </div>
      </div>
      <div class="check-read-ability">
        <div class="check-content">
          <div
            id="toast"
            style="display: none;"
          >
            <div class="toast-mask">
              阅读时间<br>未满六秒
            </div>
          </div>

          <!-- <div class="title"> -->
          <!-- <span>请先检测您的阅读能力</span><span class='desc'>(只需10秒)</span> -->
          <!-- </div> -->
          <div class="line" />
          <div class="read-desc">
            <div class="item">
              <van-tag
                type="success"
                size="large"
              >
                点开始阅读后不能打x强退
              </van-tag>
            </div>
            <div class="item">
              点＜返回阅读下一篇
            </div>
            <div class="item">
              <span>每篇需读<van-tag
                type="success"
                size="large"
              >{{ earningsThreshold }}</van-tag>秒以上</span>
            </div>
            <div class="item">
              <van-tag
                type="success"
                size="large"
              >
                否则阅读失败，第二天才能再点阅文章
              </van-tag>
            </div>
            <div class="item">
              <span><span class="txt">返回本页面</span></span>
            </div>
            <div class="item">
              <span>停留时间越长</span>
            </div>
            <div class="item">
              <span>越不容易阅读失败</span>
            </div>
            <!-- <div class="item">
              <span>等待开始</span>
            </div> -->
          </div>
          <van-button
            :loading="readLoading"
            :loading-text="autoreadDesc"
            loading-type="spinner"
            loading-size=".24rem"
            :type="readButtonType"
            round
            :text="autoreadDesc"
            @click="onClickReadButton"
          />
          <van-button
            v-if="$isAndroid"
            type="info"
            round
            block
            class="downloadbtn"
            text="下载助手"
            @click="dowloadAutoReaderUrl"
          />
          <van-notice-bar
            v-if="$isAndroid"
            wrapable
            :scrollable="false"
          >
            下载助手可以自动任务，无需手点，省时省力
          </van-notice-bar>
          <QRcode
            :qrcodeurl="serviceIMGURL"
            btntext="长按识别二维码联系qq客服"
          /> 
        </div>
      </div>
    </div>

    <div
      id="topbar"
      class="tobar"
    >
      <a
        class="assistant"
        href="/"
      >
        返回
      </a>
    </div>

    <van-dialog
      v-model="showDialog"
      title="温馨提示"
      confirm-button-text="我知道了"
      message-align="center"
    >
      <div class="dialog-content">
        {{ errorMessage }}
        <van-count-down
          ref="countDown"
          :auto-start="false"
          millisecond
          :time="time"
          format="mm分ss秒后自动重新请求"
          @finish="autoRead"
        />
      </div>
    </van-dialog>
  </div>
</template>
<script lang="ts">
import BigNumber from 'bignumber.js'
import QRcode from '@/components/QRcode.vue'
import { Component, Vue, Mixins } from 'vue-property-decorator'
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
  Dialog,
  NoticeBar,
  CountDown
} from 'vant'
import { replaceURL } from '@/utils/tool'
import WeChat from '@/plugins/wechatMixin'
import { getAuthURLKey, setAuthURLKey, removeAuthURLKey } from '@/utils/cookies'
import { sleep } from '@/utils/tool'
// import * as Sentry from '@sentry/browser'
const { VUE_APP_HOST } = process.env

@Component({
  name: 'Index',
  components: {
    QRcode,
    [Button.name]: Button,
    [CountDown.name]: CountDown,
    [Dialog.Component.name]: Dialog.Component,
    [Panel.name]: Panel,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tag.name]: Tag,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [Overlay.name]: Overlay,
    [NoticeBar.name]: NoticeBar
  }
})
export default class Read extends Mixins(WeChat) {
  // public autoread: boolean = false
  public unitPrice: number = 0
  // 阅读时间
  public earningsThreshold: number = 2
  public percent: string = '0'
  public withdrawInfo: any = {
    earningsAmount: 0, // 阅读收益
    endEarningsAmount: 0,
    minAmount: 0, // 最小提现金额
    sumPrentice: 0, // 邀请金额
    sumAmount: 0 // 总收益
  }
  public showDialog: boolean = false
  public time: Number = 5 * 60 * 1000
  public errorMessage: string = ''
  readLoading:boolean = false
  // 缓存请求的链接
  temPageUrl:any = null

  get autoreadDesc() {
    return this.autoReader ? '停止阅读' : '开始阅读'
  }
  get readButtonType() {
    return this.autoReader ? 'warning' : 'primary'
  }
  public async created() {
    let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 
    //  验证签名
    this.installWXbridge(inviteUrl)
    this.fetchIncome()
    
  }

  /**
   * 查询收益
   */
  async fetchIncome() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    const [error,data] = await this.$fetchGet(VUE_APP_HOST + '/gunsApi/withdrawApi/withdrawInfo')
    if(error){
      console.error(error)
    }
    this.withdrawInfo = data
    const [ruleError,ruleData] = await this.$fetchGet(VUE_APP_HOST + '/gunsApi/brushRuleApi/getBrushRuleInfo')
    if(ruleError){
      console.error(ruleError)
    }
    let percentageParent = new BigNumber(ruleData.percentageParent || 0)
    this.unitPrice = ruleData.unitPrice
    this.earningsThreshold = ruleData.earningsThreshold
    // 只展示二级提成
    this.percent = percentageParent.multipliedBy(100) + '%'

    let monitorUrlObj: any = getAuthURLKey() || '{}'
    monitorUrlObj = JSON.parse(monitorUrlObj)
    if (monitorUrlObj.monitorUrlPre) {
      let monitorUrl = this.replaceHost(monitorUrlObj.monitorUrlPre)
      await this.$get(monitorUrl, { oid: monitorUrlObj.oid, channel: this.$channel }, { encrypt: true, retry: false }) 
      if (monitorUrlObj.type === 'auth') {
        await sleep(4000)
      }
      removeAuthURLKey()
      Toast.clear()
    }
    // 自动阅读
    if (this.autoReader) {
      this.autoRead()
    }
  }
  // 点击阅读按钮
  onClickReadButton() {
    // loading 中不允许重复提交
    if(this.readLoading){
      return false
    }
    //按钮loading
    this.readLoading = true
    if (!this.autoReader) {
      this.$notify({
        type: 'primary',
        message: '开始阅读',
      })
      this.autoRead()
    } else {
      this.$notify({
        type: 'warning',
        message: '停止阅读'
      })
      this.readLoading = false
      this.autoReader = false
      removeAuthURLKey()
    }
  }
  // 自动阅读
  async autoRead() {
    this.$notify({
      type: 'primary',
      message: '获取文章中...'
    })
    await this.getPageUrl()
  }
  // 跳转下载
  dowloadAutoReaderUrl() {
    // Sentry.captureMessage('redrect_routerdownload',  Sentry.Severity.Info)
    replaceURL(`download?idcode=${this.userBase.idcode}`)
  }
  resetAutoReadFlag() {
    this.autoReader = false
    removeAuthURLKey()
  }
  /**
   * 获取文章链接
   */
  async getPageUrl() {
    this.showDialog = false
    let [error, data] = await this.$fetchGet(
      VUE_APP_HOST + '/gunsApi/nbadApi/info',
      {},
      { codeHandle: { 902: 'skip', 900: 'skip', 904: 'skip' }, retry: false }
    )
    this.autoReader = true
    if (error) {
      this.readLoading = false
      // 902 倒计时
      if ([902,900,904].includes(error.code)) {
        this.errorMessage = error.message
        this.autoReader = false
        this.showDialog = true
        Vue.nextTick(() => {
          let countDown = this.$refs.countDown as Vue
          countDown.reset()
          countDown.start()
        })
      }
      // return false
      // 如果报错了把缓存的信息放到data里
      if(this.temPageUrl){
        data = this.temPageUrl
      }
    } else {
      this.$notify({
        type: 'success',
        message: '获取文章成功'
      })
      // 保证上次的流程走完
      this.temPageUrl = data
    }
    if (this.autoReader) {
      if (data.articleUrl) {
        this.temPageUrl = data
        //检测类型 auth moni
        if (data.type === 'auth') {
          Dialog.alert({
            title: '温馨提示',
            message: '该条阅读为阅读能力检测文章将不产生收益，请知晓',
            confirmButtonText: '我知道了'
            // eslint-disable-next-line space-before-function-paren
          }).then(async () => {
            this.gotoRead(data)
          })
          // 5秒后自动关闭
          setTimeout(() => {
            this.gotoRead(data)
            Dialog.close()
          }, 5000)
        } else {
          this.gotoRead(data)
        }
      } else {
        this.autoReader = false
        this.$notify({
          type: 'danger',
          message: '新文章更新中，稍后再来吧😊'
        })
      }
    }
    this.readLoading = false
  }
  /**
   * 阅读跳转
   */
  async gotoRead(data: any) {
    this.autoReader = true
    data.beforeMonitorUrlPre = this.replaceHost(data.beforeMonitorUrlPre)
    // 先发送 第一个检测
    if (data.beforeMonitorUrlPre){
      await this.$get(data.beforeMonitorUrlPre, 
        { channel: this.$channel, oid: data.oid }
        , { encrypt: true }
      ).then(()=>{
      // 再保存第二个检测
        let monitorData = {
          monitorUrlPre: data.monitorUrlPre,
          oid: data.oid || '',
          type: data.type
        }
        data.monitorUrlPre && setAuthURLKey(JSON.stringify(monitorData))
        window.location.href = data.articleUrl
      }).catch((error:Error)=>{
        console.error(error)
      })
    }
  }
  replaceHost(url: string) {
    if (process.env.NODE_ENV === 'development') {
      url = url.replace(process.env.VUE_APP_HOST_TARGET as string, VUE_APP_HOST as string)
    } else {
      url = url.replace('http://nbchm.filmeco.cn',VUE_APP_HOST as string )
    }
    return url
  }
}
</script>
<style scoped lang="scss">
.content.read {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  padding: 0.15rem;
}
.content.read {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
}
.dialog-content {
  text-align: center;
  padding: 0.5rem;
}
.content.read .info-guide {
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
  font-size: 24px;
  -webkit-box-shadow: 0px 20px 30px -20px #3890fa;
  box-shadow: 0px 20px 30px -20px #3890fa;
  padding: 0 25.6px;
  position: relative;
  .info-title{
    display:flex;
    color:white;
  }
}
  
.content.read .info-guide .guid {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.content.read .info-guide .guid .guid-instance {
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
  position: absolute;
  right: 0px;
}

.content.read .info-guide .guid .guid-instance .circle {
  border-radius: 50%;
  background: #00ffdc;
  height: 18px;
  width: 18px;
}

.content.read .info-guide .reward .white-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 38.4px;
  background: #fff;
  color: #2782ff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  border-radius: 0.48rem;
}

.content.read .info-guide .reward .white-content .line {
  width: 2.9px;
  height: 50%;
  background: rgba(39, 129, 255, 0.527);
}

.content.read .info-guide .info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  margin: 0 2.56px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.content.read .info-guide .info .info-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  color: #fff;
  font-weight: 200;
  font-size: 24px;
}

.content.read .info-guide .info .info-item .unit {
  font-size: 36px;
  font-weight: 400;
}

.content.read .info-guide .info .info-item .num {
  font-weight: bold;
  font-size: 28px;
}

.content.read .info-guide .info .line {
  width: 4px;
  height: 80%;
  background: #35a7ff;
}

.content.read .shadow {
  position: absolute;
  bottom: calc(100% - 8.15rem);
  left: -4%;
  height: 28px;
  width: 108%;
  background-image: url(~@/assets/img/shadow.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 69;
}

.content.read .check-read-ability {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  left: 0;
  bottom: 0;
  background: transparent;
  background: #fff;
  border-radius: 2.56px 2.56px 0 0;
  z-index: 70;
}

.content.read .check-read-ability .check-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  width: 100%;
  border-radius: 2.56px 2.56px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.content.read .check-read-ability .check-content .title {
  font-size: 0.85333rem;
  color: #565656;
  font-weight: 500;
}

.content.read .check-read-ability .check-content .title .desc {
  font-size: 12px;
}

.content.read .check-read-ability .check-content .line {
  width: 14px;
  border-radius: 0.21333rem;
  margin-top: 0.42667rem;
  height: 0.17067rem;
  background: #2a75ff;
}

.content.read .check-read-ability .check-content .read-desc {
  font-size: 28px;
  text-align: center;
  color: #9e9e9e;
}

.content.read .check-read-ability .check-content .read-desc .item {
  margin-top: 8px;
}

.content.read .check-read-ability .check-content .read-desc .item.check .txt:before,
.content.read .check-read-ability .check-content .read-desc .item.read .txt:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  height: 0.6em;
  width: 4em;
  background: #fff7006e;
}

.content.read .check-read-ability .check-content .read-desc .item.back .txt:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0.6em;
  width: 2em;
  background: #fff7006e;
}

.content.read .check-read-ability .check-content .read-desc .item.btm-time .txt:before {
  content: '';
  position: absolute;
  height: 0.6em;
  background: #fff7006e;
  left: 5em;
  bottom: 0;
  width: 2em;
}

.content.read .check-read-ability .check-content .read-desc .item.btm-time .txt:after {
  content: '';
  position: absolute;
  height: 0.6em;
  background: #fff7006e;
  left: 9em;
  bottom: 0;
  width: 4em;
}

.content.read .check-read-ability .check-content .read-desc .item.btm-time-back .txt:before {
  content: '';
  position: absolute;
  height: 0.6em;
  background: #fff7006e;
  left: 5em;
  bottom: 0;
  width: 2em;
}

.content.read .check-read-ability .check-content .read-desc .item.btm-time-back .txt:after {
  content: '';
  position: absolute;
  height: 0.6em;
  background: #fff7006e;
  left: 9em;
  bottom: 0;
  width: 4em;
}

.content.read .check-read-ability .check-content .read-desc .item.btm-time-back .line {
  position: absolute;
  height: 0.6em;
  background: #fff7006e;
  left: 14em;
  bottom: 0;
  width: 2em;
}

.content.read .check-read-ability .check-content .read-desc .item span {
  position: relative;
}

.content.read .check-read-ability .check-content .btn-box .btn {
  font-weight: bold;
  margin-top: 1.06667rem;
  background: #2a75ff;
  color: #fff;
  border-radius: 1.06667rem;
  border: 0;
  -webkit-box-shadow: 0 14px 2.56px -0.42667rem #a4bff1;
  box-shadow: 0 14px 2.56px -0.42667rem #a4bff1;
  outline: 0;
  width: 100%;
  padding: 0 14px;
  font-size: 18px;
  line-height: 2.55555556;
}
.downloadbtn {
  margin-top: 5px;
}
</style>
