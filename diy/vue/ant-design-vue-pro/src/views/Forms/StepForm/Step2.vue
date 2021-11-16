<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item label="付款账户" 
      :labelCol="formItemLayout.labelCol"
      :wrapperCol="formItemLayout.wrapperCol"
      >
      {{step.payAccount}}
      </a-form-item>
      <a-form-item label="密码" 
      :labelCol="formItemLayout.labelCol"
      :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['password',{
        initialValue: '',
        rules:[{required:true,message:'请输入密码'}]
      }]" 
      type="password"
      placeholder="请输入密码"></a-input>
      </a-form-item>
      <a-form-item  :wrapperCol="formItemLayout.wrapperCol">
        <a-button  @click="handleSubmit" style="margin-right:8px">提交</a-button>
        <a-button type="primary" @click="handlePre">上一步</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
export default {
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
    handlePre(){
      this.$router.push('/form/step-form/info')
    },
    handleSubmit(){
      const {form, $store } = this
      console.log($store);
      form.validateFields((error,data)=>{
        if(!error){
          $store.dispatch({
            type:'form/submitStepForm',
            payload:{
              ...this.step,
              ...data
              }
          })
          // $router.push('/form/step-form/confirm')
        }
      })
    }
  }
}
</script>

<style>

</style>