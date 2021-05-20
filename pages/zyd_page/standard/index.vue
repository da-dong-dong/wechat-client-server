<template>
    <view class="view_content">
        <view class="standart_list">
            <view class="flex" v-for="_ in standaerList" :key="_.id">
                <img class="h145" :src="_.titleImages"/>
                <view class="flex_1">
                    <view class="title">{{_.serverTitle}}</view>
                    <view class="text_gray">
                        {{_.serverContent}}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getStandardList } from '@/util/api/order.js'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            standaerList: []
        }
    },
    computed:{
            ...mapGetters('user',[
                'get_enterpriseId'
			]),
        },
    methods: {
        getStandardList () {
            let params = {
                enterpriseId: this.get_enterpriseId
            }
            getStandardList(params).then(res => {
                console.log('标准服务', res)
                this.standaerList = res.data.data
            })
        }
    },
    mounted () {
        this.getStandardList()
    }
}
</script>

<style lang="less" scoped>
.view_content{
    height: 100vh;
    background: #f5f5f5;
    border-top: 1px solid transparent;
}
.standart_list{
    margin: 20rpx;
    padding: 20rpx;
    background: #fff;
    border-radius: 10rpx;
    .flex{
        display: flex;
        margin-bottom: 20rpx;
        .h145{
            height: 200rpx;
            width: 200rpx;
            border-radius: 6rpx;
            margin-right: 20rpx;
        }
        .text_gray{
            font-size: 26rpx;
            color: #999999;
        }
        .flex_1{
            flex: 1;
        }
        .title{
            font-size: 32rpx;
            font-weight: 600;
            padding: 10rpx 0;
        }
    }
}
</style>
