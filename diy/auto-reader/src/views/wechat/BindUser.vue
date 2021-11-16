<template>
  <div class="content withdraw">
    <van-panel
      title="找回原有账户"
      icon="pending-payment"
      desc="老用户请输入您的身份认证码和提现安全码，找回你原有的账户，新用户请忽略！"
    >
      <van-cell-group>
        <van-field
          v-model="idcode"
          maxlength="20"
          :error="idError"
          required
          type="text"
          clearable
          placeholder="请输入认证码"
        />
        <van-field
          v-model="pwd"
          type="password"
          placeholder="请输入安全码"
          required
          clearable
          :error="pwdError"
          maxlength="20"
        />
      </van-cell-group>
      <van-button
        size="large"
        type="primary"
        @click="handlerClick(resetType)"
      >
        找回账户
      </van-button>
    </van-panel>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QRcode from '@/components/QRcode.vue'
import {
  CellGroup,
  Dialog,
  Field,
  Button,
  Panel,

 
} from 'vant'
import 'vant/lib/icon/local.css'
import { UserModule } from '@/store/modules/user'
import WeChat from '@/plugins/wechatMixin'
// eslint-disable-next-line no-unused-vars
import { IUserBase, IUserState } from '@/utils/cookies'
const { VUE_APP_HOST } = process.env
console.log(process.env)

@Component({
  name: 'BindUser',
  components: {
    QRcode,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Panel.name]: Panel
  }
})
export default class Withdraw extends Mixins(WeChat) {
  public idcode: string = ''
  public idError: boolean = false
  public pwd: string = ''
  public pwdError: boolean = false

  public async created() {}
  async handlerClick() {
    this.bindUser()
  }
  // async addWithDrawInfo() {
  //   if (this.disWithdrawAble) {
  //     Dialog.alert({
  //       title: '温馨提示',
  //       message: '余额不足，快去阅读吧！',
  //       confirmButtonText: '去阅读'
  //     }).then(() => {
  //       // 去阅读
  //       this.$router.replace('read')
  //     })

  //     return false
  //   }
  //   const data = await this.$get(`${VUE_APP_HOST}/gunsApi/withdrawApi/withdraw`, {})
  //   Notify({
  //     type: 'primary',
  //     message: '您申请成功，我们将尽快审核处理！',
  //     onClose: () => {
  //       this.$router.replace({ path: '/' })
  //     }
  //   })
  // }
  /**
   * 检查密码
   */
  checkInput() {
    if (!this.idcode) {
      this.idError = true
      return false
    } else {
      this.idError = false
    }
    if (!this.pwd) {
      this.pwdError = true
      return false
    } else {
      this.pwdError = false
    }
    return true
  }
  /**
   * 重置密码
   */
  async bindUser() {
    if (!this.checkInput()) {
      return false
    }
    const userInfo = await this.$post(`${VUE_APP_HOST}/gunsApi/wechatUserApi/bind`, {
      idcode: this.idcode,
      pwd: this.pwd
    })

    // TODO:
    if (userInfo) {
      let userModule: IUserBase = userInfo.wechatUserView
      let userState: IUserState = {
        token: userInfo.token,
        randomKey: userInfo.randomKey,
        autoReader: false,
        userbase: userModule
      }
      UserModule.setUserInfo(userState)
      Dialog.alert({
        title: '温馨提示',
        message: '成功找回',
        confirmButtonText: '去阅读'
      }).then(() => {
        // 去阅读
        this.$router.replace('read')
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

.withdraw.content .top-info .to-detail {
  font-size: 0.42667rem;
  font-weight: 200;
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
