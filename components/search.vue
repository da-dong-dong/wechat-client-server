/******************************** 搜索组件 ***************************************/
<template>
    <view>
        <view class="search flex paddingTB10">
            <i-icon class="icon" type="search" size="24" color="#D8D8D8"  />
            <input type="text" v-model="val" class="input paddingTB10 marginRL10" placeholder="请输入关键字">
            <text class="colorL" @click="onSearch">搜索</text>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                val:''
            }
        },
        methods:{
            onSearch(){
                this.$emit('onSearch',this.val)
            }
        }
    }
</script>

<style lang="scss" scoped>
.search{
    position: relative;
    justify-content: center;
    align-items: center;
    .icon{
        position: absolute;
        top: 15rpx;
        left: 120rpx;
    }
    .input{
        width: 400rpx;
        background: #F7F7F7;
        border-radius: 50rpx;
        padding-left: 40px;
        
    }
}
</style>