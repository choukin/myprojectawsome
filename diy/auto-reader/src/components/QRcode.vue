<template>
  <div class="top-radius-box">
    <div class="title">
      <span>{{ desc }}</span>
      <div class="line" />
    </div>
    <div class="child-box">
      <div class="qr-box">
        <div class="qr-code">
          <img
            :src="qrcodeurl"
            class="qr-code-img"
          >
        </div>
      </div>
    </div>
    <!-- <div class="btn-group">
      <button class="btn">
        {{ btntext }}
      </button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'qrcode'
})
export default class extends Vue {
  @Prop({ default: 'http://file.molin.work/staging/upload/static/wechatpublic.jpeg' }) readonly qrcodeurl!: string
  @Prop({ default: '长按识别二维码联系qq客服' }) readonly desc!: string
  @Prop({ default: '长按二维码关注' }) readonly btntext!: string
  public created() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index.assistant .desc {
  margin-top: 40px;
  padding: 0 80px;
}
.index.assistant .desc .title {
  font-size: 26px;
  color: #565656;
  margin-bottom: 26px;
}
.index.assistant .desc .desc-content {
  color: #888888;
  font-size: 24px;
  line-height: 88px;
  margin-top: 8px;
}
.top-radius-box {
  background: #fff;
  padding-bottom: 60px;
  padding-top: 0.3rem;
  border-radius: 0 0 26px 26px;
  -webkit-box-shadow: 0px 18px 26px #d3d3d3;
  box-shadow: 0px 18px 26px #d3d3d3;
  .qr-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 18px;
  }
  .qr-box .qr-code {
    border: 1px solid #d3d3d3;
    width: 320px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px;
    height: auto;
    border-radius: 34px;
  }
  .qr-box .qr-code .qr-code-img {
    height: auto;
    width: 100%;
    border: 1px dashed #d3d3d3;
  }
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
