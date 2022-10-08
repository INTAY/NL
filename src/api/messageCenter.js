import request from '@/utils/request'

/* 消息中心Api */

// 分页查询消息接口
export function queryMsgListApi(data) {
  return request({
    url: '/service/119/api/v1/message/record/page',
    method: 'get',
    params: data
  })
}
// 消息记录未读数查询接口
export function msgUnreadCountApi(data) {
  return request({
    url: '/service/119/api/v1/message/record/unreadCount',
    method: 'get',
    params: data
  })
}
// 查询消息详情接口
export function viewDetailApi(data) {
  return request({
    url: '/service/119/api/v1/message/'+data,
    method: 'get'
  })
}
// 消息已读接口
export function msgRedApi(data) {
  return request({
    url: '/service/119/api/v1/message/record/read/'+data,
    method: 'get'
  })
}
// 删除消息接口
export function deleteMsgApi(data) {
  return request({
    url: '/service/119/api/v1/message/record/'+data,
    method: 'delete'
  })
}