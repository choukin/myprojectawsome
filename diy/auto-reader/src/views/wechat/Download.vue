<template>
  <div class="page">
    <div class="center">
      <van-icon
        name="youzan-shield"
        size="8em"
      />
      <div>自动下载阅读助手</div>
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
import { Overlay, Icon } from 'vant'
const { VUE_APP_HOST } = process.env

@Component({
  name: 'Contact',
  components: {
    [Overlay.name]: Overlay,
    [Icon.name]: Icon
  }
})
export default class Contact extends Vue {
  // public apkurl: string = process.env.VUE_APP_APK_URL || '' // 'http://api.molin.work/htmlfile/read.apk'
  get tipsclass() {
    return this.$isAndroid ? 'androidtips' : 'iostips'
  }
  public async mounted() {
    let appInfo = await this.$get(`${VUE_APP_HOST}/gunsApi/readAppApi/getReadAppSource`)    
    if (this.$isAndroid && !this.$isWeChat) {
      window.location.href = appInfo.downloadUrl
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  background-color: #19a1e5;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 56px;
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
