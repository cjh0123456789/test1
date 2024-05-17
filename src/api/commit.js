import request from '@/utils/request'

// 获取评论
export const getCommentList = (videoid) => request.get('comment/list',{
    params:{
        videoid
    }
}) 

// 发表评论
export const postComment = (obj) => {
    return request.post('/comment/publish',{...obj})
}