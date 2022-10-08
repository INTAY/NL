import request from '@/utils/request'

// 获取客户数据接口
export function queryCustPageApi(data) {
    return request ({
        url: '/service/551/api/v1/custInfo',
        // url:'/service/114/staff/list',
        method: 'get',
        params: data
    })
}

// 查看客户
export function queryCustDetailApi(data) {
    return request({
        url: '/service/551/api/v1/custInfo/'+data,
        //url: '/service/114/staff/'+data,
        method: 'get',
        // params: data
    })
}

// 新增客户接口
export function addCustApi(data) {
    return request({
      url: '/service/551/api/v1/custInfo',
      method: 'post',
      data
    })
}

// 修改客户接口
export function updateCustApi(data) {
    return request({
        url: '/service/551/api/v1/custInfo/'+data.id,
        method: 'put',
        data
    })
}

// 删除客户接口
export function deleteCustApi(data) {
    return request({
      url: '/service/551/api/v1/custInfo/'+data,
      method: 'delete',
      // params: data
    })
}

// 导入
export function importApi(data) {
    return request({
      url: '/service/551/api/v1/equipInfo',
      method: 'post',
      data
    })
}

// 导入设备
export function importEquipApi(data) {
    return request({
      url: '/service/551/api/v1/excel/'+data,
      method: 'post',
    //   data
    })
}