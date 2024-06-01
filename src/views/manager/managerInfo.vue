
<template>
  <div>
      <div  style="width:14%;height: 130px;border-radius: 100px;display:inline-block;">
        <img
          style="width:100%;height: 100%;border-radius: 100px"
          src="/src/assets/moren.jpg"
          class="image"
        >
      </div>
   
    <br>
    <br>
    <el-descriptions :column="1" border>
   
      <el-descriptions-item label="用户名" v-model="username" ><p class="message">{{data.username}}</p></el-descriptions-item>
      <el-descriptions-item label="邮箱号" v-model="email" class="message"><p class="message">{{data.email}}</p></el-descriptions-item>
    
      <el-descriptions-item label="座右铭" v-model="motto" class="message" ><p class="message">{{data.motto}}</p></el-descriptions-item>
      <el-descriptions-item label="居住地" v-model="city" class="message"><p class="message">{{data.city}}</p></el-descriptions-item>
   
    </el-descriptions>
  </div>
 <div>
 </div>
  </template>
   
   <script setup>
  import { ref, reactive, } from 'vue'
import { ElMessage } from 'element-plus';
import request from '@/utils/request';		
import { useRoute } from 'vue-router';


// const route = useRoute()
// const d=JSON.parse(route.query.d)
const inf={
    username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
        motto: sessionStorage.getItem('motto'),
        city: sessionStorage.getItem('city')
  }
// console.log(inf);
// function a(){

// }
//  a()    
  const data = reactive({
       username: inf.username,
      email: inf.email,
        motto:inf.motto,
        city: inf.city
    })

    

  </script> 
   
  <style scoped>
  .message{
    width: 20em;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  </style>