/******************************** 位置组件 ***************************************/
<template>
    <view>
         <view class="city  paddingTB20">
            <text>当前定位城市：</text>
            <text> {{cityVal}} </text>
            <view class="cityLi flex paddingTB20">
                <text v-for="(item) in cityLi" :key="item" @click="onClickVla(item)">{{item}}</text>
            </view>
        </view>

        <view class="cityDate paddingTB10 marginRL10 " v-for="(item,index) in showShopIdList[0].shopInfoVos" :key="index" @click="onClickShop(item)">
            <view class="dateLi marginRL10 padding10">
                <view >
                    {{item.shopName}}
                    <i-icon class="icon paddingL20 paddingL10" type="coordinates" size="24" color="#87898A"  />
                    
                </view>
                <view class="paddingTB20">
                    地址：{{`${item.province}${item.city}${item.area}${item.address}`}}
                </view>
            </view>
            <view class="dateBorder "></view>
        </view>
    </view>
</template>

<script>
 import { mapMutations } from 'vuex'
    export default {
       props:['cityVal','showShopIdList'],
        data(){
            return{
                cityLi: ['北京','上海','广州','深圳','惠州']
            }
        },
        methods:{
            ...mapMutations('user',[
				'mut_shopId'
            ]),
            
            // 门店id
            onClickShop(item){
                this.mut_shopId(item)
                uni.navigateBack()
            },

            // 点击过滤
            onClickVla(val){
                this.$emit('onSearch',val)
            }
        }
    }
</script>

<style lang="scss" scoped>
.city{
    box-sizing: border-box;
    margin: 0 80rpx;
    .cityLi{
        box-sizing: border-box;
        justify-content: space-between;
        font-size: 28rpx;
    }
}
.cityDate{
    box-sizing: border-box;
    font-size: 34rpx;
    .dateLi{
        background: #E1E4E6;
        border: 1px solid #999;
        box-sizing: content-box;
    }
    .dateBorder{
        width: 500rpx;
        height: 2px;
        margin: 20rpx auto;
        background: #DDDDDD;
    }

}
</style>