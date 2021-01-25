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
                <view class="but_cl padding20" @click="addCar">加入购物车</view>
                <view class="but_cl padding20" @click="onQuick">立刻预约</view>
            </view>
            
            <!-- 购物车 -->
            <view class="car" v-if="type == 'car'" >
                <text>合计：</text>
                <text class="colorRed">￥{{showPrice}}</text>
            </view>

            <view class="but flex" v-if="type == 'car'" style="justify-content: flex-end">
                <view class="but_cl padding20" @click="onQuick">下一步</view>
            </view>

            
        </view>
    </view>
</template>

<script>
 import { mapGetters } from 'vuex'
    export default {
        props:['type'],
        computed:{
            ...mapGetters('carList',[
				'get_carList'
            ]),

            // 展示购物车价格
            showPrice(){
                let num = 0;
                this.get_carList.map(item=>num+=item.price)
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
                console.log('付款页面')
            }
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
        width: 400rpx;
        justify-content: space-between;
        align-items: center;
        .but_cl{
            border-radius: 20rpx;
            &:nth-child(1){
                color: #34B9C0;
                border: 1px solid #34B9C0;
                box-sizing: border-box;
            }
            &:nth-child(2){
                background: #34B9C0;
                color: #fff;
            }
        }
    }
}
</style>