/******************************** 分类 ***************************************/
<template>
    <view>
        <s-pull-scroll class="right_box flex paddingT10" ref="pullScroll" :back-top="true" :pullUp="loadData">
            <view class="classify flex">
                <!-- 左侧 -->
                <view class="left_box textC">
                    <view class="fixed">
                        <view class="paddingTB20 fontSize26" :class="item.id === id ? 'active' : '' " v-for="item in leftList" :key="item.id" @click="onClickTab(item.id)">
                            {{item.name}}
                        </view>
                    </view>
                </view>
                <!-- 右侧 -->
                <view class="right_box">
                    <swiper class="swiper" indicator-dots v-if="carouselList.length > 0">
                        <swiper-item v-for="_ in carouselList" :key="_" @click="turnDetail(_)">
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
                        <div v-for="_ in rightList" :key="_.id" class="imgContent" @click="onClickDetails(_.id)">
                            <img class="img" v-if="activeObj.goodsShowType === 0" :src="_.coverPhoto" alt="">
                            <img class="longImg" v-if="activeObj.goodsShowType === 1" :src="_.coverPhoto" alt="">
                            <div class="txt_center">{{_.imgTitle}}</div>
                        </div>
                    </div>
                </view>
            </view>
       </s-pull-scroll>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
const { $Message } = require('@/wxcomponents/base/index');
import { getListAssemblyOnlineCategory, getMaAssemblyOnlineTitle } from '@/util/api/goods.js'
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
                    console.log(this.id);
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
        onLoad(){
            this.getListAssemblyOnlineCategory()
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
                    type: 1
                }
                getListAssemblyOnlineCategory(param).then(res=>{
                    this.leftList = res.data.data
                    this.id = id ? id: this.leftList[0].id
                    this.getMaAssemblyOnlineTitle()
                })
            },

            // 获取套系分页
            getMaAssemblyOnlineTitle(){
                let param ={
                    shopId:this.shopId,
                    enterpriseId:this.get_enterpriseId,
                    assemblyOnlineCategoryId:this.id,
                    limit:10,
                    page:this.page
                }
                getMaAssemblyOnlineTitle(param).then(res=>{
                    if(!res.data.data){
                        this.rightList = []
                        return 
                    }
                    this.total = res.data.data.total
                    this.rightList = res.data.data.list.records
                    console.log(res)
                    console.log(this.rightList)
                })
            },

            // 更新索引
            onClickTab(id){
                this.id = id
                this.rightList = [];
                this.getMaAssemblyOnlineTitle()
            },

            // 跳转详情
            onClickDetails(idx){
                uni.navigateTo({ 
                    url: '/pages/tabBar/classify/newDetail?id=' + idx
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
					this.getMaAssemblyOnlineTitle()
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
    margin-top: 10rpx;
    display: flex;
    flex-direction: column;
    .h110{
        height: 174rpx;
        width: 100%;
        margin-bottom: 10rpx;
    }
    .h200{
        height: 352rpx;
        width: 100%;
        margin-bottom: 10rpx;
    }
}
.dbColumn{
    margin-top: 20rpx;
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
    .imgContent{
        width: 250rpx;
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
            height: 300rpx;
            vertical-align: bottom;
        }
        .txt_center{
            text-align: center;
        }
    }
}
</style>