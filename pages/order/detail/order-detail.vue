<template>
    <view class="detail_content">
        <view class="msg_div">
           <div class="title">客户信息</div>
           <div v-for="(item,index) in list['onlineCustomerContactVos']" :key="index">
                <div class="flex">
                    <span class="name">{{item.callName}}</span>
                    <span class="flex_1">{{item.name}}</span>
                </div>
                <div class="flex">
                    <span class="name">联系方式</span>
                    <span class="flex_1">{{item.mobile}}</span>
                </div>
           </div>
           <!-- <div class="flex">
               <span class="name">男士</span>
               <span class="flex_1">利益帅</span>
           </div>
           <div class="flex">
               <span class="name">联系方式</span>
               <span class="flex_1">13688976654</span>
           </div> -->
        </view>
        <view class="msg_div">
           <div class="title border">订单信息</div>
           <view class="flex" style="border:none">
                <img class="h145" :src="list.coverPhoto"/>
                <view class="flex_1">
                    <view class="padding">
                        <span class="font600">{{list.onlineOrderItemVos[0].name?list.onlineOrderItemVos[0].name:''}}</span>
                        <span class="float_r colorA3">￥{{list.onlineOrderItemVos[0].price?list.onlineOrderItemVos[0].price:''}}</span>
                    </view>
                    <view class="font14">
                        预约定价: <span class="orange">￥{{ list.onlineOrderItemVos[0].price?list.onlineOrderItemVos[0].price:'' }}</span>
                    </view>
                    <view class="font14">
                        余款金额: ￥{{list.onlineOrderItemVos[0].price?list.onlineOrderItemVos[0].price:''}}
                    </view>
                </view>
            </view>
        </view>
        <view class="msg_div">
           <div class="title">邀请福利</div>
           <div class="flex">
               <span class="name">介绍人</span>
               <span class="flex_1">{{list.introduceName}}</span>
           </div>
           <div class="flex">
               <span class="name">手机号码</span>
               <span class="flex_1">{{_.introduceMobil}}</span>
           </div>
        </view>
        <!-- 循环套系 -->
        <view  v-for="(item,index) in list['onlineOrderItemVos']" :key="index">
            <view class="msg_div">
                <div class="flex" style="border:none">
                    <span class="name">订单时间</span>
                    <span class="flex_1">{{ list.orderTime | times}}</span>
                </div>
                <div class="flex" style="border:none" v-for="(item1,index) in list['reservationPhotoInfoVos']" :key="index">
                    <span class="name">拍摄时间</span>
                    <span class="flex_1">{{ item1.reservationDate | times}} {{item1.reservationTime.substring(5,-1)}}</span>
                </div>
                <div class="flex" style="border:none">
                    <span class="name">底片</span>
                    <span class="flex_1">{{item.bottomCount}}</span>
                </div>
                <div class="flex" style="border:none">
                    <span class="name">精修</span>
                    <span class="flex_1">{{item.refineCount}}</span>
                </div>
                <div class="flex" style="border:none">
                    <span class="name">服装</span>
                    <span class="flex_1">{{inDressNum}}</span>
                </div>
            </view>
            <view class="msg_div">
                <div class="title">产品信息</div>
                <div class="flex_no" v-for="(_, i) in item['onlineOrderItemGoods']" :key="i">
                    <span class="explain">{{_.name}}</span>
                    <span class="num">x{{_.countNum}}</span>
                </div>
            </view>
            <view class="msg_div">
                <div class="title">服务信息</div>
                <div class="flex_no" v-for="(_, i) in item['onlineOrderItemService']" :key="i">
                    <span class="explain">{{_.name}}</span>
                    <span class="num">x1</span>
                </div>
            </view>
        </view>

        

        
    </view>
</template>

<script>
import { orderDetails } from '@/util/api/order.js'
 import { mapGetters } from 'vuex'

    export default {
        props:['orderId'],
        data(){
            return{
                list:null, // 数据
            }
        },
        computed: {
            ...mapGetters('map', [
                'get_shopIdList'
            ]),
            bookCount () {
                let sum = 0
                this.list.onlineOrderItemVos.forEach(_ => {
                    sum += _.bookCount  
                })
                return sum
            },
            bottomCount () {
                let sum = 0
                this.list.onlineOrderItemVos.forEach(_ => {
                    sum += _.bottomCount  
                })
                return sum
            },
            inPlace () {
                let sum = 0
                if (this.list.onlineOrderItemVos) {
                    this.list.onlineOrderItemVos.forEach(item => {
                        item.onlineOrderItemPlaces.forEach(_ => {
                            if (_.placeType === 'INT') sum += 1
                        })
                    })
                }
                return sum
            },
            outPlace () {
                let sum = 0
                if (this.list.onlineOrderItemVos) {
                    this.list.onlineOrderItemVos.forEach(item => {
                        item.onlineOrderItemPlaces.forEach(_ => {
                            if (_.placeType === 'OUT') sum += 1
                        })
                    })
                }
                return sum
            },
            inDressNum () {
                let sum = 0
                if (this.list.onlineOrderItemVos) {
                    this.list.onlineOrderItemVos.forEach(item => {
                        item.onlineOrderItemDressInfo.forEach(_ => {
                            sum += _.count
                        })
                    })
                }
                return sum
            },
            outDressNum () {
                let str = []
                if (this.list.onlineOrderItemVos) {
                    this.list.onlineOrderItemVos.forEach(item => {
                        item.onlineOrderItemDressInfo.forEach(_ => {
                            if (_.type === 'OUT') str.push(_.name)
                        })
                    })
                }
                return str.join()
            },
            onlineOrderItemGoods () {
                let arr = []
                if (this.list.onlineOrderItemVos) {
                    this.list.onlineOrderItemVos.forEach(item => {
                        item.onlineOrderItemGoods.forEach(_ => {
                            arr.push(_)
                        })
                    })
                }
                return arr
            },
            onlineOrderItemService () {
                let arr = []
                if (this.list.onlineOrderItemVos) {
                    this.list.onlineOrderItemVos.forEach(item => {
                        item.onlineOrderItemService.forEach(_ => {
                            arr.push(_)
                        })
                    })
                }
                return arr
            }
        },
        mounted(){
            // 获取接口
            this.orderDetails()
        },
        methods:{
            shopName (id) {
                if (id) return this.get_shopIdList.filter(_ => _.shopId === id)[0].shopName
                else return '' 
            },
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
<style lang="less" scoped>
.detail_content{
    .msg_div{
        padding: 20rpx 0;
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
        .border{
            border-bottom: 1px solid #ECECEC;
        }
        .flex_no{
            display: flex;
            padding: 20rpx;
            color: #6C6C6C;
        }
        .explain{
            color: #6C6C6C;
            flex: 1;
        }
        .num{
            display: flex;
            width: 60rpx;
            align-items: flex-end;
            padding-bottom: 6rpx;
        }
        .title{
            font-weight: 600;
            font-size: 30rpx;
            padding: 20rpx;
        }
        &:last-child{
            .flex {
                border: none;
            }
        }
        .flex{
            padding: 20rpx;
            border-bottom: 1px solid #ECECEC;
            .name{
                width: 140rpx;
                margin-right: 80rpx;
                text-align: justify;
                text-align-last: justify;
            }
            .h145{
                width: 150rpx;
                height: 150rpx;
                margin-right: 20rpx;
                border-radius: 10rpx;
                border: 1rpx solid #ECECEC;
            }
            .flex_1{
                view{
                    padding: 8rpx 0;
                }
            }
            .float_r{
                float: right;
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

    }
}
</style>