<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { postVideo,updateVideo } from '@/api/video'
import { getUserId } from '@/utils/storage'
import axios from 'axios'
import { baseURL } from '@/utils/request'
// 封面
const imageUrl = ref()

const empty = {
  title: '',
  tag: '',
  desc: '',
  userid: getUserId(),
  img: '',
  video: ''  
}
const formModel = ref({
  ...empty 
})

const rules = ref({
  title: [{ required: true, message: '', trigger: 'blur' }],
  tag: [{ required: true, message: '不为空', trigger: 'blur' }],
  desc: [{ required: true, message: '', trigger: 'blur' }],
  img: [{ required: true, message: '不为空', trigger: 'blur' }],
  video: [{ required: true, message: '不为空', trigger: 'blur' }]
})

// 获取视频上传元素
const videoRef = ref()
const onUploadImgFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.img = uploadFile.raw
  
}

// 获取视频文件
const onUploadVideoFile = (file) => {
  formModel.value.video = file.raw
  
}

const formRef = ref()
const upload = async () => {
  formModel.value.tag = tagList.value.join(',')
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  const res = await updateVideo(fd)
  formModel.value = {
    ...empty
  }
  //清除封面
  imageUrl.value = ''
  //清空视频上传列表
  videoRef.value.clearFiles()
  //清空标签列表
  tagList.value = []

  //上传成功提示信息
  ElMessage({
    message:'上传成功',
    type:'success'
  })
}

const tagList = ref([])
const addTag = () => {
  if ((!formModel.value.tag || formModel.value.tag.length >5) 
  || tagList.value.includes(formModel.value.tag)) return
  tagList.value.push(formModel.value.tag)
  formModel.value.tag = ''
}
const removeTag = (n) => {
  console.log(tagList.value.join(','));
  if (formModel.value.tag) return
  if (n === -1) {
    tagList.value.pop()
  }else{
    const index = tagList.value.indexOf(n)
    tagList.value.splice(index,1)
  }
}

const inptar = ref()

const drawer = ref(false)
const open =async (video) => {
  console.log(video)
  formModel.value.title = video.videotitle
  formModel.value.desc = video.videodesc
  tagList.value = video.videotag.split(',')
  formModel.value.img = video.cover
  imageUrl.value = baseURL + 'cover/' + formModel.value.img
  await urlToFile(imageUrl.value)
  console.log(formModel.value.img)
  drawer.value = true
}

const urlToFile = async (imgUrl) => {
  await axios
    .get(imgUrl, { responseType: 'arraybuffer' })
    .then((response) => {
      console.log(12313)
      // 将 arraybuffer 转换为 Blob 对象
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      })

      console.log(blob)
      // 创建 File 对象
      const file = new File([blob], 'image.jpg', {
        type: response.headers['content-type']
      })
      formModel.value.img = file
      // 可以将 File 对象用于上传或其他操作
    })
    .catch((error) => {
      console.error('转换失败:', error)
    })
}
defineExpose({
  open
})
</script>
<template>
  <el-drawer v-model="drawer" size="50%" title="I am the title" :with-header="false">
    <el-form
    ref="formRef"
    :rules="rules"
    :model="formModel"
    label-width="auto"
    style="max-width: 600px"
  >
    <el-form-item prop="video" label="视频">
      <el-upload
        ref="videoRef"
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
    <el-form-item prop="img" label="封面">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="onUploadImgFile"
        :auto-upload="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input placeholder="输入标题" v-model="formModel.title" />
    </el-form-item>
    <el-form-item label="标签" prop="tag" >
      <!-- 标签输入 -->
      <el-input   v-model="formModel.tag" style="display: none;"/>
      <div  class="input_box" @click="inptar.focus()" >
        <span v-for="item in tagList" :key="item">
          {{item}}
          <i @click="removeTag(item)" class="iconfont icon-cha"></i></span>
        <input  ref="inptar"
                placeholder="按Enter键创建标签" 
                @keydown.backspace="removeTag(-1)"
                @keydown.enter="addTag" 
                type="text" 
                class="input_inner"  
                v-model="formModel.tag"
                >
              
      </div>

    </el-form-item>
    <el-form-item label="简介" prop="desc">
      <el-input placeholder="输入简介"   v-model="formModel.desc" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="upload">上传</el-button>
    </el-form-item>
  </el-form>
</el-drawer>
</template>
<style scoped lang="less">
  form {
    margin-top: 20px;
  }
  .avatar-uploader {
      border: 1px dashed #dcdfe6;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: 0.2s;
      box-sizing: border-box;
      font-size: 42px;
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
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
  .input_box {
    padding: 2px 7px;
    box-sizing: border-box;
    width: 100%;
    border: 1.5px rgb(220,223,230) solid;
    border-radius: 5px;
    min-height: 32px;
    display: flex;
    cursor: text;
    flex-wrap: wrap;
    .input_inner {
      border: none;
      display: block;
      max-width: 100%;
      min-width: 30%;
    }
    .input_inner::placeholder {
      color: rgb(168,171,185);

    }
    span {
      line-height: 21px;
      margin-right: 5px;
      background-color: rgb(228, 226, 226);
      border-radius: 4px;
      padding: 2px 5px 0 ;
      .icon-cha {
        margin-left: 3px;
        font-size: 10px;
        cursor: pointer;
      }
    }
    .input_inner:focus {
      outline: none;
    }
  }
  .input_box:hover {
    border: 1.5px rgb(192,196,204) solid;
  }
</style>