import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/table/list',
    method: 'get',
    data
  })
}

export function getEcharts(data) {
  return request({
    url: '/service/555/api/v1/statistics/gnssAuthCount',
    method: 'get',
    params: data
  })
}