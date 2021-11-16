<template>
  <el-form ref="useracount" :model="user" size="small" label-position="left" label-width="100px" :rules="rules">
    <el-form-item label="用户昵称" prop="username">
      <el-input v-model.trim="user.username" maxlength="30" />
    </el-form-item>
    <el-form-item label="登录账号" prop="phone">
      <el-input
        v-model.trim="user.phone"
        maxlength="11"
        :disabled="editflag"
      /><el-tag v-if="editflag" type="info">如需修改手机号，请联系客服。</el-tag>
    </el-form-item>
    <el-form-item label="头像" prop="face">
      <Upload v-model="user.face" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getInfo, updateUserInfo } from '@/api/user'
import Upload from '@/components/Upload/SingleImage'

export default {
  components: {
    Upload
  },
  // props: {
  //   user: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         name: '',
  //         email: ''
  //       }
  //     }
  //   }
  // },
  data() {
    return {
      editflag: false,
      user: {
        username: '',
        account: '',
        face: '',
        phone: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户昵称' }],
        phone: [{ required: true, pattern: /^1[3456789]\d{9}$/, trigger: 'blur', message: '请输入正确的手机号' }]
      }
    }
  },
  created() {
    getInfo().then(res => {
      this.user = res.data
      if (this.user.phone) {
        this.editflag = true
      }
    })
  },
  methods: {
    submit() {
      this.$refs.useracount.validate((valid) => {
        if (valid) {
          updateUserInfo(this.user).then(res => {
            this.$store.commit('user/SET_AVATAR', this.user.face)
            this.editflag = true
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          })
        }
      })
    }
  }
}
</script>
