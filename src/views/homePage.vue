<script setup>
import listContainer from '@/components/listContainer.vue'
import {ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const history = ref(false)
const getFocus = () => {
  history.value = true
}

const historyList = ref(['1231','123','123','12312'])
// 搜索框输入
const tar = ref('')
const toSearch = () => {
  if(!historyList.value.includes(tar.value) && !(tar.value === '')){
    historyList.value.unshift(tar.value)
  }
  router.push('/search')

}
// 清空历史列表
const clearHistory = () => {
  historyList.value = []
}
</script>
<template>
  <div class="pageHeader" >
    <div class="headPic" @click="$router.push('/person')">
      <el-avatar :size="50" src="../src/assets/moren.jpg" />
    </div>
    <div class="username">用户名</div>
    <div class="searchBox">
      <div class="box">
        <input type="text"   v-model="tar" @focus="getFocus">
        <el-button type="primary" @click="toSearch">搜索</el-button>
      </div>
      <div class="history" v-show="history">
        <div class="searchHeader">
          <div>搜索记录</div>
          <span @click="clearHistory">清空</span>
        </div>
        <div class="searchRecord">
          <span  v-for="item in historyList" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
  <listContainer></listContainer>
</template>

<style scoped lang="less">
.pageHeader{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  background-color: rgb(235, 231, 231);
  .headPic {
    width: 50px;
    height: 50px;
  }
  .username {

  }
  .searchBox {
    position: relative;
    width: 28%;
    margin: 0 30% 0 30%;
    .box {
      input {
      margin-left: 20px;
      margin-right: 2px;
      height: 30px;
      width: 250px;
      border: 0;
      border-radius: 2px;
    }
      input:focus {
        outline: none;
      }
    }
    .history {
      position: absolute;
      width: 100%;
      background-color: rgb(235, 231, 231);
      z-index: 2;
      border-radius:0 0 5px 5px;
      .searchHeader {
        margin-left: 10px;
        margin-right: 10px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 14px;
          cursor: pointer;
        }
        span:hover {
          color: rgb(121, 180, 247);
        }
      }
      .searchRecord {
        margin-top: 10px;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        span {
          height: 30px;
          background-color: #fff;
          line-height: 30px;
          border-radius: 5px;
          margin-left: 10px;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
