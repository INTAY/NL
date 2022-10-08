import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, getAppKey, getSubSysId, getlanguage } from '@/utils/auth'
import { getUrl } from '@/utils/auth'
import router from '../router'

// const base_url = process.env.NODE_ENV === 'development' ? process.env.BASE_API : process.env.API_ROOT

// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/json';
const service = axios.create({
  // baseURL: base_url, // api的base_url
  timeout: 600000, // 请求超时时间
  withCredentials: true, // 跨域请求允许携带cookie
  headers: {
    'Content-Type': "application/json"
  },
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['access-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改

  return config
}, error => {
  Promise.reject(error)
})
// request拦截器
service.interceptors.request.use(config => {
  config.headers['appkey'] = getAppKey() // 让每个请求携带自定义token 请根据实际情况自行修改
  // config.headers['appkey'] = "c2add694bf942dc77b376592d9c862cd"
  // appkey: c2add694bf942dc77b376592d9c862cd
  return config
}, error => {
  Promise.reject(error)
})
// request拦截器
service.interceptors.request.use(config => {
  config.headers['subSysId'] = getSubSysId() // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  Promise.reject(error)
})
// request拦截器
service.interceptors.request.use(config => {
  let languageKey = getlanguage();
  if (languageKey == 'zh') {
    languageKey = 'zh_CN'
  } else if (languageKey == 'en') {
    languageKey = 'en_US'
  } else {
    languageKey = 'en_US'
  };
  config.headers['lang'] = languageKey
  return config
}, error => {
  Promise.reject(error)
})
// request拦截器
service.interceptors.request.use(config => {
  config.headers['url'] = getUrl() || 'NO_AUTHENTICATION_REQUIRED' // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非0是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code == 40316) {
      router.push({ path: "/login" });
    }
    if (res.code == 401) {
      router.push({ path: "/login" });
    }
    return response.data
    // if (res.code !== 200 && res.code !== 0) {
    //   // Message({
    //   //   message: res.msg,
    //   //   type: 'error',
    //   //   duration: 5 * 1000
    //   // })

    //   // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //   //     confirmButtonText: '重新登录',
    //   //     cancelButtonText: '取消',
    //   //     type: 'warning'
    //   //   }).then(() => {
    //   //     store.dispatch('FedLogOut').then(() => {
    //   //       location.reload()// 为了重新实例化vue-router对象 避免bug
    //   //     })
    //   //   })
    //   // }
    //   // return Promise.reject('error')
    //   return response.data
    // } else {
    //   return response.data
    // }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
