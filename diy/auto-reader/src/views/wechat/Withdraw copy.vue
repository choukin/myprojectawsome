<template>
  <div class="content withdraw">
    <van-panel
      title="提现到微信零钱"
      icon="pending-payment"
      :desc="'满' + withdrawInfo.minAmount + '元即可提现'"
    >
      <div class="top-info">
        <div class="account-balance">
          <span>账户余额</span>
          <div class="balance">
            <span class="unit">￥</span>
            <span
              id="current_point_display"
              class="balance"
            >{{ withdrawInfo.sumAmount }}</span>
            <!-- <input type="hidden" id="current_point" value="20" /> -->
          </div>
        </div>

        <router-link
          class="to-detail"
          to="recording"
        >
          <span>提现记录</span><van-icon name="arrow" />
        </router-link>
      </div>
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
        slot="footer"
        class="ta-right"
      >
        <van-button
          size="large"
          type="primary"
          @click="handlerClick(userBase.resetType)"
        >
          {{
            withdrawDesc
          }}
        </van-button>
      </div>
    </van-panel>
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
import {
  CellGroup,
  Cell,
  Dialog,
  Field,
  Button,
  Panel,
  Icon,
  Notify
} from 'vant'
import 'vant/lib/icon/local.css'
import WeChat from '@/plugins/wechatMixin'

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
    [Panel.name]: Panel
  }
})
export default class Withdraw extends Mixins(WeChat) {
  public pwd: string = ''
  public pwdError: boolean = false
  public newPwd: string = ''
  public newPwdError: boolean = false
  public errorMessage: string = ''
  public withdrawInfo: any = {
    earningsAmount: 0, // 阅读收益
    endEarningsAmount: 0,
    minAmount: 0, // 最小提现金额
    sumPrentice: 0, // 邀请金额
    sumAmount: 0 // 总收益
  }
  get disWithdrawAble() {
    // 不可提现标示
    if (!this.withdrawInfo.sumAmount && !this.withdrawInfo.minAmount) {
      return true
    }
    return +this.withdrawInfo.sumAmount < +this.withdrawInfo.minAmount
  }
  get withdrawDesc() {
    if (this.userBase.resettype === 0) {
      return '设置安全码后提现'
    }
    if (!this.withdrawInfo.sumAmount && !this.withdrawInfo.minAmount) {
      return '余额不足，快去阅读吧！'
    }
    return +this.withdrawInfo.sumAmount > +this.withdrawInfo.minAmount ? '立即提现' : '余额不足，快去阅读吧！'
  }
  // // 获取code
  // get sumAmount() {
  //   return this.$route.query.sumAmount
  // }
  // // 获取parentId
  // get minAmount() {
  //   return this.$route.query.minAmount
  // }
  public async created() {
    let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 
    // let inviteUrl = `${process.env.VUE_APP_SHARE_URL}?parentId=${this.userBase.id}`
    //  验证签名
    this.installWXbridge(inviteUrl)
    const data = await this.$get(`${VUE_APP_HOST}/gunsApi/withdrawApi/withdrawInfo`)
    this.withdrawInfo = data
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
        this.$router.replace('read')
      })

      return false
    }
    await this.$get(`${VUE_APP_HOST}/gunsApi/withdrawApi/withdraw`, {})
    Notify({
      type: 'primary',
      message: '您申请成功，我们将尽快审核处理！',
      onClose: () => {
        this.$router.replace({ path: '/' })
      }
    })
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
        this.addWithDrawInfo()
      })
    }
  }
}
</script>
<style scoped lang="scss">
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
