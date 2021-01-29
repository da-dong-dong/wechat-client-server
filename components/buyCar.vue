/******************************** 购物车底部组件 ***************************************/
<template>
    <view>
        <view class="buyCar_Span"></view>
        <view class="buyCar fixed flex paddingRL40">
            <!-- 详情 -->
            <view class="car" v-if="type == 'details'" @click="goCar">
                <i-icon class="icon" type="publishgoods_fill" size="30" color="#666666"  />
                <view>购物车</view>
                <text class="num colorRed">{{get_carList.length}}</text>
            </view>

            <view class="but flex" v-if="type == 'details'">
                <view class="but_cl marginRL10" @click="addCar">加入购物车</view>
                <view class="but_cl " @click="onQuick">立刻预约</view>
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
                <text class="colorRed">￥{{showPrice}}</text>
            </view>

            <view class="but flex" v-if="type == 'buyCar'" >
                <!-- <view class="padding20 flex"  >
                    <text class="colorL" @click="onClickServe">服务协议</text>
                    <checkbox-group @change="onChange">
                        <checkbox class="paddingL10" value='1'  />
                    </checkbox-group>
                </view> -->
                <view v-if="check" class="but_cl " @click="onQuick">立刻支付</view>
                <view v-else class="but_cl " >立刻支付</view>
            </view>

            
        </view>
    </view>
</template>

<script>
 import { mapGetters } from 'vuex'

    export default {
        props:['type'],
        data(){
            return{
               check:false
                
            }
        },
        computed:{
            ...mapGetters('carList',[
				'get_carList'
            ]),

            // 展示购物车价格
            showPrice(){
                let num = 0;
                this.get_carList.map(item=>num+=item.price+Number(item.filesPrice))
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

            // 协议
            onChange(e){
                this.check = !this.check
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
    height: 110rpx;
    width: 100%;
}
.buyCar{
    width: 100%;
    height: 110rpx;
    background:#fff;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .car{
        font-size: 28rpx;
        position: relative;
        .num{
            position: absolute;
            top: 0;
            right: 10rpx;
        }
    }
    .but{
        width: 320rpx;
        justify-content: flex-end;
        align-items: center;
        .but_cl{
            width: 160rpx;
            height: 64rpx;
            line-height: 64rpx;
            text-align: center;
            color: #fff;
            font-size: 28rpx;
            border-radius: 40rpx;
            background: linear-gradient(270deg, #FF4852 0%, #FF6D75 100%);
            box-sizing: border-box;
        }
    }
}
</style>