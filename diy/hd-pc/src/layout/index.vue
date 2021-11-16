<template>
  <div :class="classObj" class="app-wrapper">
    <el-container>
      <el-header height="80px"> <navbar /></el-header>
      <el-container>
        <el-aside width="200px"><sidebar class="sidebar-container" /></el-aside>
        <el-container>
          <el-main><app-main /></el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <navbar />
    <sidebar class="sidebar-container" /> -->
    <!-- <div :class="{'fixed-header':fixedHeader}"> -->
    <!-- <navbar /> -->
    <!-- <tags-view v-if="needTagsView" /> -->
    <!-- </div> -->
    <!-- <div :class="{hasTagsView:needTagsView}" class="main-container">

      <app-main /> -->
    <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import RightPanel from '@/mobile/components/RightPanel'
// import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import { AppMain, Navbar, Sidebar } from './components'

import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    // RightPanel,
    // Settings,
    Sidebar
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style lang="scss">
.el-header,aside,.el-main{
  padding:0;
}
// aside{
//   padding:0;
// }
// .el-main{
//   padding:0
// }
</style>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
