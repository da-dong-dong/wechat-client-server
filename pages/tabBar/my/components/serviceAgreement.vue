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
        <view  class="saveBtn" @click="onBck"> 确定 </view>
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

</style>