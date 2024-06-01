<script setup>
import { getReportByUserId } from '@/api/video'
import { getUserId } from '@/utils/storage'
import {ref} from 'vue'
import { baseURL } from '@/utils/request'
const userid = getUserId()


</script>

<template>
  <el-main>
    <div class="container">
      <div class="message" >
        <h3 class="title">1231</h3>
      </div>
    </div>
  </el-main>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  .message {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
    box-shadow: 0 0 1px black;
    .title {
      font-weight: 400;
      font-size: 15px;
    }
  }
}
</style>