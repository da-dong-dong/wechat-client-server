/******************************** 签名画布 ***************************************/
<template>
    <view class="h100">
        <movable-area class="narrow h100" :scale-area="true" >
            <movable-view :scale="true" :scale-min="0.4" style="width: 100%; height: 100%" direction="all">
                <div v-html="getHtmlStr" style="transform: scale(0.5);transform-origin: 0 0;width: 750px;"></div>
            </movable-view>
        </movable-area>
        <view class="btns">
            <span class="gray" @tap="updOrderContractState">拒签</span>
            <span class="red" @tap="onClick" v-if="signGo">签字</span>
            <span class="red" @tap="confirm" v-else>确定</span>
        </view>
        <uni-popup ref="popup" type="dialog">
            <uni-popup-dialog type="input" mode="input" title="拒签原因"  @confirm="onConfirm">
            </uni-popup-dialog>
        </uni-popup>
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'
    import catsignature from '@/components/cat-signature/cat-signature.vue'
    import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
    import { updOrderContractState } from '@/util/api/home.js'
    export default {
        components:{catsignature, uniPopupDialog},
        data(){
            return{
                flag : true,
                id: null,
                signGo: true
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
            onConfirm (done, value) {
                let params = {
                    id: this.id,
                    isSign: 2,
                    remarks: value
                }
                updOrderContractState(params).then(res => {
                    this.confirm()
                })
            },
            save(res){
                console.log(res);
                this.flag = false
                uni.navigateBack()
            },
            onClick () {
                uni.navigateTo({ url: '/pages/order/sign_view?id=' + this.id })
            },
            updOrderContractState () {
                this.$refs.popup.open()
            },
            confirm () {
                var pages = getCurrentPages()
                var prevPage = pages[pages.length - 2] //上一个页面
                prevPage.$vm.$refs.orderSign[0].getOrderContract()
                uni.navigateBack({ delta: 1 })
            }
        },

    }
</script>

<style lang="scss" scoped>
.h100{
    height: 100vh !important;
}
.gray{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 228rpx;
    height: 82rpx;
    border-radius: 4rpx;
    border: 2rpx solid #FF4852;
    color: #FF4852;
    background: #fff;
}
.red{
    width: 228rpx;
    height: 82rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FF4852;
    -webkit-border-radius: 4rpx;
    border-radius: 4rpx;
    color: #fff;
}
.btns{
    padding: 0 10rpx;
    position: fixed;
    bottom: 20rpx;
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
    width: 100%;
}
</style>