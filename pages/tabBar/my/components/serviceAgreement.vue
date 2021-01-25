/******************************** 服务协议 ***************************************/
<template>
    <view>
        <view>文案</view>
        <view>文案</view>
        <view>文案</view>
        <view>文案</view>
        <view>文案</view>
        <view>文案</view>
        <!-- 按钮 -->
        <view v-if="btn" class="but" @click="onBck"> 确定 </view>
    </view>
</template>

<script>
    export default {
        onLoad(options) {
            if(options.index){
                this.btn = true
            }
        },
        data(){
            return{
                btn:false
            }
        },
        methods:{
            onBck(){
                uni.navigateBack()
            }
        }
    }
</script>

<style lang="scss" scoped>
// 按钮
.but{
    width: 300rpx;
    height: 80rpx;
    background: #5CA4A8;
    text-align: center;
    line-height: 80rpx;
    color: #fff;
    border-radius: 20rpx;
    margin: 100rpx auto;
}
</style>