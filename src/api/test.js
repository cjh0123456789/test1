import request from '@/utils/request'

export const hello = () => {
    return request.get('hello')
}

