<template>
  <div class="content withdraw">
    <van-panel>
      <div class="top-info">
        <div class="account-balance">
          <span>我的积分</span>
          <div class="balance">
            <span
              class="balance"
            >{{ userSignInfo.point }}</span>
          </div>
        </div>
        <div>
          <van-button
            size="small"
            type="info"
            color="#FFB800"
            loading-text="兑换中..."
            :loading="redeemBtnLoading"
            @click="redeem"
          >
            &nbsp;&nbsp;兑换&nbsp;&nbsp;
          </van-button>
          <van-button
            class="rule-btn"
            icon="info-o"
            type="default"
            plain
            size="mini"
            @click="pushWindow('protocol',{type:6})"
          >
            规则
          </van-button>
        </div>
      </div>
      <!-- 两端对齐 -->
      <van-row
        type="flex"
        justify="space-between"
        style="padding-top:30px;"
      >
        <van-col
          class="main-title"
        >
          选择兑现金额
        </van-col>
        <van-col class="sub-title">
          提现到微信零钱
        </van-col>
      </van-row>
      <div
        slot="footer"
        class="ta-right"
      >
        <!-- <label
          for=""
          class="point-panel"
        >
          <input
            v-model="fixedAmount"
            type="checkbox"
          >
        </label> -->
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
                :disabled="Number(item* redeemRate) > userSignInfo.point"
              >
                {{ item }}元
                售价{{ item* redeemRate }}积分
              </van-radio>
            </van-grid-item>
          </van-grid>  
        </van-radio-group>            
      </div>
    </van-panel> 
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QRcode from '@/components/QRcode.vue'
import {pushWindowByRouter,gotoHome} from '@/utils/app'
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
  Toast ,
  Col, 
  Row 
} from 'vant'
import 'vant/lib/icon/local.css'
import WeChat from '@/plugins/wechatMixin'
import { UserModule } from '@/store/modules/user'
const { VUE_APP_HOST } = process.env
console.log(process.env)

@Component({
  name: 'exchange',
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
    [Radio.name]:Radio,
    [Col.name]:Col, 
    [Row.name]:Row 
  }
})
export default class Exchange extends Mixins(WeChat) {
  public pwd: string = ''
  public pwdError: boolean = false
  public newPwd: string = ''
  public newPwdError: boolean = false
  public errorMessage: string = ''
  // 选择的收益
  public fixedAmount:string = ''
  public userSignInfo:any ={
    point:0,
    todayStatus:0
  }
  public redeemBtnLoading:boolean = false
  // 查询汇率
  public redeemRate:number = 15000
  public withDrawArray: Array<any>= [
    1,
    2,
    5,
    10,
    20,
    50] 
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
  
  public async created() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    await this.fetchUserSign()
    Toast.clear()
    // 有idcode 并且是在app中才去取token
    let idcode = this.$route.query.idcode
    if(this.$isApp && idcode) {
      const userInfo =  await this.$get(`${VUE_APP_HOST}/gunsApi/appInfoApi/getUserInfo`,
        {idcode},
        {tokenflag: this.$isApp}) // app环境用web的tokan
      UserModule.setUserToken(userInfo.token)
    }
  }
  /**
   * 查询汇率
   */
  async fetchRedeemrule(){
    const data = await this.$post(VUE_APP_HOST + '/gunsApi/userSignApi/redeemrule'
      ,{}
      ,{codeHandle:'skip'})
    this.redeemRate = data.redeemRate
  }
 
  pushWindow(url:string,query:any) {
    pushWindowByRouter(url, query)
  }

  /**
   * 获取用户签到信息
   */
  async fetchUserSign() {
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/userSignApi/info'
      ,{}
      ,{
        codeHandle:'skip',
        tokenflag: this.$isApp
      })
    this.userSignInfo = data 
  }
  /**
  * 兑换积分
  */
  async redeem() {
    if (this.redeemRate > this.userSignInfo.point) {
      let message = this.userSignInfo.todayStatus === 1 ?'今日已签到去做收益吧':'快去签到领积分吧！'
      Dialog.alert({
        title: '温馨提示',
        message: '积分不足，'+message,
        confirmButtonText: '去看看'
      }).then(() => {
        if(this.userSignInfo.todayStatus) {
          // 去阅读
          if(this.$isApp) {
            gotoHome()
          } else{
            this.$replaceURL('')
          }
        } else {
          // 去签到
          pushWindowByRouter('attendance')
        }
      })
      return false
    }
    if(!this.fixedAmount){
      Toast.fail('请选择兑换金额');
      return false
    }
    let tokenflag = this.$isApp
    this.redeemBtnLoading = true
    const [error] = await this.$fetchGet(`${VUE_APP_HOST}/gunsApi/userSignApi/redeem`, {money:this.fixedAmount},{
      tokenflag,
      codeHandle:'skip'})
    this.redeemBtnLoading = false
    if(error) {
      Toast.fail(error.message);
    } else {
      Notify({
        type: 'primary',
        message: '您的提现申请提交成功，我们将尽快审核处理！',
        onClose: () => {
          this.$router.replace({ path: '/' })
        }
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
.point-panel{
  padding:44px 0 30px 0;
  display: flex;
  justify-content: center;
}
.main-title{
  font-size:30px;
  font-weight:bold;
  color:rgba(53,53,53,1);
  padding-left: 5px;
}
.sub-title{
  font-size:24px;
  font-weight:400;
  color:rgba(183,183,183,1);
  padding-right:5px;
}
.van-cell-group {
  padding-bottom: 0.6rem;
}
.rule-btn{
  position:absolute;bottom:15px;right:35px;border:none;background-color: transparent;color:white;
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
  position: relative;
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
  background: -webkit-gradient(linear, left top, right bottom, from(#FF0000), to(#ff50a2));
  background: -o-linear-gradient(top left, #FF0000, #ff50a2);
  background: linear-gradient(to Bottom Right, #FF0000, #ff50a2);
  // -webkit-box-shadow: 0 0.32rem 0.36rem -0.08rem #bd6161;
  // box-shadow: 0 0.32rem 0.36rem -0.08rem #bd6161;
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
