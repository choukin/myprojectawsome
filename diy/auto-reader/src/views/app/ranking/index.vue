<template>
  <van-tabs
    v-model="active"
    sticky
    @change="changeTab"
  >
    <van-tab title="昨日收益排行">
      <van-list
        v-model="yesterdaysLoading"
        :finished="yesterdayFinished"
        :finished-text="(yesterdaysList&&yesterdaysList.length)?'只展示前30名':'暂无数据'"
      >
        <rankingItem
          v-for="(item) in yesterdaysList"
          :key="item.headimgurl+1"
          :ranking="item"
        />
      </van-list>
    </van-tab>
    <van-tab title="总收益排行">
      <van-list
        v-model="historicalLoading"
        :finished="historicalFinished"
        :finished-text="(historicalRankingList&&historicalRankingList.length)?'只展示前30名':'暂无数据'"
      >
        <rankingItem
          v-for="(item) in historicalRankingList"
          :key="item.headimgurl+2"
          :ranking="item"
        />
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { Tab, Tabs, List, Cell,Image as VanImage, Icon } from 'vant'
import rankingItem from './components/ranking-item.vue'
// eslint-disable-next-line no-unused-vars
import { IRanking } from '@/types/index'
const { VUE_APP_HOST } = process.env
@Component({
  name: 'ranking',
  components:{
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    rankingItem

  }
})
export default class Ranking extends Vue {
  private active: number = 0
  private yesterdaysList:Array<any> = []
  yesterdaysLoading:boolean =false
  yesterdayFinished:boolean =false

  private historicalRankingList:Array<any> = []
  historicalLoading:boolean =false
  historicalFinished:boolean =false  

  
  public async created() {
    await this.fetchYesterdaysList()
  }
  /**
   * 获取昨日收益排行榜信息
   * /gunsApi/taskManuallyApi/getYesterdaysList
   * 获取昨日收益排行榜信息
   */
  async fetchYesterdaysList() {
    this.yesterdaysLoading = true
    let data = await this.$get(VUE_APP_HOST + '/gunsApi/readAppApi/getYesterdaysList')
    data = data.map((item:IRanking,index:number)=>{
      item.index = index + 1
      return item
    })
    this.yesterdaysLoading = false
    this.yesterdayFinished = true
    this.yesterdaysList = data
  }

  /**
   * /gunsApi/taskManuallyApi/getHistoricalRankingList获取历史总收益排行榜信息
   */
  async fetchHistoricalRankingList() {
    this.historicalLoading = true
    let data = await this.$get(VUE_APP_HOST + '/gunsApi/readAppApi/getHistoricalRankingList')
    data = data.map((item:IRanking,index:number)=>{
      item.index = index + 1
      return item
    })
    this.historicalLoading = false
    this.historicalFinished = true
    this.historicalRankingList = data
  }  

  async changeTab(name: string) {
    if (name == '1') {
      await this.fetchHistoricalRankingList()
    } else {
      await this.fetchYesterdaysList()
    }
  }
  
}
</script>
