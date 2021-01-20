import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 登录
export const getH5Map = (params) => {
	return get(baseUrl.getH5Map, params)
}

// 获取门店信息
export const getCityShop = (params) => {
	return get(baseUrl.getCityShop, params)
}
