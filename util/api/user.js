import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 登录
export const getTicket = (params) => {
	return postObj(baseUrl.getTicket, params)
}