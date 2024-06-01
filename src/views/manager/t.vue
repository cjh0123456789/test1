<template>
    <div>
        <div ref="lineChart" style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"></div>
    </div>
</template>
 
<script>
import * as echarts from 'echarts'
import axios from 'axios';
import {ref,reactive,onMounted} from 'vue'

export default {

    data() {
    return {
     
      daa:[]
    }
  },

    methods:{
        
        getData1() {
      axios
        .get("http://localhost:8080/manager/selectMonth")
        .then(
          response => {
            for(var i=0;i<response.data.length;i++){
                this.daa[response.data[i].reporttime-1]=response.data[i].count
            }
            this.lineChart = echarts.init(this.$refs.lineChart)
           this.lineChart.setOption({
            title: {
                text: '评价数据分析'
            },
            // 提示框
            tooltip: {
                trigger: 'axis'
            },
            // 图例
            legend: {
                icon: 'circle',
                left: 'center',
                top: 0,
                data: ['投诉数量']
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            // 工具栏
            toolbox: {
                feature: {
                    saveAsImage: {
                        type: 'png'
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack']
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '投诉数量',
                    type: 'line',
                    // smooth: true, // 平滑曲线显示
                    data: this.daa
                },
             
             
            ]
        })
          }
        )
        }




    },
    mounted() {
        this.getData1()
    }
}
</script>