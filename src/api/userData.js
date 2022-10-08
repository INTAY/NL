import request from '@/utils/request'

/* 登录用户信息Api */

// 获取用户数据接口
export function queryUserPageApi(data) {
  return request({
    url: '/service/114/staff/list',
    method: 'get',
    params: data
  })
}
// 新增用户接口
export function addUserApi(data) {
  return request({
    url: '/service/114/staff',
    method: 'post',
    data
  })
}
// 修改角色接口
export function updateUserApi(data) {
  return request({
    url: '/service/114/staff',
    method: 'put',
    data
  })
}
// 删除角色接口
export function deleteUserApi(data) {
  return request({
    url: '/service/114/staff/'+data,
    method: 'delete',
    // params: data
  })
}
// 查询角色详情
export function queryUserDetailApi(data) {
  return request({
    url: '/service/114/staff/'+data,
    method: 'get',
    // params: data
  })
}
// 查询组织部门
export function orgDeptlistApi() {
  return request({
    url: '/service/114/orgApi/orgDeptlist',
    method: 'get',
    params: ''
  })
}
// 上传头像
export function upLoadFileApi(data) {
  return request({
    url: '/service/107/Upload',
    method: 'post',
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
// 下载头像
export function downLoadFileApi(data) {
  return request({
    url: '/service/107/Download/'+data,
    method: 'get'
  })
}
// 更新头像
export function updateImageApi(data) {
  return request({
    url: '/service/102/adminApi/updateImage',
    method: 'put',
    data
  })
}
// 图片路径
// export const imgUrl = 'http://192.168.10.194:81/service/107/img/'
// export const imgUrl = 'http://192.168.20.171:81/service/107/img/'