<template>
    <div>
        <div  ref="lineChart" style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;  "></div>
    </div>
    <div>
      <div ref="myChart" style="width: 400px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"></div>
     <el-form :data="formData">
      <el-form-item prop="hh" label="分析">{{data}}</el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import * as echarts from 'echarts'
import axios from 'axios';
import {ref,reactive,onMounted} from 'vue'

export default {

    data() {
    return {
        formData:ref([]),
      data:{},
      daa:[]
    }
  },

    methods:{
        analyse(an,bn){
      this.formData.value=[]
      
    
      var conclusion=''
      if(an/bn>0.3)
      {
       conclusion=`根据分析得,点赞/观看比${an/bn}，没问题`
     
      }
      else{
       conclusion=`根据分析得，点赞/观看比${an/bn}，有问题`
       
       
      }
     this.data=conclusion
  
    // this.formData.value.push(data)
      
    },
        
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
        },
        getData() {
      axios
        .get("http://localhost:8080/manager/selectL")
        .then(
          response => {
            const a=response.data.like
            const b=response.data.play
            this.analyse(a,b)
            this.myChart = echarts.init(this.$refs.myChart)
            this.myChart.setOption({
          title: {
              text: a+b,
              subtext: '总数',
              left: 'center',
              top: '43%',
              subtextStyle: {
                fontSize: 18
              }
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              icon: 'circle',
              top: '0',
              left: 'right'
          },
          series: [
              {
                  name: '数量统计',
                  type: 'pie',
                  radius: ['40%', '55%'],
                  label: {
                      show: true,
                      padding: [0, -60],
                      overflow: 'none',
                      fontSize: '15',
                      fontWeight: 'bold',
                      formatter: '{d}%\n\n{c}'
                  },
                  labelLine: {
                      show: true,
                      length: 15,
                      length2: 60
                  },
                  itemStyle: {
                      normal: {
                          color: function (params) {
                              var colorList = ['#4FC3F7', '#00C853', '#F57F17']
                              return colorList[params.dataIndex]
                          }
                      }
                  },
                  data: [
                      { name: '点赞数', value: a },
                      { name: '观看数', value: b},
                      // { name: '差评', value: 180 }
                  ]
              }
          ]
      })
 
          }

	

);
    }




    },
    mounted() {
        this.getData1()
        this.getData()
    }
}
</script>