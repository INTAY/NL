import request from '@/utils/request'

/* 资源管理Api */

// 获取角色数据接口
export function queryRolePageApi(data) {
  return request({
    url: 'service/102/roleApi/queryRolePage',
    method: 'get',
    params: data
  })
}
// 获取角色数据接口
export function getRoleListApi(data) {
  return request({
    url: 'service/102/roleApi/getRoleList',
    method: 'get',
    params: data
  })
}
// 新增角色接口
export function addRoleApi(data) {
  return request({
    url: 'service/102/roleApi/addRole',
    method: 'post',
    params: data
  })
}
// 查询合同有效期
export function getEffectiveTimeApi() {
  return request({
    url: 'service/102/roleApi/getEffectiveTime',
    method: 'get',
    params: ''
  })
}
// 配置角色权限接口
export function addRoleResApi(data) {
  return request({
    url: 'service/102/roleApi/addRoleRes',
    method: 'put',
    data
  })
}
// 根据当前用户角色查询资源信息
export function queryResourceTreeApi(data) {
  return request({
    url: 'service/102/roleApi/queryResourceTree',
    method: 'get',
    params: data,
  })
}
// 删除角色接口
export function deleteRoleApi(data) {
  return request({
    url: 'service/102/roleApi/deleteRole',
    method: 'delete',
    params: data
  })
}
// 修改角色接口
export function updateRoleApi(data) {
  return request({
    url: 'service/102/roleApi/updateRole',
    method: 'put',
    params: data
  })
}
// 启用禁用
export function updateStatusApi(data) {
  return request({
    url: 'service/102/roleApi/updateRoleFlag',
    method: 'put',
    params: data
  })
}
// 查询角色详情
export function queryRoleDetailApi(data) {
  return request({
    url: 'service/102/roleApi/queryRole',
    method: 'get',
    params: data
  })
}

// 根据登录用户查询菜单信息
export function getMenu(data) {
  return request({
    url: 'service/102/adminApi/getResourceList',
    method: 'get',
    params: data,
    headers:{url:'NO_AUTHENTICATION_REQUIRED'}
  })
}