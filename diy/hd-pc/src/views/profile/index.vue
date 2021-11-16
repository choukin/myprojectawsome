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
              <span>设置</span>
            </div>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="企业信息" name="activity">
                <enterpriseInfo />
              </el-tab-pane>
              <el-tab-pane label="公众号管理" name="timeline">
                <offiaccountList />
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
// import UserCard from './components/UserCard'
import EnterpriseInfo from './components/EnterpriseInfo'
// import Timeline from './components/Timeline'
// import Offiaccount from './components/Offiaccount'
import OffiaccountList from './components/OffiaccountList'
import Account from './components/Account'

export default {
  name: 'Profile',
  // UserCard
  components: { EnterpriseInfo, Account, OffiaccountList },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  }
}
</script>
