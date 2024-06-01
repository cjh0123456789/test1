<script setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import { getHistoryVideo,delHistoryVideo } from '@/api/video'
import {formatTimeHistory} from '@/utils/format'
import { getUserId } from '@/utils/storage'
import { baseURL } from '@/utils/request'

const router = useRouter()

//获取userid
const userid = getUserId()
const n = ref(6)

const isBottom = (e) => {
    const scrollTop = e.target.scrollTop
    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight
    if (scrollTop + clientHeight > scrollHeight - 1){
        n.value += 2
    }
}

const playList = ref({})

const getplayList = async() => {
    const res =  await getHistoryVideo(userid)
    playList.value = res.data.data.playlist
}
getplayList()

// 删除历史记录
const delplayHistory =async (id) => {
    await delHistoryVideo(id)
    getplayList()
}
</script>
<template>
    <el-main @scroll="e => isBottom(e)">
        <div class="container" >
        <ul>
            <li v-for="item in playList" :key="item.id">
                <div class="show_time">
                    {{formatTimeHistory(item.playtime)}}
                </div>
                <div class="cover" @click="$router.push('/detail/'+item.videoid)">
                    <img  :src="baseURL+'/cover/'+item.videoUser.cover" alt="">
                </div>
                <div class="detail">
                    <div class="detail_left">
                        <div class="title">
                            {{ item.videoUser.videotitle }}
                        </div>
                        <div class="author">
                            {{item.videoUser.username}}
                        </div>
                    </div>
                    <div class="detail_right">
                        <div class="del">
                            <span @click="delplayHistory(item.id)" class="iconfont icon-shanchu"></span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    </el-main>

</template>
<style lang="less" scoped>
.container {
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            display: flex;
            margin-left: 50px;
            margin-top: 20px;
            width: 100%;
            height: 120px;
            div {
                height: 100%;
            }
            .show_time {
                width: 100px;
                line-height: 120px;
                font-size: 12px;
                color: rgb(159, 158, 158);
            }
            .cover {
                cursor: pointer;
                img {
                    background-color: red;
                    width: 193.7px;
                    height:100%;
                    border-radius: 5px;
                }
            }
            .detail {
                margin-left: 20px;
                border-bottom: 1px solid rgba(128, 128, 128, 0.265);
                height: 100%;
                width: 580px;
                display: flex;
                justify-content: space-between;
                .detail_left {
                    width: 450px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .title {
                        margin-top: 20px;
                        width: 300px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-weight: 700;
                        font-size: 18px;
                    }
                    .author {
                        font-size: 14px;
                        color: rgb(153, 153, 153);
                        height: 50px;
                    }
                }
                .detail_right {
                    width: 120px;
                    .del {
                        line-height: 100px;
                        text-align: right;
                        .iconfont {
                            cursor: pointer;
                            &:hover {
                                color: red;
                            }
                        }
                    }
                }

            }

        }
    }
}
</style>