/******************************** 位置组件 ***************************************/
<template>
    <view>
         <view class="city  paddingTB20">
            <view class="cityTop flex">
                <view>
                    <text>当前定位城市：</text>
                    <text> {{cityVal}} </text>
                </view>
                <!-- 切换品牌 -->
                <view class="color333" v-if="barmd" @click="onChageBarmd">切换品牌</view>
            </view>
            <view class="cityLi flex paddingTB20">
                <text v-for="(item) in cityLi" :key="item" @click="onClickVla(item)">{{item}}</text>
            </view>
        </view>

        <view class="cityDate paddingTB20 marginRL10 " v-for="(item,index) in showShopIdList" :key="index" @click="onClickShop(item)">
            <view class="dateLi marginRL10 padding20">
                <view class="fontSize32 color000 fontWight">
                    {{item.shopName}}
                    <i-icon class="icon paddingL20 paddingL10" type="coordinates" size="24" color="#87898A"  />
                </view>
                <view class="paddingTB20 color999 fontSize24">
                    地址：{{`${item.province}${item.city}${item.area}`}}
                </view>
            </view>
            <view class="dateBorder "></view>
        </view>
    </view>
</template>

<script>
    export default {
       props:['cityVal','showShopIdList','barmd'],
        data(){
            return{
                cityLi: ['北京','上海','广州','深圳','惠州']
            }
        },
        methods:{
            
            
            // 门店id
            onClickShop(item){
                this.$emit('onSetShopId',item)
            },

            // 点击过滤
            onClickVla(val){
                this.$emit('onSearch',val)
            },

            // 切换品牌
            onChageBarmd(){
                this.$emit('onChageBarmd')
            }
        }
    }
</script>

<style lang="scss" scoped>
.city{
    box-sizing: border-box;
    margin: 0 50rpx;
    font-size: 30rpx;
    .cityLi{
        box-sizing: border-box;
        justify-content: space-between;
        font-size: 28rpx;
    }
    .cityTop{
        justify-content: space-between;
    }
}
.cityDate{
    box-sizing: border-box;
    font-size: 32rpx;
    .dateLi{
        background: #fff;
        border-radius: 30rpx;
        box-sizing: content-box;
        box-sizing: border-box;
    }
    .dateBorder{
        width: 500rpx;
        height: 2px;
        margin: 20rpx auto;
        background: #DDDDDD;
    }

}
</style>