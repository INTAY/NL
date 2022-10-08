import request from '@/utils/request'

/* 日志管理Api */

// 获取操作日志数据接口
export function operationLogListApi(data) {
  return request({
    url: '/service/112/solApi/list/like',
    method: 'get',
    params: data
  })
}
// 获取登陆日志数据接口
export function loginLogListApi(data) {
  return request({
    url: 'service/102/adminLogApi/queryAdminLogPage',
    method: 'get',
    params: data
  })
}