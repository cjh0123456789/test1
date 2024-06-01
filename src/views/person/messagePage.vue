<script setup>
import { getReportByUserId } from '@/api/video'
import { getUserId } from '@/utils/storage'
import {ref} from 'vue'
import { baseURL } from '@/utils/request'
const userid = getUserId()

const reportList = ref([])
const getReport =async () => { 
  const res = await getReportByUserId(userid)
  reportList.value = res.data.data.reportList
  console.log(reportList.value)
}
getReport()


const open = (review) => {
  ElMessageBox.alert(review, '处理结果', {
    confirmButtonText: '确认'
  })
}

const videoDetail = (id) => {
  window.open('/detail/'+id)
}
</script>

<template>
  <el-main>
    <el-table :data="reportList" style="width: 100%">
      <el-table-column label="视频封面"  prop="videoid" >
        <template #default="scope">
          <img class="cover"
               @click="videoDetail(scope.row.videoid)" 
               :src="baseURL+'reportCover/'+scope.row.videoid" alt="">
        </template>
      </el-table-column>
      <el-table-column label="原因" prop="reportreason" />
      <el-table-column label="状态" prop="status">
        <template #default="scope">
          {{ scope.row.status === 0 ? '待处理' : '已处理' }}
        </template>
      </el-table-column>
      <el-table-column  label="结果" prop="review">
        <template #default="scope">
          <span class="btn" @click="open(scope.row.review)" v-if="scope.row.review">查看</span>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<style lang="less" scoped>
.cover {
  cursor: pointer;
  width: 128px;
  height: 92.2px;
} 
.btn {
  cursor: pointer;
  color: rgb(80,166,255);
}
</style>