/******************************** 取消提示 ***************************************/
<template>
	<view class="bigBox">
		<view class="box">
			<view class="text">提示</view>
			<view class="textC">是否确认{{text}}？</view>
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['text'],
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
		left: 0;
		color: #000000;
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
			.textC{
				color: #A7A7A7;
				padding: 30rpx 0 60rpx;
			}
			.but{
				display: flex;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				border-top: 1rpx solid #f9f9f9;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					border-left: 1rpx solid #f9f9f9;
					color: #D6B07D;
					font-weight: bold;
				}
			}
		}
	}
</style>
