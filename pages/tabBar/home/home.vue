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
				<view class="flex rowFlex" :class="item.data.titleRow.hiddenTitle?'paddingT10':''" v-for="(_, i) in item.data.picRow" :key="i" :style="{ 'height': `${_.height + 'px'}`, 'width': '100%' }">
					<img class="autoWH" :src="sub.src" alt="" v-for="(sub, _i) in _.imgs" :key="_i" :style="{ 'width': getWidth(_.imgs, sub.col, _i) }" @click="turnDetail(sub.linkData)">
				</view>
			</view>
			<!-- 两列图 -->
			<view v-if="item.type === 'double'" :style="{ 'background-image': `url(${item.data.backImg})`, 'background-color': item.data.bgColor,'background-size': '100% 100%','background-repeat':'no-repeat','padding':'10rpx 20rpx 20rpx 20rpx' }">
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
			<!-- 地图 -->
			<view  v-if="item.type === 'mapPng'" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%', 'background-color': item.data.bgColor }">
				<map style="width: 100%; height: 100%;" :longitude="longitude" :latitude="latitude" :markers="covers" ></map>
			</view>
			<!-- 层级组件 -->
			<div class="positions" v-if="item.type === 'positions'" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%','background-color': item.data.bgColor1, }">
				<div class="positions_box"  :style="{'width': item.data.width * 2 + 'rpx','left': item.data.left * 2 + 'rpx','box-shadow': getShadow(item.data), 'height': item.data.height * 2 + 'rpx', 'top':'-'+ item.data.top * 2 +'rpx', 'background-color': item.data.bgColor, 'border-radius':item.data.radius * 2 + 'rpx' }">
					<div class="box1">
						<img v-if="item.data.imgs.length>0"  :src="item.data.imgs[0].src" @click="turnDetail(item.data.imgs[0].linkData)">
					</div>
					<div v-if="!item.data.border && item.data.imgs.length>1" class="box_border"  :style="{'border-left': `${item.data.borderWidth*2}rpx solid ${item.data.borderColor}` }"></div>
					<div v-if="item.data.imgs.length>1" class="box1">
						<img :src="item.data.imgs[1].src"  @click="turnDetail(item.data.imgs[1].linkData)">
					</div>
				</div>
			</div>
        </view>
       <!-- 客服 -->
        <!-- <view class="userCall">
            <button plain show-message-card session-from send-message-path send-message-title open-type='contact' style="border: 0; padding: 0; line-height: unset;">
                <img src="/static/image/userCall.png" alt="">
            </button>
        </view> -->
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { getHomeData } from '@/util/api/home.js'
const { $Message } = require('@/wxcomponents/base/index');
import { mapGetters } from 'vuex'
const accountInfo = uni.getAccountInfoSync();
const entriData = uni.getExtConfigSync()
    export default {
		data () {
			return {
				homeList: [],
				longitude:null,
				latitude:null,
				covers: [{
					latitude: '23.084657',
					longitude: '114.382526',
					iconPath: "/static/image/loacl.png"
            	}]
			}
		},
		computed: {
			...mapGetters('user',[
				'get_shopId'
			]),
			...mapGetters('map',[
				'get_location'
			])
		},
        mounted(){
			// 判断当前门店经纬度是否值
			let {locationX,locationY} = this.get_shopId
			let locationArr = this.get_location.location.split(',')
			let longitude,latitude = null;
			if(locationX && locationY){
				longitude = locationX
				latitude = locationY
			}else{
				longitude = locationArr[0]
				latitude = locationArr[1]
			}
				this.longitude = longitude
				this.latitude = latitude
				this.covers[0].latitude = latitude
				this.covers[0].longitude = longitude
        },
		 onLoad() {
			this.getHomeData()
			
        },
        methods:{
			// 消息推送
			onClickMyInfo(){
				uni.requestSubscribeMessage({
					tmplIds: ['tGNjNY-84SP_ENugDhzq-V2BNlsfur7Ir_qCAllb2d4','uAujsYPo1Xu2-8o2RQqPoVIHs2QUjItPtRR758SJLWg','-Hecde4yZlk-9N5d-igvBg-i8m_pSEMaZni5Q5xvWoI'],
					success (res) {
						console.log(res)
					},
					fail(err){
						console.log(err)
					}
				})
			},


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
						case 'imgDetail':
						uni.navigateTo({ 
							url: '/pages/tabBar/classify/newDetail?id=' + data.detailId 
						})
						break;
					case 'imgTow':
						uni.navigateTo({
                            url:'/pages/tabBar/classify/secondary?id=' + data.classifyId 
                        })
						break;
					case 'imgClassify':
						uni.navigateTo({
                            url:'/pages/tabBar/classify/secondClassify?id=' + data.classifyId 
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
			// 阴影样式
			getShadow (val) {
				if (!val.shadow) {
					return `0px 1rpx ${val.shadowWidth*2}rpx ${val.shadowColor}`
				} else {
					return ''
				}
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
	justify-content: space-between;
	box-sizing: border-box;
	&:last-child{
      margin-bottom: 0px;
    }
}
.homeContent .paddingT5{
	padding-top: 10rpx;
}
.homeContent .paddingT10{
	padding-top: 20rpx;
}
.flex{
	display: flex;
}
.autoWH{
	width: auto;
	height: auto;
}
// 层级定位
.positions{
  position: relative;
  .shadow{
    box-shadow:0px 1rpx 20rpx #000;
  }
  .positions_box{
    z-index: 2000;
    width: 95%;
    height: 100%;
    position: absolute;
    background: red;
    border-radius: 20rpx;
    top: -20rpx;
    left: 2.5%;
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    div{
      height: 100%;
    }
    .box1{
      width: 46%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .box_border{
      border-left: 1rpx solid #666;
    }
  }
}
</style>