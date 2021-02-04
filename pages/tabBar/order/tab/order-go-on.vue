/******************************** 进行中 ***************************************/
<template>
    <view>
      <view class="paddingRL20">
            <view class="showList" v-if="get_carList.length">
                <view class="carBuyList"  v-for="(item,index) in get_carList" :key="index">
                    <view class="carLi marginB10 padding30">
                        <view class="carTop flex paddingB20 marginB30">
                            <text>订单号：{{item.id}}</text>
                            <view v-if="item.noOrder">
                                <i-icon class="icon" type="time" size="20" color="#FF4852"  />
                                <text class="fontWight paddingRL10 colorRed">20:19</text>
                                <text class="fontWight colorRed">待付款</text>
                            </view>
                            <view v-else>
                                <text class="fontWight paddingRL10 colorRed">进行中</text>
                            </view>
                        </view>
                        <view class="carData flex marginB30 bottb paddingB20">
                            <image class="img" :src="item.imgs"></image>
                            <view class="carData_text">
                                <view class="flex fontSize30">
                                    <text class="color000">{{item.name}}</text>
                                    <text class="fontWight color333">￥{{item.price}}</text>
                                </view>
                                 <view class="textNub colorDDD">
                                    X 1
                                </view>
                            </view>
                        </view>
                         

                        <!-- 预约时间 档期-->
                        <view class="marginT10 marginB30 carTimeBox color333">
                            <view class="carTime marginB20 flex">
                                <text class="fontSize30">预约门店：</text>
                                <text class="paddingL20" v-if="item.times">惠州江北店</text>
                                <text class="paddingL20 colorRed" v-else>请选择</text>
                            </view>
                            <view class="carTime marginB20 flex">
                                <text class="fontSize30">预约时间：</text>
                                <text class="paddingL20"  v-if="item.times">{{item.times}} {{item.filesTime}}</text>
                                <text class="paddingL20 colorRed" v-else>请选择</text>
                            </view>

                            <!-- 档期 -->
                            <view class="carTime marginB20 flex"  v-if="item.filesPrice">
                                <text class="fontSize30">档期附加费：</text>
                                <text class="paddingL20">￥{{item.filesPrice}}</text>
                            </view>
                        </view>    


                        <!-- 合计 -->
                        <view class=" flex marginB30 paddingB20 bottb">
                            <view class="flex textCont">
                                <text class="fontSize24 color333">合计：<text class="colorRed fontWight">￥{{showPrice}}</text></text>
                            </view>
                        </view>

                        <!-- 未支付 -->
                        <view class="noOrder flex " v-if="item.noOrder">
                            <view class="flex">
                                <view class="noOrder_btn marginR30">取消订单</view>
                                <view class="marginRL10 noOrder_btn">立刻支付</view>
                            </view>
                        </view>
                        <view class="noOrder flex " v-if="!item.noOrder">
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
                        id:201001001,
                        name:'889宝宝照',
                        price:8889,
                        imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                        times:'2020-10-18',
                        filesTime:'16:00',
                        filesPrice:'123',
                        noOrder:false
                    }
                ]
            }
        },
        methods:{
            // 跳转蓝湖详情
            onClickDetails(){
                uni.navigateTo({ 
                    url: `/pages/order/index?id=${268}`
                })
            }
        }
       
    }
</script>

<style lang="scss" scoped>
@import './tab.scss';

</style>