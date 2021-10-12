/*
 **请求数据**
 */
import axios from 'axios'
// import urlConfig from "../../public/config.js"

export function request(config) {
  // let base = localStorage.getItem('ApiUrl')
  // 这里可以直接使用静态文件中配置的url地址
  let base = ApiUrl
  // console.log(base)
  // console.log(base)
  //创建axios实例
  const instance = axios.create({
    //baseURL:'http://localhost:8012/api/LargeData', //我本机：http://172.16.100.101:8011//api/LargeData
    baseURL: base,
    timeout: 6000
  })

  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  //发送正真的网络请求
  // console.log(config)
  return instance(config)
}
