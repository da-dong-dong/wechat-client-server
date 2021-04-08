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

// 获取图文详情
export const getAssemblptDetail = (params) => {
	return get(baseUrl.getAssemblptDetail, params)
}

// 获取预约拍照档期
export const reservationPhotoDate = (params) => {
	return postObj(baseUrl.reservationPhotoDate, params)
}

// 查询档期费用
export const typographyCost = (params) => {
	return get(baseUrl.typographyCost, params)
}

// 获取类别列表
export const listCategory = (params) => {
	return get(baseUrl.listCategory, params)
}

// 下单
export const order = (params) => {
	return postObj(baseUrl.order, params)
}

// 下单ove
export const orders = (params) => {
	return get(baseUrl.orders, params)
}

// 获取线上图文套系详情
export const getPtdetail = (params) => {
	return get(baseUrl.getPtdetail, params)
}

// 根据推荐套系获取详情
export const getPropelDetail = (params) => {
	return post(baseUrl.getPropelDetail, params)
}

// 获得图文类别下的套系
export const getMaAssemblyOnlineTitle = (params) => {
	return get(baseUrl.getMaAssemblyOnlineTitle, params)
}