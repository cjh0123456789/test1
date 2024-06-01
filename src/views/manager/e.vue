<template>
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
      data:{}
    }
  },
 
  methods:{
    analyse(an,bn){
      this.formData.value=[]
      
    
      var conclusion=''
      if(an/bn>0.5)
      {
       conclusion=`根据分析得${an/bn}，没问题`
     
      }
      else{
       conclusion=`根据分析得${an/bn}，有问题`
       
       
      }
     this.data=conclusion
  
    // this.formData.value.push(data)
      
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
                  name: '咨询数量',
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
    this.getData()
      
  }
}
</script>