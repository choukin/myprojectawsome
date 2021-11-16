<template>
  <van-form validate-first @submit="onSubmit">
    <!-- 通过 pattern 进行正则校验 -->
    <van-field label="奖励名称" :value="prizeInfo.name" readonly />

    <!-- 通过 validator 进行函数校验 -->
    <van-field
      :value="prizeInfo.type==='0'?'优惠卡':'实物'"
      label="类型"
      readonly
    />
    <van-field
      v-model="reciveName"
      label="收件人姓名"
      name="reciveName"
      maxlength="50"
      placeholder="请输入姓名"
      :rules="[{ required: true, message: '请输入正确内容' }]"
    />
    <van-field
      v-model="recivePhone"
      label="收件人手机号"
      name="recivePhone"
      maxlength="11"
      placeholder="请输入手机号"
      :rules="[{ pattern, message: '请输入正确内容' }]"
    />
    <van-field
      v-model="reciveAddress"
      rows="1"
      autosize
      type="textarea"
      label="收件人地址"
      name="reciveAddress"
      placeholder="请输入邮寄地址"
      :rules="[{ required: true, message: '请输入正确内容' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { saveRecordMemberPrize } from '@/mobile/api'
import { Form, Button, Field, Notify } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field
  },
  data: function() {
    return {
      id: '',
      reciveName: '',
      recivePhone: '',
      reciveAddress: '',
      pattern: /1\d{10}/
    }
  },
  computed: {
    ...mapGetters(['prizeInfo'])
  },
  methods: {
    onSubmit(address) {
      delete address.undefined
      address.id = this.prizeInfo.id
      this.saveRecordMemberPrize(address)
    },
    saveRecordMemberPrize(address) {
      saveRecordMemberPrize(address).then(res => {
        Notify({
          type: 'success',
          message: '提交成功，请耐心等待',
          onClose: () => {
            this.$router.back()
          }
        })
      })
    }
  }

}
</script>

<style lang="scss">

</style>
