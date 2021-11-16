<template>
  <div
    v-show="isLock"
    class="share-layer"
    @touchmove.prevent
    @click="close"
  >
    <div class="share-main">
      <img src="./img/arrow.png">
      <p>点击右上角进行分享</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransparentLayer',
  props: {
    isLock: Boolean
  },
  methods: {
    close() {
      this.isLock = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .share-layer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1010;
    background: rgba(0, 0, 0, 0.8);
    .share-main {
      display: flex;
      color: #fff;
      font-size: .4rem;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      padding: .2rem .4rem 0 0;
      img {
        width: 3rem;
        display: block;
        margin-right: 0;
      }
    }
  }
</style>
