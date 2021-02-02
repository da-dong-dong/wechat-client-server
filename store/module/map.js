import amap from '@/util/lib/amap-wx.js'
import { listBrand,getCityShop } from '@/util/api/map.js' 
export default{
	namespaced: true,
	state:{
		shopIdList: null, // 所有门店信息
		city: null, // 当前位置
		barmd: null, // 品牌分类
	},
	getters:{
		get_shopIdList:state => state.shopIdList,
		get_city:state => state.city,
		get_barmd:state => state.barmd,
	},
	mutations:{
		mut_shopIdList(state,data){
			state.shopIdList = data
		},

		mut_city(state,data){
			state.city = data
		},

		mut_barmd(state,data){
			state.barmd = data
		},
	},
  actions: {
	  	// 获取所有门店 
		act_shopIdList({ commit }, data) {
			let param ={
				enterpriseId:data.enterpriseId,
				shopIds:data.shopIds?data.shopIds:[]
			}
			getCityShop(param).then(res=>{
				console.log(res)
			})
			//commit('mut_shopIdList', data)
		},

		// 获取定位
		act_city({ commit }, data) {
			let amapPlugin = new amap.AMapWX({  
				key: '1795a944cf2bc0fa0a47e22b1b67e6aa', // 高德key
			});  
			amapPlugin.getRegeo({  
				success: (data) => {  
					let {city} = data[0].regeocodeData.addressComponent
					commit('mut_city', city)
				}  
			}); 
		},

		// 获取品牌分类
		act_barmd({ commit }, data) {
			listBrand({enterpriseId:data}).then(res=>{
				// 默认第一个
				let barmd = res.data.data
				console.log(res)
				let param ={
					enterpriseId:data,
					shopIds:barmd[0].useShopId
				}
				getCityShop(param).then(res=>{
					console.log(res)
				})
			})
			commit('mut_barmd', data)
		},
  }
}