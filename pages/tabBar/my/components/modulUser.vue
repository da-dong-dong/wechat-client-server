/******************************** 用户弹窗 ***************************************/
<template>
	<view class="bigBox">
		<view class="box">
			<view class="textC marginB20 " >
				<view>为了更好的提供服务给您</view> 
				<view>我们需要您最基本的授权（头像，昵称）</view>
				</view>
			<view class="but">
				<button style="width: 440rpx; margin:20rpx" class="saveBtn" @click="onClickUserInfoAPI" type="primary">同意</button>
				<view class="cancel" @click="cancel">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapActions,mapGetters,mapMutations } from 'vuex'
import { setUserInfo, getUserInfo } from '@/util/api/user.js'
const { $Message } = require('@/wxcomponents/base/index');
	export default {
		props:['phone','type'],
		data() {
			return {
				
			};
		},
		mounted(){
			
		},
		methods:{
			...mapActions('user',[
				'act_code',
                'act_nickName'
			]),
            ...mapMutations('user',[
                'mut_outCode'
            ]),
			cancel(){
				this.$emit('cancel')
			},
			ok(){
				this.$emit('ok')
			},
			// 获取用户信息AIP
            getUserInfoAPI(){
                getUserInfo().then(res=>{
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area,id} = res.data.data
                    this.mut_outCode()
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area,id})
					this.$emit('cancel')
                })
            },
			// 获取用户信息
            onClickUserInfoAPI(){
				uni.getUserProfile({
					desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (param) => {
						console.log('用户信息参数',param)
						setUserInfo(param).then(res=>{
							console.log(res)
							if(res.data.code === 200){
								this.getUserInfoAPI()
							}else{
								console.log(res.data.message)
								uni.showToast({title:res.data.message,icon:'none'})
							}
						})
					}
				})
            },
		}
	}
</script>

<style lang="scss">
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		display: flex;
		justify-content: center;
		align-items: center;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
			height: 400rpx;
			border-radius: 15rpx;
			.textC{
				margin-top: 30rpx;
				font-size: 28rpx;
				line-height: 46rpx;
			}
			.text{
				padding: 54rpx 0 30rpx;
				font-size: 36rpx;
				text-align: center;
			}
			.text_blue{
				font-size: 40rpx;
				font-weight: bold;
				color: #FF4852;
				text-align: center;
				padding-bottom: 60rpx;
			}
			.but{
				display: flex;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				border-top: 1rpx solid #f9f9f9;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					border-left: 1rpx solid #f9f9f9;
					color: #333333;
					font-weight: bold;
				}
			}
		}
	}
</style>
