<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="officialAccountForm" :model="officialAccount" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="选择创建的公众号：" prop="officialAccountId">
          <el-select v-model="officialAccount.officialAccountId" placeholder="请选择公众号">
            <el-option
              v-for="item in officialAccountDataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称：" prop="name">
          <el-input v-model="officialAccount.name" />
        </el-form-item>
        <el-form-item label="活动触发的关键词：" prop="keyWord">
          <el-input v-model="officialAccount.keyWord" />
        </el-form-item>
        <el-form-item label="海报合成前提示语：" prop="beforeText">
          <el-input v-model="officialAccount.beforeText" />
        </el-form-item>
        <el-form-item label="海报合成后提示语：" prop="afterText">
          <el-input v-model="officialAccount.afterText" />
        </el-form-item>
        <el-form-item label="每人每天触发次数：" prop="touchLimitCount">
          <el-input v-model.number="officialAccount.touchLimitCount" />
        </el-form-item>
        <el-form-item label="超出限制后提示：" prop="limitText">
          <el-input v-model="officialAccount.limitText" />
        </el-form-item>

        <el-form-item label="上传海报二维码" prop="qrCodeImg">
          <Upload v-model="officialAccount.qrCodeImg" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{ buttonText }}</el-button>
          <el-button @click="resetForm('officialAccountForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { fetchOfficialAccountList } from '@/api/officialAccount'
import { addOrUpdateOfficialAccount, fetchActivityDetailByCode } from '@/api/activity'
import Upload from '@/components/Upload/SingleImage'

export default {
  name: 'ActivityEdit',
  components: {
    Upload
  },
  data() {
    return {
      buttonText: '保存',
      officialAccountQuery: {
        startPage: 1,
        pageSize: 10
      },
      officialAccountDataList: [],
      rules: {
        officialAccountId: [{ required: true, trigger: 'blur', message: '请输入公众号名称' }],
        name: [{ required: true, trigger: 'blur', message: '请输入活动名称' }],
        keyWord: [{ required: true, trigger: 'blur', message: '请输入关键字' }],
        beforeText: [{ required: true, trigger: 'blur', message: '请输入海报生成前提示语' }],
        afterText: [{ required: true, trigger: 'blur', message: '请输入海报生成后提示语' }],
        touchLimitCount: [{ required: true, trigger: 'blur', message: '请输入每人每天触发次数' },
          { type: 'number', message: '次数必须为数字值' }],
        limitText: [{ required: true, trigger: 'blur', message: '请输入超出限制后提示' }],
        qrCodeImg: [{ required: true, trigger: 'blur', message: '请上传公众号二维码' }]
      },
      officialAccount: {
        activityCode: '',
        officialAccountId: '',
        keyWord: '',
        beforeText: '',
        afterText: '',
        limitText: '',
        touchLimitCount: '',
        qrCodeImg: ''
      }
    }
  },
  created() {
    this.officialAccount.activityCode = this.$route.query.activityCode
    this.fetchOfficialAccountList()
    if (this.officialAccount.activityCode) {
      this.buttonText = '更新'
      this.fetchActivityDetail()
    }
  },
  methods: {

    submitForm() {
      this.$refs.officialAccountForm.validate((valid) => {
        if (valid) {
          addOrUpdateOfficialAccount(this.officialAccount).then(data => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            // this.fetchPrizes()
            this.updataStoreFormVisible = false
            this.$router.push('/myactivity/index')
          }).catch(e => {
            console.error(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchActivityDetail() {
      fetchActivityDetailByCode(this.officialAccount.activityCode)
        .then(res => {
          this.officialAccount = res.data
        })
    },
    fetchOfficialAccountList() {
      fetchOfficialAccountList(this.officialAccountQuery)
        .then(res => {
          this.officialAccountDataList = res.data.list
          console.log(this.officialAccountDataList)
        })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
