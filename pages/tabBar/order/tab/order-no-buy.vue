/******************************** 未付款 ***************************************/
<template>
    <view>
      <view class="paddingRL20">
            <view class="showList" v-if="get_carList">
                <view class="carBuyList"  v-for="(item,index) in get_carList" :key="index">
                    <view class="carLi marginB10 padding30">
                        <view class="carTop flex paddingB20 marginB30">
                            <text>订单号：{{item.orderNo}}</text>
                            <view v-if="!item.state">
                                
                                <i-icon class="icon" type="time" size="20" color="#FF4852"  />
                                <out-time class="fontWight paddingRL10 colorRed" :endtime="item.orderTime" />
                                
                            </view>
                            <view v-else>
                                <text class="fontWight paddingRL10 colorRed">{{item.state}}</text>
                            </view>
                        </view>
                        <!-- 跳转详情 -->
                        <view class="carData flex marginB30 bottb paddingB20" @click="onClickDetails(item.id)">
                            <image class="img" :src="item.coverPhoto"></image>
                            <view class="carData_text">
                                <view class="flex fontSize30">
                                    <text class="color000">{{item.assemblyName}}</text>
                                    <text class="fontWight color333">￥{{item.sumPrice}}</text>
                                </view>
                                 <view class="textNub colorDDD">
                                    X 1
                                </view>
                            </view>
                        </view>
                         
                        <view v-if="item['reservationPhotoInfoVos']">
                            <!-- 预约时间 档期-->
                            <view class="marginT10 marginB30 carTimeBox color333" v-for="(item1,index1) in item['reservationPhotoInfoVos']" :key="index1">
                                <view class="carTime marginB20 flex">
                                    <text class="fontSize30">预约门店：</text>
                                    <text class="paddingL20">{{item1.reservationShopId | shopID(get_shopIdList)}}</text>
                                </view>
                                <view class="carTime marginB20 flex">
                                    <text class="fontSize30">预约时间：</text>
                                    <text class="paddingL20" >{{item1.reservationTime}}</text>
                                </view>

                                <!-- 档期 -->
                                <view class="carTime marginB20 flex"  >
                                    <text class="fontSize30">档期附加费：</text>
                                    <text class="paddingL20">￥{{item.schedulePrice}}</text>
                                </view>
                            </view>
                        </view>
                            

                        <view v-else>
                            <!-- 预约时间 档期-->
                            <view class="marginT10 marginB30 carTimeBox color333" >
                                <view class="carTime marginB20 flex">
                                    <text class="fontSize30">预约门店：</text>
                                    
                                    <text class="paddingL20 colorRed" >请选择</text>
                                </view>
                                <view class="carTime marginB20 flex">
                                    <text class="fontSize30">预约时间：</text>
                                    
                                    <text class="paddingL20 colorRed">请选择</text>
                                </view>
                            </view>
                        </view>    


                        <!-- 合计 -->
                        <view class=" flex marginB30 paddingB20 bottb">
                            <view class="fontSize24 flex textCont" style="justify-content: space-between">
                                <text>订单时间：{{item.orderTime | times}}</text>
                                <text class="fontSize24 color333">合计：<text class="colorRed fontWight">￥{{item.sumPrice + item.schedulePrice}}</text></text>
                            </view>
                        </view>

                        <!-- 已关闭 -->
                        <view v-if="!item.isClose">
                            <!-- 未支付 -->
                            <view class="noOrder flex " v-if="!item.state">
                                <view class="flex">
                                    <view class="noOrder_btn noOrder_btn1 marginR30" @click="onOrderClose(item.id)" v-if="item.isOnline">取消订单</view>
                                    <view class="marginRL10 noOrder_btn2 noOrder_btn" @click="onBuy(item.outTradeNo,item.jumpAppId)">立刻支付</view>
                                </view>
                            </view>
                            <view class="noOrder flex " v-if="item.state">
                                <view class="noOrder_btn noOrder_btn1" @click="onClickDetails(item.id)">查看详情</view>
                            </view>
                        </view>
                        <view class="noOrder flex" v-else>
                            <view class="noOrder_btn noOrder_btn1" >已关闭</view>
                        </view>
                        
                    </view>
                    
                    
                </view>
            </view>
            <view class="showList carLi" v-else>
                <view class="noList flex">
                    订单空空如也
                </view>
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
         mounted(){
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
            onBuy(outTradeNo,jumpAppId){
                
                uni.navigateToMiniProgram({
                    appId: jumpAppId?jumpAppId:'wx62d6b9c1cd4ba50a',
                    envVersion: 'release', // develop（开发版），trial（体验版），release（正式版）
                    path: `pages/pay/pay?outTradeNo=${outTradeNo}`,
                    extraData: outTradeNo,
                    success(res) {
                        // 返回成功
                        console.log(res)
                    }
                })
            },

            // 取消订单
            onOrderClose(orderId){
                // 取消订单接口
                this.$emit('onOrderClose',orderId)
            }
        }
       
    }
</script>

<style lang="scss" scoped>
@import './tab.scss';

</style>