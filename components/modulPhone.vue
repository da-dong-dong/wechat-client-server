/******************************** 电话弹窗 ***************************************/
<template>
	<view class="bigBox">
		<view class="box">
			<view class="text ">{{type==='phone'?'拨打电话':'档期协议'}}</view>
			<view class="textC marginB20" v-if="type === 'phone'" >{{phone}}</view>
			<view v-else style="max-height:500rpx;overflow: auto;" class="fontSize28 marginB20"><view class="paddingRL40" v-html="phone"></view></view>
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['phone','type'],
		data() {
			return {
				
			};
		},
		methods:{
			cancel(){
				this.$emit('cancel')
			},
			ok(){
				this.$emit('ok')
			}
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
			border-radius: 15rpx;
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
