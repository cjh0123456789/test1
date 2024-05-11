<script setup>
import listContainer from '@/components/listContainer.vue'
</script>
<template>
  <div class="search">
    <div class="box">
        <input type="text">
        <el-button type="primary">搜索</el-button>
    </div>
  </div>
  <div class="demo-tabs">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="默认排序" name="first"></el-tab-pane>
      <el-tab-pane label="最新发布" name="second"></el-tab-pane>
    </el-tabs>
</div>
  <listContainer></listContainer>
</template>
<style scoped lang="less">
.search{
  display: flex;
  justify-content: space-around;
  .box {
    border: 1px rgb(90, 88, 88) solid;
    border-radius: 5px;
    input {
      margin-left: 5px;
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
}
.demo-tabs {
  margin-left: 33px;
  margin-right: 33px;
}
</style>