<script setup>
import { ref,onBeforeUnmount,onMounted} from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { getUserId } from '@/utils/storage'
import { getCommentList,postComment,replyComment } from '@/api/commit'
import { getPlayProgress,getVideoDetail,changeLikeVideo,isLikeVideo,addHistoryVideo,addPlayCount,reportVideo } from '@/api/video'
import { isFriend,addFriend,delFriend  } from '@/api/user'
import { formatTime,formatCount,formatProgress } from '@/utils/format'

import { baseURL } from '@/utils/request'

const data = ref({})

const route = useRoute()
const router = useRouter()

//获取视频id
const videoid = route.params.id
const getList = async () => {
  const res = await getCommentList(videoid)
  data.value = res.data.data.commentList
  // 加入回复框是否显示
  data.value.forEach(item => {
    item.show_reply = false
  })

}
getList()

//视频标签
const tagList = ref([])


// 获取视频详情
const video = ref({
  video:''
})
const getVideo = async () => {
  const res = await getVideoDetail(videoid)
  video.value = res.data.data.video
  tagList.value = video.value.videotag.split(',')

  checkFriend()
}
getVideo()

// 判断是否登陆
const isUserid = () => {
  if (!userid){
    ElMessageBox.confirm(
    '需要登陆后才进行操作',
    '温馨提示',
    {
      confirmButtonText: '去登陆',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(()=>{
    router.push('/login')
  })
    return false
  }
  return true
}


// 获取用户id
const userid = getUserId()
const content = ref('')

// 发表评论
const addComment = async () => {
  if (!content.value) {
    ElMessage('评论不能为空')
    return
  } 
  // 判断是否登陆
  if (!isUserid()) return

  await postComment({content:content.value,userid,videoid})
  content.value = ''
  getList()
  ElMessage({
    message:'评论发布成功',
    type:'success'
  })
}

// 判断是否是好友
const isFr = ref(0)
const checkFriend = async () => {
  if (video.value.userid === userid) {
    isFr.value = 0
    return
  }
  const res = await isFriend(video.value.userid,userid)
  isFr.value = res.data.data.isFriend
}

//添加好友
const add_friden =async () => {
  // 判断是否登陆
  if (!isUserid()) return
  await addFriend(video.value.userid,userid)
  ElMessage({
    message:'添加好友成功',
    type:'success'
  })
  checkFriend()
}

// 删除好友
const del_friend = async () => {
  await delFriend(video.value.userid,userid)
  ElMessage({
    message:'删除好友成功',
    type:'success'
  })
  checkFriend()
}

// 文本域高度
const teatareaInp = (e) => {
  e.target.style.height = 32 + 'px'
  e.target.style.height = e.target.scrollHeight + 'px'
       
}
// 获取回复输入框
const textareaRef = ref()

const reply_content = ref('')
const reply_obj = ref({})
// 设置回复
const name_reply= ref('')
const commentReply = (it,id,index) => {
  data.value.forEach(item => {
    item.id === id ? item.show_reply = true : item.show_reply = false
  })
  reply_obj.value = {
    videoid,
    userid,
    indirectReplyId: id,
    replyUserId:it.userid,
    directReplyId: it.id,
    content:''
  }
  name_reply.value = it.nickname
  setTimeout(() => {
    textareaRef.value[index].focus()
  },300)

}
// 回复上传
const reply_upload =async () => {
  // 判断是否登陆
  if (!isUserid()) return
  if(reply_content.value === '') {
    return
  }
  reply_obj.value.content = reply_content.value
  reply_content.value = ''
  await replyComment({...reply_obj.value})
  getList()
}

const like = ref(false)
// ❤
const change_Like =async () => {
  // 判断是否登陆
  if (!isUserid()) return
  await changeLikeVideo({
    videoid,
    userid:userid,
    videotag:video.value.videotag
  },!like.value)
  isLike_video()
}
// 获取❤
const isLike_video = async () => {
  const res = await isLikeVideo(videoid,userid)
  like.value = res.data.data.isLike
  video.value.likecount = res.data.data.likecount
}
isLike_video()


const playVideo = ref({})
playVideo.value.videoid = route.params.id
// const test = (e) => {

//   playVideo.value.userid = userid
//   playVideo.value.playprogress = Math.floor(e.currentTime)
//   console.log(e.currentTime)
// }

const report_info = ref({})
const open = () => {
  // 判断是否登陆
  if (!isUserid()) return
  ElMessageBox.prompt('请输入举报的原因', '举报', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
  })
    .then( async ({value}) => {
      report_info.value.reportreason = value
      report_info.value.videoid = video.value.videoid
      report_info.value.userid  = video.value.userid
      console.log(12313)
      await reportVideo(report_info.value)
      console.log(report_info.value)
      ElMessage({
        type: 'success',
        message: `举报成功`,
      })
    })
}

const videoCurrentTime =ref(0)


onMounted(async() => {
  const res = await getPlayProgress(userid,videoid)
  videoCurrentTime.value = res.data.data.progress
  const videoTar = document.querySelector('.videoTar')
  videoTar.currentTime = videoCurrentTime.value
  const progressDiv = document.querySelector('.palyProgress')
  if (videoCurrentTime.value > 0){
    progressDiv.style.display = 'block'
    setTimeout(() => {
      progressDiv.style.display = 'none'
    },2000)
  }
})


//添加历史记录
onBeforeUnmount(() => {
    addPlayCount(videoid)
    if (!userid) return
    const videoTar = document.querySelector('.videoTar')
    playVideo.value.userid = userid
    playVideo.value.playprogress = videoTar.currentTime
    addHistoryVideo(playVideo.value)

  })
</script>
<template>
  <div class="container">
    <div class="playerVideo">
      <div class="palyProgress">已为你定位至{{ formatProgress(videoCurrentTime) }}</div>
      <!-- <video  src="../video/VID_20240403_215344.mp4" autoplay controls></video> -->
      <video class="videoTar" :src="baseURL+'player/'+video.video"   autoplay controls>
      </video>
      
    </div>
    <div class="info">
      <span @click="change_Like" class="iconfont icon-xihuan" v-if="!like"></span>
      <span @click="change_Like" class="iconfont icon-xihuan1" v-else></span>
      <span>{{formatCount(video.likecount)}}</span>
      <div class="report">
        <span class="iconfont icon-gengduo1"></span>
        <!-- 举报 -->
        <div class="option" @click="open">
          举报
        </div>
      </div>
      
    </div>
    <div class="title">
      <h4>{{video.videotitle}}</h4>
    </div>
    <div class="desc">
      <p>{{video.videodesc}}</p>
    </div>
    <div class="tag">
      <span v-for="item in tagList" 
            :key="item"
            @click="$router.push('/search?keyword='+item)">{{ item }}</span>
    </div>
    <div class="publisher">
      <el-avatar :size="50"  :src="baseURL+'user/headerPic/'+video.userid" />
      <span class="nickname">{{ video.username }}</span>
        <span class="add_friend" 
              @click="add_friden"
              v-if="isFr === -1"></span>
        <span class="is_friend" 
              v-else-if="isFr == 1">
          <div class="del_friend" @click="del_friend">删除好友</div>
        </span>
    </div>
    <div class="comment" v-for="(item,index) in data" :key="item.id">
      <div class="commentList">
        <div class="headPic">
          <el-avatar :src="baseURL+'user/headerPic/'+item.userid" />
        </div>
        <div class="commentDetial">
          <div class="name_time">
            <h4>{{ item.nickname }}</h4>
          </div>
          <p>{{ item.content }}</p>
          <span class="publish_time">
            {{ formatTime(item.publishtime,'comment') }}
            <a @click="commentReply(item,item.id,index)">回复</a>
          </span>
          <div class="reply_item" v-for="reply in item.replyList" :key="reply.id">
            <el-avatar class="reply_avatar" :size="24" :src="baseURL+'user/headerPic/'+reply.userid" />
            <div class="reply">
              <span class="reply_name">{{ reply.nickname }}</span>
              <span class="reply_content" v-if="reply.directReplyId === reply.indirectReplyId">{{ reply.content}}</span>   
              <span class="reply_content_else" v-else>
                <span class="reply_name">
                  &nbsp;{{ reply.replyNickName }}：
                </span>{{ reply.content}}
              </span>
              <span class="reply_time">
                {{ formatTime(reply.publishtime,'comment') }}
                <a @click="commentReply(reply,item.id,index)" >回复</a>
              </span>
            </div>
          </div>
            <div v-show="item.show_reply" class="reply_box" >
              <textarea :placeholder="'回复 ' + name_reply + ':'" 
                        v-model="reply_content" 
                        :class=" reply_content !== '' ? 'textarea_active' : '' "  
                        @input="e => teatareaInp(e)"
                        ref="textareaRef"
              ></textarea>
          </div>
          <button 
            v-show="item.show_reply" 
            @click="reply_upload"
            class="btn_reply"
            >发布</button>
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
  .info {
    position: relative;
    margin-top: 10px;
    line-height: 30px;
    user-select:none;
    .iconfont {
      cursor: pointer;
      font-size: 30px;
      vertical-align: middle;
    }
    .icon-xihuan1 {
      color: red;
    }
    span {
      font-size: 14px;
    }
    .report {
      display: inline-block;
      position: absolute;
      right: 0;
      height: 100%;
      .icon-gengduo1 {
        font-size: 14px;
        color: #888;
      }
      &:hover .option {
        display: block;
      }
      .option {
        display: none;
        cursor: pointer;
        position: absolute;
        font-size: 12px;
        top: 26px;
        right: -12px;
        width: 40px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        box-shadow: 0 0 2px black;
      }
    }
  }
  .title {
    margin-top: 10px;
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
      background-color: rgb(241,242,243);
      margin-right: 10px;
      color: rgb(97,102,122);
      cursor: pointer;

    }
  }
  .publisher {
    margin-bottom: 30px;
    font-size: 0;
    display: flex;
    align-items: center;
    .nickname {
      margin-left: 10px;
      font-size: 20px;
      font-weight: 700;
      line-height: 50px;
      margin-right: 10px;
    }
    //////////////////////////////////////////////
    .add_friend {
      height: 30px;
      width: 80px;
      line-height: 30px;
      font-size: 16px;
      color: white;
      background-color: rgb(0,174,236);
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
    }
    .add_friend::after{
      content: "+好友";
    }
    .is_friend {
      height: 30px;
      width: 80px;
      line-height: 30px;
      font-size: 16px;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      background-color: rgb(227,229,231);
      color: rgb(148,153,160);
      .del_friend {
        width: 80px;
        height: 30px;
        background-color: rgb(227,229,231);
        display: none;
        border-radius: 5px;
      }
      
    }
    .is_friend::before{
      content: "已是好友";
    }
    .is_friend:hover .del_friend{
      display: block;
      &:hover {
        background-color: #dddedf;
        color: rgb(0,174,236);
      }
    }
    /////////////////////////////////////
  }
  .playerVideo {
    position: relative;
    .palyProgress {
      display: none;
      padding-left: 10px;
      padding-right: 10px;
      height: 30px;
      line-height: 30px;
      z-index: 1;
      color: white;
      position: absolute;
      bottom: 68px;
      left: 15px;
      background-color: rgba(0, 0, 0, 0.557);
    }
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
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px rgb(207, 204, 204) solid;
        .name_time {
          display: flex;
          justify-content: space-between;
          line-height: 25px;
          margin-bottom: 12px;
          h4 { 
          font-size: 13px;
          font-weight: 100;
          color: rgb(97, 102, 109);
          }
          span {
            margin-right: 10px;
            color: #767575;
            font-size: 12px;
          }
        }
        p {
          font-size: 12px;
          line-height: 20px;
          word-wrap: break-word;
          word-break: break-word;
        }
        .publish_time {
          display: inline-block;
          margin-top: 12px;
          color: #767575;
          font-size: 12px;
          a {
            padding-left: 10px;
            cursor: pointer;
          }
          a:hover {
            color: rgb(64,158,255);
          }
        }
        .reply_item {
          margin-top: 10px;
          .reply_avatar {
            margin-right: 10px;
          }
          .reply {
            width: calc(100% - 34px);
            display: inline-block;
            min-height: 24px;
            line-height: 20px;
            vertical-align: top;
            font-size: 12px;
            span {
              word-wrap: break-word;
              word-break: break-word;
            }
            .reply_name {
              color: rgb(97, 102, 109);
              font-size: 12px;
              margin-right: 5px;
            }
            .reply_content {
              font-size: 14px;
            }
            .reply_content_else{
              font-size: 14px;
            }
            .reply_content_else::before{
              content:'回复'
            }
            .reply_time {
              display: block;
              margin-top: 1px;
              color: #767575;
              font-size: 12px;
              a {
                padding-left: 10px;
                cursor: pointer;
              }
              a:hover {
                color: rgb(64,158,255);
              }
            }
            
          }
        }
        .reply_box {
          margin-top: 8px;
          display: flex;
          padding: 8px 0;
          flex-direction: column;
          flex-wrap: wrap;
          background-color: white;
          border: 1px rgb(227,229,231) solid;
          border-radius: 4px;
          cursor: text;
          textarea {
            padding: 0 8px;
            resize: none;
            background-color: transparent;
            outline: none;
            width: 100%;
            border: none;
            height: 32px;
            line-height: 32px;
            max-height: 80px;
          }
          textarea::placeholder {
            font-size: 14px;
            line-height: 32px;
          }
          .textarea_active {
            line-height: 16px;

          }
        }
        .btn_reply {
          transform: translateX(380px) translateY(8px);
          background-color: rgb(64,158,255);
          border: none;
          color: white;
          width: 60px;
          height: 30px;
          border-radius: 3px;
          margin-bottom: 8px;
          cursor: pointer;
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