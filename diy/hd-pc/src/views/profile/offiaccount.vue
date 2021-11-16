<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="officialAccountForm" label-position="left" :model="officialAccount" :rules="rules" label-width="140px" class="demo-ruleForm">
        <el-form-item label="公众号名称:" prop="name">
          <el-input v-model="officialAccount.name" />
        </el-form-item>
        <el-form-item label="公众号原始id:" prop="initId">
          <el-input v-model="officialAccount.initId" />
        </el-form-item>
        <el-form-item label="微信号:" prop="wechatAccount">
          <el-input v-model="officialAccount.wechatAccount" />
        </el-form-item>

        <el-form-item label="头像:" prop="face">
          <Upload v-model="officialAccount.face" />
        </el-form-item>

        <el-form-item label="APPID（公众号）:" prop="appId">
          <el-input v-model="officialAccount.appId" />
        </el-form-item>
        <el-form-item label="App secret：" prop="appSecret">
          <el-input v-model="officialAccount.appSecret" />
        </el-form-item>
        <el-form-item label="公众号二维码:" prop="qrCodeImg">
          <Upload v-model="officialAccount.qrCodeImg" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdateofficialAccount">更新</el-button>
          <el-button @click="resetForm('officialAccountForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { fetchOfficialAccount, updateOfficialAccount } from '@/api/officialAccount'
import Upload from '@/components/Upload/SingleImage'

export default {
  components: {
    Upload
  },
  data() {
    return {
      id: '',
      officialAccount: {
        name: '',
        initId: '',
        wechatAccount: '',
        face: '',
        appId: '',
        appSecret: '',
        qrCodeImg: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入公众号名称' }],
        initId: [{ required: true, trigger: 'blur', message: '请输入公众号原始id' }],
        wechatAccount: [{ required: true, trigger: 'blur', message: '请输入微信号' }],
        appId: [{ required: true, trigger: 'blur', message: '请输入公众号APPID' }],
        qrCodeImg: [{ required: true, trigger: 'blur', message: '请上传公众号二维码' }]
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this.fetchOfficialAccount()
    }
  },
  methods: {
    fetchOfficialAccount() {
      fetchOfficialAccount({ id: this.id })
        .then(info => {
          this.officialAccount = info.data
        })
    },
    handleUpdateofficialAccount() {
      this.$refs.officialAccountForm.validate(valid => {
        if (valid) {
          updateOfficialAccount(this.officialAccount)
            .then(res => {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
            }).catch(e => {
              this.$message({
                message: '更新失败',
                type: 'error'
              })
              console.error(e)
            })
        }
      })
    },
    handleAvatarSuccess() {

    },
    beforeAvatarUpload() {

    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
