<template>
  <van-list
    :error.sync="error"
    error-text="请求失败，点击重新加载"
  >
    <van-cell v-for="item in prizeList" :key="item.id">
      <van-card
        :tag="item.prizeType===0?'优惠券':'实物'"
        :title="item.name"
        :thumb="$imghost+item.img"
      >
        <template #desc>
          <div v-if="item.reciveName ">
            收货人：{{ item.reciveName }}<br>
            手机号：{{ item.recivePhone }}<br>
            收货地址：{{ item.reciveAddress }}
          </div>
          <div>有效期：{{ item.validTime }}</div>
        </template>
        <template #price>
          <van-tag v-if="item.prizeType===0" size="large" type="primary">兑换码:{{ item.value }} </van-tag>
          <van-button v-if="item.prizeType===0" type="primary" size="mini" style="margin-left:.05rem;" @click="copycode(item.value)">复制</van-button>
          <van-button v-else-if="!item.saveAddress" type="primary" style="margin-left:.05rem;" size="small" @click="setAddress(item)">填写地址</van-button>
        </template>
      </van-card>
    </van-cell>
  </van-list>
</template>

<script>
/**
 * 奖品列表
 */
import clip from '@/utils/clipboard'
import { fetchPrizeList } from '@/mobile/api'
import { Cell, Button, List, Card, Tag } from 'vant'
export default {
  name: 'PrizeList',
  components: {
    [Cell.name]: Cell,
    [Button.name]: Button,
    [List.name]: List,
    [Card.name]: Card,
    [Tag.name]: Tag
  },
  data() {
    return {
      loading: false,
      error: false,
      prizeList: []
    }
  },
  created() {
    this.onLoadPrizeList()
  },
  methods: {
    setAddress(item) {
      this.$store.dispatch('setPrizeInfo', item)
      const activityCode = this.$route.query.activityCode
      this.gotoRouterName('/myprize?activityCode=' + activityCode)
    },
    copycode(code) {
      clip(code, event, 'mobile')
    },
    onLoadPrizeList() {
      const activityCode = this.$route.query.activityCode
      if (activityCode) {
        // this.loading = true
        fetchPrizeList(activityCode).then(res => {
        //   this.loading = false
          this.prizeList = res.data
        }).catch(() => {
        //   this.loading = false
          this.error = true
        })
      } else {
        this.$notify('缺少activityCode参数')
      }
    }
  }

}
</script>

<style lang="scss">

</style>
