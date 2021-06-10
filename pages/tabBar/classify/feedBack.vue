<template>
    <div class="my_Form">
        <!-- <view class="title">标题:</view> -->
        <input class="uni-input" @input="(event) => { feedbackTitle = event.detail.value}" name="input"
        placeholder-style="font-size: 24rpx; font-family: PingFang SC; color: #C6C6C6;" style="height: 60rpx;width: 100%;padding: 10rpx" placeholder="标题" />
        <!-- <view class="title">您的问题或建议:</view> -->
        <!-- <input class="uni-input h100" name="input" placeholder="您的问题或建议:" /> -->
        <textarea class="uni-input h100" @input="(event) => { feedbackContent = event.detail.value}" style="height: 320rpx;width: 100%;"
           placeholder-style="font-size: 24rpx; font-family: PingFang SC; color: #C6C6C6;" placeholder="如您对北遇映画有什么好的建议，可点击填写您的建议请把您的宝贵意见填写于此处，我们将做得更好，感谢你对被的支持！:"/>
        <div class="submit_BTN" @click="addFeedBackOne">意见反馈</div>
    </div>
</template>

<script>
import { addFeedBackOne } from '@/util/api/home.js'
import { mapGetters } from 'vuex'
import { getUserInfo } from '@/util/api/user.js'
import { timestampToTime } from '@/util/time.js'
const { $Message } = require('@/wxcomponents/base/index');
export default {
    data () {
        return {
            feedbackContent: '',
            feedbackTitle: '',
            peopleData: {}
        }
    },
    computed: {
        ...mapGetters('user', [
            'get_shopId',
            'get_enterpriseId'
        ])
    },
    methods: {
        addFeedBackOne () {
            console.log(this.get_enterpriseId)
            let param = {
                authorizerAppid: this.peopleData.authorizerAppid,
                enterpriseId: this.get_enterpriseId,
                feedbackContent: this.feedbackContent,
                feedbackTime: timestampToTime(new Date()),
                feedbackTitle: this.feedbackTitle,
                userId: this.peopleData.id,
                shopId: this.get_shopId ? this.get_shopId.shopId : null,
                userMobile: this.peopleData.phone,
                userName: this.peopleData.nickName,
                userSex: this.peopleData.sex
            }
            console.log(param)
            addFeedBackOne(param).then(res => {
                uni.navigateBack()
                // uni.switchTab({
                //     url:'/pages/tabBar/home/home'
                // })
            })
        }
    },
    created () {
        getUserInfo().then(res => {
            this.peopleData = res.data.data
        })
    }
}
</script>

<style lang="scss" scoped>
.my_Form{
    background: #f5f5f5;
    height: 100vh;
    padding: 40rpx;
    box-sizing: border-box;
    .title{
        margin-bottom: 18rpx;
    }
    .uni-input{
        background: #f5f5f5;
        margin-bottom: 20rpx;
        border-radius: 16rpx;
        box-sizing: border-box;
        background: #ffffff;
    }
    .h100{
        margin: 0 auto;
        padding: 28rpx;
        border-radius: 16px;
    }
    .submit_BTN{
        width: 692rpx;
        height: 88rpx;
        line-height: 88rpx;
        margin: 82rpx auto 0;
        background: #D3AA72;
        color: #ffffff;
        font-family: PingFang SC;
        font-size: 32rpx;
        border-radius: 42rpx;
        text-align: center;
    }
}
</style>