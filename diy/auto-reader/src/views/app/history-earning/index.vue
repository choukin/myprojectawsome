<!--累计收益-->
<template>
  <div>
    <van-grid
      v-if="ev"
      :column-num="1"
    >
      <van-grid-item>
        <template slot="icon">
          <div class="gold-text">
            {{ ev.sumAmount }}
          </div>
        </template>        
        <template
          slot="text"
        >
          累计收益
        </template>
      </van-grid-item>
    </van-grid>
    <van-grid
      :column-num="3"
    >
      <van-grid-item
        text="任务收益"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ ev.earningsAmount }}
          </div>
        </template>
      </van-grid-item>
      <van-grid-item
        text="一级分成"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ ev.subEarningsAmount }}
          </div>
        </template>
      </van-grid-item>
      <!-- <van-grid-item
        text="二级分成"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ ev.endEarningsAmount }}
          </div>
        </template>
      </van-grid-item> -->
      <van-grid-item
        text="收徒奖励"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ ev.awardAmount }}
          </div>
        </template>
      </van-grid-item>                        
    </van-grid>     
    
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      :error.sync="error"
      @load="onLoad"
    >
      <van-panel
        v-for="(item, index) in list"
        :key="item.createTime+ index"
        :border="false"
        :title="item.earningsDate"
      >
        <van-grid
          :column-num="3"
          :border="false"
        >
          <van-grid-item
            text="任务收益"
          >
            <template slot="icon">
              <div>{{ item.earningsAmount }}</div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="一级分成"
          >
            <template slot="icon">
              <div>{{ item.subEarningsAmount }}</div>
            </template>
          </van-grid-item>
          <!-- <van-grid-item
            text="二级分成"
          >
            <template slot="icon">
              <div>{{ item.lastEarningsAmount }}</div>
            </template>
          </van-grid-item> -->
          <van-grid-item
            text="收徒奖励"
          >
            <template slot="icon">
              <div>{{ item.awardAmount }}</div>
            </template>
          </van-grid-item>                        
        </van-grid>      
      </van-panel>       
      <!-- <van-cell
        v-for="item in list"
        :key="item.id"
      >
        <template slot="title">
          <div class="flex-center">
            <div>任务收益:{{ item.earningsAmount }}元</div>
            <div>一级分成：{{ item.subEarningsAmount }}</div>
            <div>二级分成：{{ item.lastEarningsAmount }}</div>
            <div>收徒奖励：{{ item.awardAmount }}</div>
          </div>
          <div class="flex-center">
            <div>
              {{ item.earningsDate }}
            </div>
            <div>
              <van-button
                v-if="item.status === 3"
                :loading="retryLoading && item.id === retryId"
                loading-type="spinner"
                type="primary"
                size="mini"
                @click="retryWithdraw(item)"
              >
                重新提现
              </van-button>
            </div>
          </div>
        </template>
      </van-cell> -->
    </van-list>
  </div>  
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Button, Cell, Collapse, CollapseItem, List, Tag,Grid ,GridItem,Panel } from 'vant'
import WeChat from '@/plugins/wechatMixin'
const { VUE_APP_HOST } = process.env

@Component({
  name: 'history-earning',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [List.name]: List,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Grid.name]:Grid,
    [GridItem.name]: GridItem,
    [Panel.name]: Panel
  }
})
export default class Contact extends Mixins(WeChat) {
  public list: any = []
  public loading: boolean = false
  public finished: boolean = false
  public error: boolean = false
  public retryLoading: boolean = false
  public retryId: number = 0
  public ev: any = {
    sumAmount: 0,
    earningsAmount: 0,
    subEarningsAmount:0,
    endEarningsAmount:0,
    awardAmount:0

  }
  public finishedText:string = '加载中'
  public async created() {
    // let inviteUrl = `${process.env.VUE_APP_SHARE_URL}?parentId=${this.userBase.id}`
    // let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 

    // //  验证签名
    // this.installWXbridge(inviteUrl)
  }
  public async onLoad() {
    this.loading = true
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/appEarningsInfo/selectUserSumEarningsList')
    this.ev = data.ev
    this.list = data.useList
    if(!this.list|| !this.list.length){
      this.finishedText = '暂无数据'
    } else {
      this.finishedText = '仅展示近七日收益'
    }
    // 加载状态结束
    this.loading = false

    // 数据全部加载完成
    this.finished = true
  }
  public async retryWithdraw() {
    // item: any
    // this.retryId = item.id
    // this.retryLoading = true
    // try {
    //   await this.$get(VUE_APP_HOST + '/gunsApi/withdrawApi/retyrWithdraw', { withdrawId: this.retryId })
    //   this.retryLoading = false
    // } catch (error) {
    //   this.retryLoading = false
    // }
    // this.onLoad()
  }
}
</script>
<style lang="scss" scoped>
.van-panel + .van-panel{
  border-top: 1px solid black;
}
.flex-center {
  display: flex;
  justify-content: space-between;
}
</style>
