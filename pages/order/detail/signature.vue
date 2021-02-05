/******************************** 签名画布 ***************************************/
<template>
    <view>
        <!-- <catsignature @save="save" :visible='true' v-if="flag"/> -->
        <view class="narrow" >
            <view v-html="getHtmlStr"></view>
        </view>
        <view class="btns">
            <span class="gray" @tap="updOrderContractState">拒签</span>
            <span class="red" @tap="onClick">签字</span>
        </view>
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'
    import catsignature from '@/components/cat-signature/cat-signature.vue'
    import { updOrderContractState } from '@/util/api/home.js'
    export default {
        components:{catsignature},
        data(){
            return{
                flag : true,
                id: null
            }
        },
        computed: {
            ...mapGetters('html', [
                'getHtmlStr'
            ])
        },
        onLoad(option){
            this.id = option.id
		},
        methods:{
            save(res){
                console.log(res);
                this.flag = false
                uni.navigateBack()
            },
            onClick () {
                uni.navigateTo({ url: '/pages/order/sign_view?id=' + this.id })
            },
            updOrderContractState () {
                let params = {
                    id: this.id,
	                isSign: 2
                }
                updOrderContractState(params).then(res => {
                    uni.navigateBack()
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
.gray{
    padding: 10rpx 20rpx;
    color: #fff;
    background: #999;
}
.red{
    padding: 10rpx 20rpx;
    color: #fff;
    background: #FF4852;
}
.btns{
    padding: 0 10rpx;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20rpx;
}
.narrow{
    display: flex;
    justify-content: space-evenly;
    margin: auto;
    height: 1100rpx;
    >view{
        transform: scale(0.4);
        position: relative;
        top: -280rpx;
    }
}
</style>