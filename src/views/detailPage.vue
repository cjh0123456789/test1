<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
const data = ref([
  {
    username: 'hhhh',
    comment: '真好看'  
  },
  {
    username:'aaaa',
    comment: '好看'
  }
])
// 评论
const comment = ref('')
const addComment = () => {
  console.log(comment.value)
  data.value.push({
    username: 'hhhh',
    comment: comment.value
  })
  comment.value = ''
}

</script>
<template>
  <div class="container">
    <div class="playerVideo">
      <video  src="../video/VID_20240403_215344.mp4" autoplay controls></video>
    </div>
    <div class="title">
      <h4>这是一个视频</h4>
    </div>
    <div class="publisher">
      <el-avatar :icon="UserFilled" />
      我是发布者
    </div>
    <div class="comment" v-for="i in data" :key="i">
      <div class="commentList">
        <div class="headPic">
          <el-avatar :icon="UserFilled" />
        </div>
        <div class="commentDetial">
          <h4>{{ i.username }}</h4>
          <p>{{ i.comment }}</p>
        </div>
      </div>
    </div>
    <div class="tail"></div>
    <div class="make-comment">
      <input type="text" placeholder="请输入要发布的评论" v-model="comment">
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
    height: 40px;
  }
  .publisher {
    margin-bottom: 30px;
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