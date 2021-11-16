<template>
  <div>
    <slot :timeData="timeData">{{ formattedTime }}</slot>
    {{ tips }}
  </div>
</template>

<script>
import { raf, cancelRaf, isSameSecond, parseTimeData, parseFormat } from '@/mobile/utils/time-utils'
export default {
  props: {
    millisecond: Boolean,
    time: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    tips: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      remain: 0,
      counting: false,
      endTime: 0
    }
  },
  computed: {
    timeData() {
      return parseTimeData(this.remain)
    },
    formattedTime() {
      return parseFormat(this.format, this.timeData)
    }
  },
  watch: {
    time: {
      immediate: true,
      handler: 'reset'
    }
  },
  methods: {
    reset() {
      this.remain = this.time
      if (this.remain === 0) {
        return
      }
      if (this.autoStart) {
        this.start()
      }
    },
    start() {
      if (this.counting) {
        return
      }

      this.counting = true
      this.endTime = Date.now() + this.remain
      this.tick()
    },
    pause() {
      this.counting = false
      cancelRaf(this.rafId)
    },
    tick() {
      if (this.millisecond) {
        this.microTick()
      } else {
        this.macroTick()
      }
    },
    setRemain(remain) {
      this.remain = remain
      if (this.remain === 0) {
        this.pause()
        this.$emit('finish')
      }
    },
    getRemain() {
      return Math.max(this.endTime - Date.now(), 0)
    },
    microTick() {
      this.rafId = raf(() => {
        const remain = this.getRemain()
        this.setRemain(remain)
        if (this.remain !== 0) {
          this.microTick()
        }
      })
    },
    macroTick() {
      this.rafId = raf(() => {
        const remain = this.getRemain()
        if (!isSameSecond(remain, this.remain) || remain === 0) {
          this.setRemain(remain)
        }
        if (this.remain !== 0) {
          this.macroTick()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
