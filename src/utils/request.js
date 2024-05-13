import  axios  from "axios"
const baseURL = 'http://localhost:8080/'

const instance = axios.create({
    //基础地址，超时时间
    baseURL,
    timeout: 10000
  })

export default instance