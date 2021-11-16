<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item label="付款账户" 
      :labelCol="formItemLayout.labelCol"
      :wrapperCol="formItemLayout.wrapperCol"
      >
      <a-input v-decorator="['payAccount',{
        initialValue: step.payAccount,
        rules:[{required:true,message:'请输入付款账户'}]
      }]" placeholder="请输入付款账户"></a-input>
      </a-form-item>
      <a-form-item label="收款账户" 
      :labelCol="formItemLayout.labelCol"
      :wrapperCol="formItemLayout.wrapperCol"
      >
      <RecevierAccount v-decorator="['recevierAccount',{
        initialValue: step.recevierAccount,
        rules:[{required:true,message:'请输入收款账户',
        validator:(rule,value,callback)=>{
          if(value&& value.number){
            callback()
          } else{
            callback(false)
          }
        }}]
      }]" placeholder="请输入收款账户"></RecevierAccount>
      </a-form-item>      
      <a-form-item  :wrapperCol="formItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">第一步</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import RecevierAccount from '@/components/RecevierAccount'
export default {
  components:{
    RecevierAccount
  },
  data() {
    this.form = this.$form.createForm(this)
    return {
    formItemLayout:{
      labelCol:{span:4},
      wrapperCol:{span:14}
    }
    }
  },
  computed: {
    step() {
      return this.$store.state.form.step
    }
  },
  methods:{
    handleSubmit(){
      const {form, $router, $store } = this
      form.validateFields((error,data)=>{
        if(!error){
          $store.commit({
            type:'form/saveStepFormData',
            payload:data
          })
          $router.push('/form/step-form/confirm')
        }
      })
    }
  }
}
</script>

<style>

</style>