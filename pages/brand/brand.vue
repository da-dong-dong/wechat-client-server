/******************************** 品牌选择 ***************************************/
<template>
    <view class="brandBox paddingRL40">
        <view class="brandTop color000 fontSize36 fontWight paddingT40 marginB30">
            选择当前品牌
        </view>
        <view class="brandList fontSize32 fontWight marginB30" v-for="(item,index) in get_barmd" :key="index" @click="setBrand(item.useShopId)">
            {{item.name}}
        </view>
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
            ...mapActions('map',[
				'act_shopIdList'
			]),
            
            // 设置品牌
            setBrand(id){
                this.mut_barmdId(id);
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
    height: 100rpx;
    background: #fff;
    border-radius: 20rpx;
    line-height: 100rpx;
    box-sizing: border-box;
    padding-left: 50rpx;
    border-left: 30rpx solid #EB493B;
    &:nth-child(odd){
        border-left: 30rpx solid #F0A949;
    }
}
</style>