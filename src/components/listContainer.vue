<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { formatTime,formatCount } from '@/utils/format'
import { baseURL } from '@/utils/request'
import { getVideoList } from '@/api/video'

// 接收视频列表
const props = defineProps({
  list:Object,
  num:Number
})

const videoList = ref([])
videoList.value.push(...props.list)
// const doScroll =async () => {
//   const clientHeight = document.documentElement.clientHeight // 元素内部的高度
//   const scrollHeight = document.documentElement.scrollHeight // 只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容
//   const scrollTop = document.documentElement.scrollTop // 获取或设置一个元素的内容垂直滚动的像素数
//   if  (clientHeight + scrollTop >= scrollHeight - 10 ) {
//     console.log(123)
//   }
// }


// onMounted(() => {
//   document.addEventListener('scroll', doScroll)
  
// })
// onUnmounted(() => {
//   document.removeEventListener('scroll', doScroll)
// }) 

const videoDetail = (id) => {
  window.open('detail/'+id)
}
</script>
<template>
  <div  class="container">
    <ul class="list">
      <li class="item" v-for="item in props.list" :key="item.videoid">
        <div class="cover">
          <span>
            <i class="iconfont icon-bofang"></i>
            {{ formatCount(item.playcount) }}
          </span>
          <span>
            <i class="iconfont icon-xihuan"></i>
            {{ formatCount(item.likecount) }}
          </span>
        </div>
        <!-- <img :src="baseURL+'cover/'+ item.cover" alt="" @click="$router.push('/detail/'+item.videoid)"> -->
        <img :src="baseURL+'cover/'+ item.cover" alt="" @click="videoDetail(item.videoid)">
        <div class="detail">
          <h4 class="title">{{item.videotitle}}</h4>
          <div class="auther">{{item.username}}</div>
          <span class="time">{{ formatTime(item.videotime,'cover') }}</span>
        </div>
      </li>
      <li v-for="item in props.num" :key="item"  class="item hiden"></li>
    </ul>
  </div>
</template>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.container {
  margin: 0  auto;
  padding: 5px;
  width: 1180px;

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    list-style-type: none;
    .item {
      width: 268px;
      height: 220px;
      margin-bottom: 20px;
      transition: 0.5s;
      border-radius: 5px;
      position: relative;
      img {
        width: 268px;
        height: 166px;
        cursor: pointer;
        border-radius: 5px;
      }
      .cover {
        position: absolute;
        top: 145px;
        left: 0;
        width: 100%;
        border-radius:0 0px 5px 5px ;
        color: white;
        font-size: 12px;
        background-image: linear-gradient(transparent,rgba(0, 0, 0, 0.269));
        line-height: 20px;
        span {
          margin-left: 10px;
          i {
            margin-right: 3px;
          }
        }
      }
      .detail {
        margin-right: 2px;
        margin-left: 2px;
        height: 54px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        justify-content: space-between;
        .title {
          width: 248px;
          height: 30px;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .auther {
          height: 20px;
          font-size: 12px;
          color: rgb(90, 89, 89);
        }
        .time {
          height: 20px;
          font-size: 12px;
          color: gray;
        }
      }

    }
    .hiden {
      visibility:hidden;
    }
    .item:hover {
      box-shadow: 0 0 10px gray;
    }
  }
}
</style>