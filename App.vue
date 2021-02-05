<script>
// 获取当前小程序信息
const accountInfo = uni.getAccountInfoSync(); 
// 获取ext
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
import {mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
		computed: {
			...mapGetters('map',[
				'get_city',
				'get_shopIdList',
				'get_barmdId'
			]),
			
		},
		globalData: {  
            tiem: null  
        }, 
		onLaunch: function() {
			console.log('App Launch')
		},
		mounted(){
			console.log('AppMounted')
			// 获取本地缓存
			this.getStorageCode()
			// 存储appid
			this.setAppIdEX()
			// 品牌分类
			console.log(extConfig.enterpriseId)
			this.act_barmd(extConfig.enterpriseId)
			// 所有门店
			this.act_shopIdList({extConfig:extConfig.enterpriseId})
			// 获取当前位置
			this.act_city()
			// 判断是否存有品牌id
			//this.getBarmdId()
		},
		methods: {
			...mapActions('user',[
				'act_code'
			]),
			...mapMutations('user',[
				'mut_APPId',
				'mut_shopId'
			]),
			...mapActions('map',[
				'act_city',
				'act_barmd',
				'act_shopIdList'
			]),

			// 本地缓存获取code
			getStorageCode(){
				uni.getStorage({
					key: 'code',
					success: res => {
						this.setCode(res.data)
						// uni.switchTab({
                        //     url:'/pages/tabBar/home/home'
                        // })
					},
					fail: function(err) {
						// uni.redirectTo({
						// 	// url:'/pages/login/index'
						// 	url:'/pages/tabBar/home/home'
						// })
					}
				})
			},

			// 存储store
			setCode(code){
				this.act_code(code)
			},

			// 存储appIp和企业id
			setAppIdEX(){
				let param = {
					appId:accountInfo.miniProgram.appId,
					enterpriseId:extConfig.enterpriseId
				}
				this.mut_APPId(param)
			},

			// 判断是否存有当前门店
			getBarmdId(val){
				uni.getStorage({
					key: 'shopId',
					success: res => {
						// 存储当前门店
						this.mut_shopId(res.data)
						uni.switchTab({
							url:'/pages/tabBar/home/home'
						})
						console.log('选过的门店',res.data)
					},
					fail:()=> {
						let arr = []
						this.get_shopIdList.map(item=>{
							if(item.city == val){
								arr.push(item)
							}
						})
						console.log('设置最近门店',arr)
						this.mut_shopId(arr[0]) 
					}
				})
				if(this.get_barmdId){
					
				}
			}

		},
		onHide: function() {
			console.log('App Hide')
		},

		// 监听是否选择位置 设置最近门店
		watch:{
			get_city(val){
				// 判断定位门店
				console.log(val)
				
				this.getBarmdId()
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	 @import './util/css/comm.scss';
</style>
