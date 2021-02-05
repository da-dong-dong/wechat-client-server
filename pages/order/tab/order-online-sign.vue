/******************************** 网签 ***************************************/
<template>
    <view >
        <view class="box">
            <view class="order_box">
                <view class="order_top">
                    <view class="order_heade">
                        <image class="order_heade_img" src="/static/image/oreder_user.png"></image>
                        <text>{{signData.onlineCustomerContactVos && signData.onlineCustomerContactVos.map(_ => _.name).join(' ')}}</text>
                    </view>
                    <view class="order_info">
                        <view class="order_info_flx">
                            <view>
                                订单门店：<text>{{shopName(signData.orderShopId)}}</text>
                            </view>
                        </view>
                        <view class="order_info_flx">
                            <view>
                                套系名称：<text>{{signData.assemblyName}}</text>
                            </view>
                        </view>
                        <view class="order_info_flx">
                            <view>
                                套系价格：<text>{{signData.assemblyPrice}}</text>
                                    <!-- <text class="red">（已付:1999 欠款:4000）</text> -->
                            </view>
                        </view>
                        <view class="order_info_flx">
                            <view>
                                订单日期：<text>{{signData.orderTime | timeFilter}}</text>
                            </view>
                        </view>
                    
                    </view>
                </view>
                <!-- 约单 -->
                <view class="order_show" v-for="item in signData.onlineContractVos" :key="item.id">
                    <view class="oreder_img">
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                        <image class="oreder_img_img" src="/static/image/oreder_bar.png"></image>
                    </view>
                    <view class="order_show_top">
                        <view>{{item.title}}</view>
                        <view class="text_right" v-if="item.type === 2">
                            <text @tap="onClickSign(item)">{{item.isSign | signFilter}}</text> 
                            <text> > </text> 
                        </view>
                    </view>
                    <view class="order_show_list">
                        <view>接收时间：{{item.createTime | timeFilter}}</view>
                        <view>签字时间：{{item.signTime | timeFilter}}</view>
                    </view>
                </view>
               
            </view>
        </view>
        <!-- <view class="signModal" v-show="signModal">
            <signViw @to-close="closeSign" @save="onSave"></signViw>
        </view> -->
    </view>
</template>

<script>
import { getOrderContract, updOrderContract } from '@/util/api/home.js'
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
            }
        },
        methods:{
            ...mapActions('html',[
				'act_setHtml'
			]),
            onClickSign (data) {
                if (data.isSign === 0) {
                    this.act_setHtml(data.htmlText)
                    uni.navigateTo({
                        url: '/pages/order/detail/signature?id=' + data.id
                    })
                }
            },
            shopName (id) {
                return this.get_shopIdList.filter(_ => _.shopId === id)[0].shopName
            },
            onclickSigna(id){
                console.log('跳转')
                uni.navigateTo({
					url: '/pages/order/detail/signature?id=' + id
				})
            },
            getOrderContract () {
                getOrderContract({ orderId: this.orderId }).then(res => {
                    console.log(res);
                    this.signData = res.data.data
                })
            }
        },
        onShow () {
            this.getOrderContract()
        },
        created () {
            this.getOrderContract()
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
    min-height: 1200rpx;
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
</style>