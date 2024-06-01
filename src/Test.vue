<script setup>
import { Avatar, UploadFilled, Edit, View } from '@element-plus/icons-vue'
import { getUserId } from '@/utils/storage'
import {onMounted, onUnmounted } from 'vue'
  
    
  // 处理滚轮事件的方法  
const handleWheel = () => {  
    console.log(123)
};   
    
// 在组件挂载后添加监听器  
onMounted(() => {  
    window.addEventListener('scroll', handleWheel);  
});  
    
// 在组件卸载前移除监听器  
onUnmounted(() => {  
  window.removeEventListener('scroll', handleWheel);  
});
</script>
<template>
  <el-container class="common-layout">
    <el-aside width="150px">
      <div class="pic">
        <el-avatar :size="60" :src="'http://localhost:8080/user/headerPic/'+getUserId()" />
      </div>
      <div class="menu">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :default-active="$route.path"
          router
        >
          <el-menu-item index="#">
            <el-icon><Avatar /></el-icon>
            <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="/person/manage">
            <el-icon><Edit /></el-icon>
            <span>管理视频</span>
          </el-menu-item>
          <el-menu-item index="/person/upload">
            <el-icon><UploadFilled /></el-icon>
            <span>上传视频</span>
          </el-menu-item>
          <el-menu-item index="/person/history">
            <el-icon><View /></el-icon>
            <span>浏览历史</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main @scroll="handleWheel">
      <div class="container" >
        <ul>
            <li>
                123
            </li>
            <li>
                123
            </li>
            <li>
                123
            </li>
            <li>
                123
            </li>
            <li>
                123
            </li>
            <li>
                123
            </li>
        </ul>
    </div>
    </el-main>
  </el-container>
</template>
<style lang="less" scoped>
.common-layout {
  height: 97vh;
  .el-aside {
    background-color: rgb(84,92,100);
    padding-top: 10px;
    .pic {
      text-align: center;
      border-bottom:1px white solid ;
    }
    .menu {
      .el-menu {
        border-right: none;
      }
    }
  }
  .container {
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            width: 100%;
            height: 100px;
            background-color: gray;
        }
    }
}
}
</style>
