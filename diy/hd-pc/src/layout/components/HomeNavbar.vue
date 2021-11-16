<template>
  <div class="navbar">
    <img
      style="width: 171.75px; height: 68.25px"
      src="@/assets/common/logo.png"
    >
    <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/home/index">产品中心</el-menu-item>
      <el-menu-item index="/home/template">模版商店</el-menu-item>
      <el-menu-item index="/home/price">服务价格</el-menu-item>
      <el-menu-item index="/home/advisory">资讯</el-menu-item>
    </el-menu>
    <el-link v-if="token" icon="el-icon-user-solid" :underline="false" href="#/dashboard/dashboard">控制台</el-link>
    <el-link v-else icon="el-icon-user-solid" :underline="false" href="#/login">登录</el-link>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/mobile/components/Breadcrumb'
// import Hamburger from '@/mobile/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/mobile/components/SizeSelect'
// import Search from '@/mobile/components/HeaderSearch'

export default {
  name: 'HomeNavbar',
  components: {
    // Breadcrumb,
    // Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // Search
  },
  computed: {
    ...mapGetters([
      'token',
      'sidebar',
      'avatar',
      'device'
    ])
  },
  created() {
    this.activeIndex = this.$route.path
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" >
.el-menu--horizontal > .el-menu-item.is-active{
// border-bottom: none!important;
}
</style>
<style lang="scss" scoped>

.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding:0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin:0 auto;
    // .el-menu--horizontal > .el-menu-item.is-active {
    //     border-bottom: none!important;
    // }
    .el-menu-item {
      font-size: 16px;
    }
    .el-menu--horizontal{
    .el-menu-item.is-active {
        border-bottom: none!important;
        color: #0066CC;
      }
    }
    .el-menu--horizontal > .el-menu-item {
      border-bottom: none!important;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none!important;
    }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
