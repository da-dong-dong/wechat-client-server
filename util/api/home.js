import baseUrl from './index.js'
import { get, put } from './methos.js'

// 获取套系类别列表
export const getHomeData = (params) => {
	return get(baseUrl.getHomeData, params) 
}

// 订单合同
export const getOrderContract = (params) => {
	return get(baseUrl.getOrderContract, params) 
}

// 更改合同
export const updOrderContract = (params) => {
	return put(baseUrl.updOrderContract, params) 
}

// 更改合同状态
export const updOrderContractState = (params) => {
	return put(baseUrl.updOrderContractState, params) 
}
