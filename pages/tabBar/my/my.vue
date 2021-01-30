/******************************** 我的 ***************************************/
<template>
    <view class="boxs">
        <!-- 用户信息 -->
        <view class="user_box paddingT40  paddingRL30">
            <view class="flex">
                <button open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary">
                    <image class="login_logo" :src="get_headimgUrl"></image>
                </button>
                <view class="text_box paddingRL30">
                    <text class="fontWight fontSize34">{{get_nickName}}</text>
                    <text>{{get_phone}}</text>
                </view>
            </view>
        </view>

        <!-- 用户设置 -->
        <view class="user_seting marginT10">
            <view class="user_seting_li flex paddingRL20" >
                <button open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary">
                    <view class="flex ">
                        <image class="img" src="/static/image/my/1.png"></image>
                        <text class="paddingL20">个人资料</text>
                    </view>
                    <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
                </button>
            </view>

            <view class="user_seting_li flex paddingRL20" @click="onClickPassword">
                <view class="flex">
                    <image class="img" src="/static/image/my/2.png"></image>
                    <text class="paddingL20">修改密码</text>
                </view>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" @click="onClickService('setUp')">
                <view class="flex">
                    <image class="img" src="/static/image/my/3.png"></image>
                    <text class="paddingL20">套系服务</text>
                </view>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" @click="onClickService('mack')">
                <view class="flex">
                    <image class="img" src="/static/image/my/3.png"></image>
                    <text class="paddingL20">预约服务</text>
                </view>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

            <!-- <view class="user_seting_li flex paddingRL20">
                <view class="flex">
                    <image class="img" src="/static/image/my/4.png"></image>
                    <text class="paddingL20">意见反馈</text>
                </view>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view> -->

            <view class="user_seting_li flex paddingRL20" @click="onClickOut">
                <view class="flex">
                    <image class="img" src="/static/image/my/5.png"></image>
                    <text class="paddingL20">退出登陆</text>
                </view>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>
        </view>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const { $Message } = require('@/wxcomponents/base/index');
import { setUserInfo,getUserInfo } from '@/util/api/user.js'
    export default {
        computed:{
			...mapGetters('user',[
                'get_phone',
                'get_nickName',
                'get_headimgUrl'
			]),
        },
        onLoad(options) {
            uni.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#FF6D75',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })

            
        },
        mounted(){
            // 获取用户
            this.getUserInfoAPI()
        },
        methods:{
            ...mapActions('user',[
				'act_nickName'
            ]),
            
            // 获取用户信息AIP
            getUserInfoAPI(){
                getUserInfo().then(res=>{
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area} = res.data.data
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area})
                })
            },
            // 获取用户信息
            getUserInfo(val){
                let param = val.detail
                if(param.encryptedData){
                    if(this.get_nickName){
                        this.onClickUserInfo()
                    }else{
                        setUserInfo(param).then(res=>{
                            this.getUserInfoAPI()
                            this.onClickUserInfo()
                        })
                    }
                }else{
                    $Message({
                        content:'取消授权',
                        type: 'error'
                    });
                }
            },

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
            onClickService(type){
                uni.navigateTo({ 
                    url: `/pages/tabBar/my/components/serviceAgreement?type=${type}`
                })
            },

            // 退出登陆
            onClickOut(){
                console.log('退出')
                uni.removeStorage({
                    key: 'code',
                    success: (result) => {
                        clearInterval(getApp().globalData.time)
                        uni.redirectTo({ 
                            url: '/pages/login/index' 
                        })
                    },
                    fail: (error) => {}
                })
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.boxs{
    height: 100vh;
    background: #F9F9F9;
    button{
        height: 100%;
        margin: 10rpx 0 0 0 ;
        padding: 0;
        border-radius:0;
        background: transparent;
        &:after {
            border: none;
        }
    }
}

// 用户设置
.user_seting{
    border-bottom:none;
    width: 686rpx;
    background: #fff;
    border-radius: 20rpx;
    margin: 0 auto;
    position: relative;
    top: -200rpx;
    height: 712rpx;
    .user_seting_li{
        height: 130rpx;
        line-height: 130rpx;
        align-items: center;
        justify-content: space-between;
        color: #000000;
        button{
           width: 100%;
           color: #333;
           display: flex;
           .flex{
               width: 100%;
           }
        }
        .flex{
            align-items: center;
            font-size: 28rpx;
            font-weight: bold;
            
        }
        .img{
            width: 56rpx;
            height: 56rpx;
            display: block;
        }
    }
}

// 用户信息
.user_box{
    height: 404rpx;
    background: linear-gradient(180deg, #FF6D75 60%, rgba(255, 255, 255, 0) 100%);
    font-size: 30rpx;
    color: #fff;
    .flex{
        height: 126rpx;
        align-items: center;
        
    }
    .text_box{
        width: 200rpx;
        height: 126rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        text{
            &:nth-child(2){
                opacity: 0.5;
            }
        }
    }
    .login_logo{
        width: 126rpx;
        height: 126rpx;
        border-radius: 50%;
    }
}
</style>