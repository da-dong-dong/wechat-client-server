<template>
    <view class="order_list" >
        <view class="order_One"  v-for="(item,index) in get_carList" :key="index">
            <view class="title">
                订单号: {{item.orderNo}}
                <span class="float_r colorA3" v-if="item.state">{{item.state ? item.state : ''}}</span>
                <view v-if="!item.state && !item.assemblyEarnestMoney" class="timeOut">
                    <out-time class="paddingRL10 fontSize28" :endtime="item.orderTime" />
                </view>
            </view>
            <view class="flex">
                <img class="h145" :src="item.coverPhoto"/>
                <view class="flex_1">
                    <view class="padding">
                        <span class="font600">{{item.assemblyName}}</span>
                        <span class="float_r colorA3">￥{{item.earnestMoney}}</span>
                    </view>
                    <view class="font14 ">
                        总<span></span>价: <span class="orange paddingL9 fontWight">  ￥{{item.sumPrice}}</span>
                    </view>
                    <view class="font14">
                        尾<span></span>款: ￥{{item.sumPrice-item.proceeds == 0?item.sumPrice-item.proceeds : item.sumPrice - item.assemblyEarnestMoney | toFile}}
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
                                拍摄时间: {{ item['reservationPhotoInfoVos'][0].reservationDate | times}} {{item['reservationPhotoInfoVos'][0].reservationTime.slice(0, 5)}}
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        <view class=""  v-for="(item1,index1) in item['reservationPhotoInfoVos']" :key="index1">
                            <view class="view" v-if="index1 === 0">
                                拍摄门店: {{item1.reservationShopId | shopID(get_shopIdList)}}
                            </view>
                            <view class="view">
                                拍摄时间: {{ item1.reservationDate | times}} {{item1.reservationTime.slice(0, 5)}}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="view fontWight">
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
                        <span>已付定金：￥{{item.assemblyEarnestMoney}}</span>
                        <span>{{item.earnestMoney==0?"待付定金":"尾款待支付"}}：￥{{item.sumPrice-item.proceeds == 0?item.sumPrice-item.proceeds : item.sumPrice - item.assemblyEarnestMoney}}</span>
                    </view>
                </view>
                <span class="float_r" v-if="item.state">
                    <span class="font600">实付款: </span>
                    <span class="orange fontWight" >￥{{item.proceeds==undefined?0:item.proceeds}}</span>
                </span>
            </view>
            <!-- 待付款 -->
            <view class="footer bottB" v-if="!item.state">
                <view class="orange noBuyBut">
                    <view class="text" @click="onClickDetails(item.id,true)">查看更多 <i class="iconfont iconleft"></i><i style="left:-20rpx" class="iconfont iconleft"></i></view>
                    <view class="btn" @click="onBuy(item.id)">去付款</view>
                </view>
            </view>
        </view>
        <view class="noOrder" v-if="get_carList.length === 0"> 
            <view class="flex">
                <image class="login_logo" src="/static/image/my/wdl.png"></image>
                <span>您暂时还没有订单喔~</span>
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
            },
            // 保留两位小数点
            toFile(val){
                return Number(val.toString().match(/^\d+(?:\.\d{0,2})?/)) 
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
            onClickDetails(id,val){
                let type = 1
                if(val){
                    type = 0
                }
                uni.navigateTo({ 
                    url: `/pages/order/index?id=${id}&type=${type}`
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
        padding: 30rpx;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            line-height: 22rpx;
        }
        .timeOut{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color:#D3AA72;
        }
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
    height: 65vh;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
   // color: #9D9D9D;
    color: #d8d8d8;
    .flex{
        align-items: center;
        flex-direction: column;
    }
    .login_logo{
        width: 144rpx;
        height: 144rpx;
        display: block;
    }
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
