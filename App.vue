<script>
import { mapGetters, mapActions } from 'vuex'
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
		},
		methods: {
			...mapActions('user',[
				'act_code'
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
