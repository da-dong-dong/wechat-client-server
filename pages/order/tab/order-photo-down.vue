/******************************** 底片下载 ***************************************/
<template>
    <view >
        <view class="photo">
            <view class="photoList flex">
                <view class="list">
                    <image class="img" :src="imgs"></image>
                    <text>入册/32张</text>
                    <view class="listBtn" @click="onClickDown">底片下载</view>
                </view>
                <view class="list">
                    <image class="img" :src="imgs"></image>
                    <text>入册/32张</text>
                    <view class="listBtn" @click="onClickDown">底片下载</view>
                </view>
                <view class="list">
                    <image class="img" :src="imgs"></image>
                    <text>入册/32张</text>
                    <view class="listBtn" @click="onClickDown">底片下载</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1895043093,2627103321&fm=26&gp=0.jpg',
            }
        },
        methods:{
            // 跳转下载照片
            onClickDown(){
                uni.navigateTo({
					url: '/pages/order/detail/downPhoto?id=' + '1'
				})
            }
        }
    }
</script>

<style lang="scss" scoped>
.photo{
    padding: 40rpx 30rpx;
    .photoList{
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .list{
        width: 334rpx;
        height: 584rpx;
        background: #fff;
        padding: 10rpx;
        box-sizing: content-box;
        border-radius: 20rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        text-align: center;
        box-sizing: border-box;
        margin-bottom: 30rpx;
        text{
            padding-top: 14rpx;
            padding-left: 12rpx;
            text-align: left;
            display: block;
        }
        .img{
            border-radius: 10rpx;
            width: 312rpx;
            height: 422rpx;
            display: inline-block;
        }
        .listBtn{
            width: 170rpx;
            height: 52rpx;
            background: #FF4852;
            box-shadow: 0px 4rpx 16rpx 0rpx #FF6068;
            border-radius: 4rpx;
            line-height: 52rpx;
            text-align: center;
            margin: 30rpx auto 0;
            color: #fff;
            font-weight: 400;
        }
        .listText{
            margin-top: 30rpx;
            justify-content: space-between;
            .flex{
                color: #999999;
                text{
                    &:nth-child(1){
                        color: #FF4852;
                        margin-right: 30rpx;
                    }
                }
            }
        }
    }
}
</style>