import request from '@/utils/request'

export const getVideoList = () => {
    return request.get('list')
}

