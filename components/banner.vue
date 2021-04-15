/******************************** 轮播图 ***************************************/
<template>
   <view>
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <swiper-item v-for="(item,index) in imgs" :key="index">
                <image class="img" :src="item"></image>
            </swiper-item>
        </swiper>
   </view>
</template>

<script>
    export default {
        props:['imgs'],
        data(){
            return{
                background: ['color1', 'color2', 'color3'],
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500,
            }
        }
    }
</script>

<style lang="scss" scoped>
.swiper{
    height: 562rpx;
    .img{
        height: 562rpx;
    }
}
</style>