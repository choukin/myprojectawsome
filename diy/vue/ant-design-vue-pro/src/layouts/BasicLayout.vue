<template>
<div :class="[`nav-theme-${navTheme}`,`nav-layout-${navLayout}`]">
      <a-layout class="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider 
    v-if="navLayout ==='left'"
    :trigger="null" v-model="collapsed" collapsible :theme="navTheme" width="256">
      <div class="logo">ant-design-pro</div>
       <SiderMenu :theme="navTheme" />
    </a-layout-sider>  
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >
          <a-icon :type="collapsed?'menu-unfold':'menu-fold'" @click="collapsed=!collapsed" class="trigger" v-auth="['admin']"></a-icon>
          <Header/>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer/>
      </a-layout-footer>
    </a-layout>
    <authorized :authority="['admin']">
    <SettingDrawer/>
    </authorized>
  </a-layout>
  </div>
</template>
<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import SiderMenu from './SiderMenu.vue'
import SettingDrawer from '@/components/SettingDrawer'
export default {
    data() {
    return {
      collapsed: false,
    };
   },
  computed:{
      navTheme(){
          return this.$route.query.navTheme||'dark'
      },
      navLayout(){
          return this.$route.query.navLayout||'left'
      }
  },   
    components:{
        Header,
        Footer,
        SiderMenu,
        SettingDrawer
    }
}
</script>
<style  scoped>
/* .components-layout-demo-side >>> .ant-menu-dark .ant-menu-item-selected .anticon + span{
  color:#333;
} */
.trigger{
  padding:0 20px;
  line-height:64px;
  font-size: 24px;
}
.trigger:hover{
  background:#eeeeee ;
}
.logo{
  height:64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo{
  color:#ffffff;
}
</style>