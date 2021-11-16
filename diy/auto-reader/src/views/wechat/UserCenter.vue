<template>
  <div class="index">
    <div class="mine content">
      <div class="person-info">
        <div class="info-box">
          <div class="name-avatar">
            <img
              :src="userBase.headimgurl"
              class="avatar"
            >
            <div class="name-id">
              <span class="name">{{ userBase.nickname }}</span>
              <!-- <div style="display: flex;align-items: center;justify-content: center">
                <span class="id">ID:g6omBR</span>
                <div class="copy"><span class="user_token" data-clipboard-text="g6omBR">点击可复制</span></div>
              </div> -->
            </div>
          </div>
          <!-- <a class="invite" href="/h5_v2/read_tasks/invite">
            <span>邀请好友</span>
          </a> -->

          <div class="control-box">
            <!-- <span class="tip-invite">邀请好友奖励30%</span> -->
            <div class="balance-withdraw">
              <div class="balance">
                <span>账户余额</span>
                <div>
                  <span class="unit">￥</span>
                  <span class="count">{{ withdrawInfo.allowWithdraw }}</span>
                </div>
              </div>
              <router-link
                to="withdraw"
                class="withdraw"
              >
                <span>提现</span>
              </router-link>
            </div>
            <div class="another-info">
              <router-link
                class="to-detail"
                to="friends"
              >
                <span>我的好友</span><van-icon name="arrow" />
              </router-link>
              <!-- <a class="another-info-item first" href="/h5_v2/read_tasks/income_list">
                <span>累积收益</span
                ><image
                  src="http://read.chengduhongmuchaoshi.com/assets/h5_v2/arrow-right-344176e48aceb404e4d775dfeaa97f52ee5d70afb8944e811e7d252af034c80a.png"
                  class="arrow"
                />
                <div class="unit-balance">
                  <span class="unit">￥</span>
                  <span class="count">1.621</span>
                </div>
              </a>
              <div class="another-info-item">
                <span>好友贡献</span>
                <div class="unit-balance">
                  <span class="unit">￥</span>
                  <span class="count">0.057</span>
                </div>
              </div>
              <a class="another-info-item last" href="/h5_v2/read_tasks/friend_list">
                <span>我的好友</span
                ><image
                  src="http://read.chengduhongmuchaoshi.com/assets/h5_v2/arrow-right-344176e48aceb404e4d775dfeaa97f52ee5d70afb8944e811e7d252af034c80a.png"
                  class="arrow"
                />
                <div class="unit-balance">
                  <span class="unit"></span>
                  <span class="count">1</span>
                </div>
              </a> -->
            </div>
          </div>
        </div>
      </div>

      <div class="mine-control">
        <!-- <a class="mission-item" href="/h5_v2/read_tasks/app_records">
          <image
            src="http://read.chengduhongmuchaoshi.com/assets/h5_v2/mission-recoder-e6791c0cf13447ff6dba748abe0d525d9fc485b083432d8041d41929fbc55e4f.png"
            class="trademark"
          />
          <div class="reward-info">
            <div class="info">
              <span class="brand-name" style="color: #565656">
                任务完成记录
              </span>
              <span style="margin-top: 2px">已完成</span>
            </div>
            <image
              src="http://read.chengduhongmuchaoshi.com/assets/h5_v2/arrow-right-bigger-8be5609657a02ae3d951e49b54a751a64ca1297128d731fdac5167d106da7ac9.png"
              style="height: 15px; width: 15px"
            />
          </div>
        </a> -->

        <!-- <a class="mission-item" href="/h5_v2/read_tasks/kefu">
          <image
            src="http://read.chengduhongmuchaoshi.com/assets/h5_v2/my-assistant-f32aabeb622dcf5b60277573252b1ca2c6e8d3bec629d87abe60b3b5eb309f5f.png"
            class="trademark"
          />
          <div class="reward-info">
            <div class="info">
              <span class="brand-name" style="color: #565656">
                我的小助手
              </span>
              <span style="margin-top: 2px">点关注，不迷路</span>
            </div>
            <image
              src="http://read.chengduhongmuchaoshi.com/assets/h5_v2/arrow-right-bigger-8be5609657a02ae3d951e49b54a751a64ca1297128d731fdac5167d106da7ac9.png"
              style="height: 15px; width: 15px"
            />
          </div>
        </a> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import {  Icon, Button, Cell, Collapse, CollapseItem, List, Tag } from 'vant'
const { VUE_APP_HOST } = process.env
import WeChat from '@/plugins/wechatMixin'
@Component({
  name: 'UserCenter',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [List.name]: List,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  }
})
export default class UserCenter extends Mixins(WeChat) {
  public withdrawInfo: any = {
    allowWithdraw:0,// 可提现收益
    earningsAmount: 0, // 阅读收益
    endEarningsAmount: 0,
    minAmount: 0, // 最小提现金额
    sumPrentice: 0, // 邀请金额
    sumAmount: 0 // 总收益
  }
  public async created() {
    let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 
    //  验证签名
    this.installWXbridge(inviteUrl)
    const data = await this.$get(`${VUE_APP_HOST}/gunsApi/withdrawApi/withdrawInfo`)
    this.withdrawInfo = data
  }
  public async featchWithDrawInfo() {}
}
</script>
<style lang="scss" scoped>
.mine.content {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.mine.content .person-info {
  width: 100%;
  height: 4.5rem;
  background: -webkit-gradient(linear, left top, right bottom, from(#2782ff), to(#50b3ff));
  background: -o-linear-gradient(left top, #2782ff, #50b3ff);
  background: linear-gradient(to right bottom, #2782ff, #50b3ff);
  position: relative;
}

.mine.content .person-info .info-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.4rem 0.3rem 0;
}

.mine.content .person-info .info-box .name-avatar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.mine.content .person-info .info-box .name-avatar .avatar {
  height: 0.88rem;
  width: 0.88rem;
  border-radius: 50%;
  border: 0.02rem solid #fff;
}

.mine.content .person-info .info-box .name-id {
  margin-left: 0.2rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.1rem 0;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 0.2rem;
  color: #fff;
}

.mine.content .person-info .info-box .name-id .name {
  font-size: 0.4rem;
}

.mine.content .person-info .info-box .name-id .copy {
  height: 16px;
  width: 80px;
  text-align: center;
  line-height: 16px;
  color: #000000;
  font-size: 12px;
  margin-left: 0.32rem;
  background-image: url(/assets/h5_v2/irregular-685948dae7bdd9d9ff5b5e30859877fe6cb67b7c088871f9f6daca320f9b0b5a.png);
  background-size: 100% 100%;
}

.mine.content .person-info .info-box .invite {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 0.59733rem;
  font-weight: bold;
  height: 0.55467rem;
  line-height: 0.55467rem;
  width: 3.41333rem;
  color: #fff;
  padding: 0.42667rem;
  -webkit-box-shadow: 0 0.21333rem 0.21333rem #2c8bff;
  box-shadow: 0 0.21333rem 0.21333rem #2c8bff;
  background: -webkit-gradient(linear, left top, right bottom, from(#ff9d00), to(#ffab26));
  background: -o-linear-gradient(left top, #ff9d00, #ffab26);
  background: linear-gradient(to right bottom, #ff9d00, #ffab26);
  border-radius: 0.64rem;
}

.mine.content .person-info .info-box .control-box {
  position: absolute;
  left: 50%;
  top: 75%;
  border-radius: 0.2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 90%;
  background: #fff;
  -webkit-box-shadow: 0 0.21333rem 0.82667rem -0.21333rem #c4c4c4;
  box-shadow: 0 0.21333rem 0.82667rem -0.21333rem #c4c4c4;
  -webkit-transform: translate(-50%, -45%);
  -ms-transform: translate(-50%, -45%);
  transform: translate(-50%, -45%);
  padding: 0.3rem 0.3rem 0.3rem;
}

.mine.content .person-info .info-box .control-box .tip-invite {
  position: absolute;
  right: 0;
  top: -0.85333rem;
  font-weight: 300;
  font-size: 0.42667rem;
  color: #fff;
}

.mine.content .person-info .info-box .control-box .balance-withdraw {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-line-pack: center;
  align-content: center;
  padding-bottom: 0.64rem;
  border-bottom: 1px solid #e4e4e4;
}

.mine.content .person-info .info-box .control-box .balance-withdraw .balance {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 0.28rem;
  color: #777777;
}

.mine.content .person-info .info-box .control-box .balance-withdraw .balance .count {
  font-size: 0.28rem;
  font-weight: 600;
  color: #2e2e2e;
}

.mine.content .person-info .info-box .control-box .balance-withdraw .balance .unit {
  color: #2e2e2e;
}

.mine.content .person-info .info-box .control-box .balance-withdraw .withdraw {
  font-size: 0.24rem;
  border-radius: 0.6rem;
  text-align: center;
  padding: 0.2rem 0.88rem;
  color: #fff;
  background: -webkit-gradient(linear, left top, right bottom, from(#50b3ff), to(#2782ff));
  background: -o-linear-gradient(top left, #50b3ff, #2782ff);
  background: linear-gradient(to bottom right, #50b3ff, #2782ff);
  margin-top: 0.21333rem;
}

.mine.content .person-info .info-box .control-box .another-info {
  width: 100%;
  margin-top: 0.42667rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.mine.content .person-info .info-box .control-box .another-info .another-info-item {
  font-size: 0.2rem;
  color: #777777;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 33%;
  padding-left: 0.64rem;
  border-right: 1px solid #e4e4e4;
}

.mine.content .person-info .info-box .control-box .another-info .another-info-item .arrow {
  height: 0.32rem;
  width: 0.32rem;
}

.mine.content .person-info .info-box .control-box .another-info .another-info-item.first {
  padding-left: 0;
}

.mine.content .person-info .info-box .control-box .another-info .another-info-item.last {
  border-right: 0;
}

.mine.content .person-info .info-box .control-box .another-info .another-info-item .count {
  font-size: 0.22rem;
  font-weight: 600;
  color: #2e2e2e;
}

.mine.content .person-info .info-box .control-box .another-info .another-info-item .unit {
  color: #2e2e2e;
}

.mine.content .mine-control {
  margin-top: 4.26667rem;
  padding: 0 5%;
}

.mine.content .mine-control .mission-item {
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.mine.content .mine-control .mission-item .trademark {
  height: 2rem;
  width: 2rem;
}
</style>
