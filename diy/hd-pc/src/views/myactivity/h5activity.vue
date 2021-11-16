<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <!-- <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col> -->

        <el-col :span="24" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>{{ desctext }}{{ officialH5activity.activityType | filterType }}H5活动</span>
              <el-button size="mini" style="float:right;" type="primary" @click="submitForm">{{ buttonText }}</el-button>
            </div>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="基础信息" name="account">
                <baseInfo :official-account-data-list="officialAccountDataList" :official-h5activity="officialH5activity" />
              </el-tab-pane>
              <el-tab-pane label="奖品设置" name="activity">
                <prizeInfo :official-h5activity="officialH5activity" />
              </el-tab-pane>
              <el-tab-pane label="分享设置" name="timeline">
                <shareInfo :official-h5activity="officialH5activity" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import shareInfo from './components/shareInfo'
import prizeInfo from './components/prizeInfo'
import baseInfo from './components/baseInfo'
// import { fetchOfficialAccountList } from '@/api/officialAccount'
import { addOrUpdateCommonAddOrUpdate, fetchActivityDetailByCode } from '@/api/activity'
export default {
  name: 'H5Activity',
  // UserCard
  components: { shareInfo, baseInfo, prizeInfo },
  filters: {
    filterType(type) {
      let typeName = ''
      switch (type) {
        case 100:
          typeName = '大转盘'
          break
        case 101:
          typeName = '红包雨'
          break
        case 102:
          typeName = '刮一刮'
          break
        default:
          break
      }
      return typeName
    }
  },
  data() {
    return {
      user: {},
      buttonText: '保存',
      desctext: '新建',
      activeTab: 'account',
      officialH5activity: {

        name: '',
        activityCode: '', // 活动code（更新时候需要）
        luckLimitKey: 'EVERY_DAY', // EVERY_DAY 每天参与活动 次数key  ACTIVITY_LIMIT 活动期间参与次数
        luckGetPrizeKey: 'EVERY_DAY_PRIZE', //	string EVERY_DAY_PRIZE 每天可中奖次数key  ACTIVITY_LIMIT_PRIZE 活动期间 可中奖次数KEY
        luckGetPrizeValue: '1',	// 每天/活动期间可中XX次奖品
        luckLimitValue: 1,
        isOpenShare: false, // 是否开启分享
        openShare: false,
        shareImg: '', // 分享图片
        rangeTime: [],
        endTime: '', // 结束时间
        startTime: '', // 开始时间
        activityDesc: '', // 活动描述
        activityType: '', // 活动类型100 大转盘 101 红包雨 102 刮一刮
        shareTitle: '', // 分享title
        shareContext: '', // 分享内容
        officialAccountId: '', // 公众号ID

        prizeLists: []
      },
      officialAccountDataList: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'h5activityDatas'
    ])
  },
  created() {
    this.officialH5activity.activityCode = this.$route.query.activityCode
    this.officialH5activity.activityType = Number(this.$route.query.activityType || '0')
    // this.fetchOfficialAccountList()
    if (this.officialH5activity.activityCode) {
      this.buttonText = '更新'
      this.desctext = '编辑'
      this.fetchActivityDetail()
    }
    // this.fetchActivityDetailByCode()
  },
  methods: {
    fetchActivityDetail() {
      fetchActivityDetailByCode(this.officialH5activity.activityCode)
        .then(res => {
          this.officialH5activity = res.data
          this.$set(this.officialH5activity, 'rangeTime', [this.officialH5activity.startTime, this.officialH5activity.endTime])
        })
    },
    // fetchOfficialAccountList() {
    //   fetchOfficialAccountList({ startPage: 1,
    //     pageSize: 100 })
    //     .then(res => {
    //       this.officialAccountDataList = res.data.list
    //       console.log(this.officialAccountDataList)
    //     })
    // },
    submitForm() {
      if (!this.officialH5activity.name) {
        this.$message({
          message: '请填写活动名称',
          type: 'error'
        })
        return
      }
      debugger
      if (this.officialH5activity.rangeTime && this.officialH5activity.rangeTime.length === 2) {
        const temp = this.officialH5activity.rangeTime
        this.officialH5activity.startTime = temp[0]
        this.officialH5activity.endTime = temp[1]
      } else {
        this.$message({
          message: '请选择活动时间',
          type: 'error'
        })
        return
      }

      // 大转盘奖品必须是8个
      if (Number(this.officialH5activity.activityType) === 100 && this.officialH5activity.prizeLists && this.officialH5activity.prizeLists.length !== 8) {
        this.$message({
          message: '当前配置的大转盘活动需要配置8个奖品',
          type: 'error'
        })
        return
      }

      const propms = { ...this.officialH5activity }
      delete propms.rangeTime
      delete propms.status
      addOrUpdateCommonAddOrUpdate(propms).then(data => {
        this.$message({
          message: `${this.desctext}成功`,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.$router.replace('/myactivity/index')
          }
        })
      }).catch(e => {
        console.error(e)
      })
    }
  }
}
</script>
