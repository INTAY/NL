import request from '@/utils/request'

/* 用户管理Api */

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
// 修改用户接口
export function updateUserApi(data) {
  return request({
    url: '/service/114/staff',
    method: 'put',
    data
  })
}
// 修改用户状态
export function updateUserStatusApi(data) {
  return request({
    url: '/service/114/staff/status',
    method: 'put',
    data
  })
}
// 修改用户信息详情接口
export function updateUserDetailApi(data) {
  return request({
    url: '/service/114/staff/detail',
    method: 'put',
    data
  })
}
// 删除用户接口
export function deleteUserApi(data) {
  return request({
    url: '/service/114/staff/'+data,
    method: 'delete',
    // params: data
  })
}
// 查询用户详情
export function queryUserDetailApi(data) {
  return request({
    url: '/service/114/staff/'+data,
    method: 'get',
    // params: data
  })
}
// 查询组织部门
export function orgDeptlistApi(data) {
  return request({
    url: '/service/114/orgApi/orgDeptlist',
    method: 'get',
    params: data
  })
}
//重置密码
export function resetPasswdApi(data) {
  return request({
    url: '/service/102/adminApi/resetPasswd',
    method: 'put',
    data
  })
}