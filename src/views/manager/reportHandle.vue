<script setup>
import { buttonEmits } from 'element-plus'
import {ref,reactive,onMounted} from 'vue'
import request from '@/utils/request';	
import axios from 'axios';
import { useRouter } from 'vue-router';
// tableData-表格数据列表，total-数据总长度
const tableData=ref([])
const tableData2=ref([])
const total=ref(0)
// searchData-向后端分页查询的对象，即当前页和每页总数
const searchData=reactive({
	current:1,
	limit:10
})
function tableAddData2(){
  axios
        .get("http://localhost:8080/manager/baned")
        .then(
          response => {

		
      
    
	var index=0
  
	tableData2.value=[]
 
	for(var i=0;i<response.data.length;i++){
   
		let data={}
		data.reason=response.data[i].reportreason
    // data.name=response.data[i].userid
	data.hh=response.data[i].videoid
		data.data=`视频内容：${response.data[i].video}`
		data.handle='<button>hh</button>'
		tableData2.value.push(data)
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



//表格数据生成
function tableAddData(){
  axios
        .get("http://localhost:8080/manager/report")
        .then(
          response => {
 
 
      
            	//给表格添加数据
	var index=0
 
	tableData.value=[]
 
	for(var i=0;i<response.data.length;i++){
   
		let data={}
		data.reason=response.data[i].reportreason
    data.name=response.data[i].userid
    data.hh=response.data[i].videoid
		data.data=`视频内容：${response.data[i].video}`
		data.handle='<button>hh</button>'
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

	let begin=current*limit-limit

	let end=current*limit
	tableData.value=tableData.value.slice(begin,end)
}
function getData(val = 1){
	searchData.current=val
	// 把数据搞上
	tableAddData()
	tableAddData2()
	pageQuery(searchData.current,searchData.limit)
}
 

onMounted(async()=>{
	getData()
})


const handleClick = (e) => {
  console.log('click')
  console.log(e)
  request.post("/manager/ban", e).then(res => {
      
     
   
  });
}
    
const router = useRouter();
const message = (e) => {
  const inf={
    username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
        motto: sessionStorage.getItem('motto'),
        city: sessionStorage.getItem('city'),
        password:sessionStorage.getItem('password'),
        id:e.hh,
        reason:e.reason
  }
  
    router.push({
           
           name:'audit',
         query :{
           d:JSON.stringify(inf)
              
           }
           
         
       })
 
}
const deblocking = (e) => {
	console.log(e)

   request.post("/manager/deblocking", e).then(res => {
   
  });
         
   
 
}

 

</script>
<template>
	
      
      <strong>举报受理中心</strong>
<div>
	<el-table :data="tableData" style="width: 100%">
	    <el-table-column prop="reason" label="举报原因" width="180" />
	    <el-table-column prop="data" label="具体内容" width="180" />
	
		<el-table-column fixed="right" label="处理情况" width="200">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="handleClick(scope.row.hh)"
        >
         封禁
        </el-button>
  
    
		
          <el-button link type="primary" size="small" @click="message(scope.row)">回复</el-button>
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



 
<strong>封禁视频中心</strong>
<div>
	<el-table :data="tableData2" style="width: 100%">
	    <el-table-column prop="reason" label="举报原因" width="180" />
	    <el-table-column prop="data" label="具体内容" width="180" />
	
		<el-table-column fixed="right" label="处理情况" width="200">
      <template #default="scope">
       
        <el-button link type="primary" size="small" @click="deblocking(scope.row.hh)">解封</el-button>
         
		
       
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