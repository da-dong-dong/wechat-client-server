/******************************** 分类 ***************************************/
<template>
    <view>
        <s-pull-scroll class="right_box flex paddingT10" ref="pullScroll" :back-top="true" :pullUp="loadData">
            <view class="classify flex">
                <!-- 左侧 -->
                <view class="left_box textC">
                    <view class="fixed">
                        <view class="paddingTB20 fontSize26" :class="item.id === id ? 'active' : '' " v-for="item in leftList" :key="item.name" @click="onClickTab(item.id)">
                            {{item.name}}
                        </view>
                    </view>
                </view>
                <!-- 右侧 -->
                <view class="right_box">
                    <swiper class="swiper h150" indicator-dots v-if="carouselList.length > 0">
                        <swiper-item v-for="_ in carouselList" :key="_">
                            <view class="swiper-item uni-bg-red flex">
                                <img class="h150" :src="_.src" alt="">
                            </view>
                        </swiper-item>
                    </swiper>
                    <div class="smallRectangle" v-if="activeObj.goodsShowType === 2 || activeObj.goodsShowType === 3">
                        <template v-if="activeObj.goodsShowType === 2">
                            <img v-for="_ in rightList" class="h110" :src="_.coverPhoto" alt="" :key="_.id" @click="onClickDetails(_.id)">
                        </template>
                        <template v-if="activeObj.goodsShowType === 3">
                            <img v-for="_ in rightList" class="h200" :src="_.coverPhoto" alt="" :key="_.id" @click="onClickDetails(_.id)">
                        </template>
                    </div>
                    <div class="dbColumn" v-if="activeObj.goodsShowType === 0 || activeObj.goodsShowType === 1">
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
                </view>
            </view>
       </s-pull-scroll>
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
	import sPullScroll from '@/components/s-pull-scroll';
    export default {
        components:{sPullScroll},
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
                return { goodsShowType: 0, showExtend: 0, showName: 0 }
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
                shopId:14,
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
                key: 'classId',
                success: res => {
                    this.getListAssemblyOnlineCategory(res.data)
                    uni.removeStorageSync('classId');
                },
                fail:()=> {
                    this.getListAssemblyOnlineCategory()
                }
            })
        },
        onLoad(){
            this.refresh();
		},
        mounted(){
            //this.getListAssemblyOnlineCategory()
        },
        methods:{
            // 获取套系类别列表
            getListAssemblyOnlineCategory(id){
                let param ={
                    shopId:this.shopId,
                    enterpriseId:this.get_enterpriseId,
                    type: 0
                }
                getListAssemblyOnlineCategory(param).then(res=>{
                    this.leftList = res.data.data
                    this.id = id ? id: this.leftList[0].id
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
                        // $Message({
                        //     content:'暂无数据',
                        //     type: 'error'
                        // });
                        this.rightList = []

                        return 
                    }
                    this.total = res.data.data.total
                    this.rightList = res.data.data.records
                    console.log(res)
                    console.log(this.rightList)
					// const curList = res.data.data.records
					// curList.forEach((i)=>{
					// 	this.rightList.push(i)
					// })
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

<style lang="scss" scoped>
.webView{
    width: 500rpx;
    height: 100prx;
}
.classify{
    font-size: 28rpx;
    margin-bottom: 130rpx;
    // 左侧
    .left_box{
        width: 200rpx;
        position: flex;
        z-index: 1000;
        height: 100vh;
        .fixed{
            width: 200rpx;
            background: #F9F9F9;
            height: 100vh;
            color: #7D7E80;
        }
        .active{
            color: #FF4852;
            background: #fff;
            border-left: 1px solid #FF4852;
        }
    }

    // 右侧
    .right_box{
        width: 550rpx;
        height: 100%;
        flex-wrap: wrap;
        padding: 20rpx;
        box-sizing: border-box;
    }
}
.h150{
	height: 320rpx;
}
.smallRectangle{
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    .h110{
        height: 220rpx;
        width: 100%;
        margin-bottom: 10rpx;
    }
    .h200{
        height: 400rpx;
        width: 100%;
        margin-bottom: 10rpx;
    }
}
.dbColumn{
    margin-top: 10rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .title {
        color: #919191;
        padding: 4rpx 10rpx;
    }
    .price{
        font-weight: 600;
        padding: 0rpx 10rpx 6rpx;
    }
    .gt_icon{
        float: right;
        color: #D4AD72;
    }
    .oneContent{
        width: 250rpx;
        background: #f5f5f5;
        border-bottom-left-radius: 8rpx;
        border-bottom-right-radius: 8rpx;
        margin-bottom: 10rpx;
        .img{
            width: 100%;
            height: 250rpx;
            vertical-align: bottom;
        }
        .longImg{
            width: 100%;
            height: 350rpx;
            vertical-align: bottom;
        }
    }
}
</style>