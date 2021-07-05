/******************************** 福利提示 ***************************************/
<template>
	<view class="bigBox">
		<view class="box">
			<view class="text" v-if="textType == 'ok'"><i class="iconfont icon-gouxuan"></i>恭喜</view>
			<view class="text" v-else><i class="iconfont icon-guanbi"></i>验证失败</view>
			<view class="textC">{{textType == 'ok' ? '你已成功兑换优惠权益':'确认后重新输入'}}</view>
			<view class="but">
				<view class="ok" v-if="textType == 'ok'" @click="ok">确定</view>
				<view class="ok" v-else @click="cancel">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['textType'],
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
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont{
					font-size: 40rpx;
					color: #D4AC71;
					margin-right: 10rpx;
				}
			}
			.textC{
				color: #444444;
				padding-bottom: 60rpx;
				font-size: 30rpx;
			}
			.but{
				display: flex;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				border-top: 1rpx solid #f9f9f9;
				font-size: 30rpx;
				justify-content: center;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					color: #D6B07D;
					font-weight: bold;
				}
			}
		}
	}
</style>
