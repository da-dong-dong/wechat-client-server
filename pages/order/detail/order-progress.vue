<template>
    <view class="progress_content">
        <div class="order_num">订单号: {{list[0].orderNo}}</div>
        <view class="title">
            客户信息
        </view>
        <!-- <div class="flex">
            <span class="name">女士</span>
            <span class="flex_1">李一帅</span>
        </div>
        <div class="flex">
            <span class="name">男士</span>
            <span class="flex_1">李一帅</span>
        </div> -->

        <div class="flex" v-for="_ in list[0].contactVos" :key="_.id">
            <span class="name">{{ _.sex ? '男' : '女' }}士</span>
            <span class="flex_1">{{ _.name }}</span>
        </div> 
        <div class="flex">
            <span class="name">当前进度</span>
            <span class="flex_1">{{arrs}}</span>
        </div>
        <div class="flex">
            <span class="name">拍摄</span>
            <span class="flex_1" v-if="list[0].photoUpdateTime">{{ list[0].photoUpdateTime | times }}</span>
            <span class="flex_1" v-else> 未预约 </span>
            <span class="circle" :class="{ current: arrs === '拍摄'}"></span>
        </div>
        <div class="flex">
            <span class="name">选片</span>
            <span class="flex_1" v-if="list[0].chooseUpdateTime">{{ list[0].chooseUpdateTime | times }}</span>
            <span class="flex_1" v-else> 未预约 </span>
            <span class="circle" :class="{ current: arrs === '选片'}"></span>
        </div>
        <div class="flex">
            <span class="name">定稿</span>
            
            <span class="flex_1" v-if="list[0].watchUpdateTime">{{ list[0].watchUpdateTime | times }}</span>
            <span class="flex_1" v-else> 未预约 </span>
            <span class="circle" :class="{ current: arrs === '看版'}"></span>
        </div>
        <div class="flex">
            <span class="name">取件</span>
            <span class="flex_1" v-if="list[0].pickupUpdateTime">{{ list[0].pickupUpdateTime | times }}</span>
            <span class="flex_1" v-else> 未预约 </span>
            <span class="circle" :class="{ current: arrs === '取件'}"></span>
        </div>
    </view>
</template>


<script>
import { orderProcess } from '@/util/api/order.js'
    export default {
        filters:{
            // 过滤进度
            progress(vla,indx){
                console.log(vla,indx)
                if(vla){
                   indx = vla 
                }
                return ''
            }
        },
        props:['orderId'],
        data(){
            return{
                tabList:null, // 组装下拉框
                index:0, // 索引
                tabId:'', // id过滤
                list:null, // 数据
                listRest:null,// 接口数据
                arrs:'拍摄',
            }
        },
        mounted(){
            // 获取接口
            this.orderProcess()
        },
        methods:{
            // 获取订单详情
            orderProcess(){
                orderProcess({orderId:this.orderId}).then(res=>{
                    console.log('进度', res)
                    let list = res.data.data
                    let arr = []
                    list.map(res=>{
                        arr.push(res.itemNo)
                    })
                    // 下拉
                    this.tabList = arr
                    this.list = list
                    this.listRest = list 
                    this.progress()
                })
            },

            // tab切换
            change(e){
                this.index = Number(e.detail.value)
                this.tabId = this.tabList[this.index]
                this.list =  this.listRest.filter(item=>item.itemNo == this.tabId)
                this.progress()
            },

            // 过滤进度
            progress(){
                let val = this.list[0];
                if(val.photoStatus == "COMPLETE") this.arrs = '拍摄' 
                if(val.repairStatus == "COMPLETE") this.arrs = '初修' 
                if(val.chooseStatus == "COMPLETE") this.arrs = '选片' 
                if(val.refineStatus == "COMPLETE") this.arrs = '精修' 
                if(val.designStatus == "COMPLETE") this.arrs = '设计' 
                if(val.watchStatus == "COMPLETE") this.arrs = '看版' 
                if(val.senderStatus == "COMPLETE") this.arrs = '发片' 
                if(val.returnStatus == "COMPLETE") this.arrs = '回件' 
                if(val.pickupStatus == "COMPLETE") this.arrs = '取件' 
            }
        }
    }
</script>

<style lang="less" scoped>
.progress_content{
    padding: 20rpx 0;
    background: #fff;
    border-radius: 16rpx;
    .order_num{
        padding: 20rpx;
        border-bottom: 1px solid #ECECEC;
    }
    .title{
        font-weight: 600;
        font-size: 30rpx;
        padding: 20rpx;
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
        .circle{
            width: 42rpx;
            height: 42rpx;
            border-radius: 50%;
            border: 1px solid #ECECEC;
            display: flex;
            justify-content: center;
            align-items: center;
            &.current{
                border: 1px solid #D3AB75;
            }
            &.current::after{
                display: block;
                content: '';
                width: 30rpx;
                height: 30rpx;
                border-radius: 50%;
                background: #D3AB75;
            }
        }
        &:last-child{
            border: none;
        }
        .h145{
            width: 150rpx;
            height: 150rpx;
            margin-right: 20rpx;
            border-radius: 10rpx;
        }
        .flex_1{
            view{
                padding: 8rpx 0;
            }
        }
    }
}
</style>
