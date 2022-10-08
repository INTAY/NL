import Axios from "axios";
import Qs from 'qs';
import { resolve } from "url";
import router from '../router'
import { getToken } from '@/utils/auth'
import { getUrl } from '@/utils/auth'

// Axios.defaults.baseURL = this.$baseURL;

// Axios.defaults.baseURL = "http://192.168.20.68:9505/pro-system/";
export default {

  getAjax(apiUrl, data) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "get",
        url: apiUrl,
        params: data
      }).then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }

      }).catch((error) => {
        reject(error)
      })
    })

  },
  // 文件下载
  getAjaxFile(apiUrl, data) {
    return new Promise((resolve, reject) => {

      Axios.get(apiUrl, {'responseType':'blob',data}).then((res) => {
        return resolve(res)
      })

      
      // Axios({
      //   method: "get",
      //   url: apiUrl,
      //   params: data,
      //   responseType:'blob'
      // }).then(res => {
      //     resolve(res.data)

      // }).catch((error) => {
      //   reject(error)
      // })
    })

  },
  postAjax(apiUrl, data) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "post",
        url: apiUrl,
        data: data
      }).then(res => {
        if (res.status == 200) {
          resolve(res.data)
        } else {
          window.location.href = locationUrl
        }

      }).catch((error) => {
        reject(error)
      })
    })

  },
  deleteAjax(apiUrl, data) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "DELETE",
        url: apiUrl,
        data: data
      }).then(res => {
        if (res.status == 200) {
          resolve(res.data)
        } else {
          window.location.href = locationUrl
        }

      }).catch((error) => {
        reject(error)
      })
    })

  },
  putAjax(apiUrl, data) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "put",
        url: apiUrl,
        data: data
      }).then(res => {
        if (res.status == 200) {
          resolve(res.data)
        } else {
          window.location.href = locationUrl
        }

      }).catch((error) => {
        reject(error)
      })
    })

  }
}
// http request 请求拦截器， 有token值则配置上token值
Axios.interceptors.request.use(config => {
  // const token = window.localStorage.getItem("token");
  // config.headers.common["access-token"] = token;
  config.headers['access-token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  // config.headers['token'] = getToken() == null ? "" : getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  config.headers['url'] = getUrl() == null ? "" : getUrl() // 让每个请求携带自定义token 请根据实际情况自行修改

  return config;
}, err => {
  console.info("request 超时了.....");
});
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
Axios.interceptors.response.use(response => {
  if (response.data.code == 401) {
    router.push('/login');
  }
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
  }
  return Promise.reject(error.response)
});
