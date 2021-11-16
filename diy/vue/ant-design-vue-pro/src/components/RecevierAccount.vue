<template>
   <a-input-group compact>
      <a-select v-model="type" style="width:130px;" @change="handleTypeChange">
        <a-select-option value="lipay">
         支付宝
        </a-select-option>
        <a-select-option value="bank">
          银行
        </a-select-option>
      </a-select>
      <a-input style="width: calc(100% - 130px)" v-model="number" @input="handleNumberChange"/>
    </a-input-group>
</template>

<script>
export default {
 props:{
     value:{
         type:Object
     }
 },
 data(){
     const {type="alipay",number=""} = this.value||{}
     return {
         type,
         number
     }
 },
 watch: {
     value(val){
         Object.assign(this.$data, val)
     }
 },
 methods:{
     handleTypeChange(value){
         this.$emit('change',{...this.$data, type:value})
     },
     handleNumberChange(e){
         debugger
         this.$emit('change',{...this.$data, number:e.target.value})
     }
 }
}
</script>

<style>

</style>