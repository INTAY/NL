import request from '@/utils/request'
import axios from 'axios'

export function loginService(data) {
  return request({
    // url: '/service/9060/loginApi/login',
    url: '/service/9060/loginApi/login',
    method: 'get',
    params: data
  })
}

export function updatePasswdApi(data) {
  return request({
    url: '/service/9060/loginApi/updatePasswd',
    method: 'put',
    params: data
  })
}

export function loginOutService(data) {
  return request({
    url: '/service/9060/loginApi/logout',
    method: 'get',
    params: data
  })
}

export function getInfo(data) {
  return request({
    url: '/service/114/staff/'+data,
    method: 'get',
  })
}

export function getSubSysList(data) {
  return request({
    url: '/service/9060/loginApi/loginBySubSys',
    method: 'get',
    params: data
  })
}

export function getShowImage(data) {
  return request({
    url: '/service/9060/loginApi/showImage',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}