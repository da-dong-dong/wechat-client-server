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
                        总价: <span class="orange">￥{{item.sumPrice}}</span>
                    </view>
                    <view class="font14">
                        尾款: ￥{{item.sumPrice}}
                    </view>
                </view>
            </view>
            <view class="content" >
                <view class="" v-if="item['reservationPhotoInfoVos']" v-for="(item1,index1) in item['reservationPhotoInfoVos']" :key="index1">
                    <view class="">
                        拍摄门店: {{item1.reservationShopId | shopID(get_shopIdList)}}
                    </view>
                    <view class="">
                        拍摄门店: {{item1.reservationTime}}
                    </view>
                </view>
                <view class="">
                    订单时间: {{item.orderTime | times}}
                </view>
            </view>

            <view class="footer">
                <span v-if="item.state" class="float_l orange" @click="onClickDetails(item.id)">
                    查看详情<i class="iconfont iconleft"></i>
                </span>
                <view v-else class="float_l orange" @click="onBuy(item.id)">立刻支付<i class="iconfont iconleft"></i></view>
                <span class="float_r" v-if="item.state">
                    <span class="font600">实付款: </span>
                    <span class="orange" >￥{{item.sumPrice + item.schedulePrice}}</span>
                </span>
            </view>
        </view>
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
        view{
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
</style>
