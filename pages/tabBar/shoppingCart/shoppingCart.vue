/******************************** 购物车 ***************************************/
<template>
    <view>
        <view class="carBox paddingRL20">
            <view class="carTop flex padding20">
                <text>共{{get_carList.length}}个套系</text>
                <text @click="onCarListDelAll">清空</text>
            </view>
            <!-- 内容 -->
            <view class="showList" v-if="get_carList.length">
                <view class="carLi marginB10 padding20" v-for="(item,index) in get_carList" :key="index">
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
                            <view class="paddingTB20" >
                                <view v-if="item.times">
                                    <view>预约时间</view> 
                                    <text>{{item.times}} {{item.filesTime}}</text>
                                </view>
                            </view>
                            <view class="flex">
                                <text class="colorRed" @click="onCarListDel(index)">删除</text>
                                <view class="flex" @click="onChangeTime(index)">
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
            <view class="showList carLi" v-else>
                <view class="noList flex">
                    购物车空空如也
                </view>
            </view>
           
        </view>
        <!-- 购物车定位 -->
        <buyCar type="car" @onQuick="onQuick"/>
    </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
            }

        }
    }
</script>

<style lang="scss" scoped>
.noList{
    justify-content: center;
    align-items: center;
    height: 300rpx;
    color: #8BABD1;
    font-size: 36rpx;
}
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
                   height: 120rpx;
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