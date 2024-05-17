<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { formatTime } from '@/utils/format'
const n = ref(12)
const doScroll = () => {
  const clientHeight = document.documentElement.clientHeight // 元素内部的高度
  const scrollHeight = document.documentElement.scrollHeight // 只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容
  const scrollTop = document.documentElement.scrollTop // 获取或设置一个元素的内容垂直滚动的像素数
  if (clientHeight + scrollTop >= scrollHeight - 10 ) {
    n.value += 12
  }
}

// 接收视频列表
const props = defineProps({
  list:{}
})

onMounted(() => {
  document.addEventListener('scroll', doScroll)
})
onUnmounted(() => {
  document.removeEventListener('scroll', doScroll)
}) 
</script>
<template>
  <div class="container">
    <ul class="list">
      <li class="item" v-for="item in props.list" :key="item.videoid">
        <img :src="'http://localhost:8080/img/'+ item.cover" alt="" @click="$router.push('/detail/'+item.videoid)">
        <div class="detail">
          <h4 class="title">{{item.videotitle}}</h4>
          <div class="auther">{{item.username}}</div>
          <span class="time">{{ formatTime(item.videoTime) }}</span>
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
  margin: 0  30px 0;
  padding: 5px;

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
      img {
        width: 268px;
        height: 166px;
        cursor: pointer;
        border-radius: 5px;
      }
      .detail {
        margin-right: 10px;
        margin-left: 10px;
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
          width: 168px;
          height: 20px;
          font-size: 12px;
          color: rgb(90, 89, 89);
        }
        .time {
          width: 50px;
          height: 20px;
          font-size: 12px;
          color: gray;
        }
      }

    }
    .item:hover {
      box-shadow: 0 0 10px gray;
    }
  }
}
</style>