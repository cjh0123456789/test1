<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { getUserId } from '@/utils/storage'
import { getCommentList,postComment } from '@/api/commit'
import { getVideoDetail } from '@/api/video'
const data = ref([{}])

const route = useRoute()
const router = useRouter()
//获取视频id

const videoid = route.params.id
const getList = async () => {
  const res = await getCommentList(videoid)
  data.value = res.data.data.commentList
}
getList()

//视频标签
const tagList = ref([])

// 获取视频详情
const video = ref()
const getVideo = async () => {
  const res = await getVideoDetail(videoid)
  video.value = res.data.data.video
  tagList.value = video.value.videotag.split(',')
}
getVideo()
// 发表评论
const content = ref('')
const addComment = async () => {
  if (!content.value) return
  const userid = getUserId()
  if (!userid){
    router.push('/login')
    return
  }
  await postComment({content:content.value,userid,videoid})
  content.value = ''
  getList()
}

</script>
<template>
  <div class="container">
    <div class="playerVideo">
      <!-- <video  src="../video/VID_20240403_215344.mp4" autoplay controls></video> -->
      <video  :src="'http://localhost:8080/video/'+video.video" autoplay controls></video>
    </div>
    <div class="title">
      <h4>{{video.videotitle}}</h4>
    </div>
    <div class="desc">
      <p>{{video.videodesc}}</p>
    </div>
    <div class="tag">
      <span v-for="item in tagList" :key="item">{{ item }}</span>
    </div>
    <div class="publisher">
      <el-avatar :size="50"  :src="'http://localhost:8080/user/headerPic/'+video.userid" />
      <span class="nickname">{{ video.username }}</span>
    </div>
    <div class="comment" v-for="item in data" :key="item.id">
      <div class="commentList">
        <div class="headPic">
          <el-avatar :src="'http://localhost:8080/user/headerPic/'+item.userid" />
        </div>
        <div class="commentDetial">
          <h4>{{ item.nickname }}</h4>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
    <div class="tail"></div>
    <div class="make-comment">
      <input type="text" placeholder="请输入要发布的评论" v-model="content">
      <el-button type="primary" @click="addComment">发布</el-button>
    </div>
  </div>
</template>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 500px;
  margin: 0 auto 0;
  .title {
    min-height: 40px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 20px;
    color: rgb(155, 155, 155);
  }
  .tag {
    margin-bottom: 20px;
    span {
      display: inline-block;
      border-radius: 5px;
      padding: 5px;
      font-size: 12px;
      background-color: #d8d4d4;
      margin-right: 10px;
      color: #767575;
    }
  }
  .publisher {
    margin-bottom: 30px;
    font-size: 0;
    display: flex;
    .nickname {
      margin-left: 10px;
      font-size: 20px;
      font-weight: 700;
      line-height: 50px;
    }
  }
  .playerVideo {
    video {
      width: 500px;
    }
  }
  .comment {
    margin-top: 20px;
    .headPic {
      margin-right: 20px;
    }
    .commentList {
      display: flex;
      .commentDetial {
        border-top: 1px rgb(237, 237, 237) solid;
        h4 { 
          font-size: 16px;
          font-weight: 400;
          line-height: 40px;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }
  .tail {
    height: 70px;
  }
  .make-comment {
    position: fixed;
    bottom:20px;
    border: 1px rgb(210, 209, 209) solid;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    input {
      width: 400px;
      height: 45px;
      margin-left: 10px;
      border: 0;
      margin-right: 20px;
    }
    input:focus {
      outline: none;
    }
    .el-button--primary {
      height: 100%;
      margin-top: -4px;
      width: 60px;
    }
  }
}
</style>