<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
// 封面
const imageUrl = ref('')
const onUploadFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // formModel.value.cover_img = uploadFile.raw
}
// 上传视频文件
const onUploadVideoFile = (file) => {
  console.log(file)
}
</script>
<template>
  <h1>上传视频</h1>
  <el-form
    label-width="auto"
    style="max-width: 600px"
  >
    <el-form-item label="视频">
      <el-upload
        ref="upload"
        class="upload-demo"
        :limit="1"
        :auto-upload="false"
        :on-change="onUploadVideoFile"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item label="封面">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="onUploadFile"
        :auto-upload="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="标题">
      <el-input  />
    </el-form-item>
    <el-form-item label="标签">
      <el-input  />
    </el-form-item>
    <el-form-item label="简介">
      <el-input  />
    </el-form-item>
  </el-form>
</template>
<style scoped lang="less">
.avatar-uploader {
    border: 1px dashed #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: 0.2s;
    box-sizing: border-box;
  .avatar {
    width: 178px;
    height: 178px;
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
.avatar-uploader:hover {
  border-color: #7ee8f1;
}

</style>