/******************************** 分类 ***************************************/
<template>
    <view class="flex_col">
		<navSearch :type="1"></navSearch>
        <!-- <s-pull-scroll class="right_box flex_1 flex paddingT10" ref="pullScroll" :back-top="true" :pullUp="loadData"> -->
		<view class="classify flex_1 flex">
			<!-- 左侧 -->
			<view class="left_box textC">
				<view class="">
					<view class="paddingTB30 fontSize28" :class="item.id === id ? 'active' : '' " v-for="item in leftList" :key="item.id" @click="onClickTab(item.id)">
						{{item.name}}
					</view>
				</view>
			</view>
			<!-- 右侧 -->
			<view class="right_box">
				<swiper class="swiper h150" indicator-dots v-if="carouselList.length > 0">
					<swiper-item v-for="_ in carouselList" :key="_" @click="turnDetail(_)">
						<view class="swiper-item uni-bg-red flex">
							<img class="h150" :src="_.src" alt="">
						</view>
					</swiper-item>
				</swiper>
				<template v-if="activeObj.serverProtocol === 1">
					<div v-html="activeObj.protocolText" class="mar_t10 flex_1"></div>
				</template>
				<template v-else>
					<div class="smallRectangle flex_1" v-if="activeObj.goodsShowType === 2 || activeObj.goodsShowType === 3">
						<template v-if="activeObj.goodsShowType === 2">
							<img v-for="_ in rightList" class="h110" :src="_.coverPhoto" alt="" :key="_.id" @click="onClickDetails(_.id)">
						</template>
						<template v-if="activeObj.goodsShowType === 3">
							<img v-for="_ in rightList" class="h200" :src="_.coverPhoto" alt="" :key="_.id" @click="onClickDetails(_.id)">
						</template>
					</div>
					<div class="dbColumn flex_1" v-if="activeObj.goodsShowType === 0 || activeObj.goodsShowType === 1">
						<div v-for="_ in rightList" :key="_.id" class="oneContent" @click="onClickDetails(_.id)">
							<img class="img" v-if="activeObj.goodsShowType === 0" :src="_.coverPhoto" alt="">
							<img class="longImg" v-else-if="activeObj.goodsShowType === 1" :src="_.coverPhoto" alt="">
							<div v-if="activeObj.showName === 1" class="title">{{_.assemblyName}}</div>
							<div v-if="activeObj.showExtend === 1" class="price">
								￥{{_.assemblyPrice}}
								<span class="iconfont icon1202youjiantou gt_icon"></span>
							</div>
						</div>
					</div>
				</template>
			</view>
		</view>
       <!-- </s-pull-scroll> -->
        <!-- 弹窗 -->
        <i-message id="message" />
        <!-- 底部导航 -->
		<tabBar :index="2"></tabBar>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
const { $Message } = require('@/wxcomponents/base/index');
import { getListAssemblyOnlineCategory, getPageAssemblyOnline } from '@/util/api/goods.js'
import navSearch from "./components/classify_search.vue"
	import sPullScroll from '@/components/s-pull-scroll';
    export default {
        components:{sPullScroll, navSearch},
        computed:{
			...mapGetters('user',[
                'get_appId',
                'get_enterpriseId',
                'get_shopId'
			]),
            activeObj () {
                if (this.id) {
                    return this.leftList.filter(_ => _.id === this.id)[0]
                }
                return { goodsShowType: 0, showExtend: 0, showName: 0, serverProtocol: 0 }
            },
            carouselList () {
                if (this.id) {
                    let obj = this.leftList.filter(_ => _.id === this.id)[0]
                    return (obj.slideshow && obj.slideshow.length) > 0 ? JSON.parse(obj.slideshow) : []
                }
                return []
            }
        },
        data(){
            return{
                shopId: null,
                leftList:null,
                rightList:[],
                showNoMore:false,
                page:1,
                total:0, // 总数量
                id: null,
            }
        },
        onShow() {
            this.rightList = [];
            this.shopId = this.get_shopId.shopId
            uni.getStorage({
                key: 'All',
                success: res => {
                    this.getListAssemblyOnlineCategory(res.data)
                    uni.removeStorageSync('All');
                },
                fail:()=> {
                    uni.getStorage({
                        key: 'classId',
                        success: res => {
                            this.getListAssemblyOnlineCategory(res.data)
                            uni.removeStorageSync('classId');
                        },
                        fail:()=> {
                            this.getListAssemblyOnlineCategory()
                        }
                    })
                }
            })
            
            
            
        },
        onLoad(){
            uni.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
            this.refresh();
		},
        methods:{
            turnDetail (data) {
                if (!data.imgData) return
				switch (data.imgData.type) {
					case 'detail':
						uni.navigateTo({ 
							url: '/pages/tabBar/classify/components/details?id=' + data.imgData.detailId 
						})
						break;
					case 'classify':
						uni.setStorage({
							key: 'classId',
							data: data.imgData.detailId
						})
						uni.switchTab({
                            url:'/pages/tabBar/classify/classify'
                        })
						break;
						case 'imgDetail':
						uni.navigateTo({ 
							url: '/pages/tabBar/classify/newDetail?id=' + data.imgData.detailId 
						})
						break;
					case 'imgTow':
						uni.navigateTo({
                            url:'/pages/tabBar/classify/secondary?id=' + data.imgData.detailId 
                        })
						break;
					case 'imgClassify':
						uni.navigateTo({
                            url:'/pages/tabBar/classify/secondClassify?id=' + data.imgData.detailId 
                        })
						break;
                    case 'feedBack':
						uni.navigateTo({
                            url:'/pages/tabBar/classify/feedBack'
                        })
						break;
				}
			},
            // 获取套系类别列表
            getListAssemblyOnlineCategory(id){
                let param ={
                    shopId:this.shopId,
                    enterpriseId:this.get_enterpriseId,
                    type: 0
                }
                getListAssemblyOnlineCategory(param).then(res=>{
                    this.leftList = res.data.data
                    // 判断全部套系
                    if(id == '全部套系'){
                        let str = this.leftList.filter(_=>_.name == id)
                        this.id = str.length>0 ? str[0].id: this.leftList[0].id
                    }else{
                        this.id = id ? id: this.leftList[0].id
                    }
                    this.getPageAssemblyOnline()
                })
            },

            // 获取套系分页
            getPageAssemblyOnline(){
                let param ={
                    shopId:this.shopId,
                    enterpriseId:this.get_enterpriseId,
                    assemblyOnlineCategoryId:this.id,
                    limit:10,
                    page:this.page
                }
                getPageAssemblyOnline(param).then(res=>{
                    if(!res.data.data){
                        this.rightList = []
                        return 
                    }
                    this.total = res.data.data.total
                    this.rightList = res.data.data.records
                })
            },

            // 更新索引
            onClickTab(id){
                this.id = id
                this.rightList = [];
                this.getPageAssemblyOnline()
            },

            // 跳转详情
            onClickDetails(idx){
                uni.navigateTo({ 
                    url: '/pages/tabBar/classify/components/details?id=' + idx
                })
            },
            // 组件
			refresh () {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			loadData (pullScroll) {
				if (pullScroll.page == 1) {
					this.rightList = [];
				}
				if(!this.showNoMore){
					this.page = pullScroll.page
				}
				if(this.rightList.length < this.total){
					this.getPageAssemblyOnline()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				pullScroll.success();
			},
        }
    }
</script>

<style lang="less">
page{
	height: 100vh;
}
</style>
<style lang="scss" scoped>
.flex_col{
	height: 100%;
}
view{
	box-sizing: border-box;
}
.webView{
    width: 500rpx;
    height: 100prx;
}
.classify{
    font-size: 28rpx;
	padding-bottom: 150rpx;
	overflow: hidden;
    // 左侧
    .left_box{
        width: 200rpx;
        z-index: 1000;
		color: #8B8B8B;
		background: #F5F5F5;
        .active{
            background: #fff;
            position: relative;
            &::after{
                display: block;
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                width: 8rpx;
                background: #D3AA72;
            }
        }
    }

    // 右侧
    .right_box{
        width: 550rpx;
        // height: 100%;
        flex-wrap: wrap;
        padding: 20rpx;
        box-sizing: border-box;
		overflow: auto;
    }
}
.h150{
	height: 320rpx;
}
.smallRectangle{
    margin-top: 30rpx;
    display: flex;
    flex-direction: column;
    .h110{
        height: 220rpx;
        width: 100%;
        margin-bottom: 30rpx;
    }
    .h200{
        // height: 350rpx;
        width: 100%;
        margin-bottom: 30rpx;
    }
}
.dbColumn{
    margin-top: 30rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .title {
        color: #919191;
        padding: 15rpx 10rpx;
        font-size: 24rpx;
    }
    .price{
        font-weight: 600;
        padding: 5rpx 11rpx 20rpx;
    }
    .gt_icon{
        float: right;
        color: #D4AD72;
    }
    .oneContent{
        width: 245rpx;
        background: #f5f5f5;
        border-bottom-left-radius: 8rpx;
        border-bottom-right-radius: 8rpx;
        margin-bottom: 30rpx;
        .img{
            width: 100%;
            height: 250rpx;
            vertical-align: bottom;
        }
        .longImg{
            width: 100%;
            height: 300rpx;
            vertical-align: bottom;
            border-radius: 15rpx;
        }
    }
}
</style>