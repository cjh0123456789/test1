<script setup>
import { buttonEmits } from 'element-plus'
import {ref,reactive,onMounted} from 'vue'
import { useRoute,useRouter } from 'vue-router';
import request from '@/utils/request';	
import axios from 'axios';
const route = useRoute()
const d=JSON.parse(route.query.d)


const router = useRouter();
const submitForm= () => {
  var form_obj = JSON.parse(JSON.stringify(Data));

  request.post("/manager/reason", form_obj).then(res => {

    console.log(form_obj);
   

      router.push(`/manager/reprot/?d={"name":${d.username},"password":${d.password},"email":${d.email},"motto":${d.motto},"city":${d.city}}`)
      
 
 
});


  // router.push(`/manager/reprot/?d={"name":${d.username},"password":${d.password},"email":${d.email},"motto":${d.motto},"city":${d.city}}`)

            }



let formData = reactive({
              notice: `尊敬的用户${d.id}，你的视频由于原因${d.reason}暂时被封禁！！！`,
  
});
let Data=({
  reason:formData.notice,
 id:d.id
})



</script>
<template>
	



  <div class="login-body">
      <div class="login-panel">
          <div class="login-title">信息汇报</div>
    <el-form :model="formData" :rules="rules" ref="formDataRef">
            <el-form-item prop="reason" label="原因">
                    <el-input placeholder="请输入账号" v-model="formData.notice" size="large" type="textarea" :readonly="true">
                        <template #prefix>
                            <el-icon>
                              
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
              
                  <el-button @click="submitForm" class="sub" >发送</el-button>
             
    </el-form>

  </div>
  </div>





</template>
<style lang="scss" scoped >
.login-body {
  background: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);

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
  .sub{
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  }
}
</style>