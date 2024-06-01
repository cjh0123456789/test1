<script setup>
import { Avatar, UploadFilled, Edit, View } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
const route = useRoute()
const d=JSON.parse(route.query.d)
console.log('page层'+d.name)
const a={
    username: d.name,
      email: d.email,
        motto: d.motto,
        city: d.city,
        password:d.password
  }
    sessionStorage.setItem('username', a.username);
    sessionStorage.setItem('email', a.email);
    sessionStorage.setItem('motto', a.motto);
    sessionStorage.setItem('city', a.city);
    sessionStorage.setItem('password', a.password);
    
</script>
<template>
  <el-container class="common-layout">
    <el-aside width="150px">
      <div class="pic">
        <el-avatar :size="60" src="../src/assets/moren.jpg" />
      </div>
      <div class="menu">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :default-active="$route.path"
          router
        >
          <el-menu-item index="/manager/info">
            <el-icon><Avatar /></el-icon>
            <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="/manager/change">
            <el-icon><Avatar /></el-icon>
            <span>信息修改</span>
          </el-menu-item>
          <el-menu-item index="/manager/reprot">
            <el-icon><Edit /></el-icon>
            <span>举报受理</span>
          </el-menu-item>
          <el-menu-item index="/manager/charter">
            <el-icon><Edit /></el-icon>
            <span>统计报表</span>
          </el-menu-item>
          <el-menu-item index="/manager/accountAduit">
            <el-icon><Edit /></el-icon>
            <span>视频审核</span>
          </el-menu-item>
          
        </el-menu>
      </div>
    </el-aside>
    <el-container>
        <el-header style="background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%); text-align: center;font-weight: bold; font-size: 26px;">管理系统</el-header>
        <el-main>   <router-view></router-view></el-main>
        <el-footer style="text-align: center;background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);">@auther:zzm</el-footer>
      </el-container>
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
}
</style>
