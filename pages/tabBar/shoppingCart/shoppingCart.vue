/******************************** 购物车 ***************************************/
<template>
    <view>
        <view class="carBox paddingRL20">
            <view class="carTop flex padding20">
                <text>共{{get_carList.length}}个套系</text>
                <text @click="onCarListDelAll">清空</text>
            </view>
            <!-- 内容 -->
            <view class="carTop flex padding20">
                <text>已选门店</text>
                <view>
                    <text>{{get_shopId?get_shopId.shopName:'请选择门店'}}</text>
                    <text class="colorL paddingL20" @click="onChangeShopId">切换</text>
                </view>
            </view>
            <view class="showList" v-if="get_carList.length">
                <view class="carLi marginB20 padding20" v-for="(item,index) in get_carList" :key="index">
                    
                    <view class="carData flex marginB30">
                        <image class="img" :src="item.imgs"></image>
                        <view class="carData_text">
                            <view class="flex">
                                <text class="color333">{{item.name}}</text>
                                <text class="fontWight colorRed">￥{{item.price}}</text>
                            </view>
                            <view class="color999 flex">
                                <text>X 1</text>
                                <text class="colorRed" @click="onCarListDel(index)">删除</text>
                            </view>
                        </view>
                    </view>
                </view>    
            </view>
            <view class="showList carLi" v-else>
                <view class="noList flex">
                    购物车空空如也
                </view>
            </view>
           
        </view>
        <!-- 购物车定位 -->
        <buyCar type="car" @onQuick="onQuick"/>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
				'get_carList'
            ]),
        },
        data(){
            return{
               check:''
                
            }
        },
        methods:{
            ...mapMutations('carList',[
                'mut_carListDel',
                'mut_carListDelAll'
            ]),
            // 切换门店
            onChangeShopId(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeRegion' 
                })
            },

            // 修改预约时间
            onChangeTime(index){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeTime?index=' +  index
                })
            },

            // 清空
            onCarListDelAll(){
                this.mut_carListDelAll()
            },

            // 清空单个
            onCarListDel(index){
                this.mut_carListDel(index)
            },

            // 跳支付页
            onQuick(){
                if(!this.get_carList.length){
                    $Message({
                        content:'请选择商品',
                        type: 'error'
                    });
                    return
                }
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/buyOrder'
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
.noList{
    justify-content: center;
    align-items: center;
    height: 234rpx;
    color: #8BABD1;
    font-size: 36rpx;
}
.carBox{
    box-sizing: content-box;
    background: #F9F9F9;
    min-height: 100vh;
    .carTop{
        justify-content: space-between;
        align-items: center;
        color: #333;
        font-size: 28rpx;
    }
    .carLi{
        box-sizing: content-box;
        background: #fff;
        border-radius: 20rpx;
       .carData{
           justify-content: space-between;
           font-size: 30rpx;
           .img{
               width: 160rpx;
               height: 160rpx;
           }
           .carData_text{
               width: 450rpx;
               .color999{
                   font-size: 28rpx;
                   margin-top: 80rpx;
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