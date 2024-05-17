import { dayjs } from 'element-plus'

export const formatTime = (time) => {
    if (dayjs().get('year') > dayjs(time).get('year')) {
       return dayjs(time).format('YYYY-M-D')
    }else {
       return dayjs(time).format('M-D')
    }
}

