<template>
    <view class="myFeedBackContent">
        <view class="feedOne" v-for="_ in feedBackList" :key="_.id">
            <view class="mar_b10">
                标题: {{ _.feedbackTitle }}
            </view>
            <view class="ccc">
                意见内容: {{ _.feedbackContent }}
            </view>
        </view>
    </view>
</template>

<script>
import { getMyFeedBackList } from '@/util/api/home.js'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            feedBackList: []
        }
    },
    computed:{
        ...mapGetters('user',[
            'get_userId',
        ]),
    },
    methods: {
        getMyFeedBackList () {
            getMyFeedBackList({ userId: this.get_userId }).then(res => {
                this.feedBackList = res.data.data.records
            })
        }
    },
    created () {
        this.getMyFeedBackList()
    }
}
</script>

<style lang="scss" scoped>
.myFeedBackContent{
    height: 100vh;
    background: #f5f5f5;
    padding: 20rpx;
    .mar_b10{
        margin-bottom: 10rpx;
    }
    .ccc{
        color: #ccc;
    }
    .feedOne{
        padding: 10rpx;
        background: #fff;
        margin-bottom: 10rpx;
    }
}
</style>