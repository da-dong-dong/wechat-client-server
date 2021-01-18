/******************************** 我的 ***************************************/
<template>
    <view>
        <!-- 用户信息 -->
        <view class="user_box flex paddingRL40">
            <view>
                <text class="fontWight fontSize36">大东东</text>
                <view>1306825494</view>
            </view>
            <image class="login_logo" src="/static/image/login.png"></image>
        </view>

        <!-- 用户设置 -->
        <view class="user_seting marginT10">
            <view class="user_seting_li flex paddingRL20" @click="onClickUserInfo">
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">个人资料</text>
                </view>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" @click="onClickPassword">
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">修改密码</text>
                </view>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" @click="onClickService">
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">服务协议</text>
                </view>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20">
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">意见反馈</text>
                </view>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" @click="onClickOut">
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8" />
                    <text class="paddingL20">退出登陆</text>
                </view>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        methods:{
            // 修改个人资料
            onClickUserInfo(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/my/components/userInfo' 
                })
            },

            // 修改密码
            onClickPassword(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/my/components/changePassword' 
                })
            },

            // 服务协议
            onClickService(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/my/components/serviceAgreement' 
                })
            },

            // 退出登陆
            onClickOut(){
                console.log('退出')
                uni.removeStorage({
                    key: 'code',
                    success: (result) => {
                        uni.redirectTo({ 
                            url: '/pages/login/wecatLogin' 
                        })
                    },
                    fail: (error) => {}
                })
                
            }
        }
    }
</script>

<style lang="scss" scoped>

// 用户设置
.user_seting{
    border: 1px solid #D8D8D8;
    border-bottom:none;
    .user_seting_li{
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1px solid #D8D8D8;
        align-items: center;
        justify-content: space-between;
    }
}

// 用户信息
.user_box{
    height: 300rpx;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #D8D8D8;
    font-size: 30rpx;
    .login_logo{
        width: 128rpx;
        height: 128rpx;
    }
}
</style>