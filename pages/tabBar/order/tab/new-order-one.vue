<template>
    <view class="order_list" >
        <view class="order_One fontSize28"  v-for="(item,index) in get_carList" :key="index">
            <view class="title">
                订单号: {{item.orderNo}}
                <span class="float_r colorA3" v-if="item.state && item.isOnline">{{item.state ? item.sumPrice - item.proceeds > 0 && item.proceeds ?'':item.state : ''}}</span>
                <view v-if="!item.state && !item.assemblyEarnestMoney && item.isOnline" class="timeOut">
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
                    <view class="font14 paddingT10">
                        总<span></span>价: <span class="orange paddingL9 fontWight">  ￥{{item.sumPrice}}</span>
                    </view>
                    <view class="font14">
                        <!-- 尾<span></span>款: ￥{{item.sumPrice-item.proceeds == 0?item.sumPrice-item.proceeds : item.sumPrice - item.assemblyEarnestMoney | toFile}} -->
                        尾<span></span>款: ￥{{item.sumPrice - item.earnestMoney | toFile}}
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
                <view class="view">
                    订单时间: {{item.orderTime | times}}
                </view>
            </view>

            <view class="footer">
                <view class="noBuy">
                    <!-- 有倒计时显示定金 -->
                    <view v-if="item.isOnline && !item.state && !item.assemblyEarnestMoney && !item.isClose">
                        <span class="font600">定金: </span>
                        <span class="orange fontWight">￥{{item.earnestMoney}}</span>
                        <!-- <span>已付定金：￥{{item.assemblyEarnestMoney}}</span>
                        <span>{{item.assemblyEarnestMoney==item.earnestMoney?"待付定金":"尾款待支付"}}：￥{{item.sumPrice-item.proceeds == 0?item.sumPrice-item.proceeds : item.sumPrice - item.assemblyEarnestMoney}}</span> -->
                    </view>
                    <!-- 已关闭显示已优惠，实付款 -->
                    <view v-else-if="item.isOnline && item.isClose">
                        <span>已优惠：￥{{item.discountsPrice?item.discountsPrice:0}}</span>
                        <span class="font600">实付款: </span>
                        <span class="orange fontWight" >￥{{item.proceeds==undefined?0:item.proceeds}}</span>
                    </view>
                    <!-- 已付定金，显示定金已支付，尾款待支付 -->
                    <view v-else-if="item.isOnline && item.assemblyEarnestMoney && !item.isClose">
                        <span>定金已支付：￥{{item.assemblyEarnestMoney}}</span>
                        <span>尾款待支付：￥{{item.sumPrice - item.assemblyEarnestMoney | toFile}}</span>
                   </view>
                    <!-- 是否线下订单 -->
                    <view v-else-if="!item.isOnline">
                        <span>已付:￥{{item.incomePrice}}</span>
                        <span class="font600">待支付: </span>
                        <span class="orange fontWight" >￥{{item.assemblyPrice - item.incomePrice}}</span>
                    </view>
                </view>
            </view>
            <!-- 横线底部 -->
            <view class="footer bottB">
                <view class="orange noBuyBut">
                    <view class="text" :class="item.isClose?'visbli':''" @click="onClickDetails(item.id,true)">查看更多 <i class="iconfont iconleft"></i><i style="left:-20rpx" class="iconfont iconleft"></i></view>
                    
                    <!-- 全部 -->
                    <view class="allBtn" v-if="item.isType == 'ye'">
                        <view class="btn btn1"  v-if="!item.state && !item.assemblyEarnestMoney && item.isOnline" @click="onOrderClose(item.id)">取消订单</view>
                        <view class="btn" @click="onBuy(item.id)" v-if="item.sumPrice - item.proceeds > 0 && !item.isClose">去付款</view>
                        <view class="btn btn1" @click="onDelOrder(item.id)" v-else-if="item.isOnline && !item.proceeds">删除订单</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="noOrder" v-if="get_carList.length === 0"> 
            <view class="flex">
                <image class="login_logo" src="/static/image/my/wdl.png"></image>
                <span>您暂时还没有订单喔~</span>
            </view>
        </view>

        <!-- 弹窗 -->
        <modulDel @cancel="cancel" @ok="ok" v-if="showModel" :text="text"/>
    </view>
</template>

<script> 
import outTime from '../components/outTime';
import modulDel from '../components/modulDel';
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
            // 保留两位小数点 取整
            toFile(val){
                return Number((val.toFixed(2)).toString().match(/^\d+(?:\.\d{0,2})?/)) 
            }
        },
        components: { outTime,modulDel},
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
                showModel:false,
                text:'',
                orderId:null,
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
            },

            // 取消订单
            onOrderClose(orderId){
                this.showModel = true
                this.orderId = orderId
                this.text = '取消'
            },

            // 删除订单
            onDelOrder(orderId){
                this.showModel = true
                this.orderId = orderId
                this.text = '删除'
            },

            // 弹窗
            cancel(){
				this.showModel = false
			},
			ok(){
                if(this.text === '取消'){
                    // 取消订单接口
                    this.$emit('onOrderClose',this.orderId)
                }else{
                    // 删除订单
                    this.$emit('onDelOrder',this.orderId)
                }
                this.showModel = false
			}
        }
       
    }
</script>

<style lang="less">
.visbli{
    visibility: hidden;
}
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
        border-bottom: 1rpx solid rgba(236, 236, 236, 0.6);
    }
    .h145{
        width: 150rpx;
        height: 150rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
    }
    .title{
        padding: 20rpx 30rpx;
        border-bottom: 1rpx solid rgba(236, 236, 236, 0.6);
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
        // border-bottom: 1rpx solid rgba(236, 236, 236, 0.6);
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
        font-size: 24rpx;
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
    top: 2rpx;
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
    border-top: 1rpx solid rgba(236, 236, 236, 0.6);
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
        margin-left: 15rpx;
    }
    .allBtn{
        display: flex;
        .btn1{
            background: none;
            border: 1px solid rgba(236, 236, 236, 0.8);
            color: #6D6B6C;
            box-sizing: border-box;
        }
    }
}
</style>
