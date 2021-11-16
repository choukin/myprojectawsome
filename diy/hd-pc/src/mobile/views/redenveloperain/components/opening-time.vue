<template>
  <div class="opening-view">
    <count-down
      :time="time"
      format="HH:mm:ss"
      millisecond
      @finish="finished"
    >
      <template v-slot="slotProp">
        还剩<span class="item">{{ slotProp.timeData.hours|spliteTime(0) }}</span><span class="item">{{ slotProp.timeData.hours|spliteTime(1) }}</span>时<span class="item">{{ slotProp.timeData.minutes|spliteTime(0) }}</span><span class="item">{{ slotProp.timeData.minutes|spliteTime(1) }}</span>分<span class="item">{{ slotProp.timeData.seconds|spliteTime(0) }}</span><span class="item">{{ slotProp.timeData.seconds|spliteTime(1) }}</span>秒开始哦~
      </template>
    </count-down>
    <div>先去看看其他活动，一会再来吧~</div>
  </div>
</template>
<script>
import { CountDown } from '@/mobile/components'
export default {
  components: {
    CountDown
  },
  filters: {
    /**
       * 把时分秒两位数分割开
       */
    spliteTime(val, index) {
      val = '' + val
      if (('' + val.length) < 2) {
        val = '0' + val
      }
      return val[index]
    }
  },
  props: {
    time: {
      type: Number,
      default: 10000
    }
  },

  methods: {
    // 倒计时结束
    finished() {
      this.$emit('finished')
    }
  }

}
</script>
<style lang="scss" scoped>
.opening-view {
position:absolute;
top:3.3rem;
left: 0;
z-index: 9999;
width: 100%;
text-align: center;
font-size: .3rem;
color:#E93B33;
.item{
  border-radius: .08rem;
  background-color: #E93B33;
  color:#FFF7E5;
  padding:0 0.04rem;
  margin:0 .02rem;
}

}

</style>
