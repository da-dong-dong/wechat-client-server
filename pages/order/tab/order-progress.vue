/******************************** 进度 ***************************************/
<template>
    <view class="order_box1">
        <!-- 头部 -->
        <view class="progressTop">
            <image class="img" src="/static/image/progress.png"></image>
            <view class="progressText fontSize24">
                <view class="color333 fontSize28">当前进度：<text class="fontSize36 colorRed fontWight">选片</text></view>
                <view>客户：<text>选片</text></view>
                <view>下单时间<text>2020-10-18 16:00</text></view>
            </view>
        </view>
        <!-- 进度 -->
        <view class="progressList  paddingRL40 flex fontSize24 color999" v-for="(item,index) in progressList" :key="index">
            <view class="time">{{item.tiem}}</view>
            <view class="text">
                <view class="fontSize36 fontWight " :class="item.active?'color333':''">{{item.name}}</view>
                <view class="textList">
                    <text v-for="(items) in item['textList']" :key="items">{{items}}</text>
                </view>
            </view>
            <view class="success">
                <i-icon class="icon" type="success" size="20" :color="item.active?'#FF4852':'#DDDDDD'"  />
                <view class="successBorder" :class="item.active?'active':''"></view>
            </view>
        </view>
    </view>
</template>

<script>
import noView from '@/components/404.vue';
    export default {
        components:{noView},
        data(){
            return{
                progressList:[{
                    tiem: '2020.11.11 20:00',
                    name: '拍照',
                    textList: ['摄影师：文缘','摄影助理：文缘','化妆师：文缘','化妆助理：文缘'],
                    active: true
                },
                {
                    tiem: '2020.11.11 20:00',
                    name: '初修',
                    textList: ['初修师：文缘'],
                    active: true
                },
                {
                    tiem: '2020.11.11 20:00',
                    name: '选片',
                    textList: ['化妆助理：文缘'],
                    active: true
                },{
                    tiem: '2020.11.11 20:00',
                    name: '拍照',
                    textList: ['化妆师：文缘','化妆助理：文缘'],
                    active: true
                },{
                    tiem: '2020.11.11 20:00',
                    name: '精修',
                    textList: ['化妆助理：文缘'],
                    active: false
                },{
                    tiem: '2020.11.11 20:00',
                    name: '设计',
                    textList: ['化妆师：文缘'],
                    active: false
                },{
                    tiem: '2020.11.11 20:00',
                    name: '看板',
                    textList: ['摄影师：文缘'],
                    active: false
                },
                {
                    tiem: '2020.11.11 20:00',
                    name: '发片',
                    textList: ['摄影师：文缘'],
                    active: false
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
.order_box1{
    padding-bottom: 100rpx;
    background: #FFFFFF;
}
.progressTop{
    position: relative;
    height: 480rpx;
    .img{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .progressText{
        color: #999999;
        z-index: 200;
        position: absolute;
        margin-left: 250rpx;
        margin-top: 180rpx;
        line-height: 60rpx;
    }
}
.progressList{
    box-sizing: content-box;
    position: relative;
    min-height: 180rpx;
    margin-bottom: 20rpx;
    .time{
        width: 330rpx;
        margin-left: 50rpx;
        margin-right: 30rpx;
    }
    .text{
        width: 540rpx;
    }
    .textList{
        text{
            display: inline-block;
            width: 180rpx;
            line-height: 50rpx;
        }
    }
    .success{
        position: absolute;
        top: 0;
        left: 295rpx;
        .active{
           background: #FF4852;
        }
    }
    .successBorder{
        width: 1rpx;
        height: 150rpx;
        background: #DDDDDD;
        margin-left: 18rpx;
    }
}
</style>