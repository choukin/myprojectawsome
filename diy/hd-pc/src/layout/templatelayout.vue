<template>
  <el-container>
    <el-header height="80px">
      <home-navbar />
    </el-header>
    <el-main>
      <app-main />
    </el-main>
    <el-footer height="325px" class="home-foot">
      <div class="foot-header">
        <el-row type="flex" class="row-bg" justify="space-start">
          <el-col :span="8">
            <h2>关于我们</h2>
            <el-link :underline="false" type="info">信息链接</el-link>
            <el-link :underline="false" type="info">用户协议</el-link>
            <el-link :underline="false" type="info">更新日志</el-link>
          </el-col>
          <el-col :span="8">
            <h2>使用帮助</h2>
            <el-link :underline="false" type="info">帮助中心</el-link>
            <el-link :underline="false" type="info">活动审核和关闭</el-link>
            <el-link :underline="false" type="info">更新日志</el-link>
          </el-col>
          <el-col :span="8">
            <h2>联系我们</h2>
            <el-link :underline="false" type="info">商务合作</el-link>
            <el-link :underline="false" type="info">在线客服</el-link>
            <el-link :underline="false" type="info">联系电话</el-link>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-horizontal" justify="space-start">
          <el-col :span="20">
            <h2>友情链接</h2>
            <el-link :underline="false" type="info">春雨互动</el-link>
            <el-link :underline="false" type="info">签字版</el-link>
            <el-link :underline="false" type="info">会议签到</el-link>
            <el-link :underline="false" type="info">免费建站</el-link>
            <el-link :underline="false" type="info">设计之窗</el-link>
          </el-col>
        </el-row> -->
      </div>
      <div class="copyright">
        <div>
          <div>京ICP备20023388号-1 </div>
          <div style="margin-top:8px;">Copyright © 2020 北京春雨互动信息技术有限公司版权所有</div>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
// import RightPanel from '@/mobile/components/RightPanel'
// import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import { AppMain } from './components'
import HomeNavbar from './components/HomeNavbar'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    HomeNavbar,
    AppMain
    // RightPanel,
    // Settings,
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
  .home-foot{
      background-color: #201F21;
      text-align: center;
      padding:0!important;
      .foot-header{
          max-width: 1200px;
          color: #ADADAD;
          box-sizing: border-box;
          padding:50px 0;
          font-size: 18px;
          margin: 0 auto;
          .row-bg{
              text-align: left;
          }
          .row-horizontal{
              text-align: left;
              margin-top: 76px;
              .el-link{
              display: inline-block;
             &+.el-link{
                 margin-left: 20px;
                 margin-top:0;
             }
          }
          }
          h2{
            font-size: 24px;
            color: #25A8FB;
          }
          .el-link{
              display: block;
             &+.el-link{
                 margin-top: 20px;
             }
          }
       }
      .copyright{
          height:80px;
          background-color: #1A191A;
          text-align: center;
          color: #999999;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
      }
  }
</style>
