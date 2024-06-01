import request from '@/utils/request'

export const getNickname =  (userid) => {
    return  request.get('/user/nickname', {
        params:{
            userid
        }
    })
}

// 判断是否好友
export const isFriend = (userid,fuserid) => {
    return request.post('/user/isFriend',{
        userid,
        fuserid
    })
}

// 添加好友
export const addFriend = (userid,fuserid) => {
    return request.post('/user/addFriend',{
        userid,
        fuserid
    })
}

// 删除好友
export const delFriend = (userid,fuserid) => {
    return request.post('/user/delFriend',{
        userid,
        fuserid
    })
}

