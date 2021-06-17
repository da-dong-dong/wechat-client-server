<template>
    <view class="order_list">
        <view class="order_One"  v-for="(item,index) in get_carList" :key="index">
            <view class="title">
                订单号: {{item.orderNo}}
                <span class="float_r colorA3">{{item.state ? item.state : ''}}</span>
            </view>
            <view class="flex">
                <img class="h145" :src="item.coverPhoto"/>
                <view class="flex_1">
                    <view class="padding">
                        <span class="font600">{{item.assemblyName}}</span>
                        <span class="float_r colorA3">￥{{item.sumPrice}}</span>
                    </view>
                    <view class="font14">
                        总<span></span>价: <span class="orange paddingL9">  ￥{{item.sumPrice}}</span>
                    </view>
                    <view class="font14">
                        尾<span></span>款: ￥{{item.sumPrice}}
                    </view>
                </view>
            </view>
            <view class="content" >
                <view v-if="item['reservationPhotoInfoVos']">
                    <!-- 判断是否双日 -->
                    <view v-if="item.assemblyType == 0">
                        <view class="">
                            <view class="view">
                                拍摄门店: {{item['reservationPhotoInfoVos'][0].reservationShopId | shopID(get_shopIdList)}}
                            </view>
                            <view class="view">
                                拍摄时间: {{item['reservationPhotoInfoVos'][0].reservationTime}}
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        <view class=""  v-for="(item1,index1) in item['reservationPhotoInfoVos']" :key="index1">
                            <view class="view">
                                拍摄门店: {{item1.reservationShopId | shopID(get_shopIdList)}}
                            </view>
                            <view class="view">
                                拍摄时间: {{item1.reservationTime}}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="view">
                    订单时间: {{item.orderTime | times}}
                </view>
            </view>

            <view class="footer">
                <span v-if="item.state" class="float_l orange" @click="onClickDetails(item.id)">
                    查看更多 <i class="iconfont iconleft"></i><i style="left:-20rpx" class="iconfont iconleft"></i>
                </span>
                <view v-else class="noBuy">
                    <!-- 待付款 -->
                    <view>
                        <span>已付定金：￥000</span>
                        <span>尾款待支付：￥000</span>
                    </view>
                </view>
                <span class="float_r" v-if="item.state">
                    <span class="font600">实付款: </span>
                    <span class="orange" >￥{{item.sumPrice + item.schedulePrice}}</span>
                </span>
            </view>
            <!-- 待付款 -->
            <view class="footer bottB" v-if="!item.state">
                <view class="orange noBuyBut">
                    <view class="text" @click="onClickDetails(item.id)">查看更多 <i class="iconfont iconleft"></i><i style="left:-20rpx" class="iconfont iconleft"></i></view>
                    <view class="btn" @click="onBuy(item.id)">去付款</view>
                </view>
            </view>
        </view>
        <view class="noOrder" v-if="get_carList.length === 0"> 您暂时还没有订单喔~</view>
    </view>
</template>

<script> 
import outTime from '../components/outTime';
import { mapGetters } from 'vuex'
    export default {
        props:['get_carList'],
        filters:{
            // 测试
            shopID(val,shopId){
                let text = '';
                text =  shopId.filter(item=>item.shopId == val)
                return text[0].shopName
            }
        },
        components: { outTime},
        computed:{
            ...mapGetters('map',[
				'get_shopIdList'
			]),
        },
        mounted () {
            console.log('数据1', this.get_carList)
        },
        data(){
            return{
                
            }
        },
        methods:{
            // 跳转蓝湖详情
            onClickDetails(id){
                uni.navigateTo({ 
                    url: `/pages/order/index?id=${id}`
                })
            },

            // 立刻支付
            onBuy(orderId){
                // 取消订单接口
                this.$emit('onBuy',orderId)
                // uni.navigateToMiniProgram({
                //     appId: jumpAppId?jumpAppId:'wx62d6b9c1cd4ba50a',
                //     envVersion: 'trial', // develop（开发版），trial（体验版），release（正式版）
                //     path: `pages/pay/pay?outTradeNo=${outTradeNo}`,
                //     extraData: outTradeNo,
                //     success(res) {
                //         // 返回成功
                //         console.log(res)
                //     }
                // })
            },

            // 取消订单
            onOrderClose(orderId){
                // 取消订单接口
                this.$emit('onOrderClose',orderId)
            }
        }
       
    }
</script>

<style lang="less">
.order_list{
    padding-bottom: 120rpx;
    box-sizing: border-box;
}
.order_One{
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    .flex{
        display: flex;
        padding: 20rpx 30rpx;
        border-bottom: 1px solid #ECECEC;
    }
    .h145{
        width: 150rpx;
        height: 150rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
    }
    .title{
        padding: 20rpx 30rpx;
        border-bottom: 1px solid #ECECEC;
    }
    .content{
        padding: 20rpx 30rpx;
        border-bottom: 1px solid #ECECEC;
        .view{
            padding: 10rpx 0;
        }
    }
    .footer{
        padding: 20rpx 30rpx;
        overflow: hidden;
    }
    .float_r{
        float: right;
    }
    .float_l{
        align-items: center;
        display: flex;
        float: left;
    }
    .font600{
        font-weight: 600;
    }
    .padding{
        padding: 10rpx 0;
    }
    .font14{
        font-size: 26rpx;
        color: #A3A3A3;
        span{
            width: 24rpx;
            display: inline-block;
        }
    }
    .colorA3{
        color: #A3A3A3;
    }
    .orange{
        color: #D3AB75;
    }
}
.iconleft{
    position: relative;
    top: 4rpx;
}
.noOrder{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #9D9D9D;
    }
.noBuy{
    width: 100%;
    font-size: 20rpx;
    color:#A3A3A3;
    text-align: right;
    span{
        &:nth-child(2){
            margin:0 10rpx 0 20rpx;
            color: #414143;
            font-weight: bold;
            font-size: 24rpx;
        }
    }
}
.bottB{
    border-top: 1px solid #ECECEC;
}
.noBuyBut{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    .text{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn{
        width: 183rpx;
        height: 54rpx;
        background: #D3AA72;
        line-height: 54rpx;
        text-align: center;
        border-radius: 30rpx;
        color: #fff;
    }
}
</style>
