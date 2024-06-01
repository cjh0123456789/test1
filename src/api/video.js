import request from '@/utils/request'

//获取视频列表
export const getVideoList = (userid) => {
    return request.get('list',{
        params:{
            userid
        }
    })
}

// 
export const getVideoListPage = (userid,page) => 
    request.post('listPage',
        page,{        params:{
            userid
        }}
    )

//上传文件
export const postVideo = (fd) => {
    return request.post('/upload',
        fd
    )
}

// 获取视频详情
export const getVideoDetail = (videoid) => {
    return request.get('/videoInfo', {
        params:{
            videoid
        }
    })
}

// 搜索视频
export const searchVideo = (keyword,type,page) => 
    request.post('search', page,{
        
        params:{
            keyword,
            type
        }
        
    })


// 获取视频文件
// export const getVideoFile = ()

// 获取发布的视频
export const getVideoByUserId = (userid,obj) => {
    return request.post('myVideo?userid='+userid,{  
        ...obj
    })
}

// 删除视频
export const deleteVideo = (videoid) => {
   return request.delete('deleteVideo',{
        params:{
            videoid
        }
    })
}

// ❤
export const changeLikeVideo = (obj,state) => {
    return request.post('like',obj, {params:{state:state}})
}

// 判断是否❤
export const isLikeVideo = (videoid,userid) => {

    return request.get('isLike',{
        params:{
            videoid,
            userid
        }
    })
}

// 历史记录添加
export const addHistoryVideo = (obj) => {
    request.post('playHistory',obj)
}

// 获取历史记录
export const getHistoryVideo = (userid) => {
    return request.get('playHistory',{
        params:{
            userid
        }
    })
}

// 删除历史记录
export const delHistoryVideo = (id) => {
    return request.delete('playHistory',{
        params:{id}
    })
}

// 增加播放量
export const addPlayCount = (videoid) => {
    request.get('playCount',{
        params:{videoid}
    })
}

// 举报
export const reportVideo = (report) => {
    return request.post('videoReport',report)
}

// 获取举报信息
export const getReportByUserId = (userid) => {
    return request.get('videoReport',{
        params:{
            userid
        }
    })
}

// 获取播放进度
export const getPlayProgress = (userid,videoid) => {
    return request.get('playProgress',{
        params:{
            userid,
            videoid
        }
    })
}