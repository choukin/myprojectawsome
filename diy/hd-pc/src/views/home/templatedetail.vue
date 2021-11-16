<template>
  <el-container class="price-container">
    <el-main>
      <div class="banner" />

      <div class="container">
        <Breadcrumb />
        <div class="template-detail">
          <el-row type="flex">
            <img class="act-demo" src="~@/assets/home_images/template/demo.png" alt="">
            <el-row type="flex" justify="space-between" style="flex-direction: column;margin-top:0;">
              <div>
                <h2 class="title">天天红包雨</h2>
                <div class="detail">
                  介绍性文字介绍性文字介绍性文字介绍性文字介绍性文字介绍性文字介绍性文字介绍性文字介绍性文字
                </div>
              </div>
              <div>
                <div class="member-detail">
                  模板会员免费<span class="detail-count">销量 4399</span>
                </div>
                <el-button style="background-color:#0066CC;color:#fff;">立即使用</el-button>
              </div>
            </el-row>
          </el-row>
        </div>
        <div>相似作品</div>
        <el-row v-for="(row, indexa) in 2" :key="indexa+'indexa'">
          <el-col v-for="(o, index) in 4" :key="index+'item'" :span="6">
            <el-card :body-style="{ padding: '0px',width:'276px',height:'400px' }" shadow="hover">
              <img src="~@/assets/home_images/template/demo.png" class="image">
              <div style="padding: 26px 14px 0;text-align:left;">
                <span class="card-title">九宫格抽奖</span>
                <div class="card-bottom">
                  <div class="card-count">
                    <img src="~@/assets/home_images/template/eye.png" alt="">
                    <span style="margin-left:8px;">6763</span>
                  </div>
                  <div class="card-name">
                    <div style="margin-right:8px;">爱研发</div>
                    <img src="~@/assets/home_images/template/avatar.png" alt="">
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { bindOfficial } from '@/api/officialAccount'
export default {
  name: 'Template',
  components: { Breadcrumb },
  data() {
    return {

    }
  },
  created() {
    /** 处理绑定公众号回调 */
    const auth_code = this.$route.query.auth_code
    if (auth_code) {
      bindOfficial(auth_code).then(res => {
        this.$message({
          type: 'success',
          message: '绑定成功！'
        })
      })
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 3) {
        return [1, 7]
      }
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
.price-container{
  background-color: #FFFFFF;
  .template-detail{
    padding-bottom: 100px;
    .act-demo{
      margin-right: 49px;
    }
    h2.title{
      font-size: 34px;
      font-weight: 400;
      color: #222222;
      padding:0;
      margin:0;
    }
    .detail{
      font-size: 18px;
      font-weight: 400;
      line-height: 31px;
      color: #333333;
    }
    .member-detail{
      font-size: 30px;
      font-weight: 400;
      color: #BC8435;
      margin-bottom: 20px;
      .detail-count{
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
.active{
border: 1px solid transparent;
background: linear-gradient(169deg, #F4E0AC 0%, #E9C37C 100%);
}
.banner{
    width: 100%;
    height: 400px;
    box-sizing: border-box;
    background: url(~@/assets/home_images/template/templatebanner.png) no-repeat center center;
    background-size: cover;
    padding:68px 0 0px 0;
    margin:0 auto;
    text-align: center;
    .pricetool{
      width:598px;
      height: 94px;
    }
    .pricetips{
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 36px;
      color: #FFFFFF;
    }
    img{
      margin:0 auto;
    }
    button{
      margin:0 auto;
      display: block;
    }
}
.prices{
  display: flex;
  max-width: 1200px;
  margin:0 auto;
  position: relative;
  top:50px;
  .el-card{
    padding:43px 0 24px 0;
    width: 190px;
    height: 321px;
    box-sizing: border-box;
    text-align: center;
    font-family: Source Han Sans CN;
    .title{
      font-size: 20px;
      font-weight: 500;
      line-height: 1;
      color: #444444;
    }
    .price{
      margin: 45px 0 24px 0;
      font-size: 24px;
      font-weight: 400;
      color: #845723;
    }

    .features{
      padding-top: 40px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 20px;
      color: #777777;
    }
    ::v-deep .el-card__body{
      padding:0;
    }
    &+.el-card{
      margin-left: 12px;
    }
  }
}
.container{
  width: 1200px;
  margin: 0 auto;
  padding:20px 0 123px;
  text-align: left;
  font-family:Source Han Sans CN;
  ::v-deep .el-card {
    width:276px;
    height:400px;
    box-sizing: border-box;
  }
  .card-title{
    font-size: 18px;
    font-weight: 400;
    color: #333333;
  }
  .card-bottom{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 400;
    color: #696864;
    margin-top: 13px;
    .card-name{
      display: flex;
      align-items: center;
    }
  }
}
.el-row {
  margin-top:40px;
}
</style>
