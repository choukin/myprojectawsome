<template>
  <el-container class="price-container">
    <!-- <el-header height="80px">
      <homeNavbar />
    </el-header> -->
    <el-main>
      <div class="banner">
        <img class="pricetool" src="~@/assets/home_images/pricetool.png" alt="">
        <div class="pricetips">500万注册用户，5年持续更新升级，没有哪家比我们功能更多</div>
        <div class="prices">
          <el-card v-for="(item,index) in prices" :key="index+'price'" shadow="hover">
            <div class="title">{{ item.title }}</div>
            <div v-if="item.type==='free'" class="price" style="line-height:32px;">{{ item.desc }}</div>
            <div v-else class="price">
              <span style="color:#FF0300;font-size:30px;">{{ item.price }}</span>
              <span style="color:#333333;font-size:16px;">{{ item.unit }}</span>
            </div>
            <el-button type="info" round size="small" style="width:150px;" :class="{active:item.type!=='free'}" :disabled="item.type==='free'">{{ item.button }}</el-button>
            <div class="features">
              <div v-for="(atr,aindex) in item.features" :key="'atr'+aindex"><i class="el-icon-check" />{{ atr }}</div>
            </div>
          </el-card>
        </div>
      </div>
      <div style="height:50px;" />
      <div class="container">
        <h2 style="font-size:32px;color:#333;">各版本功能详情</h2>
        <div class="warp-table">

          <div class="ac-table">
            <div class="item-first">
              <div class="item-title">服务列表</div>
            </div>
            <div class="item">
              <div class="item-title">个人免费版</div>
              <div class="item-price">免费</div>
            </div>
            <div class="item">
              <div class="item-title">企业免费版</div>
              <div class="item-price">免费</div>
            </div>
            <div class="item">
              <div class="item-title">企业体验版</div>
              <div class="item-price">
                <span class="price">999</span>
                <span class="unit">元/年</span>
              </div>
              <el-button size="mini" class="active" round>立即购买</el-button>
            </div>
            <div class="item">
              <div class="item-title">企业标准版</div>
              <div class="item-price">
                <span class="price">3999</span>
                <span class="unit">元/年</span>
              </div>
              <el-button size="mini" class="active" round>立即购买</el-button>
            </div>
            <div class="item">
              <div class="item-title">企业高级版</div>
              <div class="item-price">
                <span class="price">7999</span>
                <span class="unit">元/年</span>
              </div>
              <el-button size="mini" class="active" round>立即购买</el-button>
            </div>
            <div class="item">
              <div class="item-title">企业专业版</div>
              <div class="item-price">
                <span class="price">19999</span>
                <span class="unit">元/年</span>
              </div>
              <el-button size="mini" class="active" round>立即购买</el-button>
            </div>
          </div>
          <div class="ac-title">近期活动</div>
          <div class="ac-table">
            <div class="item-first">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
          </div>
          <div class="ac-table">
            <div class="item-first">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
          </div>
          <div class="ac-title">近期活动</div>
          <div class="ac-table">
            <div class="item-first">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
          </div>
          <div class="ac-table">
            <div class="item-first">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
            <div class="item">文案</div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>

import { bindOfficial } from '@/api/officialAccount'
export default {
  name: 'Home',
  // components: { HomeNavbar },
  data() {
    return {
      bannerdesc: require('@/assets/home_images/bannerdesc.png'),
      prices: [
        {
          title: '企业免费版',
          type: 'free',
          desc: '免费试用',
          price: '',
          unit: '',
          button: '已支持',
          features: [
            '附属功能点'
          ]
        },
        {
          title: '企业免费版',
          type: 'pay',
          desc: '免费试用',
          price: '999',
          unit: '元/年',
          button: '立即购买',
          features: [
            '附属功能点',
            '附属功能点'
          ]
        },
        {
          title: '企业免费版',
          type: 'pay',
          desc: '免费试用',
          price: '3999',
          unit: '元/年',
          button: '立即购买',
          features: [
            '附属功能点',
            '附属功能点'
          ]
        },
        {
          title: '企业免费版',
          type: 'pay',
          desc: '免费试用',
          price: '7999',
          unit: '元/年',
          button: '立即购买',
          features: [
            '附属功能点',
            '附属功能点',
            '附属功能点'
          ]
        },
        {
          title: '企业免费版',
          type: 'pay',
          desc: '免费试用',
          price: '19999',
          unit: '元/年',
          button: '立即购买',
          features: [
            '附属功能点'
          ]
        },
        {
          title: '定制服务',
          type: 'vip',
          desc: '免费试用',
          price: '19999',
          unit: '元/年',
          button: '立即购买',
          features: [
            '附属功能点'
          ]
        }
      ]
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
}
.active{
border: 1px solid transparent;
background: linear-gradient(169deg, #F4E0AC 0%, #E9C37C 100%);
}
.banner{
    width: 100%;
    height: 480px;
    box-sizing: border-box;
    background: url(~@/assets/home_images/pricebanner.png) no-repeat center center;
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
  padding:80px 0 123px;
  text-align: center;
  font-family:Source Han Sans CN;
  .warp-table{
    text-align: center;
    border: 1px solid #E4E4E4;
    width: 1200px;
    margin:0 auto;
    box-sizing: border-box;
  }
  .ac-title{
    padding:28px 0;
    border-top:1px solid #E4E4E4;
    color:#333333;
    font-size: 20px;
  }
  .ac-table{
    display: flex;
    width:1200px;
    margin:0 auto;
    color: #6B6B6B;
    font-size: 14px;
    .item-title{
      font-size: 20px;
      font-weight: 400;
      color: #4D7793;
      margin-bottom: 34px;
    }
    .item-price{
      font-size: 16px;
      font-weight: 400;
      color: #0066CC;
      margin-bottom: 20px;
      .price{
        color: #FF4040;
      }
      .unit{
        color: #333333;
      }
    }
    .item-first{
      width:240px;
      box-sizing: border-box;
      border:1px solid #E4E4E4;
      border-left: none;
      border-bottom: none;
      padding: 20px 0;
    }
    .item{
      border:1px solid #E4E4E4;
      border-left: none;
      border-bottom: none;
      flex-grow: 1;
      width:160px;
      box-sizing: border-box;
      padding: 20px 0;
      &:last-child{
        border-right: none;
      }
    }
  }

}
.el-row {
  margin-top:80px;
}
</style>
