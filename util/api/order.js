import baseUrl from './index.js'
import { get, post, put, remove, postObj,del } from './methos.js'

// 订单详情
export const orderDetails = (params) => {
	return get(baseUrl.orderDetails, params)
}

// 订单流程
export const orderProcess = (params) => {
	return get(baseUrl.orderProcess, params)
}

// 获取订单列表
export const orderList = (params) => {
	return get(baseUrl.orderList, params)
}

// 订单支付
export const orderPay = (params) => {
	return postObj(baseUrl.orderPay, params)
}

// 关闭订单
export const orderClose = (params) => {
	return get(baseUrl.orderClose, params)
}

// 关闭订单
export const orderDelete = (params) => {
	return del(baseUrl.orderDelete, params)
}

// 获取公众号图文列表
export const getTextImageList = (params) => {
	return get(baseUrl.getTextImageList, params)
}

// 获取标准服务
export const getStandardList = (params) => {
	return get(baseUrl.getStandardList, params)
}

// 获取小程序推荐套系列表
export const getRecommendAssemblyList = (params) => {
	return get(baseUrl.getRecommendAssemblyList, params)
}

// 获取折扣
export const get_discount = (params) => {
	return get(baseUrl.get_discount, params)
}

// 通过手机号码获取是否折扣
export const getCustomerContactByMobile = (params) => {
	return get(baseUrl.getCustomerContactByMobile, params)
}

// 添加或者保存小程序推荐套系
export const addRecommendOne = (params) => {
	return post(baseUrl.addRecommendOne, params)
}
