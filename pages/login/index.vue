/******************************** 登陆 ***************************************/
<template>
    <view>
       <view class="login_box">
           <view class="login_header">
               <image class="img" src="/static/image/login.png"></image>
           </view>

           <!-- 文字 -->
           <view class="login_text color333">
               <view class="fontWight marginB20"> {{appName}} </view>
                <view class="fontSize24">申请获取你的微信绑定的手机号</view>
           </view>

           <!-- 按钮 -->
           <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="saveBtn">微信快捷登录</button>

           <!-- 按钮 -->
           <view class="color999 fontSize24">使用手机号登录</view>

           <!-- 底部悬浮 -->
           <footText />

           <!-- 弹窗 -->
            <i-message id="message" />
       </view>
    </view>
</template>

<script>
import { mapActions } from 'vuex'
// 获取当前小程序信息
const accountInfo = uni.getAccountInfoSync(); 
// 获取ext
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
const { $Message } = require('@/wxcomponents/base/index');
import { getCode, setPhoneNoInfo } from '@/util/api/user.js'
    import footText from '@/components/footText.vue'
    export default {
        components:{footText},
        onLoad(options) {
            // 获取模板名称
            this.appName = extConfig.appName
            
            this.login()
        },
        data(){
            return{
                appName:'', // 模板名称
                phoneCode:null, // 加密电话
                jsCode:null,
            }
        },
        methods:{
            ...mapActions('user',[
				'act_code'
			]),
            // 获取手机号
            getPhoneNumber(val){
               this.phoneCode = val.detail
               console.log(this.phoneCode)
                if(this.phoneCode.encryptedData){
                    this.getCode(this.jsCode)
                }else{
                    $Message({
                        content:'取消授权',
                        type: 'error'
                    });
                }
            },

            // 获取code值
            login(){
                uni.login({
                    provider: 'weixin',
                    success:(res) => {
                        // 获取code值
                        let param = {
                            jsCode: res.code,
                            authorizerAppid:  accountInfo.miniProgram.appId
                        }
                        this.jsCode = param
                    }
                });
            },

            // 获取登陆信息
            getCode(param){
                getCode(param).then(res=>{
                    let code = res.data.data
                    // 存储 
                    this.act_code(code)
                    // 存储本地
                    uni.setStorage({
                        key: 'code',
                        data: code
                    })
                    console.log(code)
                    this.setPhoneNoInfo(this.phoneCode)
                })
            },

            // 设置手机号
            setPhoneNoInfo(param){
                setPhoneNoInfo(param).then(res=>{
                    let code = res.data.code
                    if(code == 200){
                        uni.navigateBack()
                    }
                })
            }

        }
    }
</script>

<style lang="scss" scoped>

.login_box{
    padding: 0 38rpx;
    text-align: center;
    .saveBtn{
        width: 546rpx;
        margin-top: 60rpx;
        margin-bottom: 30rpx;
    }
}
.login_header{
    margin-top: 168rpx;
    .img{
        width: 128rpx;
        height: 128rpx;
    }
}
.login_text{
    
    font-size: 48rpx;
    margin-top: 122rpx;
}
</style>