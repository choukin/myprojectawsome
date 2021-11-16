<template>
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
        <div class="flex-center">
          <div>{{ item.sumAmount }}元</div>
          <div>
            <van-tag :type="item.status === 2 ? 'success' : 'danger'">
              {{ item.statusName }}
            </van-tag>
          </div>
        </div>
        <div class="flex-center">
          <div>
            {{ item.createTime }}
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
    </van-cell>
    <div
      id="topbar"
      class="tobar"
    >
      <a
        class="assistant"
        href="/"
      >
        返回
      </a>
    </div>
  </van-list>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Button, Cell, Collapse, CollapseItem, List, Tag } from 'vant'
import WeChat from '@/plugins/wechatMixin'
const { VUE_APP_HOST } = process.env

@Component({
  name: 'recording',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [List.name]: List,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  }
})
export default class Contact extends Mixins(WeChat) {
  public list: any = []
  public loading: boolean = false
  public finished: boolean = false
  public error: boolean = false
  public retryLoading: boolean = false
  public retryId: number = 0
  public async created() {
    // let inviteUrl = `${process.env.VUE_APP_SHARE_URL}?parentId=${this.userBase.id}`
    let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 

    //  验证签名
    this.installWXbridge(inviteUrl)
  }
  public async onLoad() {
    this.loading = true
    const data = await this.$get(VUE_APP_HOST + '/gunsApi/withdrawApi/withdrawListTop10')
    this.list = data
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
}
</style>
