<template>
    <view class="myFeedBackContent">
        <view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
            <view class="left" :style="'top:' + demo.top + 'px'" >
                <view class="iconfont iconleft1" @click="toGoBack"></view>返回
                <view class="iconfont iconadd-copy mar_l15" @click="toFeedback"></view>
            </view>
            我的意见反馈
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
    padding: 20rpx;
    margin-top: 20rpx;
    flex: 1;
    overflow: auto;
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
        padding: 10rpx;
        background: #fff;
        margin-bottom: 10rpx;
    }
    .feedOne_no{
        height: 200rpx;
        text-align: center;
        line-height: 200rpx;
        background: #fff;
    }
}
</style>