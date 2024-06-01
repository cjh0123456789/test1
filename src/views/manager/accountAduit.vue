<script setup>
import { buttonEmits } from 'element-plus'
import {ref,reactive,onMounted} from 'vue'
import request from '@/utils/request';	
import axios from 'axios';
// tableData-表格数据列表，total-数据总长度
const tableData=ref([])
const total=ref(0)
// searchData-向后端分页查询的对象，即当前页和每页总数
const searchData=reactive({
	current:1,
	limit:2
})




//表格数据生成
function tableAddData(){
  axios
        .get("http://localhost:8080/manager/audit")
        .then(
          response => {
 
 
      
         
	var index=0

	tableData.value=[]
 
	for(var i=0;i<response.data.length;i++){
   
		let data={}
		data.id=i
    data.hh=response.data[i].videoid
		data.data=`视频内容：${response.data[i].videoid}`
		tableData.value.push(data)
		index+=1
	}
	total.value=index
          },
          response => {
            console.log("error");
            alert("请求失败");
          }
);


}
//传入分页参数
function pageQuery(current,limit){
	// 模仿分页查询，将表格的数据裁切一下
	
	
	let begin=current*limit-limit

	let end=current*limit
	tableData.value=tableData.value.slice(begin,end)
}
function getData(val = 1){
	searchData.current=val

	tableAddData()
	pageQuery(searchData.current,searchData.limit)
}
 

onMounted(async()=>{
	getData()
})


const Success = (e) => {

  request.post("/manager/cross", e).then(res => {
      
     
   
  });
}
const fail = (e) => {
console.log('ud'+e)
  request.post("/manager/fail", e).then(res => {
      
     
   
  });accountAduit.vue
}
    


</script>
<template>
	
      
      <strong>视频审核中心</strong>
<div>
	<el-table :data="tableData" style="width: 100%">
	    <el-table-column prop="id" label="原因" width="180" />
	    <el-table-column prop="data" label="具体内容" width="180" />
	
		<el-table-column fixed="right" label="处理情况" width="200">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="Success(scope.row.hh)"
        >
         通过
        </el-button>
  
          <el-button link type="primary" size="small"  @click.prevent="fail(scope.row.hh)">禁止</el-button>
	
        </template>
      </el-table-column>

	</el-table>

	<el-pagination
	:current-page="searchData.current"
	:page-size="searchData.limit"
	:total="total"
	:pager-count="6"
	style="text-align: center;margin-top: 20px;"
	layout="jumper, prev, pager, next, total"
	@current-change="getData" />



</div>


</template>
<style lang="less" scoped>

</style>