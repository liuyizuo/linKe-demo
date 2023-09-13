
import axios from 'axios'


//baseURL 最后'/'必需
let baseURL

baseURL = 'https://mock.apifox.cn/m1/3285905-0-default'
const service = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  withCredentials: true,
  headers: { 
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },
})
const jsonService = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  withCredentials: true,
  headers: { 
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json;charset=utf-8"
  },
})
const services = axios.create({
  baseURL: baseURL,
  timeout: 6000,
  withCredentials: true,
  headers: { 
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type':'multipart/form-data'
  },
})
const servicPaste = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: { 
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type':'multipart/form-data'
  },
})
// 截图上传截图 添加请求拦截器
servicPaste.interceptors.request.use(config => {
  return config;
}, err => {
  console.log(err)
  return Promise.reject(err);
})
// 截图上传截图 添加响应拦截器
servicPaste.interceptors.response.use((response) => {
  if (response.status == 401){
    location.href = location.origin;
    return;
  }
  if (response.status == 200) {
    return response;
  }
}, err => {
  console.log(err)
  return Promise.reject(err);
})
// 文件上传时 添加请求拦截器
services.interceptors.request.use(config => {
  return config;
}, err => {
  console.log(err)
  return Promise.reject(err);
})
// 文件上传时 添加响应拦截器
services.interceptors.response.use((response) => {
  if (response.status == 401){
    location.href = location.origin;
    return;
  }
  if (response.status == 200) {
    if (response.data.state == 0 || !response.data) {
      if (response.errorCode && response.errorCode == 401){
        location.href = location.origin;
        return;
      }
      var messageContent = response.data.message ? response.data.message : '加载失败';
     
      return Promise.reject(messageContent);
    } else {
      return response;
    }
  }
}, err => {
  console.log(err)
  return Promise.reject(err);
})
// 一般请求的  添加请求拦截器
service.interceptors.request.use(config => {
  return config;
  }, err => {
    console.log(err)
    return Promise.reject(err);
  })

// 一般请求的  添加响应拦截器
service.interceptors.response.use((response) => {
  if (response.status == 401){
    location.href = location.origin;
    return;
  }
  if (response.status == 200) {
    if (response.data.state === 0 || !response.data) {
      if (response.errorCode && response.errorCode == 401){
        location.href = location.origin;
        return;
      }
      var messageContent = response.data.message ? response.data.message : '加载失败';

     
      return Promise.reject(messageContent);
    } else {
      return response;
    }
  }
  }, err => {
    console.log(err)

    return Promise.reject(err);
  }) 
  jsonService.interceptors.response.use((response) => {
    if (response.status == 401){
      location.href = location.origin;
      return;
    }
    if (response.status == 200) {
      if (response.data.state == 0 || !response.data) {
        if (response.errorCode && response.errorCode == 401){
          location.href = location.origin;
          return;
        }
        var messageContent = response.data.message ? response.data.message : '加载失败';
   
        return Promise.reject(messageContent);
      } else {
        return response;
      }
    }
    }, err => {
      console.log(err)

      return Promise.reject(err);
    }) 
export {
  service as request,
  services as uploadFile,
  servicPaste as pasteUploadFile,
  jsonService as JsonRequest,
  baseURL 
}