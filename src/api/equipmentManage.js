import request from '@/utils/request'

// 获取设备数据接口
export function queryEquipPageApi(data) {
    return request ({
        url: '/service/301/mdmDeviceApi/queryMdmDevicePage',
        method: 'get',
        params: data
    })
}

// 查看设备
export function queryEquipDetailApi(data) {
    return request({
        url: '/service/301/mdmDeviceApi/queryMdmDeviceDetail',
        method: 'get',
        params: data
    })
}

// 修改设备接口
export function updateEquipApi(data) {
    return request({
        url: '/service/301/mdmDeviceApi/updateMdmDevice',
        method: 'put',
        data
    })
}

// 删除设备接口
export function deleteEquipApi(data) {
    return request({
      url: '/service/555/api/v1/mdmDevice/deleteMdmDevice',
      method: 'delete',
      params: data
    })
}