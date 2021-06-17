/******************************** 购物车底部组件 ***************************************/
<template>
    <view>
        <view class="buyCar_Span"></view>
        <view class="buyCar fixed flex paddingRL40" :style="{'bottom':`${top?'140rpx':'0'}`}">
            <!-- 详情 -->
            <view class="car" v-if="type == 'details'" @click="goCar">
                <i-icon class="icon" type="publishgoods_fill" size="30" color="#666666"  />
                <view>购物车</view>
                <text class="num">{{get_carList.length}}</text>
            </view>

            <view class="but flex" v-if="type == 'details'">
                <view class="but_cl marginRL10" @click="addCar">加入购物车</view>
                <view class="but_cl " style="background:#D3AA72" @click="onQuick">立刻预约</view>
            </view>
            
            <!-- 购物车 -->
            <view class="car" v-if="type == 'car'" >
                <text>合计：</text>
                <text class="colorRed">￥{{showPrice}}</text>
            </view>

            <view class="but flex" v-if="type == 'car'" style="justify-content: flex-end">
                <view class="but_cl " @click="onQuick">下一步</view>
            </view>

            <!-- 支付页 -->
            <view class="car" v-if="type == 'buyCar'" >
                <text>合计：</text>
                <text class="colorRed">￥{{showPriceQuick}}</text>
            </view>

            <view class="but flex" v-if="type == 'buyCar'" >
                <!-- <view class="padding20 flex"  >
                    <text class="colorL" @click="onClickServe">服务协议</text>
                    <checkbox-group @change="onChange">
                        <checkbox class="paddingL10" value='1'  />
                    </checkbox-group>
                </view> -->
                <view  class="but_cl " @click="onQuick">立刻支付</view>
            </view>

            
        </view>
    </view>
</template>

<script>
 import { mapGetters } from 'vuex'

    export default {
        props:['type','top'],
        data(){
            return{
               check:false
                
            }
        },
        computed:{
            ...mapGetters('carList',[
                'get_carList',
                'get_quickList'
            ]),

            // 展示购物车价格
            showPrice(){
                let num = 0;
                this.get_carList.map(item=>num+=item.assemblyDeposit+Number(item.filesPrice))
                return num
            },

            // 展示立刻价格
            showPriceQuick(){
                let num = 0;
                this.get_quickList.map(item=>num+=item.assemblyDeposit+Number(item.filesPrice))
                return num
            }
        },
        methods:{
            // 进入购物车
            goCar(){
                this.$emit('goCar')
            }, 

            // 添加到购物车
            addCar(){
                this.$emit('addCar')
            }, 

            // 付款页面
            onQuick(){
               this.$emit('onQuick')
            },

            // 跳转服务协议
            onClickServe(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/my/components/serviceAgreement?index=' +  '1'
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
.buyCar_Span{
    height: 160rpx;
    width: 100%;
}
.buyCar{
    width: 100%;
    height: 160rpx;
    background:#fff;
    bottom:  0;
    left: 0;
    justify-content: space-between;
    align-items: end;
    padding-top: 18rpx;
    box-sizing: border-box;
    .car{
        font-size: 28rpx;
        position: relative;
        .num{
            position: absolute;
            top: 0;
            right: 10rpx;
            background: #D6A972;
            border-radius: 50%;
            width: 25rpx;
            height: 25rpx;
            font-size: 18rpx;
            color: #fff;
            text-align: center;
            line-height: 25rpx;
            padding: 5rpx;
        }
    }
    .but{
        width: 400rpx;
        justify-content: flex-end;
        align-items: center;
        .but_cl{
            width: 230rpx;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            color: #fff;
            font-size: 28rpx;
            border-radius: 50rpx;
            background: linear-gradient(270deg, #413F40 0%, #413F40 100%);
            box-sizing: border-box;
        }
    }
}
</style>