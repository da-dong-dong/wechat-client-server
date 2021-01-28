/******************************** 未预约 ***************************************/
<template>
    <view class="swiperHight">
      <view class=" paddingRL20">
            <view class="showList" v-if="get_carList.length">
                <view class="carBuyList"  v-for="(item,index) in get_carList" :key="index">
                    <view class="carLi marginB10 padding20">
                        <view class="carTop flex paddingB20">
                            <text>订单号：{{item.id}}</text>
                            <view>
                                <text class="fontWight">未预约</text>
                            </view>
                        </view>
                        <view class="carData flex marginB30 bottb paddingB20">
                            <image class="img" :src="item.imgs"></image>
                            <view class="carData_text">
                                <view class="flex">
                                    <text>{{item.name}}</text>
                                    <text class="fontWight">￥{{item.price}}</text>
                                </view>
                            </view>
                        </view>

                        <!-- 预约时间 -->
                        <view class="marginT10 marginB30 carTimeBox">
                            <view class="carTime marginB30 flex">
                                <text class="paddingRL40 fontSize36">预约时间</text>
                                <text class="paddingL20">{{item.times}} {{item.filesTime}}</text>
                            </view>
                            <view class="carTime flex">
                                <text class="paddingRL40 fontSize36">预约门店</text>
                                <text class="paddingL20">{{get_shopId?get_shopId.shopName:''}}</text>
                            </view>
                        </view>    

                        <!-- 档期 -->
                        <view class="carData flex marginB30" v-if="item.filesPrice">
                            <image class="img" :src="item.imgs"></image>
                            <view class="carData_text">
                                <view class="flex">
                                    <text>档期费</text>
                                    <text class="fontWight">￥{{item.filesPrice}}</text>
                                </view>
                            </view>
                        </view>

                        <!-- 合计 -->
                        <view class="textCont flex marginB30">
                            <text>优惠：0</text>
                            <text class="paddingRL40">合计：<text class="colorRed fontWight">￥{{showPrice}}</text></text>
                        </view>

                         <!-- 未支付 -->
                        <view class="noOrder flex " v-if="item.noOrder">
                            <text class="paddingRL40" @click="onClickDetails">详情</text>
                            <view class="flex">
                                <view class="noOrder_btn">取消订单</view>
                                <view class="marginRL10 noOrder_btn">立刻支付</view>
                            </view>
                        </view>
                        <view class="noOrder flex " v-if="!item.noOrder" style="justify-content: flex-end">
                           <view class="noOrder_btn" @click="onClickDetails">查看详情</view>
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
    export default {
        computed:{

            // 展示购物车价格
            showPrice(){
                let num = 0;
                this.get_carList.map(item=>num+=item.price+Number(item.filesPrice))
                return num
            } 
        },
         mounted(){
        },
        data(){
            return{
                get_carList:[
                    {
                        id:0,
                        name:'889宝宝照',
                        price:8889,
                        imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                        times:'',
                        filesTime:'',
                        filesPrice:'',
                        noOrder:false
                    }
                    
                ]
            }
        },
        methods:{
            // 跳转蓝湖详情
            onClickDetails(){
                uni.navigateTo({ 
                    url: '/pages/order/index' 
                })
            }
        }
       
    }
</script>

<style lang="scss" scoped>
@import './tab.scss';

</style>