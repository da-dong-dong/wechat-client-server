/******************************** 详情 ***************************************/
<template>
    <view >
        <view class="box">
            <view class="order_box">
                <view class="order_top">
                    <view class="order_heade padding30 fontSize28 color333">
                        <view>
                            金额：<text class="colorRed fontWight">¥{{list.assemblyPrice?list.assemblyPrice:''}}</text>
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
                            <view class="order_info_list flex " v-for="(item,index) in list['onlineCustomerContactVos']" :key="index">
                                <view>{{item.name}}<text class="color999">（{{item.callName}}）</text></view>
                                <view>{{item.callName?'男':'女'}}</view>
                                <view>{{item.mobile}}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- 宝宝信息 -->
                <view class="order_show color333" v-if="list['onlineCustomerBabyVos'] && list['type'] == 'BABY'">
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
                        <view class="order_info_list flex " v-for="(item,index) in list['onlineCustomerBabyVos']" :key="index">
                            <view>{{item.name}}</view>
                            <view>{{item.callName?'男':'女'}}</view>
                            <view></view>
                        </view>
                    </view>
                </view>
                <!-- 详情 -->
                <view class="detail_show color333" v-for="(item,index) in list['onlineOrderItemVos']" :key="index">
                    <!-- 套系 -->
                    <view class="marginB10 fontWight">
                        <view class="fontSize28">套系信息</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999 flex marginB30">
                        <view class="textDetail">套系价格：¥{{item.price}}</view>
                        <view class="textDetail">套系名称：{{item.name}}</view>
                    </view>
                    <!-- 产品详情 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">产品详情</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999 flex marginB30">
                        <view class="textDetail">入册：{{item.bookCount}}张</view>
                        <view class="textDetail">入底：{{item.bottomCount}}张</view>
                        <view class="textDetail">拍摄次数：{{item.photoCount}}</view>
                    </view>
                    <!-- 产品内容 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">产品内容</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999 flex marginB30">
                        <view class="textDetail" v-for="(item1,index1) in item['onlineOrderItemVos']" :key="index1">{{item1.name}}x{{item1.countNum}}</view>
                    </view>
                    <!-- 服装内容 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">服装内容</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999  marginB30">
                        <view class="textDetail" v-for="(item1,index1) in item['onlineOrderItemDressInfo']" :key="index1">{{item1.name}}x{{item1.count}}</view>
                    </view>
                    <!-- 服务内容 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">服务内容</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999  marginB30">
                        <view class="textDetail" v-for="(item1,index1) in item['onlineOrderItemService']" :key="index1">{{item1.name}}x{{item1.count}}</view>
                    </view>
                    <!-- 景点内容 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">景点内容</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999  marginB30">
                        <view class="textDetail" v-for="(item1,index1) in item['onlineOrderItemPlaces']" :key="index1">{{item1.name}}</view>
                    </view>
                     <!-- 注意事项 -->
                     <view class="marginB10 fontWight">
                        <view class="fontSize28">注意事项</view>
                    </view>
                    <view class="textDetailBox fontSize24 color999  marginB30">
                        <view class="textDetail">{{item.remark?item.remark:''}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { orderDetails } from '@/util/api/order.js'
    export default {
        props:['orderId'],
        data(){
            return{
                list:null, // 数据
            }
        },
        mounted(){
            // 获取接口
            this.orderDetails()
        },
        methods:{
            // 获取订单详情
            orderDetails(){
                orderDetails({orderId:this.orderId}).then(res=>{
                    this.list = res.data.data
                    console.log(res)
                })
            },
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