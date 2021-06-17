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

// 发送修改密码验证码
export const sendVerificationCode = (params) => {
	return postObj(baseUrl.sendVerificationCode, params)
}

// 修改密码
export const updatePassword = (params) => {
	return put(baseUrl.updatePassword, params)
}

// 获取套系服务说明
export const getAssemblyDescription = (params) => {
	return get(baseUrl.getAssemblyDescription, params)
}

// 修改密码
export const getReservationDescription = (params) => {
	return get(baseUrl.getReservationDescription, params)
}

// 获取预约协议说明
export const getAgreementDescription = (params) => {
	return get(baseUrl.getAgreementDescription, params)
}

// 关于
export const getReservationServer = (params) => {
	return get(baseUrl.getReservationServer, params)
}
