/******************************** 404页面 ***************************************/
<template>
    <view class="box">
        <view class="box_conten">
            <image class="box_conten_img" src="/static/image/404.png"></image>
            <view >敬请期待…</view>
            <view class="box_conten_text"> 更多功能正在筹备中…</view>
        </view>
    </view>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
    height: 100vh;
    position: relative;
    .box_conten{
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%,-50%);
        width: 300rpx;
        text-align: center;
        .box_conten_img{
            width: 240rpx;
            height: 240rpx;
        }
        line-height: 60rpx;
        font-weight: bold;                
        font-size: 28rpx;
        color: #333333;
        .box_conten_text{
            font-family: PingFangSC-Medium, PingFang SC;
            
            font-weight: bold;  
            color: #C1CDD8;              
        }
    }
}
</style>