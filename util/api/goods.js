import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 获取套系类别列表
export const getListAssemblyOnlineCategory = (params) => {
	return get(baseUrl.getListAssemblyOnlineCategory, params) 
}

// 获取套系分页
export const getPageAssemblyOnline = (params) => {
	return get(baseUrl.getPageAssemblyOnline, params)
}

// 获取套系详情
export const getAssemblyOnlineDetail = (params) => {
	return get(baseUrl.getAssemblyOnlineDetail, params)
}

// 获取预约拍照档期
export const reservationPhotoDate = (params) => {
	return postObj(baseUrl.reservationPhotoDate, params)
}

// 查询档期费用
export const typographyCost = (params) => {
	return get(baseUrl.typographyCost, params)
}
