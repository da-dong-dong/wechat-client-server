/******************************** 购物车 ***************************************/
<template>
    <view>
        <view class="carBox paddingRL20">
            <view class="carTop flex padding20">
                <text>共1个套系</text>
                <text>清空</text>
            </view>
            <!-- 内容 -->
            <view class="carLi padding20">
                <view class="carTop flex padding20">
                    <text>已选门店</text>
                    <view>
                        <text>{{get_shopId?get_shopId.shopName:'请选择门店'}}</text>
                        <text class="colorL paddingL20" @click="onChangeShopId">切换</text>
                    </view>
                </view>
                <view class="carData flex marginB30">
                    <image class="img" :src="imgs"></image>
                    <view class="carData_text">
                        <view class="flex">
                            <text>889宝宝照</text>
                            <text class="fontWight">￥8889</text>
                        </view>
                        <view class="paddingTB20">
                            <view>预约时间</view>
                            <text>2020年10月1日 15:00</text>
                        </view>
                        <view class="flex">
                            <text class="colorRed">删除</text>
                            <view class="flex">
                                <text>修改预约时间</text>
                                <i-icon class="icon" type="setup" size="24" color="#D8D8D8"  />
                            </view>
                        </view>
                    </view>
                </view>
                
                <!-- 档期 -->
                <view class="carData flex marginB30">
                    <image class="img" :src="imgs"></image>
                    <view class="carData_text">
                        <view class="flex">
                            <text>档期费</text>
                            <text class="fontWight">￥8889</text>
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
        },
        data(){
            return{
                imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg'
            }
        },
        methods:{
             
            // 切换门店
            onChangeShopId(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeRegion' 
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