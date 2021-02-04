import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 订单详情
export const orderDetails = (params) => {
	return get(baseUrl.orderDetails, params)
}

// 订单流程
export const orderProcess = (params) => {
	return get(baseUrl.orderProcess, params)
}
