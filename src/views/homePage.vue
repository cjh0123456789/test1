<script setup>
import listContainer from '@/components/listContainer.vue'
import {ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const history = ref(false)
const getFocus = () => {
  history.value = true
}

const historyList = ref(['1231','123','12312',"你好","hh","哈哈哈"])
// 搜索框输入
const tar = ref('')
const toSearch = () => {
  if(!historyList.value.includes(tar.value) && !(tar.value === '')){
    historyList.value.unshift(tar.value)
  }
  router.push('/search')
}
// 点击搜索记录
const toHistory = (item) => {
  tar.value = item
  historyList.value = historyList.value.filter(i => i!=item)
  historyList.value.unshift(item)
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
    <!-- 搜索框 -->
    <div class="searchBox">
      <div class="box">
        <input type="text"   v-model="tar" @focus="getFocus">
        <el-button type="primary" @click="toSearch">搜索</el-button>
      </div>
      <div class="history" v-show="history" v-if="historyList.length > 0">
        <div class="searchHeader" >
          <div>搜索记录</div>
          <span @click="clearHistory">清空</span>
        </div>
        <div class="searchRecord">
          <span class="item" @click="toHistory(item)"  v-for="item in historyList" :key="item">{{ item }}</span>
        </div>
      </div>
      <div class="history" v-else>
        <div class="empty">搜索记录为空</div>
      </div>
    </div>
  </div>
  <listContainer></listContainer>
</template>

<style scoped lang="less">
.pageHeader{
  // position: sticky;
  // top: 0;
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
      .empty {
        text-align: center;
        color: gray;
      }
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
        .item {
          height: 20px;
          background-color: #fff;
          font-size: 10px;
          line-height: 20px;
          border-radius: 5px;
          margin-left: 10px;
          margin-bottom: 10px;
          padding: 0 5px ;
          cursor: pointer;
          box-sizing: border-box;
        }
        .item:hover {
          color: #68c8eb;
        }
      }
    }
  }
}
</style>
