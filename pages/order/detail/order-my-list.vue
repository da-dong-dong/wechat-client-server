<template>
    <view class="my_list_content">
        <swiper class="swiper" style="height: 100vh" :current="current" @change="(event) => { current = event.detail.current }">
            <swiper-item v-for="(_, i) in list" :key="_i">
                <img class="hw100" :src="_" />
            </swiper-item>
            
        </swiper>
        <view class="currentView">
            {{current + 1}}/{{list.length}}
        </view>
        <view class="footView">
            <span>
                <i class="mar_r10 iconfont icondownload"></i>
                保存相片
            </span>
            <span>
                <i class="mar_r10 iconfont iconshare"></i>
                分享给好友
            </span>
        </view>
    </view>
</template>

<script>
export default {
    data () {
        return {
            current: 0,
            list: [
                'http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYYw7MWPI2Z93Mg76LHhQAM9LpduCVN5NXNZ4QUA96ViaRx1DJiby4tSJiafS7S7gYoZDp3lCgUkb14A/0?wx_fmt=jpeg',
                'http://mmbiz.qpic.cn/mmbiz_png/Ow22iaFEt6tbzsgHQRt3ZCFaKxBI1JzS8qR8OSXt0v6Acyg71h3PNWUDE2NmsPCjmzjC9TvpUE78r64yWUQvfhg/0?wx_fmt=png',
                'http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYzgu7BI5oulYKGqKNqbVfrqLbTJS23vHY9fWS36xJSB8FzvkN6ibibc72MyicncWl9Nz3XWqF5vVuYQ/0?wx_fmt=jpeg',
                'http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYYw7MWPI2Z93Mg76LHhQAM9LpduCVN5NXNZ4QUA96ViaRx1DJiby4tSJiafS7S7gYoZDp3lCgUkb14A/0?wx_fmt=jpeg',
                'http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYYw7MWPI2Z93Mg76LHhQAM9LpduCVN5NXNZ4QUA96ViaRx1DJiby4tSJiafS7S7gYoZDp3lCgUkb14A/0?wx_fmt=jpeg',
                'http://mmbiz.qpic.cn/mmbiz_jpg/Ow22iaFEt6tYzgu7BI5oulYKGqKNqbVfrMZpdwwgRdrskcwVQEVPpl8icRMG8WVwVMa8UdEOB9Lqyh8Pdyiauw3jQ/0?wx_fmt=jpeg'
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.my_list_content{
    position: relative;
    .currentView{
        position: absolute;
        text-align: center;
        left: 0;
        right: 0;
        top: 10rpx;
        z-index: 9999;
        color: #fff;
    }
    .footView{
        display: flex;
        position: absolute;
        text-align: center;
        left: 0;
        right: 0;
        bottom: 20rpx;
        z-index: 9999;
        color: #fff;
        justify-content: space-around;
        .mar_r10{
            margin-right: 20rpx;
        }
        span{
            display: flex;
            border: 1px solid #fff;
            border-radius: 50rpx;
            align-items: center;
            padding: 20rpx 50rpx;
        }
    }
}
.hw100{
    width: 100vw;
    height: 100vh;
}
</style>
