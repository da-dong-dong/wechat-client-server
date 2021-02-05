/******************************** 进度 ***************************************/
<template>
    <view class="order_box1" v-if="list">
        <!-- 头部 -->
        <view class="progressTop" >
            <image class="img" src="/static/image/progress.png"></image>
            <view class="progressText fontSize24">
                <view class="width fontSize36">
                    <picker @change="change" :value="index" :range="tabList">
                        <view class="width flex">
                            <view>{{tabList[index]}}</view>
                            <i-icon class="icon" type="unfold" size="20" color="#D8D8D8"  />
                        </view>
                    </picker>
                </view>
                <view class="color333 fontSize28">当前进度：<text class="fontSize36 colorRed fontWight">{{arrs}}</text></view>
                <view>客户：<text>{{arrs}}</text></view>
                <view>下单时间：<text>{{list[0].orderTime | times}}</text></view>
            </view>
        </view>
        <!-- 进度 -->
        <view >
             <!-- 拍照 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].photoUpdateTime?list[0].photoUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].photoStatus == 'COMPLETE'?'color333':''">拍照</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].photoStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].photoStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 初修 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].repairUpdateTime?list[0].repairUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].repairStatus == 'COMPLETE'?'color333':''">初修</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].repairStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].repairStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 选片 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].chooseUpdateTime?list[0].chooseUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].chooseStatus == 'COMPLETE'?'color333':''">选片</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].chooseStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].chooseStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 精修 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].refineUpdateTime?list[0].refineUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].refineStatus == 'COMPLETE'?'color333':''">精修</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].refineStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].refineStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 设计 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].designUpdateTime?list[0].designUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].designStatus == 'COMPLETE'?'color333':''">设计</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].designStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].designStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 看板 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].watchUpdateTime?list[0].watchUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].watchStatus == 'COMPLETE'?'color333':''">看板</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].watchStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].watchStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 发片 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].senderUpdateTime?list[0].senderUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].senderStatus == 'COMPLETE'?'color333':''">发片</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].senderStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].senderStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 回件 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].returnUpdateTime?list[0].returnUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].returnStatus == 'COMPLETE'?'color333':''">回件</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].returnStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].returnStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
            <!-- 取件 -->
            <view class="progressList  paddingRL40 flex fontSize24 color999">
                <view class="time">{{list[0].pickupUpdateTime?list[0].pickupUpdateTime:''}}</view>
                <view class="text">
                    <view class="fontSize36 fontWight " :class="list[0].pickupStatus == 'COMPLETE'?'color333':''">取件</view>
                </view>
                <view class="success">
                    <i-icon class="icon" type="success" size="20" :color="list[0].pickupStatus == 'COMPLETE'?'#FF4852':'#DDDDDD'"  />
                    <view class="successBorder" :class="list[0].pickupStatus == 'COMPLETE'?'active':''"></view>
                </view>
            </view>
        </view>
       
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
        computed:{
            // 过滤进度
            // progress(vla,indx){
            //     console.log(vla,indx)
            // }
        },
        props:['orderId'],
        data(){
            return{
                tabList:null, // 组装下拉框
                index:0, // 索引
                tabId:'', // id过滤
                list:null, // 数据
                listRest:null,// 接口数据
                arrs:'拍照',
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
                if(val.photoStatus == "COMPLETE") this.arrs = '拍照' 
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

<style lang="scss" scoped>
.order_box1{
    padding-bottom: 100rpx;
    background: #FFFFFF;
}
.progressTop{
    position: relative;
    height: 480rpx;
    .img{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .progressText{
        color: #999999;
        z-index: 200;
        position: absolute;
        margin-left: 250rpx;
        margin-top: 145rpx;
        line-height: 60rpx;
    }
}
.progressList{
    box-sizing: content-box;
    position: relative;
    min-height: 180rpx;
    margin-bottom: 20rpx;
    .time{
        width: 330rpx;
        margin-left: 50rpx;
        margin-right: 30rpx;
    }
    .text{
        width: 540rpx;
    }
    .textList{
        text{
            display: inline-block;
            width: 180rpx;
            line-height: 50rpx;
        }
    }
    .success{
        position: absolute;
        top: 0;
        left: 295rpx;
        .active{
           background: #FF4852;
        }
    }
    .successBorder{
        width: 1rpx;
        height: 150rpx;
        background: #DDDDDD;
        margin-left: 18rpx;
    }
}
</style>