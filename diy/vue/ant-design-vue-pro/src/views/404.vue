<template>
  <div style="text-align:center;">
    <NOTFOUND type="icon-icon-test" style="font-size:100px;"/>
    <!-- <img :src="logo" alt=""> -->
    <notfound/>
    </div>
</template>

<script>
import notfound from '@/assets/svg/404.svg';
export default {
  components: {
    notfound
  },
  data(){
    return {
      // logo: notfound
    }
  }
}
</script>

<style>

</style>