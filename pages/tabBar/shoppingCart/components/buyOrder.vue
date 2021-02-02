/******************************** 确认订单 ***************************************/
<template>
    <view class="boxs">
        <!-- 客户信息 -->
        <view  class="userInput paddingRL20">
            <view class="userInputBox ">
                <view class="paddingTB20  paddingRL20 fontSize32 fontWight">  客户信息  </view>
                <view class="paddingT10">
                    <view class="userbox flex paddingRL20" >
                        <view class="flex">
                            <text class="paddingRL20">姓名</text>
                            <input class="width" type="text" placeholder="请输入姓名" v-model="userInfo.name"/>
                        </view>
                        <i-icon class="icon" type="" size="20" color="#707070"  />
                    </view>
                    <picker @change="change" :value="index" :range="sexArr">
                        <view class="userbox flex paddingRL20" >
                            <view class="border flex paddingTB20">
                                <view class="flex">
                                    <text class="paddingRL20">性别</text>
                                    <text class="width">{{userInfo.sex}}</text>
                                </view>
                                <i-icon class="icon" type="enter" size="20" color="#707070"  />
                            </view>
                        </view>
                    </picker>
                    <view class="userbox flex paddingRL20" >
                        <view class="border flex paddingTB20">
                            <view class="flex">
                                <text class="paddingRL20">手机号码</text>
                                <input class="width" type="text" placeholder="请输入手机号" v-model="userInfo.tal"/>
                            </view>
                            <i-icon class="icon" type="" size="20" color="#707070"  />
                        </view>
                    </view>
                    <!-- 宝宝 -->
                    <view v-if="get_quickList[0].orderType == 'BABY'">
                        <view class="userbox flex paddingRL20" >
                            <view class="border flex paddingTB20">
                                <view class="flex">
                                    <text class="paddingRL20">宝宝姓名</text>
                                    <input class="width" type="text" placeholder="请输入手机号" v-model="userInfo.baNane"/>
                                </view>
                                <i-icon class="icon" type="" size="20" color="#707070"  />
                            </view>
                        </view>
                        <picker @change="changeBab" :value="indexBab" :range="sexArr">
                            <view class="userbox flex paddingRL20" >
                                <view class="border flex paddingTB20">
                                    <view class="flex">
                                        <text class="paddingRL20">宝宝性别</text>
                                        <text class="width">{{userInfo.sexBab ? userInfo.sexBab : "性别"}}</text>
                                    </view>
                                    <i-icon class="icon" type="enter" size="20" color="#707070"  />
                                </view>
                            </view>
                        </picker>
                        <picker mode="date" :value="userInfo.time" @change="bindDateChange($event, userInfo)">
                            <view class="userbox flex paddingRL20" >
                                <view class="border flex paddingTB20">
                                    <view class="flex">
                                        <text class="paddingRL20">宝宝生日</text>
                                        <text class="width">{{userInfo.time ? userInfo.time : '生日' | times}}</text>
                                    </view>
                                    <i-icon class="icon" type="enter" size="20" color="#707070"  />
                                </view>
                            </view>
                        </picker>
                    </view>
                </view>
            </view>
        </view>

        <!-- 已选套系 -->
        <view class="paddingRL20" v-if="get_quickList.length">
            <view class="carBuyList"  v-for="(item,index) in get_quickList" :key="index">
                <view class="carLi marginB20 padding20">
                    <view class="carData flex marginB20">
                        <image class="img" :src="item.imgs"></image>
                        <view class="carData_text">
                            <view class="flex">
                                <text>{{item.name}}</text>
                            </view>
                            <view class="textNub flex">
                                <text>X1</text>
                                <text class="fontWight colorRed">￥{{item.price}}</text>
                            </view>
                        </view>
                    </view>

                    <!-- 档期费 -->
                    <view class="flex priceAdd fontSize30" v-if="item.filesPrice">
                        <text>档期附加费</text>
                        <text>￥{{item.filesPrice}}</text>
                    </view>
                    
                </view>
                
                <!-- 预约时间 -->
                <view class="marginT10 carTimeBox marginB20">
                    <view class="carTime  flex" @click="onChangeTime(item.id,index)">
                        <text class="paddingRL40">预约时间</text>
                        <view class="flex">
                            <text class="" v-if="item.times">{{item.times}} {{item.filesTime}}</text>
                            <text class="" v-else>请选择</text>
                            <i-icon class="icon paddingRL30" type="enter" size="20" color="#707070"  />
                        </view>
                    </view>
                    <view class="carTime flex" @click="onChangeShopId(item.id,index)">
                        <text class="paddingRL40">预约门店</text>
                        <view class="flex">
                            <text class="">{{item.shopName?item.shopName:'请选择'}}</text>
                            <i-icon class="icon paddingRL30" type="enter" size="20" color="#707070"  />
                        </view>
                    </view>
                </view>    
            </view>
        </view>

         <!-- 顾客须知 -->
        <view class="textDet paddingRL20 paddingT10 marginB10 colorDDD">
            <view>
                <i-icon class="icon" type="warning_fill" size="18" color="#FCB901"  />
                 顾客须知：
            </view>
            <text>预约成功后拍摄前48小时可免费修改两次,不足48小时需收20%改期费</text>
        </view>

        <!-- 服务协议 -->
        <view class="serve flex colorRed paddingRL10 fontSize28">
            <checkbox-group @change="onChangeAll">
                <checkbox class="paddingL10" value='1'  />
            </checkbox-group>
            <text @click="onClickServe">服务协议</text>
        </view>
         <!-- 购物车定位 -->
        <buyCar type="buyCar" @onQuick="onQuick"/>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import buyCar from '@/components/buyCar.vue'
const { $Message } = require('@/wxcomponents/base/index');
    export default {
        components:{
            buyCar
        },
        computed:{
			...mapGetters('user',[
				'get_shopId'
            ]),

            ...mapGetters('carList',[
				'get_quickList'
            ]),
        },
        data(){
            return{
                userInfo:{
                    name:'大东东',
                    sex:'男',
                    tal:'13068254894',
                    baNane:null,
                    time:null,
                    sexBab:null,

                },
                sexArr:['男','女'],
                index:0,
                indexBab:0,
                check: false, // 协议
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

            // 修改预约时间
            onChangeTime(id,index){
                uni.navigateTo({ 
                    url: `/pages/tabBar/shoppingCart/components/changeTime?id=${id}&index=${index}`
                })
            },

            // 选择门店
            onChangeShopId(id,index){
                uni.navigateTo({ 
                    url: `/pages/tabBar/shoppingCart/components/changeRegion?id=${id}&index=${index}&quick=${true}`
                })
            },
            
            // 保存
            onClickSave(){
                uni.navigateBack()
            },

            // 协议
            onChangeAll(e){
                this.check = !this.check
            },

            // 跳转服务协议
            onClickServe(){
                uni.navigateTo({ 
                    url: `/pages/tabBar/my/components/serviceAgreement?type=mack`
                })
            },

            // 支付页
            onQuick(){
                if(!this.check){
                    $Message({
                        content:'请勾选协议',
                        type: 'error'
                    });
                    return
                }
                console.log('支付页',this.get_quickList)
            }
        }
    }
</script>

<style lang="scss" scoped>
.boxs{
    background: #F9F9F9;
}
.userInput{
    box-sizing: content-box;
    .userInputBox{
        background: #FFFFFF;
        border-radius: 20rpx;
    }
    .userbox{
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        box-sizing: content-box;
        margin-bottom: 20rpx;
        .flex{
            .width{
                width: 300rpx;
            }
            .paddingRL20{
                width: 150rpx;
            }
        }
    }
    .border{
        width: 100%;
        border-top: 1px solid #D1D1D1;   
        justify-content: space-between;
        align-items: center;
    }
}
.textDet{
    font-size: 18rpx;
}
.carLi{
        min-height: 234rpx;
        box-sizing: content-box;
        background: #FFFFFF;
        border-radius: 20rpx;
       .carData{
           justify-content: space-between;
           font-size: 30rpx;
           height: 200rpx;
           border-bottom:1px solid #D1D1D1;   
           .img{
               width: 160rpx;
               height: 160rpx;
               border-radius: 20rpx;
           }
           .carData_text{
               width: 450rpx;
               .textNub{
                   margin-top: 80rpx;
               }
               .flex{
                   justify-content: space-between;
                   align-items: center;
               }
           }
       }
       // 档期
       .priceAdd{
           justify-content: space-between;
       }
    }
.carTimeBox{
    background: #FFFFFF;
    border-radius: 20rpx;
    font-size: 28rpx;
    color: #333333;
    .carTime{
        align-items: center;
        justify-content: space-between;
        height: 90rpx;
        .flex{
            align-items: center;
        }
        &:nth-child(1){
            border-bottom: 1rpx solid #D1D1D1;
        }
    }
}

</style>