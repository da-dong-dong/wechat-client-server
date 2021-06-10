<template>
  <div class="my_collection">
    <template v-if="list.length > 0">
        <div class="collectionOne" v-for="_ in list" :key="_.id">
            <img class="img" :src="_.images" alt="">
            <div class="title">
                {{ _.title }}
                <i class="iconfont iconshanchu right" @click="delCollectOne(_.id)"></i>
            </div>
        </div>
    </template>
    <template v-else>
        暂无收藏
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
        }
    },
    created () {
        this.getCollectList()
    }
}
</script>

<style lang="less">
.my_collection{
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
