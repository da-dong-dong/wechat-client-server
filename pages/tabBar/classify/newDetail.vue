<template>
  <div class="detail_content">
    <swiper class="swiper h200" indicator-dots>
        <swiper-item v-for="(_, i) in topCarouseList" :key="i">
            <view class="swiper-item uni-bg-red flex">
                <img class="h200" :src="_" alt="">
            </view>
        </swiper-item>
    </swiper>
    <div class="title_tag">
        <div class="flex">
            <div>
                <div class="mar_b5">
                {{listDetai.imgTitle?listDetai.imgTitle:''}}
                </div>
                <div>
                    <span class="tag" v-for="(_, i) in imagesLabel" :key="i" style="margin-right: 8rpx;">
                        {{_}}    
                    </span>
                </div>
            </div>
            <div @click="onDelCollection()" class="font12 width60" v-if="colors">
                <image  class="login_logo" src="/static/image/checkCall.png"></image>已收藏
            </div>
            <div @click="onCollection()" class="font12 width60" v-else>
                <image  class="login_logo" src="/static/image/noShow.png"></image>收藏
            </div>
        </div>
    </div>
    <div class="recommendContent" v-if="recommendList.length > 0">
        <swiperDer :info="recommendList" :current="currentSwiper" field="content" mode="dot" style="    height: 340rpx">
            <swiper class="swiper" @change="changeSwiper" :indicator-dots="false" style="    height: 340rpx">
                <swiper-item v-for="(_, i) in recommendList" :key="_.id">
                    <div class="pad10 border_b">
                        <span class="font600">推荐套系</span>
                        <span class="index">{{i + 1}}/{{recommendList.length}}</span>
                    </div>
                    <div class="flex pad10" style="padding-top:30rpx;">
                        <img class="h80" :src="_.coverPhoto" alt="">
                        <div class="flex_1 pad_rl10 fontSize28">
                            <div class="font600">{{_.name}}</div>
                            <div class="paddingT10 fontSize22 color666">{{_.imgIntroduction}}</div>
                            <div class="price">
                                <span class="fontFamilyST fontWight">￥{{_.assemblyPrice}}</span>
                                <span class="goPhoto" @click="onClickDetails(_.id)">去拍摄</span>
                            </div>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </swiperDer>
        
    </div>
    <div class="examples">
        <view class="borders"></view>
        <view class="text">案例展示</view>
        <view class="borders"></view>
    </div>
    <div class="moreContent">
        <img v-for="(_, i) in detailPhotoList" :key="i" mode="widthFix" class="img" :src="_" alt="">
    </div>
    <!-- 弹窗 -->
    <i-message id="message" />

    <!-- 兼容下拉白框 -->
    <view class="isIosView"></view>
  </div>
</template>

<script>
import { getPtdetail, getPropelDetail,cellectAssembly,getAssemblyCollect,delCollectOne } from '@/util/api/goods.js'
import { mapGetters } from 'vuex'
import swiperDer from '@/components/swiper-der.vue'
export default {
    components: {swiperDer},
    data () {
        return {
            topCarouseList: [],
            detailPhotoList: [],
            recommendList: [],
            imagesLabel: [],
            listDetai: {},
            colors:false, // 套系收费
            delCollId:null, // 记录id
            Id:null,
            currentSwiper:0,
        }
    },
    computed:{
        ...mapGetters('user',[
            'get_appId',
            'get_enterpriseId',
            'get_userId',
            'get_shopId'
        ]),
    },
    onLoad(options) {
        this.Id = options.id
        this.getPtdetail(options.id)
    },
    methods: {
        changeSwiper(e){
            this.currentSwiper = e.detail.current;
        },
        // 跳转详情
        onClickDetails(idx){
            uni.navigateTo({ 
                url: '/pages/tabBar/classify/components/details?id=' + idx  
            })
        },
        // 获取线上套系详情
        getPtdetail(id){
            let param = {
                enterpriseId:this.get_enterpriseId,
                id: id
            }
            getPtdetail(param).then(res=>{
                let data = res.data.data
                this.listDetai = data
                this.topCarouseList = data.topCarouseList
                this.detailPhotoList = data.detailPhotoList
                this.imagesLabel = data.imagesLabel && data.imagesLabel.split(',')
                uni.setNavigationBarTitle({
                    title: res.data.data.imgTitle
                })
                // 判断对接套系
                if(data.propel){
                     getPropelDetail(Object.assign({propel: data.propel}, param)).then(res => {
                        this.recommendList = res.data.data
                    })
                }
                this.getAssemblyCollect()
            })
        },

        // 收藏
        async onCollection () {
            let params = {
                appId: this.get_appId,
                assemblyId: this.Id,
                assemblyType: 0,
                enterpriseId: this.get_enterpriseId,
                isCollect: true,
                images: this.listDetai.coverPhoto,
                userId: this.get_userId,
                title: this.listDetai.imgTitle
            }
            if (this.get_userId) {
                await cellectAssembly(params)
                uni.showToast({
                    title: '收藏成功',
                    duration: 2000
                })
                this.getAssemblyCollect()
            } else {
                uni.showToast({
                    title: '请登录后再收藏',
                    duration: 2000
                })
            }
        },

        // 删除收藏
        onDelCollection(){
            delCollectOne({id:this.delCollId}).then(res=>{
                if(res.data.data){
                    this.delCollId = null
                    this.colors = false
                    uni.showToast({
                        title: '删除成功',
                        duration: 1500
                    })
                }
            })
        },

        // 获取是否收藏
        getAssemblyCollect(){
            let params = {
                appId: this.get_appId,
                assemblyId: this.Id,
                assemblyType: 0,
                enterpriseId: this.get_enterpriseId,
                userId: this.get_userId,
            }
            getAssemblyCollect(params).then(res=>{
                if(res.data.data){
                    this.delCollId = res.data.data.id
                    this.colors = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.h200{
    width: 100%;
    height: 520rpx;
}
.title_tag{
    padding: 40rpx;
    background: #fff;
    .flex{
        justify-content: space-between;
        align-items: center;
    }
}
.detail_content{
    background: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 12rpx;
    position: relative;
}
.isIosView{
    position: absolute;
    width: 100%;
    height: 66rpx;
    bottom: -66rpx;
    left: 0;
    background: #f5f5f5;
    z-index: -1;
}
.recommendContent{
    width: 700rpx;
    margin: 20rpx auto;
    background: #fff;
    border-radius: 18rpx;
        height: 340rpx;
    .index{
        color: gray;
        float: right;
        font-size: 20rpx;
    }
    .price{
        color: #D4AD72;
        margin-top: 15rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .goPhoto{
            border-radius: 30rpx;
            float: right;
            padding: 6rpx 25rpx;
            color: #fff;
            background: #D4AD72;
            font-size: 26rpx;
    }
}
.examples{
    text-align: center;
    margin-bottom: 25rpx;
    padding-top: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7B7B7B;
    .borders{
        width: 120rpx;
        border-bottom: 2rpx solid #ECECEC;
    }
    .text{
        text-align: center;
        padding: 0 20rpx;
        font-size: 28rpx;
    }
}
.moreContent{
    width: 700rpx;
    padding: 18rpx;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    border-radius: 10rpx;
    .img{
        width: 100%;
        height: 100%;
        vertical-align: bottom;
    }
}
.pad10{
    padding: 20rpx;
}
.pad_rl10{
    padding: 0 20rpx;
}
.border_b{
    border-bottom: 1px solid #f5f5f5;
}
.h80{
    width: 160rpx;
    height: 160rpx;
    border-radius: 10rpx;
    border: 1rpx solid #DFDFDF;
}
.mar_b5{
    margin-bottom: 20rpx;
}
.tag {
    display: inline-block;
    color: #fff;
    background: #D3AA72;
    padding: 2rpx 15rpx;
    font-size: 24rpx;
    border-radius: 8rpx;
}
.font600{
    font-weight: 600;
}
.font12{
    font-size: 20rpx;
    color: #6B6B6B;
    text-align: center;
    font-weight: 500;
}
.login_logo{
    width: 32rpx;
    height: 32rpx;
    display: inherit;
    margin: 0 auto;
}
</style>