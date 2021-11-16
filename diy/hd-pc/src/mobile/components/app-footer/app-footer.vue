<template>
  <div v-if="SafeAreaBottom" class="app-footer-wrap">
    <div class="ios-status-bar-placeholder" :style="{ height: `${SafeAreaBottom}px` }" />
    <div class="app-footer" :style="{ height: `${SafeAreaBottom}px`}" />
  </div>
</template>

<script>
/**
   * @desc App Footer
   * @module components/app-footer/app-footer
   * @example
   * <app-header title="
标题" bgColor="#f15b5a" :closeBtnShow="true" rightBtnText="按钮"></div>
    */
export default {
  name: 'AppFooter'
}
</script>

    <style lang="scss" scoped>

      .app-footer-wrap{
      position: relative;
      z-index: 9;
      background:#ffffff;
      }

      .app-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 9;
      background:#fff;
      }
    </style>
