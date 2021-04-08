/******************************** 品牌选择 ***************************************/
<template>
    <view class="brandBox paddingRL40">
        <view class="brandTop color000 fontSize36 fontWight paddingT40 marginB30">
            选择当前品牌
        </view>
        <view class="brandList fontSize32 fontWight marginB30" v-for="(item,index) in get_barmd" :key="index" @click="setBrand(item.useShopId)" :style="{ 'background-image': `url(${item.images})`}">
            <view class="brandListText">
                <view class="fontWight fontSize32">{{item.name}}</view>
                <text class="fontSize20">{{item.remarks?item.remarks:''}}</text>
            </view>
        </view>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import {mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        computed: {
			...mapGetters('map',[
				'get_barmd'
            ]),
            ...mapGetters('user',[
				'get_enterpriseId'
			])
        },
        methods:{
            ...mapMutations('map',[
				'mut_barmdId'
            ]),
            ...mapMutations('carList',[
				'mut_carListDelAll'
            ]),

            ...mapActions('map',[
				'act_shopIdList'
			]),
            
            // 设置品牌
            setBrand(id){
                // 存储当前品牌
                this.mut_barmdId(id);
                
                //  清空购物车
                this.mut_carListDelAll()

                // 获取门店
                let param = {
                    extConfig: this.get_enterpriseId,
                    shopIds: id
                }
                this.act_shopIdList(param)
                uni.navigateTo({
                	url:'/pages/tabBar/shoppingCart/components/changeRegion'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.brandBox{
    width: 100%;
    min-height: 100vh;
    background: #F9F9F9;
    box-sizing: border-box;
}
.brandList{
    width: 100%;
    height: 350rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-color: #d8d8d8;
    text{
       display: inline-block; 
    }
    .brandListText{
        padding-top: 230rpx;
        color: #fff;
        text-align: center;
    }
}
</style>