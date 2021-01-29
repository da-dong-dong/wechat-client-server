<template>
    <view>
       <view class="login_box">
           <view class="login_header">
               <image class="login_logo" src="/static/image/login.png"></image>
               <view class="login_text">绑定手机号可获取订单</view>
           </view>
           <!-- 输入框 -->
           <view class="login_input">
               <view class="login_input_top">
                   *请使用您订单时所填的手机号码进行绑定
               </view>
               <view class="login_bg">
                   <input class="uni-input"  placeholder="请输入手机号码" placeholder-class="cl"/>
               </view>
               <view class="login_bg login_flex">
                   <input class="uni-input"  placeholder="请输入验证码" placeholder-class="cl" />
                   <view class="login_margi">获取验证码</view>
               </view>
           </view>
           <!-- 按钮 -->
           <view class="login_btn">确认</view>
           <!-- 底部悬浮 -->
           <footText />
       </view>
    </view>
</template>

<script>
    import footText from '@/components/footText.vue'
    export default {
        components:{footText},
    }
</script>

<style lang="scss" scoped>

.cl{
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #C0C0C0;
}
.login_box{
    padding: 0 38rpx;
}
.login_header{
    margin: 70rpx 0;
    text-align: center;
    .login_logo{
        width: 128rpx;
        height: 128rpx;
    }
    .login_text{
        width: 340rpx;
        height: 44rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FF4852;
        line-height: 44rpx;
        margin: 0 auto;
    }
}
.login_input{
    .login_input_top{
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        padding-left: 42rpx;
        padding-bottom: 16rpx;
    }
    .login_bg{
        height: 96rpx;
        background: #F5F8FD;
        border-radius: 16rpx;
        line-height: 96rpx;
        margin-bottom: 40rpx;
    }
    .uni-input{
        padding: 28rpx 0 28rpx 42rpx;
    }
    .login_flex{
        display: flex;
        background: none;
        justify-content: space-between;
        align-items: center;
        .uni-input{
         background: #F5F8FD;
         border-radius: 16rpx;
        }
        .login_margi{
            width: 240rpx;
            height: 96rpx;
            background: #FF4852;
            border-radius: 16rpx;
            box-shadow: 0 4rpx 14rpx #FF4852;
            text-align: center;
            color:#fff;
            font-size: 28rpx;
        }
    }

}
.login_btn{
    font-size: 32rpx;
    height: 96rpx;
    line-height: 96rpx;
    background: #FF4852;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 14rpx #FF4852;
    text-align: center;
    color:#fff;
    margin-top: 58rpx;
}
</style>