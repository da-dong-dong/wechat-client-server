<template>
	<view class="search_content" :class="className" :style="{ marginTop: marginTop }">
		<view class="left">
			<text class="iconfont iconleft1" @click="goBack"></text>
		</view>
		<view class="flex_1">
			<text class="iconfont iconsousuo" v-show="searchName.length === 0"></text>
			<input :value="searchName" class="my_input" type="text" placeholder="搜索" confirm-type="search"
				placeholder-style="text-align: center; color: #B3B3B3;text-align-last: center;" @input="searchInput" @confirm="searchConfirm"/>
		</view>
		<view class="right">
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: Number,
				default: 1
			}
		},
		data () {
			return {
				className: '',
				searchName: '',
				marginTop: '50rpx'
			}
		},
		methods: {
			goBack () {
				uni.navigateBack()
			},
			searchInput (e) {
				this.searchName = e.detail.value
			},
			searchConfirm () {
				uni.navigateTo({
				    url: `/pages/tabBar/classify/components/classify_result?value=${this.searchName}&type=${this.type}`
				})
			}
		},
		created () {
			console.log(uni.getSystemInfoSync().statusBarHeight * 2 + 10)
			this.marginTop = uni.getSystemInfoSync().statusBarHeight * 2 + 10 + 'rpx'
			console.log(this.marginTop)
			// this.className = this.type === 1 ? 'searchPic' : 'searchAssembly'
			this.className = this.type === 1 ? 'searchAssembly' : 'searchPic'
		}
	}
</script>

<style lang="less" scoped>

	.search_content{
		box-sizing: border-box;
		// margin-top: 50rpx;
		height: 82rpx;
		display: flex;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #f5f5f5;
		input{ line-height:normal }
		&.searchAssembly{
			.left{
				width: 20rpx;
				.iconleft1{
					display: none;
				}
			}
			.iconsousuo{
				left: 200rpx;
			}
		}
		&.searchPic{
			.left{
				width: 100rpx;
				text-align: center;
				.iconleft1{
					font-size: 40rpx;
					line-height: 60rpx;
				}
			}
			.iconsousuo{
				left: 166rpx;
			}
		}
		.flex_1{
			position: relative;
		}
		.iconsousuo{
			color: #B3B3B3;
			position: absolute;
			top: 16rpx;
		}
		.right{
			width: 200rpx;
		}
		.my_input{
			height: 60rpx;
			background: #F7F7F7;
			border-radius: 30rpx;
			padding-left: 20rpx;
			text-align: center;
		}
	}
</style>
