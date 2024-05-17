import request from '@/utils/request'

export const getNickname =  (userid) => {
    return  request.get('/user/nickname', {
        params:{
            userid
        }
    })
}

