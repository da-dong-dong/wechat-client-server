import amap from '@/util/lib/amap-wx.js'
import { listBrand,getCityShop } from '@/util/api/map.js' 
export default{
	namespaced: true,
	state:{
		shopIdList: null, // 所有门店信息
		city: null, // 当前位置
		barmd: null, // 品牌分类
		barmdId: null, // 品牌分类id
		location:null, // 经纬度
	},
	getters:{
		get_shopIdList:state => state.shopIdList,
		get_city:state => state.city,
		get_barmd:state => state.barmd,
		get_barmdId:state => state.barmdId,
		get_location:state => state.location,
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

		mut_location(state,data){
			state.location = data
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
					let {city,streetNumber} = data[0].regeocodeData.addressComponent
					console.log(data)
					commit('mut_city', city)
					commit('mut_location', [data.longitude,data.latitude])
				},
				fail: (err) => {
					console.log(data,'取消授权')
					commit('mut_city', '取消授权')
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
				}else if(barmd.length === 0){
					uni.navigateTo({
						url:'/pages/tabBar/shoppingCart/components/changeRegion'
					})
				}
			})
			
		},
  }
}