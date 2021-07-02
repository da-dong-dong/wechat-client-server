/******************************** 网签 ***************************************/
<template>
    <view >
        <view class="box fontSize28">
            <view class="order_box">
                <view class="order_top">
                    <view class="order_heade">
                        <text>订单号： {{signData.orderNo}}</text>
                    </view>

                    <!-- 用户 -->
                    <view class="flex userInfo" v-for="(item,index) in signData.onlineCustomerContactVos" :key="index">
                        <view class="num">{{item.callName}}</view>
                        <view class="untext">{{item.name}}</view>
                    </view>
                    <view class="flex userInfo" >
                        <view class="num">订单门店</view>
                        <view class="untext">{{shopName(signData.orderShopId)}}</view>
                    </view>
                    <view class="flex userInfo" >
                        <view class="num">套系名称</view>
                        <view class="untext">{{signData.assemblyName}}</view>
                    </view>
                    <view class="flex userInfo" >
                        <view class="num">套系价格</view>
                        <view class="untext">{{signData.assemblyPrice}}</view>
                    </view>
                    <view class="flex userInfo" style="border:none">
                        <view class="num">订单日期</view>
                        <view class="untext">{{signData.orderTime | timeFilter}}</view>
                    </view>
                </view>
                <!-- 约单 -->
                <view class="order_show" v-for="item in signData.onlineContractVos" :key="item.id">
                    <view class="order_header">
                        <view>订单预约单</view>
                        <view class="orderIcon" v-if="item.type === 2" @tap="onClickSign(item)">{{item.isSign | signFilter}} <i-icon type="enter" size="18" color="#D3AA72" /></view>
                    </view>
                    <view class="order_show_list">
                        <view class="flex">
                            <view class="listText">接收时间</view>
                            <view class="listTime">{{item.createTime | timeFilter}}</view>
                        </view>
                        <view class="flex">
                            <view class="listText">签字时间</view>
                            <view class="listTime">{{item.signTime | timeFilter}}</view>
                        </view>
                        <!-- <view v-if="item.isSign === 2">拒签原因: {{item.remarks}}</view> -->
                    </view>
                </view>
               
            </view>
        </view>
    </view>
</template>

<script>
import { getOrderContract } from '@/util/api/home.js'
import { mapGetters, mapActions } from 'vuex'
import signViw from '@/components/cat-signature/cat-signature.vue'

    export default {
        props:{
            orderId: Number
        },
        components: {
            signViw
        },
        data(){
            return{
                signData: {},
                saveData: {}
            }
        },
        mounted(){
            // 获取接口
            this.getOrderContract()
        },
        computed: {
            ...mapGetters('map', [
                'get_shopIdList'
            ])
        },
        filters: {
            timeFilter (time) {
                if (time) {
                    let date = new Date(time)
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
                    return Y + M + D
                } else {
                    return ''
                }
            },
            signFilter (type) {
                let map = new Map([
                    [ 0, '未签' ],
                    [ 1, '已签' ],
                    [ 2, '拒签' ],
                ])
                return map.get(type)
            },
            contactFilter (arr) {
                if (arr) return arr.map(_ => _.name).join(' ')
                else return ''
            }
        },
        methods:{
            ...mapActions('html',[
				'act_setHtml'
			]),
            onClickSign (data) {
                if (data.isSign !== 2) {
                    this.act_setHtml(data.htmlText)
                    uni.navigateTo({
                        url: '/pages/order/detail/signature?id=' + data.id + `&type=${data.isSign}&url=${data.contractUrl}`
                    })
                }
            },
            shopName (id) {
                if (id) return this.get_shopIdList.filter(_ => _.shopId === id)[0].shopName
                else return '' 
            },
            getOrderContract () {
                getOrderContract({ orderId: this.orderId }).then(res => {
                    console.log('res', res);
                    this.signData = res.data.data
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
    //margin: 40rpx 30rpx;
    box-sizing: content-box;
    //width: 690rpx;
    min-height: 1200rpx;
    .order_top{
        min-height: 394rpx;
        background: #FFFFFF;
        border-radius: 20rpx;
    }
    .order_heade{
        padding-left: 36rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #000;
        border-bottom: 1px solid #ECECEC;
    }
    .userInfo{
        padding-left: 36rpx;
        border-bottom: 1px solid #ECECEC;
        height: 88rpx;
        line-height: 88rpx;
        .untext{
            font-size: 28rpx;
            color: #414143
        }
        .num{
            font-size: 28rpx;
            color: #999999;
            width: 120rpx;
            text-align: justify;
            text-align-last: justify;
            margin-right: 128rpx;
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
            color:#D3AB75
        }
    }
}
.order_show{
    width: 100%;
    background: #FFFFFF;
    border-radius: 16rpx;  
    margin-top: 20rpx;
    position: relative;  
    box-sizing: border-box;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #414143;
    .order_header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 36rpx;
        border-bottom: 1px solid #ECECEC;
        height: 88rpx;
        line-height: 88rpx;
        padding-right: 20rpx;
    }
    .orderIcon{
        color: #D3AA72;
    }
    .order_show_list{
        line-height: 50rpx;
        padding-top: 20rpx;
        padding-left: 36rpx;
        padding-bottom: 20rpx;
        .listText{
            width: 120rpx;
            text-align: justify;
            text-align-last: justify;
            margin-right: 128rpx;
            color:#999999
        }
        .listTime{
            font-size: 28rpx;
        }
    }
}
.signModal{
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
}
.iconrenyuan{
    color: #D3AB75;
    margin-right: 6rpx;
}
</style>