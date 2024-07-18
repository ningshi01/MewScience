import axios from 'axios';
import {setToken,getToken,removeToken} from './auths.js'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true
});


// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
 // 在发送请求之前做些什么
    config.headers["X-Csrftoken"] = getToken("csrftoken")
    return config;
  },
  (error: any) => {
 // 处理请求错误
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
 // 对响应数据做点什么
    // console.log("sessionid-after:",getToken("sessionid"))
    // console.log("csrftoken-after:",getToken("csrftoken"))

    return response;
  },
  (error: any) => {
 // 处理响应错误
    return Promise.reject(error);
  },
);

export default axiosInstance;

