<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const n = ref(12)
const doScroll = () => {
  const clientHeight = document.documentElement.clientHeight // 元素内部的高度
  const scrollHeight = document.documentElement.scrollHeight // 只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容
  const scrollTop = document.documentElement.scrollTop // 获取或设置一个元素的内容垂直滚动的像素数
  if (clientHeight + scrollTop >= scrollHeight - 10 ) {
    n.value += 12
  }
}
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
      <li class="item" v-for="i in n" :key="i">
        <img src="../assets/th.jpg" alt="" @click="$router.push('/detail')">
        <div class="detail">
          <h4 class="title">视频标题哈哈哈哈哈哈哈</h4>
          <div class="auther">作者</div>
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
      img {
        width: 268px;
        height: 166px;
        cursor: pointer;
        border-radius: 5px;
      }
      .detail {
        height: 54px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        .title {
          width: 268px;
          height: 30px;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .auther {
          width: 268px;
          height: 20px;
          font-size: 12px;
        }
      }

    }
  }
}
</style>