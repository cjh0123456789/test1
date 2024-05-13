<script setup>
import {Delete} from '@element-plus/icons-vue'
import { ref } from 'vue'
const n = ref(12)
const onDelete = () => {
    ElMessageBox.confirm(
    '确认删除',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    n.value--
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
  }).catch(() => {
    console.log('hhh')
  })
}
</script>
<template>
  <div class="container">
    <ul class="list" >
      <li class="item" v-for="i in n" :key="i">
        <img src="../../assets/th.jpg" alt="" @click="$router.push('/detail')">
        <div class="detail">
          <p class="title">视频标题哈哈哈哈哈就哈哈哈哈哈哈</p>
          <el-icon @click="onDelete"><Delete /></el-icon>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.container {
  margin: 0  10px 0;
  padding: 5px;

  .list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    list-style-type: none;
    .item {
      margin-right: 8px;
      width: 190px;
      height: 180px;
      margin-bottom: 20px;
      img {
        width: 190px;
        height: 146px;
        cursor: pointer;
        border-radius: 5px;
      }
      .detail {
        position: relative;
        height: 44px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        .title {
          width: 190px;
          font-size: 12px;
        }
        .el-icon {
            cursor: pointer;
            position: absolute;
            bottom: 2px;
            right: 2px;
        }
      }

    }
  }
}
</style>