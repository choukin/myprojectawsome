<template>
  <el-container>
    <!-- <el-header height="80px">
      <homeNavbar />
    </el-header> -->
    <el-main>
      <div class="banner">
        <img :src="bannerdesc" alt="">
        <el-button round style="color:#1A9BFF;padding:15px 80px;">免费试用</el-button>
      </div>
      <div class="container">
        <div class="step">
          <div class="title">营销活动无需开发，快速上</div>
          <div class="desc">活动简单配，1个活动10分钟搞定</div>
          <div class="step-wapper">
            <div class="step-item">
              <div class="step-desc">
                <div>挑选合适</div>
                <div>活动模板</div>
              </div>
            </div>
            <div class="separator" />
            <div class="step-item">
              <div class="step-desc">
                <div>配置</div>
                <div>基础信息</div>
              </div>
            </div>
            <div class="separator" />
            <div class="step-item">
              <div class="step-desc">
                <div>发布上线</div>
              </div>
            </div>
            <div class="separator" />
            <div class="step-item">
              <div class="step-desc">
                <div>查看</div>
                <div>活动效果</div>
              </div>
            </div>
          </div>
        </div>

        <div class="activity">
          <div class="title">引流、涨粉一步到位</div>
          <div class="desc">简单有趣小游戏，快速完成拉新促活</div>
          <div class="activity-desc">
            <el-row>
              <el-col :span="12">
                <img src="~@/assets/home_images/activitydraw.png" alt="">
              </el-col>
              <el-col :span="12">
                <div class="desc-text">
                  <div class="desc-title">幸运大转盘</div>
                  <div class="desc-subtitle">最快捷给力的拉新工具，10分钟快速配置<br>经典的游戏永不过时哦</div>
                  <el-button type="primary" round>限时免费，去使用</el-button>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <div class="desc-text right-text">
                  <div class="desc-title">礼从天降红包雨</div>
                  <div class="desc-subtitle">惊喜红包掉下来啦，既考验眼力，又考验手速<br> 简单好上手，拉新、促活一级棒哦~ </div>
                  <el-button type="primary" round>限时免费，去使用</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <img class="left-img" src="~@/assets/home_images/rainredpackage.png" alt="">
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <img src="~@/assets/home_images/scratchcard.png" alt="">
              </el-col>
              <el-col :span="12">
                <div class="desc-text">
                  <div class="desc-title">惊喜刮刮乐</div>
                  <div class="desc-subtitle">拉关注，返好评奖励……再也不用花钱<br>复印啦，引导用户到公众号回复参与线上刮刮乐<br>不但省成本，还能攒用户 </div>
                  <el-button type="primary" round>限时免费，去使用</el-button>
                </div>
              </el-col>
            </el-row>
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
      bannerdesc: require('@/assets/home_images/bannerdesc.png')
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
.banner{
    width: 100%;
    height: auto;
    background: url(~@/assets/home_images/banner.png) no-repeat center center;
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
    padding-top:65px;
    .activity-desc{
      font-family:Source Han Sans CN;
      width:1200px;
      margin: 0 auto;
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
.el-row {
  margin-top:80px;
}
</style>
