/******************************** 影集 ***************************************/
<template>
    <view >
        <view class="photo">
            <view class="photoList flex">
                <view class="list">
                    <image class="img" :src="imgs"></image>
                    <text>我们结婚啦</text>
                    <view class="listBtn" @click="onClickGuest">查看宾客数据</view>
                </view>
                <view class="list">
                    <image class="img" :src="imgs"></image>
                    <text>我们结婚啦</text>
                    <view class="listBtn" @click="onClickGuest">查看宾客数据</view>
                </view>
                <view class="list">
                    <image class="img" :src="imgs"></image>
                    <text>我们结婚啦</text>
                    <view class="listText flex">
                        <text>转发</text>
                        <view class="flex">
                            <text>编辑</text>
                            <text>删除</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            }
        },
        methods:{
            // 跳转宾客数据
            onClickGuest(){
                uni.navigateTo({
					url: '/pages/order/detail/seeGuest?id=' + '1'
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