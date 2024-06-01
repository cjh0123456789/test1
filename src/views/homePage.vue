<script setup>
import listContainer from '@/components/listContainer.vue'
import {ref,onUnmounted,onMounted} from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { getHistory, setHistory } from '@/utils/storage'
import { getVideoList,getVideoListPage } from '@/api/video'
import { getNickname } from '@/api/user'

import { setUserId } from '@/utils/storage'
import { baseURL } from '@/utils/request'


const page = ref({
  pageNum:1,
  pageSize:16
})

//获取路径参数 用户userid
const route = useRoute()
const userid = route.query.userid
userid ? setUserId(userid) : setUserId('')
// 获取视频列表
const list = ref([])
const getVideo = async (list) => {
  const res = await getVideoListPage(userid,page.value)
  console.log(res)
  list.value = res.data.data.list
  page.value = res.data.data.page
  num.value = list.value.length % 4 === 0 ? 0 : 4 - list.value.length % 4
}
getVideo(list)






const closeHistory = (e) => {
  const box = document.querySelector('.searchBox')
  if (!box.contains(e.target) && showHistory.value === true) {
      showHistory.value = false
    }
  } 

const router = useRouter()
const showHistory = ref(false)
const getFocus = () => {
  showHistory.value = true
}


//获取搜索历史
const historyList = ref(getHistory())
// 搜索框输入
const tar = ref('')
const toSearch = () => {
  if(tar.value === '') return
  if(!historyList.value.includes(tar.value) && !(tar.value === '')){
    historyList.value.unshift(tar.value)
  }
  setHistory(historyList.value)
  // router.push('/search?keyword='+tar.value)
  window.open('/search?keyword='+tar.value)
}
// 点击搜索记录
const toHistory = (item) => {
  tar.value = item
  historyList.value = historyList.value.filter(i => i!=item)
  historyList.value.unshift(item)
  toSearch()
}
// 清空历史列表
const clearHistory = () => {
  historyList.value = []
  setHistory(historyList.value)
  // getFocus()
}

// 删除搜索记录
const delItem = (item) => {
  const index = historyList.value.indexOf(item)
  historyList.value.splice(index,1)
  setHistory(historyList.value)
  
}
// 获取用户名
const name = ref('')
const getname = async () => {
  const res = await getNickname(userid)
  name.value = res.data
}
getname()


const num = ref(0)
const newList = ref([])
const doScroll =async () => {
  if(page.value.pageNum === Math.ceil(page.value.total/page.value.pageSize)) return
  const clientHeight = document.documentElement.clientHeight // 元素内部的高度
  const scrollHeight = document.documentElement.scrollHeight // 只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容
  const scrollTop = document.documentElement.scrollTop // 获取或设置一个元素的内容垂直滚动的像素数
  if  (clientHeight + scrollTop >= scrollHeight - 2 ) {
    page.value.pageNum++
    await getVideo(newList)
    list.value.push(...newList.value)

  }

}


onMounted(() => {
  document.addEventListener('scroll', doScroll)
  
})
onUnmounted(() => {
  document.removeEventListener('scroll', doScroll)
}) 

const chat = () => {
  window.open('http://localhost:8080/chat/ct1')
}
</script>

<template>

  <div @click="closeHistory">
    <div class="pageHeader" >
    <div class="headPic" @click="$router.push('/person')">
      <el-avatar v-if="userid" :size="50" :src="baseURL+'user/headerPic/'+userid" />
      <el-avatar v-else :size="50" src="src/assets/moren.jpg" />
    </div>
    <div v-show="userid" class="username">{{name}}</div>
    <div v-show="userid" class="chat">
      <span class="iconfont icon-liaotian" @click="chat"></span>
    </div>
    <!-- 搜索框 -->
    <div class="searchBox">
      <div class="box">
        <input type="text"   v-model="tar" @focus="getFocus">
        <el-button type="primary" @click="toSearch">搜索</el-button>
      </div>
      <div v-show="showHistory">
        <div class="history"  v-if="historyList.length > 0">
        <div class="searchHeader" >
          <div>搜索记录</div>
          <span @click="clearHistory">清空</span>
        </div>
        <div class="searchRecord">
          <span class="item" @click="toHistory(item)"  v-for="item in historyList" :key="item">
            {{ item }}
            <div class="delItem" @click.stop="delItem(item)">
              <span class="iconfont icon-cha"></span>
            </div>
          </span>
        </div>
        </div>
        <!-- <div class="history" v-else>
          <div class="empty">搜索记录为空</div>
        </div> -->
      </div>
    </div>
    </div>
    <listContainer :list="list" :num="num"></listContainer>
  </div>
</template>

<style scoped lang="less">
.pageHeader{
  // position: sticky;
  // top: 0;
  width: 1184px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  background-color: rgb(235, 231, 231);
  margin: 0 auto;
  .headPic {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .username {
    user-select: none;
  }
  .chat {
    cursor: pointer;
    .iconfont {
      font-size: 25px;
      &:hover {
        color: rgb(93, 82, 248);
      }
    }
  }
  .searchBox {
    position: relative;
    width: 28%;
    margin: 0 30% 0 30%;
    .box {
      input {
      margin-left: 10px;
      margin-right: 2px;
      height: 30px;
      width: 240px;
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
          position: relative;
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
          .delItem {
            display: none;
            position: absolute;
            top: -3px;
            right: -6px;
            font-size: 0;
            width: 10px;
            height: 10px;
            line-height: 10px;
            text-align: center;
            border-radius: 50%;
            background-color: white;
            .iconfont {
              font-size: 7px;
            }
          }
          &:hover .delItem {
            display: block;
            color: black;
            &:hover {
              color: #68c8eb;
            }
          }
        }
        .item:hover {
          color: #68c8eb;
        }
      }
    }
  }
}
</style>
