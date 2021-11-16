<template>
  <div class="dashboard-container">
    <el-row
      type="flex"
      class="row-bg"
      justify="space-between"
    >
      <el-col :span="6" @click.native="showQRcode">
        <el-card shadow="hover" class="home-item">
          <svg-icon icon-class="bangdinggongzhonghao" class-name="custom-class" @click="showQRcode" />
          绑定公众号
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="home-item" @click.native="scrollIntoView('gongzhongactivity')">
          <svg-icon icon-class="plusactivity" class-name="custom-class" />
          创建公众号活动
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="home-item" @click.native="scrollIntoView('h5activity')">

          <svg-icon icon-class="chuangjianH5" class-name="custom-class" />

          <el-link :underline="false">创建H5活动</el-link>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-button type="primary" size="small" @click="nativeTo('/profile/offiaccount')">绑定公众号</el-button> -->
    <el-table
      class="home-table"
      :data="officialAccountDataList"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="name"
        label="公众号名称"
        width="180"
      />
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        width="180"
      />
      <el-table-column
        align="center"
        prop="actCount"
        label="已创建活动个数"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-right:10px;"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>

          <el-popconfirm
            :title="'确定要删除【'+scope.row.name+'】公众号吗？'"
            icon="el-icon-info"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <h1 id="gongzhongactivity"><svg-icon icon-class="gongzhonghaohuodong" class-name="custom-class" />公众号活动</h1>
      <div class="flex-row">
        <el-card v-for="(item, index) in officialAccountActivityData" :key="index" :body-style="{ padding: '0px' }" class="home-card" shadow="hover">
          <img src="@/assets/home_images/itemicon.png" class="image">
          <div style="padding: 30px 0;">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <time class="time" />
              <el-button
                type="primary"
                round
                class="mt15"
                @click="gotoCreate('addactivity',item.activityType)"
              >创建</el-button>
            </div>
          </div></el-card>
      </div>
    </div>
    <div>
      <h1 id="h5activity"><svg-icon icon-class="H5yingxiaohuodong" class-name="custom-class" />H5营销活动</h1>
      <div class="flex-row">
        <el-card v-for="(item, index) in h5activityDatas" :key="index+item.activityType" :body-style="{ padding: '0px' }" class="home-card" shadow="hover">
          <img src="@/assets/home_images/itemicon2.png" class="image">
          <div style="padding: 30px 0;">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <el-button type="primary" round class="mt15" @click="gotoCreate('h5activity',item.activityType)">创建</el-button>
            </div>
          </div></el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchOfficialAccountList, deleteeOfficial } from '@/api/officialAccount'

export default {
  name: 'Dashboard',
  components: { },
  data() {
    return {
      officialAccountQuery: {
        startPage: 1,
        pageSize: 10
      },
      officialAccountDataList: [],
      tableData: [{
        date: '2020-06-19 12:03:00',
        name: '天堂海左岸',
        count: '2'
      }],
      currentRole: 'adminDashboard',
      officialAccountActivityData: [
        {
          name: '关键词回复',
          path: '',
          activityType: ''
        }
      ],
      h5activityDatas: [
        {
          name: '大转盘',
          path: '',
          activityType: '100'
        },
        {
          name: '红包雨',
          path: '',
          activityType: '101'
        },
        {
          name: '刮一刮',
          path: '',
          activityType: '102 '
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.fetchOfficialAccountList()
  },
  methods: {
    scrollIntoView(elemtnid) {
      document.getElementById(elemtnid).scrollIntoView()
    },
    nativeTo(routerName) {
      this.$router.push(routerName)
    },
    gotoCreate(routerPath, activityType) {
      this.$router.push(`/myactivity/${routerPath}?activityType=${activityType}`)
    },
    showQRcode() {
      window.open(`${process.env.VUE_APP_BASE_API}/user/loginwechat/auth/gotoAuthUrl`, '_blank')
      // this.$alert('请使用微信公众平台绑定的管理页微信号扫描', '微信公众平台账号授权', {
      //   confirmButtonText: '确定',
      //   callback: action => {

      //   }
      // })
    },
    fetchOfficialAccountList() {
      fetchOfficialAccountList(this.officialAccountQuery)
        .then(info => {
          this.officialAccountDataList = info.data.list
        })
    },
    handleEdit(index, row) {
      this.$router.push(`/profile/offiaccount?id=${row.id}`)
    },
    handleDelete(index, row) {
      deleteeOfficial(row.id)
        .then(res => {
          this.fetchOfficialAccountList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
    }
  }
}
</script>
<style lang="scss">
.mt15{
  margin-top: 15px;
}
  .home-item{
    cursor: pointer;
    .el-link--inner{
    font-size: 24px;
  }
  }
  .dashboard-container{
  .el-table{
    tr, th {
    background-color: #EAEFF5;
    }
  }
  }
</style>
<style lang="scss" scope>
.dashboard-container{
  padding:50px;
  font-family:Source Han Sans CN;
  .home-item{
    display: flex;
    justify-content: center;
    padding: 0;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(136,136,136,0.16);
    opacity:1;
    border-radius:4px;
    font-size:24px;
    font-weight:400;
    line-height:41px;
    color:#333;
  }
  .home-table{
    margin-top:25px;
  }
  .flex-row{
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
    .home-card{
    height: 300px;
    width:300px;
    box-sizing: border-box;
    text-align: center;
    padding:40px 0 0px 0;
    margin-right: 15px;

  }
  }
  .home-card{
    height: 300px;
    width:300px;
    box-sizing: border-box;
    text-align: center;
    padding:40px 0 0px 0;
  }
}
</style>
