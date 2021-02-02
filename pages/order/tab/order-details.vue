/******************************** 详情 ***************************************/
<template>
    <view >
        <view class="box">
            <view class="order_box">
                <view class="order_top">
                    <view class="order_heade padding30 fontSize28 color333">
                        <view>
                            金额：<text class="colorRed fontWight">¥899</text>
                        </view>
                        <view class="flex marginT20 ">
                            <view>
                                预约拍摄时间：<text class="colorRed fontWight">未预约</text>
                            </view>
                            <view>
                                附加费用：<text class="colorRed fontWight">0</text>
                            </view>
                        </view>
                    </view>
                    <view class="order_info paddingRL30 color333">
                        <view class="fontSize28 fontWight marginB30">客户信息</view>
                        <view class="paddingRL30 fontSize24">
                            <view class="order_info_list flex color999">
                                <view>姓名</view>
                                <view>性别</view>
                                <view>手机</view>
                            </view>
                            <view class="order_info_list flex ">
                                <view>张文苑<text class="color999">（爸爸）</text></view>
                                <view>男</view>
                                <view>13054359848</view>
                            </view>
                            <view class="order_info_list flex ">
                                <view>张文苑<text class="color999">（妈妈）</text></view>
                                <view>女</view>
                                <view>13054359848</view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- 宝宝信息 -->
                <view class="order_show color333">
                    <view class="oreder_img">
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                    </view>
                    <view class="order_show_top marginB30 fontWight">
                        <view class="fontSize28">宝宝信息</view>
                    </view>
                    <view class="paddingRL30 fontSize24">
                        <view class="order_info_list flex color999">
                            <view>姓名</view>
                            <view>性别</view>
                            <view>手机</view>
                        </view>
                        <view class="order_info_list flex ">
                            <view>张文苑</view>
                            <view>男</view>
                            <view>13054359848</view>
                        </view>
                    </view>
                </view>
                <!-- 详情 -->
                <view class="detail_show color333">
                    <!-- 套系 -->
                    <view class="marginB10 fontWight">
                        <view class="fontSize28">套系信息</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999 flex marginB30">
                        <view class="textDetail">套系价格：¥899</view>
                        <view class="textDetail">套系名称：899宝宝照</view>
                    </view>
                    <!-- 产品详情 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">产品详情</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999 flex marginB30">
                        <view class="textDetail">入册：23张</view>
                        <view class="textDetail">入底：23张</view>
                        <view class="textDetail">拍摄次数：88</view>
                        <view class="textDetail">服装套住：3套</view>
                    </view>
                    <!-- 产品内容 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">产品内容</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999 flex marginB30">
                        <view class="textDetail">8寸水晶册x1</view>
                        <view class="textDetail">10寸水晶册x1</view>
                        <view class="textDetail">36寸亚米奇x2</view>
                        <view class="textDetail">风车摆台x1</view>
                        <view class="textDetail">3寸钱包照x2</view>
                    </view>
                    <!-- 服务内容 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">服务内容</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999  marginB30">
                        <view class="textDetail">1对1服务</view>
                        <view class="textDetail">总监拍摄90分钟</view>
                    </view>
                     <!-- 注意事项 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">注意事项</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999  marginB30">
                        <view class="textDetail">1.我是注意事项 我是注意事项</view>
                        <view class="textDetail">2.我是注意事项 我是注意事项</view>
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
        box-sizing: content-box;
        border-bottom: 1px #999999 dashed;
        .flex{
            justify-content: space-between;
        }
    }
}
.order_info{
    position: relative;
    margin-top: 24rpx;
    min-height: 238rpx;
    background: #FFFFFF;
    border-radius: 16rpx; 
    
}
.order_info_list{
    justify-content: space-between;
    margin-bottom: 16rpx;
    view{
        flex:1;
        &:nth-child(2){
            margin-left: 40rpx;
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
    
    font-family: PingFangSC-Medium, PingFang SC;
    
    
    .order_show_list{
        margin-top: 30rpx;
        line-height: 45rpx;
    }
}
.detail_show{
    width: 100%;
    background: #FFFFFF;
    border-radius: 16rpx;  
    margin-top: 20rpx;
    padding: 26rpx 40rpx;
    box-sizing: border-box;
    
}
.textDetailBox{
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 50rpx;
    .textDetail{
        min-width: 300rpx;
    }
}
</style>