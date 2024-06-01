<template>
  <div class="login-body">
      <div class="login-panel">
          <div class="login-title">信息修改</div>
          <el-form :model="formData" :rules="rules" ref="formDataRef">
            <el-form-item prop="username">
                    <el-input placeholder="请输入账号" v-model="formData.username" size="large" type="text" :readonly="true">
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

              <el-form-item prop="liveplace">
                  <el-input placeholder="地址" v-model="formData.liveplace" size="large" type="liveplace">
                      <template #prefix>
                          <el-icon>
                              <Lock />
                          </el-icon>
                      </template>
                  </el-input>
              </el-form-item>

              <el-form-item prop="email">
                  <el-input placeholder="邮箱" v-model="formData.email" size="large" type="email">
                      <template #prefix>
                          <el-icon>
                              <Lock />
                          </el-icon>
                      </template>
                  </el-input>
              </el-form-item>

              <el-form-item prop="motto">
                  <el-input placeholder="个性签名" v-model="formData.motto" size="large" type="motto">
                      <template #prefix>
                          <el-icon>
                              <Lock />
                          </el-icon>
                      </template>
                  </el-input>
              </el-form-item>


          
              <el-form-item label="">
                  <el-button type="primary" style="width: 100%;" @click="register()" size="large">提交</el-button>
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

const inf={
    username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
        motto: sessionStorage.getItem('motto'),
        city: sessionStorage.getItem('city')
      
  }






const formDataRef = ref();
let formData = reactive({
  username: inf.username,
  password: "",
  liveplace:inf.city,
  email:inf.email,
  motto:inf.motto

});
const rules = {
  username: [{
      required: true,
      message: "请输入用户名",

  }],
  password: [{
      required: true,
      message: "请输入密码"
  }],
  // checkCode: [{
  //     required: true,
  //     message: "请输入验证码"
  // }],
}
const router = useRouter();


const register = () => {
  var form_obj = JSON.parse(JSON.stringify(formData));

  request.post("/manager/update", form_obj).then(res => {
    
 
      alert("修改成功，请重新登录")
      router.push('/login')
   
  });
};
</script>

<style lang="scss" scoped >

  .login-panel {
     
      background: rgba(255, 255, 255, 0.6);
      border-radius: 5%;
      box-shadow: 2px 2px 10px #ddd;

      .login-title {
          font-size: 22px;
          text-align: center;
          margin-bottom: 22px;
      }
  }

</style>