/******************************** 购物车 ***************************************/
<template>
    <view>
        <view class="carBox paddingRL20">
            <view class="carTop flex padding20">
                <text>共{{get_carList.length}}个套系</text>
                <text>清空</text>
            </view>
            <!-- 内容 -->
            <view class="showList" v-if="get_carList.length">
                111
            </view>
            <view class="showList" v-else>
                222
            </view>
            <view class="carLi padding20" v-for="(item,index) in get_carList" :key="index">
                <view class="carTop flex padding20">
                    <text>已选门店</text>
                    <view>
                        <text>{{get_shopId?get_shopId.shopName:'请选择门店'}}</text>
                        <text class="colorL paddingL20" @click="onChangeShopId">切换</text>
                    </view>
                </view>
                <view class="carData flex marginB30">
                    <image class="img" :src="item.imgs"></image>
                    <view class="carData_text">
                        <view class="flex">
                            <text>{{item.name}}</text>
                            <text class="fontWight">￥{{item.price}}</text>
                        </view>
                        <view class="paddingTB20" v-if="item.times">
                            <view>预约时间</view>
                            <text>{{item.times}} {{item.filesTime}}</text>
                        </view>
                        <view class="flex">
                            <text class="colorRed">删除</text>
                            <view class="flex" @click="onChangeTime">
                                <text>修改预约时间</text>
                                <i-icon class="icon" type="setup" size="24" color="#D8D8D8"  />
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
        </view>
        <!-- 购物车定位 -->
        <buyCar type="car" @onQuick="onQuick"/>
    </view>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
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
               
                
            }
        },
        methods:{
             
            // 切换门店
            onChangeShopId(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeRegion' 
                })
            },

            // 修改预约时间
            onChangeTime(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeTime' 
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.carBox{
    box-sizing: content-box;
    .carTop{
        justify-content: space-between;
        align-items: center;
        color: #333;
        font-size: 28rpx;
    }
    .carLi{
        min-height: 300rpx;
        box-sizing: content-box;
        border: 1rpx solid black;
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
               }
               .flex{
                   justify-content: space-between;
                   align-items: center;
               }
           }
       }
    }

}
</style>