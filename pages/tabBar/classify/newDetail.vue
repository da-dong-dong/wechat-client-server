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
        <div class="mar_b5">
            {{listDetai.imgTitle}}
        </div>
        <div>
            <span class="tag" v-for="(_, i) in imagesLabel" :key="i" style="margin-right: 8rpx;">
                {{_}}    
            </span>
        </div>
    </div>
    <div class="recommendContent" v-if="recommendList.length > 0">
        <swiper class="swiper" indicator-dots>
            <swiper-item v-for="(_, i) in recommendList" :key="_.id">
                <div class="pad10 border_b">
                    <span class="font600">推荐套系</span>
                    <span class="index">{{i + 1}} / {{recommendList.length}}</span>
                </div>
                <div class="flex pad10">
                    <img class="h80" :src="_.coverPhoto" alt="">
                    <div class="flex_1 pad_rl10">
                        <div class="font600">{{_.name}}</div>
                        <div>{{_.imgIntroduction}}</div>
                        <div class="price">
                            ￥ {{_.assemblyPrice}}
                            <span class="goPhoto" @click="onClickDetails(_.id)">去拍摄</span>
                        </div>
                    </div>
                </div>
            </swiper-item>
        </swiper>
    </div>
    <div class="examples">
        案例展示
    </div>
    <div class="moreContent">
        <img v-for="(_, i) in detailPhotoList" :key="i" mode="widthFix" class="img" :src="_" alt="">
    </div>
  </div>
</template>

<script>
import { getPtdetail, getPropelDetail } from '@/util/api/goods.js'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            topCarouseList: [],
            detailPhotoList: [],
            recommendList: [],
            imagesLabel: [],
            listDetai: {}
        }
    },
    computed:{
        ...mapGetters('user',[
            'get_enterpriseId',
        ]),
    },
    onLoad(options) {
        this.getPtdetail(options.id)
    },
    methods: {
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
                getPropelDetail(Object.assign({propel: data.propel}, param)).then(res => {
                    this.recommendList = res.data.data
                })
            })
        },
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
}
.detail_content{
    background: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 12rpx;
}
.recommendContent{
    width: 700rpx;
    margin: 20rpx auto;
    background: #fff;
    border-radius: 18rpx;
    .index{
        color: gray;
        float: right;
        font-size: 20rpx;
    }
    .price{
        color: #D4AD72;
        margin-top: 10rpx;
    }
    .goPhoto{
        border-radius: 10rpx;
        float: right;
        padding: 10rpx 20rpx;
        color: #fff;
        background: #D4AD72;
    }
}
.examples{
    text-align: center;
    margin-bottom: 10rpx;
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
}
.mar_b5{
    margin-bottom: 10rpx;
}
.tag {
    display: inline-block;
    color: #fff;
    background: #D3AA72;
    padding: 10rpx 14rpx;
    font-size: 20rpx;
    border-radius: 8rpx;
}
.font600{
    font-weight: 600;
}
</style>