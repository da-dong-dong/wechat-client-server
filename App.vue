<script>
// 获取当前小程序信息
const accountInfo = uni.getAccountInfoSync(); 
// 获取ext
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
import { mapMutations, mapActions } from 'vuex'
	export default {
		globalData: {  
            tiem: null  
        }, 
		onLaunch: function() {
			console.log('App Launch')
		},
		mounted(){
			console.log('AppMounted')
			this.getStorageCode()
			
			// 存储appid
			this.setAppIdEX()
		},
		methods: {
			...mapActions('user',[
				'act_code'
			]),
			...mapMutations('user',[
				'mut_APPId'
			]),

			// 本地缓存获取code
			getStorageCode(){
				uni.getStorage({
					key: 'code',
					success: res => {
						this.setCode(res.data)
						uni.switchTab({
                            url:'/pages/tabBar/home/home'
                        })
					},
					fail: function(err) {
						uni.redirectTo({
							url:'/pages/login/index'
						})
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
			}


		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	 @import './util/css/comm.scss';
</style>
