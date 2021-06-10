<template>
    <view class="myFeedBackContent">
        <view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
            <view class="left" :style="'top:' + demo.top + 'px'" >
                <span class="flex" @click="toGoBack">
                    <view class="iconfont iconleft1"></view>
                </span>
                <!-- <view class="iconfont iconadd-copy mar_l15" @click="toFeedback"></view> -->
            </view>
            我的意见反馈
        </view>
        <view class="fixed_content">
            <button class="mar_pad36" plain show-message-card session-from send-message-path send-message-title open-type='contact' style="border: 0; padding: 0; line-height: unset;margin-top: 0rpx">
                <view class="">
                    <div class="title">联系在线客服</div>
                    <div class="flex">
                        <div class="content">如您关于拍摄、产品、订单需要咨询，请直接联系在线客服</div>
                        <div class="w60 iconfont iconhtbArrowright02"></div>
                    </div>
                </view>
            </button>
            <view @click="toFeedback">
                <div class="title">去填写意见</div>
                <div class="flex">
                    <div class="content">如您对北遇映画有什么好的建议，可点击填写您的建议请把您的宝贵意见填写于此处，我们将做得更好，感谢你对被的支持！</div>
                    <div class="w60 iconfont iconhtbArrowright02"></div>
                </div>
            </view>
        </view>
        <div class="pad10" v-if="feedBackList.length > 0">
            <view class="feedOne" v-for="_ in feedBackList" :key="_.id">
                <view class="mar_b10">
                    <span class="backColor">意见标题: </span>
                    <span class="ccc">{{ _.feedbackTitle }}</span>
                </view>
                <view >
                    <span class="backColor">意见内容: </span>
                    <span class="ccc">{{ _.feedbackContent }}</span>
                </view>
                <view >
                    <span class="backColor">回复人员: </span>
                    <span class="ccc">{{ _.replyUserName ? _.replyUserName : '' }}</span>
                </view>
                <view >
                    <span class="backColor">回复内容: </span>
                    <span class="ccc">{{ _.replyContent ? _.replyContent : '' }}</span>
                </view>
                <view >
                    <span class="backColor">回复时间: </span>
                    <span class="ccc" v-if="_.replyTime">{{ _.replyTime | times }}</span>
                </view>
            </view>
        </div>
        <div class="pad10" v-else>
            <div class="feedOne_no">
                无意见反馈
            </div>
        </div>
    </view>
</template>

<script>
import { getMyFeedBackList } from '@/util/api/home.js'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            feedBackList: [],
            demo: {
                top: 0,
                height: 0
            }
        }
    },
    computed:{
        ...mapGetters('user',[
            'get_userId',
        ]),
    },
    onShow () {
        this.getMyFeedBackList()
    },
    methods: {
        getMyFeedBackList () {
            getMyFeedBackList({ userId: this.get_userId }).then(res => {
                this.feedBackList = res.data.data.records
            })
        },
        toFeedback () {
            uni.navigateTo({
                url:'/pages/tabBar/classify/feedBack'
            })
        },
        toGoBack () {
            uni.navigateBack()
        }
    },
    created () {
        const demo = uni.getMenuButtonBoundingClientRect()
        this.demo.top = demo.top
        this.demo.height = demo.height
        this.getMyFeedBackList()
    }
}
</script>

<style lang="scss" scoped>
.demo{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    font-size: 26rpx;
    .left{
        float: left;
        position: absolute;
        display: flex;
        width: max-content;
        height: max-content;
        top: 0;
        bottom: 0;
        left: 20rpx;
        margin: auto;
        .iconfont{
            color: #3C3C3C;
        }
    }
}
.pad10{
    // padding: 20rpx;
    // margin-top: 20rpx;
    width: 692rpx;
    margin: 0 auto 20rpx;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
}
.mar_l15{
    margin-left: 30rpx;
}
.myFeedBackContent{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    box-sizing: border-box;
    overflow: hidden;
    .mar_b10{
        margin-bottom: 10rpx;
    }
    .ccc{
        color: #ccc;
    }
    .backColor{
        color: #000;
        margin-right: 20rpx;
    }
    .feedOne{
        padding: 34rpx 34rpx 34rpx 24rpx;
        border-radius: 24rpx;
        background: #fff;
        margin-bottom: 10rpx;
    }
    .feedOne_no{
        height: 200rpx;
        border-radius: 24rpx;
        text-align: center;
        line-height: 200rpx;
        background: #fff;
    }
    .fixed_content{
        width: 692rpx;
        margin: 20rpx auto;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 34rpx 34rpx 34rpx 24rpx;
        box-sizing: border-box;
        .mar_pad36{
            border-bottom: 2rpx solid #EEEEEE !important;
            padding-bottom: 36rpx !important;
            margin-bottom: 36rpx;
        }
        .title{
            text-align: left;
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-bottom: 24rpx;
        }
        .content {
            text-align: left;
            flex: 1;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #919191;
        }
        .w60{
            text-align: center;
            width: 60rpx;
        }
    }
}
</style>
