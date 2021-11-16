<template>
<div ref="chartdom"  ></div>
</template>

<script>
import  echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title'
import {addListener, removeListener} from 'resize-detector'
import {debounce} from 'lodash'
export default {
    props:{
        option:{
            type: Object,
            default:()=>{}
        },
    },
    watch:{
        option(val) {
            this.chart.setOption(val)
        }  
        // option:{
        //     handler(val) {
        //         this.chart.setOption(val)
        //     },
        //     deep: true
        // }
    },
    created() {
        console.log('debounce',debounce);
        this.resize = debounce(this.resize, 300)
    },
    mounted(){
    this.renderChart()
    addListener(this.$refs.chartdom, this.resize)
    },
 beforeDestory() {
    removeListener(this.$refs.chartdom, this.resize)
    this.chart.dispose()
    this.chart = null
 },
 methods:{
     resize(){
         this.chart.resize()
     },
     renderChart() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(this.$refs.chartdom);
        this.chart.setOption(this.option)
     }
 }
}
</script>

<style>

</style>