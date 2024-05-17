<script setup>
import { onUnmounted } from 'vue'
import { removeUserId } from '@/utils/storage.js'
onUnmounted(() => {
  removeUserId()
})
</script>
<template>
  <router-view></router-view>
</template>
