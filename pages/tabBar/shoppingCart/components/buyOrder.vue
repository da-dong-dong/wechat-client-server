/******************************** 确认订单 ***************************************/
<template>
    <view>
        <!-- 客户信息 -->
        <view  class="userInput paddingRL20">
            <view class="userInputBox ">
                <view class="paddingTB20 paddingL10">  客户信息  </view>
                <view class="paddingT10">
                    <view class="userbox flex paddingRL20" >
                        <view class="flex">
                            <text class="paddingRL40">姓名</text>
                            <input class="width" type="text" placeholder="请输入姓名" v-model="userInfo.name"/>
                        </view>
                        <i-icon class="icon" type="" size="30" color="#D8D8D8"  />
                    </view>
                    <picker @change="change" :value="index" :range="sexArr">
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL40">性别</text>
                                <text class="width">{{userInfo.sex}}</text>
                            </view>
                            <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
                        </view>
                    </picker>
                    <view class="userbox flex paddingRL20" >
                        <view class="flex">
                            <text class="paddingRL40">手机号码</text>
                            <input class="width" type="text" placeholder="请输入手机号" v-model="userInfo.tal"/>
                        </view>
                        <i-icon class="icon" type="" size="30" color="#D8D8D8"  />
                    </view>
                    <!-- 宝宝 -->
                    <view class="userbox flex paddingRL20" >
                        <view class="flex">
                            <text class="paddingRL40">宝宝姓名</text>
                            <input class="width" type="text" placeholder="请输入手机号" v-model="userInfo.baNane"/>
                        </view>
                        <i-icon class="icon" type="" size="30" color="#D8D8D8"  />
                    </view>
                    <picker @change="changeBab" :value="indexBab" :range="sexArr">
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL40">宝宝性别</text>
                                <text class="width">{{userInfo.sexBab}}</text>
                            </view>
                            <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
                        </view>
                    </picker>
                    <picker mode="date" :value="userInfo.time" @change="bindDateChange($event, userInfo)">
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL40">宝宝生日</text>
                                <text class="width">{{userInfo.time ? userInfo.time : '生日' | times}}</text>
                            </view>
                            <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
                        </view>
                    </picker>
                </view>
            </view>
        </view>
        <!-- 顾客须知 -->
        <view class="textDet paddingRL20 paddingT10 marginB10">
            <view>顾客须知：</view>
            <text>预约成功后拍摄前48小时可免费修改两次,不足48小时需收20%改期费</text>
        </view>
        <!-- 已选套系 -->
        <view class="paddingRL20" v-if="get_carList.length">
            <view class="carBuyList"  v-for="(item,index) in get_carList" :key="index">
                <view class="carLi marginB10 padding20">
                    <view class="carTop flex paddingB20">
                        <text>已选套系</text>
                    </view>
                    <view class="carData flex marginB30">
                        <image class="img" :src="item.imgs"></image>
                        <view class="carData_text">
                            <view class="flex">
                                <text>{{item.name}}</text>
                                <text class="fontWight">￥{{item.price}}</text>
                            </view>
                            <view class="paddingTB20" >
                                <view v-if="item.times">
                                    <view>预约时间</view> 
                                    <text>{{item.times}} {{item.filesTime}}</text>
                                </view>
                            </view>
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
                </view>
                
                <!-- 预约时间 -->
                <view class="marginT10 carTimeBox">
                    <view class="carTime  flex">
                        <text class="paddingRL40 fontSize36">预约时间</text>
                        <text class="paddingL20">{{item.times}} {{item.filesTime}}</text>
                    </view>
                    <view class="carTime flex">
                        <text class="paddingRL40 fontSize36">预约门店</text>
                        <text class="paddingL20">{{get_shopId?get_shopId.shopName:''}}</text>
                    </view>
                </view>    
            </view>
        </view>
         <!-- 购物车定位 -->
        <buyCar type="buyCar" @onQuick="onQuick"/>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import buyCar from '@/components/buyCar.vue'
    export default {
        components:{
            buyCar
        },
        computed:{
			...mapGetters('user',[
				'get_shopId'
            ]),

            ...mapGetters('carList',[
				'get_carList'
            ]),
        },
        data(){
            return{
                userInfo:{
                    name:'大东东',
                    sex:'男',
                    tal:'13068254894',
                    baNane:'宝宝',
                    time:'',
                    sexBab:'男',

                },
                sexArr:['男','女'],
                index:0,
                indexBab:0
            }
        },
         methods:{
            // 性别
            change(e){
                this.index = Number(e.detail.value)
				this.userInfo.sex = this.sexArr[this.index]
            },
            
            // 宝宝性别
            changeBab(e){
                this.indexBab = Number(e.detail.value)
				this.userInfo.sexBab = this.sexArr[this.indexBab]
            },

            // 时间
            bindDateChange (e, item) {
				item.time = new Date(e.target.value).getTime()
            },
            
            // 保存
            onClickSave(){
                uni.navigateBack()
            },

            // 支付页
            onQuick(){
                console.log('支付页')
            }
        }
    }
</script>

<style lang="scss" scoped>
.userInput{
    box-sizing: content-box;
    .userInputBox{
        border: 1px solid #D1D1D1;
    }
    .userbox{
        border-bottom: 1px solid #D1D1D1;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        .flex{
            .width{
                width: 300rpx;
            }
            .paddingRL40{
                width: 150rpx;
            }
        }
    }
}
.textDet{
    font-size: 28rpx;
}
.carLi{
        min-height: 300rpx;
        box-sizing: content-box;
        border: 1rpx solid #D1D1D1;
       .carData{
           justify-content: space-between;
           font-size: 30rpx;
           height: 300rpx;
           .img{
               width: 240rpx;
               height: auto;
           }
           .carData_text{
               width: 350rpx;
               .paddingTB20{
                   font-size: 28rpx;
                   height: 120rpx;
               }
               .flex{
                   justify-content: space-between;
                   align-items: center;
               }
           }
       }
    }
.carTimeBox{
    border: 1rpx solid #D1D1D1;
    .carTime{
        align-items: center;
        height: 90rpx;
        &:nth-child(1){
            border-bottom: 1rpx solid #D1D1D1;
        }
    }
}

</style>