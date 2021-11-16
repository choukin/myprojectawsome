<template>
  <div class="prize-item">
    <span class="prize-name">{{ item.prizeName }}</span>
    <span class="prize-count">{{ item.prizeNumber }}个</span>
  </div>
</template>
<script>
export default {
  name: 'PrizeItem',
  props: {
    item: {
      type: Object,
      default() {
      }
    }
  }
}
</script>
<style lang="scss">
    .prize-item {
      display: flex;
      width: 3.78rem;
      height: .74rem;
      line-height: .74rem;
      margin:0 auto;
      background: url('./img/prize_item_bg.png') no-repeat;
      background-size: 100% auto;
      color: rgb(126, 21, 19);
      text-align: left;
      padding:0 .54rem;
      box-sizing: border-box;
      .prize-name {
        width: 1.6rem;
        display: block;
        flex:2;
        font-size: .3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .prize-count{
        flex: 1;
        font-size: .22rem;
        text-align: right;
      }
    }
    .prize-item+.prize-item {
        margin:0.1rem auto;
    }
</style>
