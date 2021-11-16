<template>
  <div class="page">
    <div class="center">
      <van-image
        width="100%"
        :src="require(`@/assets/img/app/${$appPath}.png`)"
      />
      <van-form
        v-if="!!idcode"
        @submit="login"
      >      
        <van-field
          v-model="mobile"
          label="手机号"
          name="mobile"
          :error="mobileError"
          :rules="[{ pattern:mobilePattern, message: '请输入正确手机号' }]"
          placeholder="请输入您的手机号码"
        />
        <van-field
          v-if="showimgsms"
          v-model="imgsms"
          label="图片验证码"
          maxlength="4"
          name="imgsms"
          placeholder="请输入图片验证码"
        >
          <template #button>
            <van-image
              height="0.54rem"
              width="1.5rem"
              type="primary"
              :src="kaptcha"
              @click="refreshKaptcha"
            >
              发送验证码
            </van-image>
          </template>
        </van-field>
        <van-field
          v-model="sms"
          label="短信验证码"
          name="sms"
          maxlength="6"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button 
              v-if="!showCountDown"
              size="small"
              type="primary"
              native-type="button"
              :loading="smsLoading"
              color="#ffd400"
              @click="sendSMS"
            >
              获取短信验证码
            </van-button>
            <van-count-down
              v-show="showCountDown"
              ref="countDown"
              :auto-start="false"
              :time="time"
              format="ss 秒后重新获取"
              @finish="finish"
            />
          </template>
        </van-field>
        <van-field
          name="checkboxGroup"
          :rules="[{ required: true, message: '需要同意协议' }]"
        >
          <template #input>
            <van-checkbox
              v-model="checked"
              shape="square"
            >
              我已阅读并同意
              <router-link :to="{ path: 'protocol', query: { type: '1' }}">
                《服务协议》
              </router-link>
            </van-checkbox>         
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button
            :loading="loginLoading"
            round
            block
            type="info"
            color="#ffd400"
            native-type="submit"
          >
            立即下载
          </van-button>
        </div>        
      </van-form>
      <van-button
        v-else
        round
        block
        type="info"
        color="#ffd400"
        @click="downloadAPK"
      >
        立即下载
      </van-button>
      <!-- <div>自动下载阅读助手</div> -->
      <div v-if="$isIOS">
        暂时不支持 iOS 应用
      </div>
    </div>
    <van-overlay :show="$isWeChat">
      <div :class="tipsclass" />
    </van-overlay>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CountDown,Overlay, Icon,Field,Button,Form,Image as VanImage,Checkbox,Dialog,Toast } from 'vant'
import { UserModule } from '@/store/modules/user'
import * as Sentry from '@sentry/browser'
Toast.setDefaultOptions({ duration: 1500 });
const { VUE_APP_HOST } = process.env
const btn = require('../../assets/img/app/downbtn.png')
@Component({
  name: 'Contact',
  components: {
    [Form.name]:Form,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon,
    [Field.name]:Field,
    [Button.name]:Button,
    [VanImage.name]:VanImage,
    [Checkbox.name]:Checkbox,
    [CountDown.name]:CountDown
  }
})
export default class Download extends Vue {
  mobile: string=''
  mobileError:boolean = false
  loginLoading:boolean = false
  imgsms: string = ''
  sms: string=''
  smsLoading:boolean = false
  showCountDown:boolean = false
  showimgsms:boolean = false
  mobilePattern:RegExp = /1\d{10}/
  checked:boolean = false
  template:string = ''
  downloadUrl :string = ''
  time:number = 60*1000
  sendSMSCount:number = 0
  btnImgUrl:string  =btn 
  downloadFlag:boolean = false // 点击立即下载是否可直接下载
  // public apkurl: string = process.env.VUE_APP_APK_URL || '' // 'http://api.molin.work/htmlfile/read.apk'
  get tipsclass() {
    return this.$isAndroid ? 'androidtips' : 'iostips'
  }
  // 获取图片验证码
  get kaptcha(){
    if(!this.mobile || this.mobile.length !== 11 || !this.mobilePattern.test(this.mobile)) {
      return ''
    }
    return `${VUE_APP_HOST}/gunsApi/readAppApi/kaptcha?phoneNum=${this.mobile}&t=${this.template}`
  }
  get idcode() {
    return this.$route.query.idcode
  }
  
  public async mounted() {
    Sentry.captureMessage('donwloadapk',  Sentry.Severity.Info)
    // Sentry.captureEvent({
    //   event_id:'donwloadapk',
    //   level:Sentry.Severity.Info,
    // })
    // 获取下载app资源地址
    let appInfo = await this.$get(`${VUE_APP_HOST}/gunsApi/readAppApi/getReadAppSource`)    
    if (this.$isAndroid && !this.$isWeChat) {
      this.downloadUrl = appInfo.downloadUrl
      // if(!this.idcode){
      //   window.location.href = this.downloadUrl 
      // }
    }
  }
  public refreshKaptcha() {
    this.template = '' + new Date().getTime()
  }
  /**
   * 发送短信验证码
   */
  public async sendSMS() {
    if(!this.mobile || this.mobile.length !== 11 || !this.mobilePattern.test(this.mobile)) {
      Toast('请输入手机号');
      return false
    }
    this.smsLoading = true
    let [error,smsData] = await this.$fetchGet(`${VUE_APP_HOST}/gunsApi/readAppApi/getH5PhoneCode`,{
      phoneNum:this.mobile,
      imgCode:this.imgsms,
      idcode:this.idcode
    },
    {
      codeHandle:{
        1503:'skip',
        1502:'skip',
        2505:'skip' // 老用户直接下载
      }
    }
    )
    this.smsLoading = false
    if(error){
      
      // 需要输入图形验证码
      if(error.code == '1502'){
        Toast.fail(error.message);
        this.showimgsms= true
      }
      // 需要输入图形验证码
      if(error.code == '2505'){
        Toast.success(error.message);
        this.downloadFlag = true
        this.downloadAPK()
      }
      return false
    } else {
      Toast.success('短信验证码发送成功');
      this.start()
    }
    console.log(smsData)
    
    
    
  }
  start() {
    this.showCountDown = true;
    (this.$refs.countDown as Vue).start()
    
  }
  finish() {
    this.showCountDown = false
  }
  downloadAPK() {
    if (this.$isAndroid && !this.$isWeChat) {
      window.location.href = this.downloadUrl
    }
  }
  bindUserInfo(){
    this.$get(`${VUE_APP_HOST}/gunsApi/appInfoApi/getUserInfo`,{
      idcode:this.idcode
    }).then((res:any)=>{
      Dialog.alert({
        title: `你好${res.wechatUserView.nickname}`,
        message: `你的手机号已绑定成功下载app开始赚钱吧`,
        confirmButtonText: '我知道了'
      }).then(() => {
        this.downloadAPK()
      })
    })
  }
  public login(values:any) {
    console.log(values)
    if(this.downloadFlag) {
      this.downloadAPK()
      return false
    }
    this.loginLoading = true
    this.$get(`${VUE_APP_HOST}/gunsApi/readAppApi/login`,{
      phoneNum:this.mobile,
      imgCode:this.imgsms,
      msgCode: this.sms
    },{
      codeHandle:{1501:'skip'}
    }).then((res: any)=>{
      this.loginLoading = false
      let token = res.token
      let randomKey = res.randomKey
      UserModule.setUserInfo({token,randomKey}) 
      // 绑定用户
      this.bindUserInfo()
    }).catch((e: Error)=>{
      this.loginLoading = false
      Dialog.alert({
        title: '温馨提示',
        message: e.message,
        confirmButtonText: '我知道了'
      })
    })
  }
}
</script>
<style lang="scss" scoped>
 
.page {
  background-color: #fd6677;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: baseline;
  .van-form{
    padding-top:.3rem;
  }
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 56px;
    width:100%;
  }
}
.iostips {
  background: url(~@/assets/img/wechattips/ios.png) center 20px no-repeat;
  width: 100%;
  height: 100vh;
  background-size: 80% auto;
}
.androidtips {
  background: url(~@/assets/img/wechattips/android.png) center 20px no-repeat;
  width: 100%;
  height: 100vh;
  background-size: 80% auto;
}
</style>
