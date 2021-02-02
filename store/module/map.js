import amap from '@/util/lib/amap-wx.js'
import { listBrand,getCityShop } from '@/util/api/map.js' 
export default{
	namespaced: true,
	state:{
		shopIdList: null, // 所有门店信息
		city: null, // 当前位置
		barmd: null, // 品牌分类
		barmdId: null, // 品牌分类id
	},
	getters:{
		get_shopIdList:state => state.shopIdList,
		get_city:state => state.city,
		get_barmd:state => state.barmd,
		get_barmdId:state => state.barmdId,
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

		mut_barmdId(state,data){
			state.barmdId = data
		},
	},
  actions: {
	  	// 获取所有门店 
		act_shopIdList({ commit }, data) {
			let param ={
				enterpriseId:data.extConfig,
				shopIds:data.shopIds?data.shopIds:[]
			}
			getCityShop(param).then(res=>{
				let Shop = res.data.data
				console.log(Shop,'所有门店')
				commit('mut_shopIdList', Shop)
			})
			
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
				},
				fail: (err) => {
					console.log(data,'取消')
					console.log(err)
				}  
			}); 
		},

		// 获取品牌分类
		act_barmd({ commit }, data) {
			listBrand({enterpriseId:data}).then(res=>{
				let barmd = res.data.data
				console.log(barmd,'品牌')
				commit('mut_barmd', barmd)
				// 判断是否存在 品牌
				if(!barmd){
					uni.switchTab({
					    url:'/pages/tabBar/home/home'
					})
				}
			})
			
		},
  }
}