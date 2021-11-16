<template>
  <div>
    <van-grid
      :column-num="1"
    >
      <van-grid-item 
        text="未提现收益(元)"
      >
        <template
          slot="icon"
          class="gold-text"
        >
          {{ ''+sumAmount }}
        </template>
      </van-grid-item>
    </van-grid>
    <van-grid
      :column-num="3"
    >
      <van-grid-item
        text="任务收益(元)"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ earningsAmount }}
          </div>
        </template>
      </van-grid-item>
      <van-grid-item
        text="一级分成(元)"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ subEarningsAmount }}
          </div>
        </template>
      </van-grid-item>
      <!-- <van-grid-item
        text="二级分成(元)"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ endEarningsAmount }}
          </div>
        </template>
      </van-grid-item> -->
      <van-grid-item
        text="收徒奖励(元)"
      >
        <template slot="icon">
          <div class="gold-text">
            {{ awardAmount }}
          </div>
        </template>
      </van-grid-item>                        
    </van-grid>    
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text=""
      :error.sync="error"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
      >
        <template slot="title">
          <div>
            <div class="flex-center">
              <div class="item-flex">
                <div>
                  {{ item.awardName }}(元)
                </div>
              </div>
              <div class="gold-text">
                {{ item.awardAmount }}
              </div>
              <div>
                {{ item.awardDate }}
              </div>
            </div> 
          </div>      
        </template>
      </van-cell>
    </van-list>
  </div>  
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Button, Cell, Collapse, CollapseItem, List, Tag, Grid ,GridItem } from 'vant'
import WeChat from '@/plugins/wechatMixin'
const { VUE_APP_HOST } = process.env

@Component({
  name: 'today-earning',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [List.name]: List,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Grid.name]:Grid,
    [GridItem.name]: GridItem
  }
})
export default class Contact extends Mixins(WeChat) {
  public list: any = []
  public loading: boolean = false
  public finished: boolean = false
  public error: boolean = false
  public retryLoading: boolean = false
  public retryId: number = 0
  public sumAmount:number = 0
  public earningsAmount: number = 0
  public awardAmount: number = 0
  subEarningsAmount:number = 0
  endEarningsAmount:number = 0
  public async created() {
    this.onLoad()
  }
  public async onLoad() {
    this.loading = true
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/appEarningsInfo/withdrawInfo')
    this.sumAmount = data.sumAmount
    this.earningsAmount = data.earningsAmount
    this.subEarningsAmount = data.subEarningsAmount
    this.endEarningsAmount = data .endEarningsAmount
    this.awardAmount = data.awardAmount
    this.list = data.uaerList
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
.flex-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-flex {
    display: flex;
    align-items: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border: 0.02rem solid #ccc;
      border-radius: 50%;
      margin-right: 0.1rem;
    }
  }
}
</style>
