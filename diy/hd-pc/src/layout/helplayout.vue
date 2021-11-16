<template>
  <el-container class="page-container">
    <el-main>
      <div class="banner">
        <img :src="bannerdesc" alt="">
        <el-button round style="color:#1A9BFF;padding:15px 80px;" @click="gotoRouterName('/login')">免费试用</el-button>
      </div>
      <div style="width:1200px;margin:0 auto;">
        <Breadcrumb />
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb/index'
export default {
  name: 'Help',
  components: { Breadcrumb },
  data() {
    return {
      bannerdesc: require('@/assets/home_images/index/desc.png')
    }
  },
  created() {
    /** 处理绑定公众号回调 */
    const auth_code = this.$route.query.auth_code
    if (auth_code) {
      (auth_code).then(res => {
        this.$message({
          type: 'success',
          message: '绑定成功！'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.el-header{
    padding:0;
}
.el-main{
  padding:0;
}

</style>
<style lang="scss" scoped>
.page-container{
  background-color: #fff;
  .index-title{
    padding:100px 0 50px 0;
    font-size: 34px;
    font-weight: 400;
    color: #333333;
  }
  .blue-btn{
    margin-top: 76px;
    background-color: #0066CC;
    width: 360px;
    color: #FFFFFF;
    font-size: 20px;
  }
}
.banner{
    width: 100%;
    height: auto;
    background: url(~@/assets/home_images/index/banner.png) no-repeat center center;
    background-size: cover;
    padding:130px 0 94px 0;
    margin:0 auto;
    text-align: center;
    img{
      margin:0 auto;
    }
    button{
      margin:0 auto;
      margin-top: 64px;
      display: block;
    }
}
.container{
  padding:80px 0 123px;
  text-align: center;
  font-family:Source Han Sans CN;

  .title{
    font-size:30px;
    font-family:Source Han Sans CN;
    font-weight:500;
    line-height:36px;
    color:rgba(51,51,51,1);
  }
  .desc{
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height:36px;
    color:rgba(102,102,102,1);
  }

  .step-wapper{
        height: 187.58px;
        display: flex;
        align-items: center;
        justify-content: center;
        justify-items: center;
    .step-item {
      background-size: 194.9px 187.58px;
      background: url(~@/assets/home_images/hexagon.png) no-repeat center center;
      display: inline-block;
      width: 192.9px;
      height: 187.58px;
      position: relative;

      .step-desc{
        width: 192.9px;
        height: 187.58px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size:20px;
        font-weight:400;
        line-height:24px;
        color:rgba(26,155,255,1);
      }
    }
      .separator{
        width:33px;
        height:33px;
        background:url(~@/assets/home_images/arrow.png) no-repeat center center;
      }
  }
  .activity{
    .activity-desc{
      font-family:Source Han Sans CN;
      width:1200px;
      margin: 0 auto;
      .index-card{
        width:276px;
        height:300px;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        ::v-deep {
          .el-card__body{
          padding:0;
        }

        .el-button.is-round{
          background-color: #1A9BFF;
          font-size: 16px;
          font-weight: 400;
          color: #FFFFFF;
        }
        .el-col-12{
          text-align: left;

        }
        }
        .index-card-body{
          width:276px;
          padding:44px 19px 30px;
        }
        .image{
          width:276px;
          height: 200px;
        }
      }
      img{
            position: relative;
      }
      img.left-img {
        left:-92px;
      }
      .desc-text{
        padding:100px 80px 0 ;
        text-align: right;
        background-color: #F5F5F5;
        height:400px;
        .desc-title{
          font-size:40px;
          font-weight:400;
          line-height:36px;
          color:rgba(51,51,51,1);
        }
        .desc-subtitle{
          font-size:18px;
          font-weight:400;
          line-height:24px;
          color:rgba(102,102,102,1);
          padding:35px 0 50px 0;
        }
      }
      .right-text{
        text-align: left;
      }
    }
  }
}

</style>
