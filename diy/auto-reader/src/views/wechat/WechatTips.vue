<template>
  <div class="center">
    <van-icon
      name="info"
      color="#10AEFF"
      size="208"
    />
    <div class="message-title">
      请在微信移动客户端打开链接
    </div>
  </div>
</template>
<script>
import { Icon } from 'vant'
import { Component, Vue } from 'vue-property-decorator'
import 'vant/lib/icon/local.css'
@Component({
  name: 'WechatTips',
  components: {
    [Icon.name]: Icon
  }
})
export default class Read extends Vue {}
</script>
<style scoped>
.center {
  text-align: center;
  padding-top: 72px;
  padding-bottom: 60px;
}
.message-title {
  margin-top: 60px;
  font-weight: 400;
  font-size: 40px;
  color: #000;
}
</style>
