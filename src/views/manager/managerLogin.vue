<template>
  <div class="login-body">
      <div class="login-panel">
          <div class="login-title">用户登录</div>
          <el-form :model="formData" :rules="rules" ref="formDataRef">
              <el-form-item prop="username">
                  <el-input placeholder="请输入账号" v-model="formData.username" size="large" type="text">
                      <template #prefix>
                          <el-icon>
                              <User />
                          </el-icon>
                      </template>
                  </el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input placeholder="请输入密码" v-model="formData.password" size="large" type="password">
                      <template #prefix>
                          <el-icon>
                              <Lock />
                          </el-icon>
                      </template>
                  </el-input>
              </el-form-item>
          
              <el-form-item label="">
                  <el-button type="primary" style="width: 100%;" @click="login()" size="large">登录</el-button>
              </el-form-item>
              <el-form-item label="">
                  <el-button  style="width: 100%;" @click="$router.push('/register')" size="large">注册</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive, } from 'vue'
import { ElMessage } from 'element-plus';
import request from '@/utils/request';		
import { useRouter } from 'vue-router';

            
        
  


// const checkCodeUrl = "api/checkCode?" + new Date().getTime();
//表单
const formDataRef = ref();
let formData = reactive({
  username: "",
  password: ""
});
const rules = {
  username: [{
      required: true,
      message: "请输入用户名"
  }],
  password: [{
      required: true,
      message: "请输入密码"
  }],

}
const router = useRouter();

const login =() => {
  var form_obj = JSON.parse(JSON.stringify(formData));

 
   request.post("/manager/login", form_obj).then(res => {
const da={
               name:res.manageName,
               password:res.managePassword,
               email: res.email,
               motto:res. motto,
               city:res.livePlace,
}
    
    if(res.manageName){

    router.push({
           
           name:'info',
         query :{
           d:JSON.stringify(da)
              
           }
           
         
       })
      
    }
    else{
        alert('输出信息有误')
    }
});
}
     
        
  

</script>

<style lang="scss" scoped >
.login-body {
  background: url("src/assets/managerLogin.gif") no-repeat center center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;

  .login-panel {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;

      padding: 25px;
      width: 26%;
      min-width: 460px;
      height: 30%;
      min-height: 300px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 5%;
      box-shadow: 2px 2px 10px #ddd;

      .login-title {
          font-size: 22px;
          text-align: center;
          margin-bottom: 22px;
      }
  }
}
</style>