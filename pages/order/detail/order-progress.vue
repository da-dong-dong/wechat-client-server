<template>
    <view class="progress_content">
        <div class="order_num">订单号: {{list[0].orderNo?list[0].orderNo:''}}</div>
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
        <div class="flex" v-for="_ in list[0].itemProcessVoList" :key="_.id">
            <span class="name">{{_.name}}</span>
            <span class="flex_1" v-if="_.reservationDate && _.isCurrentProcess">{{ _.reservationDate | times }} {{_.reservationTime?_.reservationTime.substring(5,-1):''}}</span>
            <span class="flex_1" v-else> {{_.successTime | times('未开始')}} </span>
            <span class="circle" :class="{ current: _.isCurrentProcess}"></span>
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
                console.log(val,'val')
               val = val.itemProcessVoList.map(item=>{
                    switch (item.process) {
                        case "ORDER":
                            if(item.isCurrentProcess) this.arrs = '订单' 
                            item.name = '订单'
                            break;
                        case "PHOTO":
                            if(item.isCurrentProcess) this.arrs = '拍摄' 
                            item.name = '拍摄'
                            break;
                        case "REPAIR":
                            if(item.isCurrentProcess) this.arrs = '初修' 
                            item.name = '初修'
                            break;
                        case "CHOOSE":
                            if(item.isCurrentProcess) this.arrs = '选片' 
                            item.name = '选片'
                            break;
                        case "CHOOSE_ONTRAST":
                            if(item.isCurrentProcess) this.arrs = '选修' 
                            item.name = '选修'
                            break;
                        case "REFINE":
                            if(item.isCurrentProcess) this.arrs = '精修' 
                            item.name = '精修'
                            break;
                        case "DESIGN":
                            if(item.isCurrentProcess) this.arrs = '设计' 
                            item.name = '设计'
                            break;
                        case "WATCH":
                            if(item.isCurrentProcess) this.arrs = '定稿' 
                            item.name = '定稿'
                            break;
                        case "SENDER":
                            if(item.isCurrentProcess) this.arrs = '发片' 
                            item.name = '发片'
                            break;
                        case "RETURN":
                            if(item.isCurrentProcess) this.arrs = '回件' 
                            item.name = '回件'
                            break;
                        case "PICKUP":
                            if(item.isCurrentProcess) this.arrs = '取件' 
                            item.name = '取件'
                            break;
                        case "TONING":
                            if(item.isCurrentProcess) this.arrs = '调色' 
                            item.name = '调色'
                            break;
                        case "CHOOSE_CLOTHES":
                            if(item.isCurrentProcess) this.arrs = '选衣' 
                            item.name = '选衣'
                            break;
                        case "ITEM_END":
                            if(item.isCurrentProcess) this.arrs = '结单' 
                            item.name = '结单'
                            break;
                    }
                    return item
                })
                this.list[0].itemProcessVoList = val.filter(item=>{
                    if(item.name == '拍摄' || item.name == '选片' || item.name == '定稿' || item.name == '取件'){
                        return true
                    }
                })
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
            color: #414143;
        }
        .circle{
            transform: scale(0.75);
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
            color: #999999;
            view{
                padding: 8rpx 0;
            }
        }
    }
}
</style>
