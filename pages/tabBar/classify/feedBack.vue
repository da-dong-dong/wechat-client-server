<template>
    <div class="my_Form">
        <view class="title">标题:</view>
        <input class="uni-input" @input="(event) => { feedbackTitle = event.detail.value}" name="input" placeholder="标题" />
        <view class="title">您的问题或建议:</view>
        <!-- <input class="uni-input h100" name="input" placeholder="您的问题或建议:" /> -->
        <textarea class="uni-input h100" @input="(event) => { feedbackContent = event.detail.value}" style="height: 200rpx;width: 100%;" placeholder="您的问题或建议:"/>
        <button class="submit_BTN" @click="addFeedBackOne">提交</button>
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
    background: #fff;
    height: 100vh;
    padding: 40rpx;
    box-sizing: border-box;
    .title{
        margin-bottom: 18rpx;
    }
    .uni-input{
        background: #f5f5f5;
        margin-bottom: 20rpx;
        border-radius: 6rpx;
        box-sizing: border-box;
    }
    .h100{
        height: 100rpx;
    }
    .submit_BTN{

    }
}
</style>