import request from '@/utils/request'

// 获取评论
export const getCommentList = (videoid) => request.get('comment/list',{
    params:{
        videoid
    }
}) 

export const getCountByVideoId = (videoid) => {
    return request.get('comment/total',{
    params:{
        videoid
    }
})}
// 发表评论
export const postComment = (obj) => {
    return request.post('/comment/publish',{...obj})
}

// 回复评论
export const replyComment = (obj) => {
    return request.post('/comment/reply',{...obj})
}