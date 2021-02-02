/******************************** 网签 ***************************************/
<template>
    <view >
        <view class="box">
            <view class="order_box">
                <view class="order_top">
                    <view class="order_heade">
                        <image class="order_heade_img" src="/static/image/oreder_user.png"></image>
                        <text>吴彦祖</text>
                    </view>
                    <view class="order_info">
                        <view class="order_info_flx">
                            <view>
                                订单门店：<text>郑州金夫人婚纱摄影</text>
                            </view>
                        </view>
                        <view class="order_info_flx">
                            <view>
                                套系名称：<text>5999天长地久婚纱照</text>
                            </view>
                        </view>
                        <view class="order_info_flx">
                            <view>
                                套系价格：<text>5999<text class="red">（已付:1999 欠款:4000）</text></text>
                            </view>
                        </view>
                        <view class="order_info_flx">
                            <view>
                                订单日期：<text>2020年10月1日</text>
                            </view>
                        </view>
                    
                    </view>
                </view>
                <!-- 约单 -->
                <view class="order_show">
                    <view class="oreder_img">
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                    </view>
                    <view class="order_show_top">
                        <view>订单预约单</view>
                        <view class="text_right" @click="onclickSigna(1)">
                            <text>去签字</text> 
                            <text> > </text> 
                        </view>
                    </view>
                    <view class="order_show_list">
                        <view>接收时间：2020.11.11 20:0</view>
                        <view>接收时间：2020.11.11 20:0</view>
                    </view>
                </view>

                <view class="order_show">
                    <view class="oreder_img">
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                    </view>
                    <view class="order_show_top">
                        <view>订单预约单</view>
                        <view class="text_right" @click="onclickSigna(2)" > 
                            <text class="red">已拒签</text> 
                            <text> > </text> 
                        </view>
                    </view>
                    <view class="order_show_list">
                        <view>接收时间：2020.11.11 20:0</view>
                        <view>接收时间：2020.11.11 20:0</view>
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
                
            }
        },
        methods:{
            onclickSigna(id){
                console.log('跳转')
                uni.navigateTo({
					url: '/pages/order/detail/signature?id=' + id
				})
            }
        }
    }
</script>

<style lang="scss" scoped>
.oreder_img{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30rpx;
    position: absolute;
    left: 0;
    top: -38rpx;
    width: 610rpx;
    box-sizing: content-box;
    .oreder_img_img{
        width: 14rpx;
        height: 58rpx;
    }
}
.box{
    width: 100%;
    height: 100%;
    padding-bottom: 40rpx;
    background: #F5F8FD;
}
.order_box{
    margin: 40rpx 30rpx;
    box-sizing: content-box;
    width: 690rpx;
    
    .order_top{
        min-height: 394rpx;
        background: #FFFFFF;
        border-radius: 8rpx;
    }
    .order_heade{
        padding-left: 36rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FF4852;
        border-bottom: 1px solid #DCDCDC;
        .order_heade_img{
            width: 32rpx;
            height: 32rpx;
            margin-right: 12rpx;
        }
    }
}
.order_info{
    position: relative;
    margin-top: 24rpx;
    min-height: 328rpx;
    background: #FFFFFF;
    border-radius: 16rpx; 
    .order_info_flx{
        padding-top: 24rpx;
        padding:  24rpx 35rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        text{
            color:#333333;
            font-weight: bold;
        }
        .red{
            color:#FF2402
        }
    }
}
.order_show{
    width: 100%;
    height: 216rpx;
    background: #FFFFFF;
    border-radius: 16rpx;  
    margin-top: 20rpx;
    position: relative;  
    padding: 26rpx 40rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #999999;
    .order_show_top{
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
        .text_right{
            .red{
                color: #FF2402;
            }
        }
    }
    .text_right{
        font-size: 24rpx;
        text{
            &:nth-child(1){
                color: #FF4852;
                margin-right: 10rpx;
            }
            &:nth-child(2){
                color: #979797;
            }
            
        }
        
        
    }
    .order_show_list{
        margin-top: 30rpx;
        line-height: 45rpx;
    }
}
</style>