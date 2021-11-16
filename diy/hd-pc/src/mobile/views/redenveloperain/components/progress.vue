<template>
  <div class="progress-view">
    <div class="progress-box">
      <div class="loading">loading<span class="dotting" /></div>
      <div class="outer-progress">
        <div class="inner-progress" :style="{width:progress+'%'}">
          <img src="@/mobile/views/redenveloperain/img/loadingicon.png" alt="" class="progress-icon animated swing">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgicon: ''
    }
  }

}
</script>
<style lang="scss" scoped>
.progress-view {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    height: 100%;
    width: 100%;
    background-color: rgba(111, 12, 10, .5);
}
.progress-box{
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    text-align: center;
    .loading{
        padding-bottom: .22rem;
        font-size: .4rem;
        color: rgb(255, 253, 253);
    }
}
.outer-progress{
  height:.22rem;
  width:3.48rem;
  border-radius: .1rem;
  background-color: rgb(255, 213, 163);
  box-shadow: inset 0px 0px .04rem 0px rgba(86, 47, 0, 0.004);
  z-index: 6;
  display: block;
  left:0;
  right:0;
  top:0;
  bottom:0;
  .inner-progress{
      height:100%;
      background-image: url(~@/mobile/views/redenveloperain/img/loading.png);
      background-size: contain;
      background-repeat: repeat-x;
      border-radius: .1rem;
      position: relative;
      transition: width .5s;

  .progress-icon{
      position: absolute;
      right:0;
      width:.45rem;
      height:.54rem;
      top:-.2rem;
      right:-.2rem;
  }
  }
}
/*点点点*/
 .dotting {
  display: inline-block; min-width: .03rem; min-height: .03rem;
  box-shadow: .04rem 0 currentColor, .14rem 0 currentColor, .24rem 0 currentColor;
  animation: dot 2s infinite step-start both;
}
.dotting:before { content: '...'; } /* IE8 */
.dotting::before { content: ''; }
:root .dotting { margin-right: 8px; } /* IE9+,FF,CH,OP,SF */

@-webkit-keyframes dot {
  25% { box-shadow: none; }
  50% { box-shadow: .04rem 0 currentColor; }
  75% { box-shadow: .04rem 0 currentColor, .14rem 0 currentColor; }
}
@keyframes dot {
  25% { box-shadow: none; }
  50% { box-shadow: .04rem 0 currentColor; }
  75% { box-shadow: .04rem 0 currentColor, .14rem 0 currentColor; }
}

</style>
