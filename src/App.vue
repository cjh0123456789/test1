<script setup>
import { onUnmounted} from 'vue'
import { removeUserId } from '@/utils/storage.js'
onUnmounted(() => {
  removeUserId()
})

const ws = new WebSocket('ws://localhost:8080/test/123')
ws.addEventListener('open',() => {
  console.log(121)
})
ws.addEventListener('message',(e) => {
  console.log(e)
})
</script>
<template>
  <router-view></router-view>
</template>
<style>
@import 'reset.css';
@import url('@/css/iconfont.css');
</style>
