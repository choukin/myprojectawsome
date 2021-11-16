<template>
  <main id="app">
    <transition name="router-fade" mode="out-in">
      <router-view />
    </transition>
  </main>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
