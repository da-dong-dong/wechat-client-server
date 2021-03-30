/******************************** 首页 ***************************************/
<template>
    <view class="homeContent">
        <view v-for="(item, index) in homeList" :key="index">
        	<view class="searchContent" v-if="item.type === 'search'" :style="{ 'background-image': `url(${item.data.backImg})`, 'background-color': item.data.bgColor }">
				<view class="uni-input" @click="turnSearch" :style="{ opacity: item.data.opacity/10 }">{{item.data.title}}</view>
        	</view>
			<view class="shopContent" v-if="item.type === 'shop'" :style="{ 'background-image': `url(${item.data.backImg})`, color: item.data.color, 'background-color': item.data.bgColor }" @click="turnShop">
				<span class="flex_1">当前门店: {{get_shopId.shopName}}</span>
				<i class="iconfont iconhtbArrowright02" ></i>
			</view>
			<view v-if="item.type === 'carousel'">
				<swiper class="swiper" :autoplay="item.data.autoplay" indicator-dots :style="{ height: item.data.height * 2 + 'rpx'}">
					<swiper-item v-for="(_, _i) in item.data.imgs" :key="_i">
						<view class="swiper-item uni-bg-red" :style="{ height: item.data.height * 2 + 'rpx'}" @click="turnDetail(_.linkData)">
							<img :src="_.src" class="wh100"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view v-if="item.type === 'oneImg'" :style="{ 'background-color': item.data.bgColor }">
				<img :src="item.data.src" alt="" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%' }" style="vertical-align:top;" @click="turnDetail(item.linkData)">
			</view>
			<view class="btnContent" v-if="item.type === 'moreBtn'" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%', 'background-image': `url(${item.data.backImg})`, 'background-color': item.data.bgColor }">
				<img class="imgOne" :src="_.src" alt="" v-for="(_, _index) in item.data.imgs" :key="_index" @click="turnDetail(_.linkData)">
			</view>
			
			<view v-if="item.type === 'moreImg'" :style="{ 'background-image': `url(${item.data.backImg})`, 'background-color': item.data.bgColor,'background-size': '100% 100%','background-repeat':'no-repeat' }">
				<view v-if="!item.data.titleRow.hiddenTitle" class="moreimgContent"  :style="{ 'height': `${item.data.titleRow.height + 'px'}`, 'color': `${item.data.titleRow.color}`, 'font-size': `${item.data.titleRow.size + 'px'}` }" @click="turnDetail(item.data.titleRow.linkData)">
					<span class="flex_1">{{item.data.titleRow.title}}</span>
					<i class="iconFlex iconfont iconhtbArrowright02"></i>
				</view>
				<view class="flex rowFlex" :class="item.data.titleRow.hiddenTitle?'paddingT5':''" v-for="(_, i) in item.data.picRow" :key="i" :style="{ 'height': `${_.height + 'px'}`, 'width': '100%' }">
					<img class="autoWH" :src="sub.src" alt="" v-for="(sub, _i) in _.imgs" :key="_i" :style="{ 'width': getWidth(_.imgs, sub.col, _i) }" @click="turnDetail(sub.linkData)">
				</view>
			</view>
			<!-- 两列图 -->
			<view v-if="item.type === 'double'" :style="{ 'background-image': `url(${item.data.backImg})`, 'background-color': item.data.bgColor,'background-size': '100% 100%','background-repeat':'no-repeat' }">
				<view v-if="!item.data.titleRow.hiddenTitle" class="moreimgContent" :style="{ 'height': `${item.data.titleRow.height + 'px'}`, 'color': `${item.data.titleRow.color}`, 'font-size': `${item.data.titleRow.size + 'px'}` }" @click="turnDetail(item.data.titleRow.linkData)">
					<span class="flex_1">{{item.data.titleRow.title}}</span>
					<i class="iconFlex iconfont iconhtbArrowright02"></i>
				</view>
				<view class="flex rowFlexDouble" :class="item.data.titleRow.hiddenTitle?'paddingT5':''" v-for="(_, i) in item.data.picRow" :key="i" :style="{ 'height': `${_.height + 'px'}`, 'width': '100%' }">
					<img class="autoWH" :src="sub.src" alt="" v-for="(sub, _i) in _.imgs" :key="_i" :style="{ 'width': getWidthDouble(_.imgs, sub.col, _i) }" @click="turnDetail(sub.linkData)">
				</view>
			</view>
			<!-- 视频 -->
			<view  v-if="item.type === 'oneVideo'" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%', 'background-color': item.data.bgColor }">
				<video id="myVideo" :src="item.data.src" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%' }" :autoplay="item.data.autoplay" ></video>
			</view>
        </view>
       
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { getHomeData } from '@/util/api/home.js'
const { $Message } = require('@/wxcomponents/base/index');
import { getLongin } from '@/util/api/user.js'
import { mapGetters } from 'vuex'
const accountInfo = uni.getAccountInfoSync();
const entriData = uni.getExtConfigSync()
    export default {
		data () {
			return {
				homeList: []
			}
		},
		computed: {
			...mapGetters('user',[
				'get_shopId'
			])
		},
        mounted(){
			
        },
		 onLoad() {
            
			this.getHomeData()
        },
        methods:{
			turnShop () {
				uni.navigateTo({ url:'/pages/tabBar/shoppingCart/components/changeRegion' })
			},
			turnSearch () {
				uni.navigateTo({ url:'/pages/tabBar/home/search' })
			},
			turnDetail (data) {
				console.log(data);
				switch (data.type) {
					case 'detail':
						uni.navigateTo({ 
							url: '/pages/tabBar/classify/components/details?id=' + data.detailId 
						})
						break;
					case 'classify':
						uni.setStorage({
							key: 'classId',
							data: data.classifyId
						})
						uni.switchTab({
                            url:'/pages/tabBar/classify/classify'
                        })
						break;
				}
			},
			getHomeData () {
				let params = {
					appId: accountInfo.miniProgram.appId,
					enterpriseId: entriData.enterpriseId
				}
				getHomeData(params).then(res => {
					let jsonStr = res.data.data
					this.homeList = JSON.parse(jsonStr)
					console.log(res)
				})
			},
			getWidth (data, col, i) {
				let len = data.length
				let maxCol = Math.max(...data.map(_ => _.col))
				let minCol = Math.min(...data.map(_ => _.col))
				switch (len) {
					case 1:
						return '100%'
					case 2:
						if (maxCol === minCol) {
							return i === 0 ? '66%' : '32%'
						}
					return col === maxCol ? '66%' : '32%'
					case 3:
						return '32%'
				}
			},
			// 组合图单图长度2列
			getWidthDouble (data, col, i) {
				let len = data.length
				switch (len) {
					case 1:
						return '100%'
					case 2:
						return '49%'
				}
			},
            // 检查登陆
            checkLogin(){
                uni.authorize({
                    scope: 'scope.userInfo',
                    success() {
                        uni.getUserInfo({
                            provider: 'weixin',
                            success: function (infoRes) {
                                console.log(infoRes)
                                console.log('用户昵称为：' + infoRes.userInfo.nickName);
                            }
                        });
                    }
                })
                // 获取code值
                // uni.login({
                //     provider: 'weixin',
                //     success: function (res) {
                //         let param = {
                //             jsCode: res.code,
                //             appId:  accountInfo.miniProgram.appId
                //         }
                //         console.log(accountInfo.miniProgram.appId)
                //         // 获取用户信息
                //         uni.getUserInfo({
                //             provider: 'weixin',
                //             success: function (infoRes) {
                //                 console.log(infoRes)
                //                 console.log('用户昵称为：' + infoRes.userInfo.nickName);
                //             }
                //         });
                //         // getLongin(param).then(res=>{
                //         //     console.log(res);
                //         //     uni.getUserInfo({
                //         //         provider: 'weixin',
                //         //         success: function (infoRes) {
                //         //             console.log(infoRes)
                //         //             console.log('用户昵称为：' + infoRes.userInfo.nickName);
                //         //         }
                //         //     });
                //         // })
                //     }
                // });
            },
            getPhoneNumber(e) { 
                console.log(e) 
                console.log(e.detail.errMsg);  
                console.log(e.detail.iv);  
                console.log(e.detail.encryptedData);  
                
            },

           
        }   
    }
</script>

<style lang="scss" scoped>
@import url('./icon.css');
.homeContent{
	font-size: 24rpx;
}
.searchContent{
    padding: 20rpx 20rpx;
    background-repeat: no-repeat;
    background-size: cover;
	font-size: 24rpx;
	.uni-input{
		border: 2rpx solid #dcdee2;
		border-radius: 8rpx;
		padding: 10rpx;
		color: #dcdee2;
	}
 }
.wh100{
	width: 100%;
	height: 100%;
}
.shopContent{
	padding: 14rpx 10rpx 14rpx 30rpx;
	display: flex;
	background-repeat: no-repeat;
	background-size: cover;
	.flex_1{
		flex: 1;
		display: flex;
		align-items: center;
	}
}
.btnContent{
    display: flex;
    padding: 10rpx 20rpx;
    justify-content: space-between;
    background-repeat: no-repeat;
    background-size: cover;
	box-sizing: border-box;
    .imgOne{
      flex: 1;
	  width: auto;
	  height: auto;
      max-width: 106rpx;
    }
 }
 
.moreimgContent{
	display: flex;
	padding: 10rpx 20rpx;
	justify-content: space-around;
	background-repeat: no-repeat;
	background-size: cover;
	.flex_1{
	display: flex;
	align-items: center;
	}
	.iconFlex{
	display: flex;
	align-items: center;
	}
}
.flex_1{
    flex: 1;
}
.rowFlex{
	padding: 0rpx 20rpx;
	justify-content: space-between;
	margin-bottom: 20rpx;
	box-sizing: border-box;
	padding-bottom: 20rpx;
    &:last-child{
      margin-bottom: 0px;
    }
}
.rowFlexDouble{
	padding: 0rpx 20rpx 10rpx;
	justify-content: space-between;
	box-sizing: border-box;
	&:last-child{
      margin-bottom: 0px;
    }
}
.homeContent .paddingT5{
	padding-top: 10rpx;
}
.flex{
	display: flex;
}
.autoWH{
	width: auto;
	height: auto;
}
</style>