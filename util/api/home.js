import baseUrl from './index.js'
import { get } from './methos.js'

// 获取套系类别列表
export const getHomeData = (params) => {
	return get(baseUrl.getHomeData, params) 
}
