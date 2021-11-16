<template>
  <a-form-model :layout="form.layout" :model="form" v-bind="formItemLayout">
    <a-form-model-item label="Form Layout">
      <a-radio-group v-model="form.layout">
        <a-radio-button value="horizontal">
          Horizontal
        </a-radio-button>
        <a-radio-button value="vertical">
          Vertical
        </a-radio-button>
        <a-radio-button value="inline">
          Inline
        </a-radio-button>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="Field A" 
      :validateStatus="filedAStatus" 
      :help="fieldAHelp">
      <a-input v-model="form.fieldA" placeholder="input placeholder" />
    </a-form-model-item>
    <a-form-model-item label="Field B">
      <a-input v-model="form.fieldB" placeholder="input placeholder" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSumit">
        Submit
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    this.demoform = this.$from.createForm(this)
    return {
      form: {
        layout: 'horizontal',
        fieldA: '',
        fieldB: '',
      },
      filedAStatus:'',
      fieldAHelp:'',
    };
  },
  watch:{
    "form.fieldA": function(val){
        if(val && val.length <= 5) {
          this.filedAStatus = 'error'
          this.fieldAHelp = '必须大于5个字符'
        } else {
          this.filedAStatus = ''
          this.fieldAHelp =''
        }
      }
  },
  computed: {
    formItemLayout() {
      const { layout } = this.form;
      return layout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { layout } = this.form;
      return layout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    }
  },
  methods: {
    handleSumit() {
      const val = this.form.fieldA
      if(val && val.length <= 5) {
          this.filedAStatus = 'error'
          this.fieldAHelp = '必须大于5个字符'
        } else {
          console.log(this.form);
        }
    }
  }
};
</script>
