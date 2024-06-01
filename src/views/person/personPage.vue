<script setup>
import { Avatar, UploadFilled, Edit, View,Message } from '@element-plus/icons-vue'
import { getUserId } from '@/utils/storage'
import { baseURL } from '@/utils/request'


</script>
<template>
  <el-container class="common-layout">
    <el-aside width="150px">
      <div class="pic">
        <el-avatar :size="60" :src="baseURL+'user/headerPic/'+getUserId()" />
      </div>
      <div class="menu">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :default-active="$route.path"
          router
        >
          <!-- <el-menu-item index="#">
            <el-icon><Avatar /></el-icon>
            <span>个人信息</span>
          </el-menu-item> -->
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
          <el-menu-item index="/person/message">
            <el-icon><Message /></el-icon>
            <span>系统信息</span>
          </el-menu-item>
        </el-menu>

      </div>
    </el-aside>
      <router-view ></router-view>
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
