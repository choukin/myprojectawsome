<template>
  <div class="content withdraw">
    <van-panel
      title="提现到微信零钱"
      icon="pending-payment"
      :desc="'满' + withdrawInfo.minAmount + '元即可提现'"
    >
      <div class="top-info">
        <div class="account-balance">
          <span>可提现余额</span>
          <div class="balance">
            <span class="unit">￥</span>
            <span
              id="current_point_display"
              class="balance"
            >{{ withdrawInfo.allowWithdraw }}</span>
          </div>
        </div>

        <div
          class="to-detail"
          @click="openPage"
        >
          <span>提现记录</span><van-icon name="arrow" />
        </div>
      </div>
    </van-panel>      
    <van-cell-group v-if="userBase.resettype === 0">
      <van-field
        v-model="pwd"
        maxlength="20"
        :error="pwdError"
        required
        type="text"
        clearable
        placeholder="请输入安全码"
      />
      <van-field
        v-model="newPwd"
        type="text"
        placeholder="请输入确认安全码"
        required
        clearable
        :error="newPwdError"
        :error-message="errorMessage"
        maxlength="20"
      />
    </van-cell-group>
    <div
      v-else
      slot="footer"
      class="ta-right"
    >
      <van-radio-group v-model="fixedAmount">
        <van-grid
          :gutter="30"
          :column-num="3"
          class="vanradio"
        >
          <van-grid-item
            v-for="(item,index) in withDrawArray"
            :key="index"
          >
            <van-radio
              :name="item"
              :disabled="Number(item) > withdrawInfo.allowWithdraw"
            >
              {{ item }}元
            </van-radio>
          </van-grid-item>
        </van-grid>  
      </van-radio-group>
    </div>
    <van-button
      size="large"
      type="primary"
      @click="handlerClick(userBase.resetType)"
    >
      {{
        withdrawDesc
      }}
    </van-button>      
 
    <!-- <van-cell title="查看提现记录" is-link to="recording" /> -->
    <QRcode
      v-if="$channelCode=='YD'"
      qrcodeurl="http://file.molin.work/staging/upload/static/WechatIMG2757.jpeg"
    />
    <QRcode
      v-if="$channelCode=='YD'"
      qrcodeurl="http://file.molin.work/staging/upload/static/WechatIMG2757.jpeg"
      desc="长按识别二维码联系客服"
    />    
    <div
      v-if="!$isApp"
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
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QRcode from '@/components/QRcode.vue'
import {gotoHome, setTitle,pushWindowByRouter} from '@/utils/app'
import {
  CellGroup,
  Cell,
  Dialog,
  Field,
  Button,
  Panel,
  Icon,
  Notify,
  Grid, GridItem,
  RadioGroup, Radio,
  Toast 
} from 'vant'
import 'vant/lib/icon/local.css'
import WeChat from '@/plugins/wechatMixin'
import { UserModule } from '@/store/modules/user'
const { VUE_APP_HOST } = process.env
console.log(process.env)

@Component({
  name: 'Withdraw',
  components: {
    QRcode,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Grid.name]: Grid,
    [GridItem.name]:GridItem,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio
  }
})
export default class Withdraw extends Mixins(WeChat) {
  public pwd: string = ''
  public pwdError: boolean = false
  public newPwd: string = ''
  public newPwdError: boolean = false
  public errorMessage: string = ''
  // 选择的收益
  public fixedAmount:string = ''
  public withDrawArray: Array<string>= [
    '1',
    '5',
    '10',
    '20',
    '30',
    '50',
    '100',
    '300',
    '500'
    ] 
  public withdrawInfo: any = {
    allowWithdraw:0, // 可提现余额
    earningsAmount: 0, // 阅读收益
    endEarningsAmount: 0,
    minAmount: 0, // 最小提现金额
    sumPrentice: 0, // 邀请金额
    sumAmount: 0 // 总收益
  }
  get disWithdrawAble() {
    // 不可提现标示
    if (!this.withdrawInfo.allowWithdraw && !this.withdrawInfo.minAmount) {
      return true
    }
    return +this.withdrawInfo.allowWithdraw < +this.withdrawInfo.minAmount
  }
  get withdrawDesc() {
    // web 环境交验安全码
    if (this.userBase.resettype === 0 && !this.$isApp) {
      return '设置安全码后提现'
    }
    if (!this.withdrawInfo.allowWithdraw && !this.withdrawInfo.minAmount) {
      return '余额不足，快去阅读吧！'
    }
    return +this.withdrawInfo.allowWithdraw > +this.withdrawInfo.minAmount ? '立即提现' : '余额不足，快去阅读吧！'
  }
  public async created() {
    let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 
    //  验证签名
    this.installWXbridge(inviteUrl)
    // 有idcode 并且是在app中才去取token
    let idcode = this.$route.query.idcode
    if(this.$isApp && idcode) {
      const userInfo =  await this.$get(`${VUE_APP_HOST}/gunsApi/appInfoApi/getUserInfo`,{idcode})
      UserModule.setUserToken(userInfo.token)
    }
    let tokenflag = this.$isApp
    const data = await this.$get(`${VUE_APP_HOST}/gunsApi/withdrawApi/withdrawInfo`,{},{tokenflag})
    this.withdrawInfo = data
    if(this.$isApp) {
      setTitle('余额提现')
      this.userBase.resettype = 1
    }
    // 初始化页面信息
    if (this.userBase.resettype === 0) {
      Dialog.alert({
        title: '重要提示',
        message:
          '尊敬的用户您好，为保障用户的资金安全，在每个用户第一次提现时，需设置您的提现安全码，密码由数字和字母组成，不区分大小写。您设置的提现安全码和您用户名后缀的识别码将成为您账户的安全保障，请务必牢记，为防丢失或遗忘，我们建议您截图保存，谢谢您的配合！',
        confirmButtonText: '我知道了'
      })
    }
  }

  openPage() {
    let path = this.$isApp?'apprecording':'recording'
    pushWindowByRouter(path)
  }

  async handlerClick() {
    if (this.userBase.resettype === 0) {
      this.resetPwd()
    } else {
      this.addWithDrawInfo()
    }
  }
  async addWithDrawInfo() {
    if (this.disWithdrawAble) {
      Dialog.alert({
        title: '重要提示',
        message: '余额不足，快去阅读吧！',
        confirmButtonText: '去阅读'
      }).then(() => {
        // 去阅读
        if(this.$isApp) {
          gotoHome()
        } else{
          this.$router.replace('read')
        }
      })

      return false
    }
    if(!this.fixedAmount){
      Toast.fail('请选择提现金额');
      return false
    }
    let tokenflag = this.$isApp
    const [error] = await this.$fetchGet(`${VUE_APP_HOST}/gunsApi/withdrawApi/withdrawFixedAmount`, {fixedAmount:this.fixedAmount},{
      tokenflag,
      codeHandle:'skip'})
    if(error) {
      Toast.fail(error.message);
    } else {
      Notify({
        type: 'primary',
        message: '您的提现申请提交成功，我们将尽快审核处理！',
        onClose: () => {
          // 去阅读
          if(this.$isApp) {
            gotoHome()
          } else{
            this.$replaceURL('')
            // this.$router.replace({ path: '/' })
          }
          
        }
      })
    }
  }
  /**
   * 检查密码
   */
  checkPwd() {
    if (!this.pwd) {
      this.pwdError = true
      return false
    } else {
      if (this.pwd.length < 6) {
        this.errorMessage = '安全码长度不能小于6位'
        return false
      }
      this.pwdError = false
    }
    if (!this.newPwd) {
      this.newPwdError = true
      return false
    } else {
      this.newPwdError = false
    }
    if (this.pwd !== this.newPwd) {
      this.errorMessage = '两次安全码输入不一致'
      return false
    } else {
      this.errorMessage = ''
    }
    return true
  }
  /**
   * 重置密码
   */
  async resetPwd() {
    if (!this.checkPwd()) {
      return false
    }
    const data = await this.$post(`${VUE_APP_HOST}/gunsApi/wechatUserApi/resetPwd`, {
      idcode: this.userBase.idcode,
      newPwd: this.newPwd,
      pwd: this.pwd
    })
    // TODO:
    if (data) {
      Dialog.alert({
        title: '重要提示',
        message: `认证码：<span style="color:#ff976a">${this.userBase.idcode}</span><br/>安全码：<span style="color:#ff976a">${this.pwd}</span><br/>第一次提现,请先设置您的提现安全码，由数字和字母组成，此安全码和身份认证码将成为您账户的安全保障，平台迁移后需重新输入，一旦丢失，不可找回，强烈建议您截图保存，谢谢配合！`,
        confirmButtonText: '我知道了'
      }).then(() => {
        window.history.go(-1)
      })
    }
  }
}
</script>
<style>
.withdraw .van-panel__footer{
  padding-left: 0;
  padding-right: 0;
}
.vanradio{
  margin-bottom:30px;
}

.vanradio .van-grid-item__content--center{
    box-shadow: -4px 11px 21px 6px rgba(0, 0, 0, 0.16);
    border-radius: 2px;
}
</style>
<style scoped lang="scss">
.withdraw{
  .van-panel{
    background:transparent;
  }
}
.van-cell-group {
  padding-bottom: 0.6rem;
}
.withdraw.content {
  padding: 0.25rem 0.25rem 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.withdraw.content .top-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.4rem;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 0.08rem;
  color: #fff;
  background: -webkit-gradient(linear, left top, right bottom, from(#2782ff), to(#50b3ff));
  background: -o-linear-gradient(top left, #2782ff, #50b3ff);
  background: linear-gradient(to Bottom Right, #2782ff, #50b3ff);
  -webkit-box-shadow: 0 0.32rem 0.36rem -0.08rem #3287ff6e;
  box-shadow: 0 0.32rem 0.36rem -0.08rem #3287ff6e;
}

.withdraw.content .top-info .account-balance {
  font-size: 0.26rem;
  font-weight: 200;
}

.withdraw.content .top-info .account-balance .balance {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.withdraw.content .top-info .account-balance .balance .unit {
  font-size: 0.26rem;
  font-weight: 400;
  margin-right: 0.2rem;
}

.withdraw.content .top-info .account-balance .balance .balance {
  font-weight: 500;
  font-size: 0.4rem;
}

.withdraw.content .top-info a.to-detail {
  font-size: 0.3rem;
  display: flex;
  align-items: center;
}
a.to-detail:visited {
  color: #fff;
}
.van-icon-alipay {
  color: #19a1e5;
  font-size: 48px;
}
.message-title {
  margin-top: 30px;
  font-weight: 400;
  font-size: 20px;
  color: #000;
}
.top-radius-box {
  padding-top: 0.6rem;
  background: #fff;
  padding-bottom: 60px;
  border-radius: 0 0 26px 26px;
  -webkit-box-shadow: 0px 18px 26px #d3d3d3;
  box-shadow: 0px 18px 26px #d3d3d3;
}
.qr-code {
  text-align: center;
}
.top-radius-box .title {
  margin-top: 40;
  position: relative;
  text-align: center;
  color: #2e2e2e;
  font-size: 34px;
  overflow: visible;
}

.top-radius-box .title .line {
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%);
  -ms-transform: translate(-50%);
  transform: translate(-50%);
  bottom: -17px;
  height: 6.8px;
  width: 0.85333rem;
  background: #2782ff;
  border-radius: 6.8px;
}

.top-radius-box .child-box {
  margin-top: 40px;
  overflow: hidden;
}

.top-radius-box .btn-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 40px;
}

.top-radius-box .btn-group .btn {
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 24px;
  height: 80px;
  line-height: 40px;
  width: 80%;
  text-align: center;
  background: #2782ff;
  border-radius: 48px;
  color: #fff;
  outline: 0;
}
</style>
