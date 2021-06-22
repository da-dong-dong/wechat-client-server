/*********

	接口调用 通用

**********/
const { $Message } = require('@/wxcomponents/base/index');
import user from '@/store/module/user.js'
const request = (url, options, bool = true) => {
	uni.showLoading({
	    title: '加载中',
			// 蒙板层
			mask:true,
	});
	return new Promise((resolve,reject)=>{
		var task = uni.request({
			url:url,
			method:options.method,
			data:options.data,
			header: {
				'Authorization': user.state.code?user.state.code:''
			},
			success :(res)=>{
				bool && uni.hideLoading();
				
				if(res.data.code !== 200){
					if(res.data.code !== 407){
						$Message({
							content: res.data.message || res.data.msg,
							type: 'error',
							// duration:
						});
					}
					let code = res.data.code
					switch(code){
						case 407: //登录超时
							// cancaelRes = true
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/login/index'
								})
							},1000)
							break;
					}			
						
					resolve(res)
				}else{
					bool && uni.hideLoading();
					resolve(res)
				}
			},
			fail:(err)=>{
				uni.hideLoading();
				$Message({
					content: '请求接口失败',
					type: 'error'
				});
				//缓存
				uni.reLaunch({
					url:'/pages/login/index'
				})
				reject(err)
			},
			complete:(com)=>{
			}
		})
	})
}
const get = (url, options = {}, bool = true) => {
    return request(url, { method: 'GET', data: options }, bool)
}

//post对象
const postObj = (url, options) => {
    return request(url, { method: 'POST', data: options, isObj: true })
}
//post参数
const post = (url, options,bool = true) => {
    return request(url, { method: 'POST', data: options, isObj: false },bool)
}
 
const put = (url, options) => {
    return request(url, { method: 'PUT', data: options, isObj: true })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, { method: 'DELETE', data: options })
}

const del = (url, options) => {
	let keys = Object.keys(options) 
	let arr = []
	console.log(keys);
	console.log(arr);
	keys.forEach(_ => {
		arr.push(`${_}=${options[_]}`)
	})
    return request(url + '?' + arr.join('&'), { method: 'DELETE' })
}

module.exports = {
    get,
    post,
    put,
    remove,
	del,
    postObj,
}