import request from '@/utils/request'

//获取视频列表
export const getVideoList = () => {
    return request.get('list')
}

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

// 获取视频文件
// export const getVideoFile = ()
