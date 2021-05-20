<template>
	<view>
		<!-- <web-view :src="url" @message="handleMessage" v-if="url"></web-view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: null  //要打开的外部链接
		};
	},
	methods: {
		//通过 @message 事件接收外部链接传过来的内容
		handleMessage(event) {
			if (event.detail.data[0].isClose) {
				uni.reLaunch({
					url: 'pages/tabBar/home/home'
				});
			}
		}
	},
	onLoad (option) {
		this.url = option.url
	}
};
</script>