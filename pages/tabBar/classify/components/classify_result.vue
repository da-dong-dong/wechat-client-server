<template>
	<view class="search_result">
		<view class="search_content" :style="{ marginTop: marginTop }">
			<view class="left">
				<text class="iconfont iconleft1" @click="goBack"></text>
			</view>
			<view class="relative">
				<text class="iconfont iconsousuo" v-show="searchName.length === 0"></text>
				<input :value="searchName" class="my_input" type="text" placeholder="搜索" confirm-type="search"
					placeholder-style="text-align: center; color: #B3B3B3;" @input="searchInput" @confirm="searchList"/>
			</view>
		</view>
		<view class="flex_1 bg">
			<template v-if="list.length > 0">
				<template v-if="type === 1">
					<view class="result_one" v-for="_ in list" :key="_.id" @click="onClickDetails(_.id)">
						<image class="w80" :src="_.coverPhoto" mode=""></image>
						<view class="flex_1">
							<view class="font14">
								{{_.assemblyName}}
							</view>
							<view class="font12">
								￥ {{_.assemblyPrice}}
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="result_one" v-for="_ in list" :key="_.id" @click="onClickDetails(_.id)">
						<image class="w80" :src="_.coverPhoto" mode=""></image>
						<view class="flex_1">
							<view class="font14">
								{{_.imgTitle}}
							</view>
							<view class="font12">
								{{_.imgIntroduction}}
							</view>
						</view>
					</view>
				</template>
			</template>
			<template v-else>
				<view class="no_list">搜索不到 {{type === 1 ? '套系' : '图文'}}</view>
			</template>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import { mapGetters } from 'vuex'
	import { getListAssemblyOnlineCategory, getPageAssemblyOnline, getMaAssemblyOnlineTitle } from '@/util/api/goods.js'
	export default {
		components: {
			uniNavBar
		},
		data () {
			return {
				searchName: '',
				list: [],
				type: 1,
				marginTop: '50rpx'
			}
		},
		computed:{
			...mapGetters('user',[
		        'get_shopId',
				'get_enterpriseId',
			])
		},
		methods: {
			goBack () {
				uni.navigateBack()
			},
			searchInput (e) {
				this.searchName = e.detail.value
			},
			// 获取套系分页
            getPageAssemblyOnline(){
                let param ={
					assemblyName: this.searchName,
                    shopId: this.get_shopId.shopId,
                    enterpriseId: this.get_enterpriseId,
					keyword: this.searchName,
                    limit: 100,
                    page: 1
                }
                getPageAssemblyOnline(param).then(res=>{
					console.log(res);
                    if(!res.data.data){
                        this.list = []
                        return 
                    }
                    this.list = res.data.data.records
                })
            },
			// 获取套系分页
			getMaAssemblyOnlineTitle(){
			    let param ={
					shopId: this.get_shopId.shopId,
					enterpriseId: this.get_enterpriseId,
					keyword: this.searchName,
					limit: 100,
					page: 1
			    }
			    getMaAssemblyOnlineTitle(param).then(res=>{
					console.log(res)
			        if(!res.data.data){
			            this.list = []
			            return 
			        }
			        this.list = res.data.data.list
			    })
			},
			// 跳转详情
			onClickDetails(idx){
			    if (this.type === 1) {
			    	uni.navigateTo({
			    	    url: '/pages/tabBar/classify/components/details?id=' + idx
			    	})
			    } else {
			    	uni.navigateTo({
			    	    url: `/pages/tabBar/classify/components/classify_result?value=${this.searchName}&type=${this.type}`
			    	})
			    }
			},
			searchList () {
				if (this.type === 1) this.getPageAssemblyOnline()
				else this.getMaAssemblyOnlineTitle()
			}
		},
		onLoad (opetion) {
			console.log(opetion);
			this.searchName = opetion.value
			this.type  = Number(opetion.type)
			this.searchList()
		},
		created () {
			this.marginTop = uni.getSystemInfoSync().statusBarHeight * 2 + 10 + 'rpx'
		}
	}
</script>

<style lang="less">
	page{
		height: 100vh;
	}
	view{
		box-sizing: border-box;
	}
	.search_result{
		display: flex;
		height: 100%;
		flex-direction: column;
		.bg{
			background: #f5f5f5;
			padding:  20rpx;
			overflow: auto;
		}
		.result_one{
			padding:  20rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #DDDDDD;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
		}
		.w80{
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}
		.font14{
			font-size: 28rpx;
			font-weight: 600;
		}
		.font12{
			font-size: 24rpx;
			font-weight: 400;
			color: 999;
		}
		.no_list{
			color: #999999;
			background: #FFFFFF;
			height: 122rpx;
			line-height: 122rpx;
			text-align: center;
			border-radius: 10rpx;
		}
	}
	.search_content{
		box-sizing: border-box;
		// margin-top: 50rpx;
		height: 82rpx;
		display: flex;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #B2B2B2;
		.left{
			width: 100rpx;
			text-align: center;
			.iconleft1{
				font-size: 40rpx;
				line-height: 60rpx;
			}
		}
		.my_input{
			height: 60rpx;
			background: #F7F7F7;
			border-radius: 30rpx;
			padding-left: 20rpx;
			width: 400rpx;
		}
	}
	.relative{
		position: relative;
	}
	.iconsousuo{
		color: #B3B3B3;
		position: absolute;
		top: 16rpx;
		left: 156rpx;
	}
</style>
