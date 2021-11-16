<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.ta-right {
  text-align: right;
}
body {
  -webkit-overflow-scrolling: touch;
  padding: 0;
  margin: 0;
  font-family: -apple-system-font, 'Helvetica Neue', sans-serif;
}
#__nuxt,
#__layout {
  min-height: 100%;
}
button {
  border: 0;
  outline: 0;
}

.num {
  font-family: Helvetica, Arial, sans-serif;
}

html {
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body,
#app {
  min-height: 100vh;
}

a {
  text-decoration: unset;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

a:active {
  background: transparent;
}

a:visited {
  background: transparent;
}

a:focus {
  background: transparent;
}

.index {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}
.tobar {
  width: 100%;
  z-index: 11111;
}

.tobar:before {
  content: '';
  clear: both;
}
.tobar .assistant {
  position: fixed;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  right: 40px;
  bottom: 64px;
  background: -webkit-gradient(linear, left top, right top, from(#50b3ff), to(#2782ff));
  background: -o-linear-gradient(left, #50b3ff, #2782ff);
  background: linear-gradient(to right, #50b3ff, #2782ff);
  color: #fff;
  font-size: 24px;
}

.tobar .assistant .img {
  height: 55%;
  width: 55%;
}
</style>
