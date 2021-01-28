/******************************** 查看宾客 ***************************************/
<template>
    <view>
        <!-- tba -->
        <view class="tabBox flex">
            <view class="tab_header">头像</view>
            <view class="tab_header">姓名</view>
            <view class="tab_header felxSi">手机号码</view>
            <view class="tab_header">人数</view>
            <view class="tab_header">是否赴宴</view>
        </view>
        <!-- 数据表 -->
        <view>
            <view class="tabLIst flex">
                <view class="tab_header">
                    <image class="img" :src="imgs"></image>
                </view>
                <view class="tab_header">大东东</view>
                <view class="tab_header felxSi">13068254894</view>
                <view class="tab_header">1</view>
                <view class="tab_header">是</view>
            </view>
            <view class="tabLIst flex">
                <view class="tab_header">
                    <image class="img" :src="imgs"></image>
                </view>
                <view class="tab_header">大东东</view>
                <view class="tab_header felxSi">13068254894</view>
                <view class="tab_header">1</view>
                <view class="tab_header">是</view>
            </view>
            <view class="tabLIst flex">
                <view class="tab_header">
                    <image class="img" :src="imgs"></image>
                </view>
                <view class="tab_header">大东东</view>
                <view class="tab_header felxSi">13068254894</view>
                <view class="tab_header">1</view>
                <view class="tab_header">是</view>
            </view>
        </view>
        <!-- 合计 -->
        <view class="textRle">合计：8人</view>
    </view>
</template>

<script>
    export default {
        onLoad(options) {
            console.log(options.id)
        },
        data(){
            return{
                imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            }
        }
    }
</script>

<style lang="scss" scoped>
.tabBox{
    background: #F5F8FD;
    padding: 0 30rpx;
    height: 64rpx;
    box-sizing: border-box;
    justify-content: space-between;
    font-size: 20rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    align-items: center;
    text-align: center;
    .felxSi{
        flex: 2;
    }
}
.tabLIst{
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 24rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
     padding: 0 30rpx;
    .felxSi{
        flex: 2;
    }
    .tab_header{
        height: 90rpx;
        border-bottom: 1px solid #EBEBEB;
        line-height: 90rpx;
        .img{
            width: 48rpx;
            height: 48rpx;
            margin-top: 20rpx;
        }
    }
}
.tab_header{
    flex: 1;
}
.textRle{
    text-align: right;
    padding: 20rpx 30rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}
</style>