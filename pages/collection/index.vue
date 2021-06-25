<template>
  <div class="my_collection">
    <template v-if="list.length > 0">
        <div class="collectionOne" v-for="_ in list" :key="_.id">
            <image class="img" :src="_.images" alt="" @click="onClickDetail(_.assemblyId,_.assemblyType)" mode="aspectFill"></image>
            <div class="title">
                {{ _.title }}
                <i class="iconfont iconshanchu right" @click="delCollectOne(_.id)"></i>
            </div>
        </div>
    </template>
    <template v-else>
       <view class="noOrder"> 
            <view class="flex">
                <image class="login_logo" src="/static/image/my/wdl.png"></image>
                <span>你的喜欢还没有收藏哦~</span>
            </view>
        </view>
    </template>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex'
import { getCollectList, delCollectOne } from '@/util/api/goods.js'
export default {
    computed:{
        ...mapGetters('user',[
            'get_appId',
            'get_enterpriseId',
            'get_userId'
        ])
    },
    data () {
        return {
            list: []
        }
    },
    onLoad(options) {
        uni.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#ffffff',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    },
    methods: {
        async getCollectList () {
            let params = {
                appId: this.get_appId,
                enterpriseId: this.get_enterpriseId,
                userId: this.get_userId
            }
            let res = await getCollectList(params)
            console.log(res)
            this.list = res.data.data
        },
        async delCollectOne (id) {
            await delCollectOne({ id })
            uni.showToast({
                title: '删除成功',
                duration: 1500
            })
            this.getCollectList()
        },

        // 跳转详情
        onClickDetail(id,type){
            if(type == 1){
                // 类别
                uni.navigateTo({ 
                    url: '/pages/tabBar/classify/components/details?id=' + id
                })
            }else{
                // 图文
                uni.navigateTo({ 
                    url: '/pages/tabBar/classify/newDetail?id=' + id
                })
            }
        }
    },
    created () {
        this.getCollectList()
    }
}
</script>

<style lang="less">
.noOrder{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    // color: #9D9D9D;
    color: #d8d8d8;
    .flex{
        align-items: center;
        flex-direction: column;
    }
    .login_logo{
        width: 144rpx;
        height: 144rpx;
        display: block;
    }
    }
.my_collection{
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1rpx solid #B2B2B2;
    .collectionOne{
        width: 330rpx;
        margin-bottom: 26rpx;
        .img{
            width: 100%;
            height: 480rpx;
            margin-bottom: 26rpx;
            border-radius: 6rpx;
        }
        .title{
            font-family: STXihei;
            color: #534A48;
        }
        .right{
            float: right;
            margin-right: 10rpx;
            height: 42rpx;
            line-height: 42rpx;
        }
    }
}
</style>
