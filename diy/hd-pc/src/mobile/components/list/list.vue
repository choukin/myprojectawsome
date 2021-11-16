<template>
  <div :class="prefixClass + '-wrap'">
    <ul :class="prefixClass">
      <slot />
    </ul>
  </div>
</template>

<script>
/**
   * @desc 列表组件 - List
   * @module components/list/list
   * @param {Object} slot.default - 默认slot接收Cell组件
   * @example
   * import { List } from '@/mobile/components/'
   *
   * <list>
   *   ...
   * </list>
   */
export default {
  name: 'List',
  data() {
    return {
      prefixClass: 'nb-list'
    }
  }
}

</script>

<style lang="scss">
  $prefixClass: nb-list;

  .#{$prefixClass}-wrap {
    background-color: #fff;
    margin-bottom: .2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .#{$prefixClass} {}
</style>
