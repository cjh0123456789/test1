<script setup>
import listContainer from '@/components/listContainer.vue'
import { useRoute,useRouter } from 'vue-router'
import { searchVideo } from '@/api/video'
import {ref,onMounted,onBeforeUnmount} from 'vue'
import { getHistory, setHistory } from '@/utils/storage'


const page = ref({
  pageNum:1,
  pageSize:16,
  total:0
})

const keyword = ref('')
const route = useRoute()
const router = useRouter()
// 获取关键词
keyword.value = route.query.keyword
const list = ref([])
const type = ref('default')
const getList = async () => {
  const res = await searchVideo(keyword.value,type.value,page.value)
  list.value = res.data.data.list
  page.value = res.data.data.page
  num.value = list.value.length % 4 === 0 ? 0 : 4 - list.value.length % 4
}
getList()
const num=ref(0)


const search = () => {
  toSearch()
  router.push('/search?keyword='+keyword.value)
  getList()
}

const handleClick = () => {
  getList()
}

//获取搜索历史
const historyList = ref(getHistory())
// 搜索框输入
const toSearch = () => {
  if(!historyList.value.includes(keyword.value) && !(keyword.value === '')){
    historyList.value.unshift(keyword.value)
  }
  setHistory(historyList.value)
  history_show.value = false
  router.push('/search?keyword='+keyword.value)
  getList()

}
// 点击搜索记录
const toHistory = (item) => {
  keyword.value = item
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

const history_show = ref(false)

const show_history = (e) => {
  const box = document.querySelector('.box')
  e.stopPropagation()
    if (!box.contains(e.target)){
      history_show.value = false
    }
}
onMounted(() => {
  document.addEventListener('click',e => show_history(e))
})
onBeforeUnmount(() => {
  document.removeEventListener('click',e => show_history(e))
})

// 上一页
const prev = () => {
  page.value.pageNum--;
  getList()
}
// 下一页
const next = () => {
  page.value.pageNum++;
  getList()
}
// 获取
const change_page = (e) => {
  page.value.pageNum = e;
  getList()
}

</script>
<template>
  <div >
    <div class="pageHead">
      <div class="search">
        <div class="box">
            <div class="inp_border" :class="{inp_border_active:history_show}">
              <input @focus="history_show = true"  placeholder="请输入关键字" type="text" v-model="keyword">
              <el-button class="btn" type="primary" @click="search">搜索</el-button>
            </div>
            <div class="searchHistory" v-show="history_show">
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
            </div>
        </div>
      </div>
      <!-- <div class="sort">
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div> -->

    </div>
    <el-tabs v-model="type" class="sort_tab" @tab-change="handleClick">
        <el-tab-pane label="默认排序" name="default"></el-tab-pane>
        <el-tab-pane label="最多播放" name="playcount"></el-tab-pane>
        <el-tab-pane label="最新发布" name="newtime"></el-tab-pane>
    </el-tabs>
    <listContainer :list="list" :num="num"></listContainer>
    <el-pagination v-show="page.total > page.pageSize"  background layout="prev, pager, next" 
      :page-size="page.pageSize"
      :total="page.total"
      @prev-click="prev"
      @next-click="next"
      @current-change="e => change_page(e)"
    />
  </div>
</template>
<style scoped lang="less">
.el-pagination {
  width: 1184px;
  justify-content: center;
  margin-bottom: 30px;
}
.pageHead {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
  padding-bottom: 10px;

}
.search{
  display: flex;
  justify-content: space-around;
  .box {
    box-sizing: border-box;
    margin-top: 10px;
    border-radius: 5px;
    background-color: rgb(246,247,248);
    height: 33px;
    .inp_border{
      border: 1px solid rgb(255, 255, 255);
      border-radius: 5px;
      .btn {
        transform: translateY(-1px);
      }
    }
    .inp_border_active{
      border: 1px solid rgb(64,158,255);
      border-radius: 5px 5px 0 0;
    }
    .searchHistory {
      .history {
        width: 100%;
        background-color: #FFF;
        z-index: 2;
        border-radius:0 0 5px 5px;
        box-shadow: 0 1px 1px black;
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
            background-color: rgb(246,247,248);
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
    input {
      margin-left: 5px;
      height: 32px;
      width: 250px;
      border: 0;
      border-radius: 2px;
      background-color: rgb(246,247,248);
    }
    input:focus {
        outline: none;
    }
  }
}
.sort_tab {
  width: 1184px;
  margin: 0 auto;
}
// .sort {
//   height: 10px;
//   width: 1180px;
//   margin: 0 auto;
//   border-bottom: 1px solid black;
//   ul {
//     display: flex;
//     height: 10px;
//     li {
//       width: 100px;
//       height: 10px;
//       background-color: red;
//     }
//   }
// }
</style>