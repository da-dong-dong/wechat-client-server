<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			{{ddd}}
			<button @click="login">登陆测试</button>
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	import { getTicket } from '@/util/api/user.js'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data() {
			return {
				title: '大东东'
			}
		},
		computed:{
			...mapGetters('app',[
				'ddd'
			])
		},
		onLoad() {

		},
		methods: {
			login(){
				console.log('来啦老弟')
				let param = {
					unumber:'admin',
					password:123123,
				}
				getTicket(param).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
