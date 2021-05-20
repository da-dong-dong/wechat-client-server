<template>
    <div class="my_content">
        <view class="msg_div">
            <div class="flex border">
                <span class="flex_1">拍摄时间: 2021-46-16</span>
                <i class="w50 iconfont iconshare"></i>
            </div>
            <view class="twoContent">
                <img @click="onClikcPage" class="oneRow" src="http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYYw7MWPI2Z93Mg76LHhQAM9LpduCVN5NXNZ4QUA96ViaRx1DJiby4tSJiafS7S7gYoZDp3lCgUkb14A/0?wx_fmt=jpeg"/>
                <img @click="onClikcPage" class="oneRow" src="http://mmbiz.qpic.cn/mmbiz_png/Ow22iaFEt6tbzsgHQRt3ZCFaKxBI1JzS8qR8OSXt0v6Acyg71h3PNWUDE2NmsPCjmzjC9TvpUE78r64yWUQvfhg/0?wx_fmt=png"/>
                <img @click="onClikcPage" class="oneRow" src="http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYzgu7BI5oulYKGqKNqbVfrqLbTJS23vHY9fWS36xJSB8FzvkN6ibibc72MyicncWl9Nz3XWqF5vVuYQ/0?wx_fmt=jpeg"/>
                <img @click="onClikcPage" class="oneRow" src="http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYYw7MWPI2Z93Mg76LHhQAM9LpduCVN5NXNZ4QUA96ViaRx1DJiby4tSJiafS7S7gYoZDp3lCgUkb14A/0?wx_fmt=jpeg"/>
                <img @click="onClikcPage" class="oneRow" src="http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYYw7MWPI2Z93Mg76LHhQAM9LpduCVN5NXNZ4QUA96ViaRx1DJiby4tSJiafS7S7gYoZDp3lCgUkb14A/0?wx_fmt=jpeg"/>
                <img @click="onClikcPage" class="oneRow" src="http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYzgu7BI5oulYKGqKNqbVfrMZpdwwgRdrskcwVQEVPpl8icRMG8WVwVMa8UdEOB9Lqyh8Pdyiauw3jQ/0?wx_fmt=jpeg"/>
            </view>
        </view>
    </div>
</template>

<script>
export default {
    methods: {
        onClikcPage () {
            uni.navigateTo({ 
                url: '/pages/order/detail/order-my-list'
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.my_content{
    height: 100vh;
    padding: 20rpx;
    overflow: auto;
    box-sizing: border-box;
    background: #F9F9F9;
    overflow: auto;
    .msg_div{
        padding: 20rpx 0;
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
    }
    .border{
        border-bottom: 1px solid #ECECEC;
    }
    .flex{
        padding: 20rpx;
    }
    .flex_1{
        font-weight: 600;
    }
    .w50{
        width: 100rpx;
    }
    .twoContent{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20rpx 0;
        .oneRow{
            background: #fff;
            margin-bottom: 20rpx;
            width: 340rpx;
            border-radius: 10rpx;
        }
    }
}
</style>
