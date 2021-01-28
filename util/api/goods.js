import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 获取套系类别列表
export const getListAssemblyCategory = (params) => {
	return get(baseUrl.getListAssemblyCategory, params) 
}

// 获取套系分页
export const getPageAssemblyDetail = (params) => {
	return get(baseUrl.getPageAssemblyDetail, params)
}

// 获取套系详情
export const getAssemblyDetail = (params) => {
	return get(baseUrl.getAssemblyDetail, params)
}
