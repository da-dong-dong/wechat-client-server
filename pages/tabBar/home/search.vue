<template>
    <view class="searchView">
        <view class="searchContent">
            <input class="uni-input" confirm-type="search" placeholder="搜索内容" @confirm="confirmSearch"/>
        </view>
        <view class="searchList">
            <view class="searchOne" v-for="item in assemblyList" :key="item.id" @tap="turnDetail(item)">
                <img :src="item.coverPhoto" alt="">
                <view class="bgFFF">
                    {{item.assemblyName}} {{item.assemblyPrice}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getPageAssemblyOnline } from '@/util/api/goods.js'
import { mapGetters } from 'vuex'
const entriData = uni.getExtConfigSync()

export default {
    data () {
        return {
            pageData: {
                limit: 10,
                page: 1,
                shopId: null,
                enterpriseId: null
            },
            assemblyList: []
        }
    },
    computed: {
        ...mapGetters('user',[
            'get_shopId'
        ])
    },
    created () {
        this.confirmSearch({ detail: { value: '' }})
    },
    methods: {
        confirmSearch (event) {
            console.log(event.detail.value)
            this.pageData.assemblyName = event.detail.value
            this.pageData.shopId = this.get_shopId.shopId
            this.pageData.enterpriseId = entriData.enterpriseId
            getPageAssemblyOnline(this.pageData).then(res => {
                console.log(res)
                this.assemblyList = res.data.data.records
            })
        },
        turnDetail (data) {
            uni.navigateTo({  url: '/pages/tabBar/classify/components/details?id=' + data.assemblyId })
        }
    }
}
</script>

<style lang="scss" scoped>
.searchView{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: auto;
    background: #f5f5f5;
    height: 100%;
    .searchList{
        position: absolute;
        top: 108rpx;
        bottom: 0;
        right: 0;
        left: 0;
        height: auto;
        padding: 0 20rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow-x: hidden;
        .searchOne{
            width: 350rpx;
            margin-bottom: 20rpx;
            border-radius: 10rpx;
            overflow: hidden;
            >img{
                width: 100%;
                vertical-align: bottom;
            }
        }
    }
    .bgFFF{
        padding: 10rpx 10rpx;
        background: #fff;
    }
}
.searchContent{
    padding: 10rpx 20rpx;
    background: #fff;
}
.uni-input{
    border: 2rpx solid #dcdee2;
    border-radius: 8rpx;
    padding: 10rpx;
}
</style>
