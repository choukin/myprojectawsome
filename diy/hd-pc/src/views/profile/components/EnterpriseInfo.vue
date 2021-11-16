<template>
  <el-form ref="enterpriseInfoForm" label-position="left" :model="enterpriseInfo" :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="企业名称:" prop="name">
      <el-input v-model="enterpriseInfo.name" placeholder="请输入企业名称" />
    </el-form-item>
    <el-form-item label="企业信用代码:" prop="account">
      <el-input v-model="enterpriseInfo.account" placeholder="请输入企业信用代码" />
    </el-form-item>
    <el-form-item label="注册主体:" prop="theam">
      <el-radio-group v-model="enterpriseInfo.theam">
        <el-radio label="0">企业</el-radio>
        <el-radio label="1">组织结构</el-radio>
        <el-radio label="2">个体户</el-radio>
        <el-radio label="3">学生</el-radio>
        <el-radio label="4">其他个人</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="所在行业:" prop="inIndustry">
      <el-select v-model="enterpriseInfo.inIndustry" placeholder="请选择活动岗位">
        <el-option label="电商" value="电商" />
        <el-option label="政府" value="政府" />
      </el-select>
    </el-form-item>
    <el-form-item label="企业注册时间:" required>
      <el-col :span="11">
        <el-form-item prop="registerTime">
          <el-date-picker
            v-model="enterpriseInfo.registerTime"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="注册者职位:" prop="position">
      <el-select v-model="enterpriseInfo.position" placeholder="请选择活动区域">
        <el-option label="老板" value="老板" />
        <el-option label="员工" value="员工" />
      </el-select>
    </el-form-item>
    <el-form-item label="企业规模:" prop="scale">
      <el-radio-group v-model="enterpriseInfo.scale">
        <el-radio label="0">1-10人</el-radio>
        <el-radio label="1">11-50人</el-radio>
        <el-radio label="2">51-100人</el-radio>
        <el-radio label="3">101人以上</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-link type="warning" icon="el-icon-warning">为方便重要信息可及时通知您，建议您填写以下信息（将进行保密处理，您可放心填写</el-link>
    </el-form-item>
    <el-form-item label="负责人:" prop="personInCharge">
      <el-input v-model="enterpriseInfo.personInCharge" />
    </el-form-item>
    <el-form-item label="联系电话:" prop="personInChargePhone">
      <el-input v-model="enterpriseInfo.personInChargePhone" />
    </el-form-item>
    <el-form-item label="固定电话:" prop="fixedTelephone">
      <el-input v-model="enterpriseInfo.fixedTelephone" />
    </el-form-item>
    <el-form-item label="联系地址:" prop="address">
      <el-input v-model="enterpriseInfo.address" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleUpdateEnterpriseInfo">更新</el-button>
      <el-button @click="resetForm('enterpriseInfoForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
import { fetchEnterpriseInfo, updateEnterpriseInfo } from '@/api/enterpriseInfo'
export default {
  data() {
    return {
      enterpriseInfo: {
        account: '', // 账号
        theam: '', // 主题 0 企业 1 组织结构 2 个体户 3 学生 4 其他个人 政府、媒体、企业、其他组织、个人
        name: '', // 名字
        inIndustry: '', // 所属行业
        registerTime: '', // 注册时间
        position: '', // 位置
        personInCharge: '', // 负责人
        personInChargePhone: '', // 负责人电话
        fixedTelephone: '', // 固话
        address: '', // 地址
        scale: '', // 0 1-10人 1 11-50人 2 51-100  3 101以上
        id: '' // id
      },
      rules: {
        account: [{ required: true, trigger: 'blur', message: '请输入企业账号' }],
        theam: [{ required: true, trigger: 'blur', message: '请选择注册主体' }],
        name: [{ required: true, trigger: 'blur', message: '请输入企业名称' }],
        inIndustry: [{ required: true, trigger: 'blur', message: '请输入所在行业' }],
        registerTime: [{ required: true, trigger: 'blur', message: '请输入注册时间' }],
        personInCharge: [{ required: true, trigger: 'blur', message: '请输入负责人姓名' }],
        scale: [{ required: true, trigger: 'blur', message: '请选择企业规模' }]

      },
      avatarPrefix,
      carouselPrefix
    }
  },
  created() {
    this.fetchEnterpriseInfo()
  },
  methods: {
    fetchEnterpriseInfo() {
      fetchEnterpriseInfo()
        .then(info => {
          this.enterpriseInfo = info.data
        })
    },
    handleUpdateEnterpriseInfo() {
      this.$refs.enterpriseInfoForm.validate(valid => {
        if (valid) {
          updateEnterpriseInfo(this.enterpriseInfo)
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
