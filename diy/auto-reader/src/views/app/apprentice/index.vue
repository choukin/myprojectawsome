<!-- 我的徒弟-->
<template>
  <div>
    <van-grid
      v-if="list&& list.length"
      :column-num="1"
    >
      <van-grid-item>
        <template slot="icon">
          {{ list.length }}
        </template>
        <template slot="text">
          好友人数
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
                <img
                  :src="item.headimgurl||'https://b.yzcdn.cn/vant/icon-demo-1126.png'"
                  :alt="item.nickname"
                >
                <div>{{ item.nickname }}</div>
              </div>
              <div>
                {{ item.createTime }}
              </div>
            </div> 
          </div>      
        </template>
      </van-cell>
    </van-list>
  </div>  
</template>
<script lang="ts">
import BigNumber from 'bignumber.js'
import { Component, Vue } from 'vue-property-decorator'
import { Button, Cell, Collapse, CollapseItem, List, Tag, Grid, GridItem } from 'vant'
const { VUE_APP_HOST } = process.env

@Component({
  name: 'apprentice',
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
export default class Apprentice extends Vue {
  public list: any = []
  public loading: boolean = false
  public finished: boolean = false
  public error: boolean = false
  public retryLoading: boolean = false
  public retryId: number = 0
  
  //计算昨日总贡献收益
  get sumParentEarningsAmount():number {
    let amount = 0
    if (this.list && this.list.length) {
      amount = this.list.reduce((prep:any, curr:any)=>{
        return new BigNumber(prep).plus(curr.parentEarningsAmount||0)
      },0)
    }
    return amount
  }
  public async created() {
  }
  public async onLoad() {
    this.loading = true
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/appEarningsInfo/subFriendInfo')
    this.list = data

    // this.list = [
    //   {
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/Awo6qP2YLrcOn2Unib98CG0B0ntcpFGWZE26288iaEmbZsziaZFryWVGmsQK5I4xKIU8uddU7OPbt3oWe64ibfWcEg/132",
    //     "id":19083,
    //     "nickname":"🙈😎😄😁😜😁😜😏",
    //     "num":1,
    //     "parentId":16747,
    //     parentEarningsAmount: 0.11
    //   },
    //   {
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI2QnaRnNN3NSryGMAlj79lkUafd2AnWGtUSIH7cfJNgWo6cHaLZlOmEunCQ9icVEDeh0Fh0JVjQBA/132",
    //     "id":8,
    //     "nickname":"Jason",
    //     "num":31,
    //     "parentId":16747,
    //     parentEarningsAmount: 0.11
    //   },
    //   {
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTISqfpjMnK5ENFHg32sVpicElT6daBibNaF5fEmGfklP8L0DVakQJX0bnUVCuwGIWXYPut87EH3kKVw/132",
    //     "id":38,
    //     "nickname":"侯*^_^*",
    //     "num":1,
    //     "parentId":16747,
    //     parentEarningsAmount: 0.11
    //   },
    //   {
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJI5XHsaXlwGM9oY0puh7nRmhPRsLjT8zbzNVE5yCHEVXGUNWUkZlm29hw33DpXiaAZP0PggdRZI8w/132",
    //     "id":4194,
    //     "nickname":"飞翔@？？？",
    //     "num":1,
    //     "parentId":16747,
    //     parentEarningsAmount: 0.11
    //   },
    //   {
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQNTUibfUd0KfP79jL60c4ic5pYreQbDLB5LvSX1ErwOZSlk2xpebInfDp7QgcPScKr9wzLnYdEzSg/132",
    //     "id":2334,
    //     "nickname":"海阔天空",
    //     "num":1,
    //     "parentId":16747,
    //     parentEarningsAmount: 0.11
    //   },
    //   {
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/gIOoIaPQSQiaqTib74Rqicw7RoR3icEs0Z2iat40sQLLIvsWzQEc0biam3zFCGXbvb7L9ibl8yrwZdCM15hq6gpUYVfqA/132",
    //     "id":28,
    //     "nickname":"多戈",
    //     "num":1,
    //     "parentId":16747,
    //     parentEarningsAmount: 0.11
    //   },
    //   {
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/mbPicyZsIrjWJJvWL1qeQJm7Zgxl8ekzVURibHNY3SpjetICPsrHZuXSn872u3kacCcZb5Vbdov4QA0HHeg0KUyw/132",
    //     "id":20,
    //     "nickname":"yoyo欧阳",
    //     "num":9,
    //     "parentId":16747,
    //     parentEarningsAmount: 0.11
    //   }
    // ]
    // 加载状态结束
    this.loading = false

    // 数据全部加载完成
    this.finished = true
  }
  public async retryWithdraw(item: any) {
    this.retryId = item.id
    this.retryLoading = true
    try {
      await this.$get(VUE_APP_HOST + '/gunsApi/withdrawApi/retyrWithdraw', { withdrawId: this.retryId })
      this.retryLoading = false
    } catch (error) {
      this.retryLoading = false
    }
    this.onLoad()
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
