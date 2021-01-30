import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 登录
export const getTicket = (params) => {
	return postObj(baseUrl.getTicket, params)
}

// 获取微信登录凭证
export const getCode = (params) => {
	return postObj(baseUrl.getCode, params)
}

// 获取用户信息
export const getUserInfo = (params) => {
	return get(baseUrl.getUserInfo, params)
}

// 设置小程序用户手机信息
export const setPhoneNoInfo = (params) => {
	return postObj(baseUrl.setPhoneNoInfo, params)
}

// 设置小程序用户信息
export const setUserInfo = (params) => {
	return postObj(baseUrl.setUserInfo, params)
}

// 修改个人信息
export const updateUserInfo = (params) => {
	return put(baseUrl.updateUserInfo, params)
}