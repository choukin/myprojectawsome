<template>
    <div>分析
        {{$t('message')['app.dashboard.analysis.timeLabel']}}
        <a-date-picker></a-date-picker>
        <chart :option="chartOptions" style="height:400px;"/>
        <pre v-highlightjs="chartCode">
            <code class="html"></code>
        </pre>
    </div>
</template>
<script>
import Chart from '@/components/Chart';
// import axios from 'axios';
import request from '@/utils/request'
import chartCode from '!!raw-loader!../../components/Chart.vue'
export default {
    components:{
        Chart
    },
    data(){
        return {
            chartCode,
            chartOptions:{
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                    }
                ]
                }
        }
    },
    mounted(){
        this.getChartDate()
        this.interval = setInterval(()=>{
            this.getChartDate()
        },3000)
        console.log(this.$t('message'));
    },
    methods:{
        getChartDate(){
            request({
                method:"get",
                url: '/api/dashboard/chart',
                params:{
                    ID:123456
                }
            })
            .then(res => {
                console.log(this.chartOptions.series.data);
                this.chartOptions.series[0].data = res.data
                this.chartOptions = {...this.chartOptions}
            })
        }
        
    },
    beforeDestory(){
        clearInterval(this.interval)
    }
}
</script>