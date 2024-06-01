import { dayjs } from 'element-plus'


export const formatTimeHistory = (time) => {
   if(dayjs(time).add(24,'hour').format('yyyy-MM-DD') > dayjs().format('yyyy-MM-DD')){
      return dayjs(time).format("HH:mm")
   } else if (dayjs(time).add(24,'hour').format('yyyy-MM-DD') === dayjs().format('yyyy-MM-DD')){
      return '昨天 '+ dayjs(time).format("HH:mm")
   }else {
      return dayjs(time).format("YYYY-MM-DD")
   }
   
}

export const formatTime = (time,type) => {
   if (dayjs(time).add(24, 'hour') > dayjs()) {
      if (dayjs(time).add(60,'minute') > dayjs()) {
         if (dayjs(time).add(60,'second') > dayjs()) {
            return '刚刚'
         }
         let min = -dayjs().get('minute') + dayjs(time).get('minute')
         min = min < 0 ? - min : 60 -min 
         return min + '分钟前'
      }
      let h = dayjs(time).get('hour') - dayjs().get('hour')
      h = h < 0 ? -h : 24 - h
      return h + '小时前'
   }
   if(type === 'cover') {
      if (dayjs().get('year') > dayjs(time).get('year')) {
         return dayjs(time).format('YYYY-M-D')
      }else {
         return dayjs(time).format('M-D')
      }
   }else if (type === 'comment'){
      return dayjs(time).format('YYYY-MM-DD hh:mm')
   }
    
}

export const formatCount = (count) => {
   if (count >= 10000) {
      return Math.floor(count/10000) +'.' + Math.floor(count%10000/1000) +'万'  
   }else {
      return count
   }
}

export const formatProgress = (progress) => {
   if (progress < 60){
      return '00:' + (progress + '').padStart(2,'0')
   }else  {
      return (Math.floor(progress/60)+'').padStart(2,'0') + ':' + (progress % 60 + '').padStart(2,'0')
   }
}

