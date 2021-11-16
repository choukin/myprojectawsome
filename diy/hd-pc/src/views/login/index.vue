<template>
  <div class="login-container">
    <Navbar />
    <div class="login-panel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12"><img class="panel-image" src="@/assets/common/fzkpjbfu.png" alt=""></el-col>
        <el-col :span="12" class="textright">
          <div class="panel-right">
            <img
              src="@/assets/common/logo.png"
            >
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="mobile">
                <el-input
                  ref="username"
                  v-model="loginForm.mobile"
                  placeholder="请输入手机号"
                  name="mobile"
                  type="tel"
                  tabindex="1"
                  autocomplete="on"
                  maxlength="11"
                  clearable
                />
              </el-form-item>
              <el-row type="flex" justify="space-around">
                <el-col :span="12">
                  <el-form-item
                    prop="code"
                  >
                    <el-input v-model="loginForm.code" placeholder="请输入短信验证码" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button
                    round
                    class="vcode"
                    :disabled="state.smsSendBtn"
                    @click.stop.prevent="getCaptcha"
                    v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
                  >获取验证码</el-button>
                </el-col>

              </el-row>
              <el-button type="primary" :loading="loading" round style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
            </el-form>

          </div>
        </el-col>
      </el-row>

    </div>
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
      </div>
    </el-form> -->

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
// import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import { getMobileCode } from '@/api/user'
export default {
  name: 'Login',
  components: { Navbar, SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [{ required: true, pattern: /^1[3456789]\d{9}$/, trigger: 'input', message: '请输入正确的手机号' }],
        code: [{ required: true, trigger: 'blur', message: '请输入正确的短信验证码' }]
      },
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getCaptcha(e) {
      e.preventDefault()
      const mobile = this.loginForm.mobile
      const state = this.state
      // const { mobile, state } = this
      this.$refs.loginForm.validateField('mobile', (err) => {
        if (!err) {
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
          const hide = this.$message('验证码发送中..', 0)
          getMobileCode({ mobile }).then(res => {
            hide.close()
            // setTimeout(hide, 2500)
            this.$notify({
              title: '提示',
              message: '验证码获取成功',
              duration: 2000,
              type: 'success'
            })
          }).catch(err => {
            if (err) {
              console.log(err.stack)
            }
            window.clearInterval(interval)
            hide.close()
            state.time = 60
            state.smsSendBtn = false
          })
        }
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$white:#FFFFFF;
$light_gray:#D4D4D4;
$cursor: #333333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form{
    padding-top:50px;
    min-width: 280px;
  }
  .el-input {
    display: inline-block;
    height: 47px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #333333;
      height: 47px;
      caret-color: $cursor;
      border-radius: 25px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #333333 !important;
      }
    }
  }
.el-button--medium.is-round {
  height:50px;
  border-radius: 25px;
}
.vcode{
  font-size:16px;
  font-family:Source Han Sans CN;
  font-weight:400;
  line-height:27px;
  min-width: 122px;
  color:rgba(37,167,251,1);
  background-color: #E9F6FF;
    border: 1px solid #BEE5FE;
}
.textright{
  text-align: right;
}
  .el-form-item {
    border: 1px solid $light_gray;
    background: $white;
    border-radius: 25px;
    color: #333333;
  }
}
</style>

<style lang="scss" scoped>
$bg:#EAEFF5;
$white:#FFFFFF;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-panel{
    padding-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .row-bg{
      background: $white;
      padding:33px 0 33px 40px;
      border:1px solid rgba(242,242,242,1);
      box-shadow:0px 3px 6px rgba(0,0,0,0.16);
      border-radius:4px
    }
    .panel-image{
      width:100%;
      height:auto;
    }
    .panel-right{
      display: flex;
      flex-direction: column;
       align-items: center;
       img{
         height:auto;
         max-width:172px;
       }
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
