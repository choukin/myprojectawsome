<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="demo">demo</router-link>|
    <router-link :to="{ name: 'demo' }">demo1</router-link>|
    <router-link to="demo3">demo3</router-link>|
    <router-link to="/demo/about1">demo/about</router-link>
    <router-link to="/demo/about1?id=a">demo/about</router-link>
    <!-- <router-link
      to="/demo"
      custom
      v-slot="{ navigate, href, route, isActive, isExactActive }"
    >
      <span class="link" @click="navigate">
        首页<br />{{ href }}<br /><br /><br /><br />{{ route }}<br />{{
          isActive
        }}<br />{{ isExactActive }}</span
      >
    </router-link> -->
  </nav>
  <router-view />
</template>
<script lang="ts" setup>
// const navigate = () => {
//   alert("hello");
// };
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
