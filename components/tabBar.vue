<template>
	<view class="tabbar">
		<view class="list tabBarIndex" @click="tabBarIndex" :class="index===1?'tabBarAction':null">
			<image class="icon icon1" :src="index===1?'/static/tabBar/homeSl.png':'/static/tabBar/home.png'" mode=""></image>
			<view class="text">首页</view>
		</view>
		<view class="list tabBarClassify" @click="tabBarClassify"  :class="index===2?'tabBarAction':null">
			<image class="icon icon2" :src="index===2?'/static/tabBar/classifySl.png':'/static/tabBar/classify.png'" mode=""></image>
			<view class="text">分类</view>
		</view>
		<view class="list tabBarShoppingCart" @click="tabBarShoppingCart"  :class="index===3?'tabBarAction':null">
			<image class="icon icon4" :src="index===3?'/static/tabBar/shoppingCartSl.png':'/static/tabBar/shoppingCart.png'" mode=""></image>
			<view class="text">购物车</view>
		</view>
        <view class="list tabBarOrder" @click="tabBarOrder"  :class="index===4?'tabBarAction':null">
			<image class="icon icon4" :src="index===4?'/static/tabBar/orderSl.png':'/static/tabBar/order.png'" mode=""></image>
			<view class="text">订单</view>
		</view>
		<view class="list tabBarMy" @click="tabBarMy"  :class="index===5?'tabBarAction':null">
			<image class="icon icon5" :src="index===5?'/static/tabBar/mySl.png':'/static/tabBar/my.png'" mode=""></image>
			<view class="text">我的</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['index'],		
		data() {
			return {
				url:'https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/tabbar/'
			};
		},
		methods:{
			// 进入首页
			tabBarIndex(){
				uni.switchTab({
					url:'/pages/tabBar/home/home'
				})
			},
			// 进入分类
			tabBarClassify(){
				uni.switchTab({
					url:'/pages/tabBar/classify/classify'
				})
			},
			// 进入购物车
			tabBarShoppingCart(){
				uni.switchTab({
					url:'/pages/tabBar/shoppingCart/shoppingCart'
				})
			},
            // 进入订单
			tabBarOrder(){
				uni.switchTab({
					url:'/pages/tabBar/order/order'
				})
			},
			// 进入我的
			tabBarMy(){
				uni.switchTab({
					url:'/pages/tabBar/my/my' 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		position: fixed;
		bottom: 0;
		padding: 5rpx 0 60rpx;
		width: 750rpx;
		border-top: 2rpx solid #f7f7f9;
		background-color: #fff;
		font-size: 22rpx;
		text-align: center;
		display: flex;
		justify-content: space-around;
		z-index: 2;
        color: #B6B6B6;
		.list{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.icon{
				margin-left: 50%;
				transform: translateX(-50%);
			}
			.icon1{
				width: 50rpx;
				height: 50rpx;
			}
			.icon2{
				width: 50rpx;
				height: 50rpx;
			}
			.icon4{
				width:50rpx;
				height: 50rpx;
			}
			.icon5{
				width: 50rpx;
				height: 50rpx;
			}
		}
		.tabBarAction{
			color: #3E3E3E;
		}
	}
</style>
