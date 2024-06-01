<script setup>
import {Delete} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getVideoByUserId, deleteVideo } from '@/api/video'
import { getUserId } from '@/utils/storage'

import { baseURL } from '@/utils/request'

import editVideo from './components/editVideo.vue'
const show_footer = ref(false)
const page = ref({
  pageNum:1,
  pageSize:10
})
//获取userid
const userid = getUserId()

const list = ref([])
//获取页数
const num = ref()
const getVideoInfo = async () => {
  const res =await getVideoByUserId(userid,{...page.value})
  page.value = res.data.data.page
  list.value = res.data.data.list
  num.value = Math.ceil(page.value.total/page.value.pageSize)

  show_footer.value = page.value.pageSize < page.value.total
}
getVideoInfo()

// 切换页数
const changePage = (n) => {
  if(page.value.pageNum === 1 && n === -2){
    ElMessage({
    message: '已是第一页'
    })
    return
  }
  if (page.value.pageNum === num.value && n === 0) {
    ElMessage({
    message: '已是最后一页'
    })
    return
  }
  if (n === -2 || n === 0) {
    page.value.pageNum += (n+1) 
  }else{
    page.value.pageNum = n
  }
  
  getVideoInfo()
}

const onDelete = (videoid) => {
    ElMessageBox.confirm(
    '确认删除',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    await deleteVideo(videoid)
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
  getVideoInfo()
  }).catch(() => {
    
  })

}



const videoDetail = (id) => {
  window.open('/detail/'+id)
}
const edit = ref()
const editVido = (item) => {
  console.log(1231)
  console.log(edit)
  edit.value.open(item)
}

</script>
<template>
  <el-main class="box">
    <editVideo ref="edit"></editVideo>
    <div v-show="list.length !== 0">
    <div  class="container">
    <ul class="list" >
      <li class="item" v-for="item in list" :key="item.videoid">
        <img :src="baseURL+'cover/'+ item.cover" alt="" @click="videoDetail(item.videoid)">
        <div class="detail">
          <p class="title">{{item.videotitle}}</p>
          <el-icon @click="onDelete(item.videoid)"><Delete /></el-icon>
          <span class="iconfont icon-bianji" @click="editVido(item)"></span>
        </div>
        <div class="cover" v-show="item.status === 0"></div>
      </li>
    </ul>
    </div>
    <div  v-show="show_footer" class="footer">
      <ul>
        <li @click="changePage(-2)"><i class="iconfont icon-icon-test"></i></li>
        <li 
            :class="page.pageNum === i ? 'active' : ''" 
            v-for="i in num" :key="i"
            @click="changePage(i)"
          >{{ i }}</li>
        <li @click="changePage(0)"><i class="iconfont icon-icon-test1"></i></li>
      </ul>
    </div>
  </div>
  <el-empty description="你还没有发布视频" v-show="list.length === 0"/>
  </el-main>

</template>
<style scoped lang="less">
.box {
  position: relative;
}
.container {
  width: 1080px;
  margin: 0  10px 0;
  padding: 5px;
  .list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    list-style-type: none;
    padding-top: 40px;
    .item {
      position: relative;
      margin-right: 17px;
      width: 190px;
      height: 180px;
      margin-bottom: 40px;
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
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .iconfont {
          cursor: pointer;
          position: absolute;
          bottom: 2px;
          left: 2px;
          font-size: 12px;
        }
        .el-icon {
            cursor: pointer;
            position: absolute;
            bottom: 2px;
            right: 2px;
        }
      }
      .cover {
        position: absolute;
        width: 190px;
        height: 146px;
        background-color: rgba(1, 15, 10, 0.642);
        top: 0;
        left: 0;
        text-align: center;
        font-size: 20px;
        line-height: 146px;
        &::after{
          content: '审核中';
          color: gray;
        }
      }

    }
  }
}
.footer {
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
  ul {
    display: flex;
    justify-content: center;
    cursor: pointer;
    li {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      line-height: 20px;
      font-size: 16px;
    }
    .active {
      color: rgb(58, 230, 230);
    }
    li:hover {
      color: rgb(58, 230, 230);
    }
  }
}

</style>