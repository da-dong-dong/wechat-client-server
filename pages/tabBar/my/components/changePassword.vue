/******************************** 修改密码 ***************************************/
<template>
    <view>
         <view class="user_seting marginT10">
            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">手机号码</text>
                </view>
                <input class="width" type="text" placeholder="请输入手机号码" v-model="userInfo.phone"/>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">验证码</text>
                </view>
                <view class="flexs">
                    <input class="width" type="text" placeholder="请输入验证码" v-model="userInfo.verificationCode"/>
                    <text @click="onSendCoode">{{textCode}}</text>
                </view>
                
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>
            
            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">新密码</text>
                </view>
                <input class="width" type="text" placeholder="请输入密码" v-model="userInfo.newPassword"/>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">确认密码</text>
                </view>
                <input class="width" type="text" placeholder="请输入确认密码" v-model="userInfo.passwordCheck"/>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>
           
        </view>

        <!-- 保存 -->
        <view class="saveBtn" @click="onClickSave">保存</view>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
const { $Message } = require('@/wxcomponents/base/index');
import { sendVerificationCode, updatePassword } from '@/util/api/user.js'
    export default {
        computed:{
            ...mapGetters('user',[
                'get_phone',
			]),
            
        },
        data(){
            return{
                userInfo:{
                    phone:'13068254894',
                    verificationCode:'',
                    newPassword:'',
                    passwordCheck:''
                },
                // 验证码
                textCode:'发送验证码',
                time:null,
				timeNub:60
            }
        },
        mounted(){
            // 初始化手机号码
            this.userInfo.phone = this.get_phone
        },
        methods:{
            // 发送验证码
            onSendCoode(){
                //判断为空
				let {phone} = this.userInfo;
				
				if(!(/^1[34578]\d{9}$/.test(phone))){
					$Message({
						content: '手机号码有误，请重填',
						type: 'error'
					});
					return
                }
                if(this.time) return 
				this.time= setInterval(() => {
					this.timeNub--
					this.textCode = `${this.timeNub}秒后重发`
					if(this.timeNub == 0){
						clearInterval(this.time)
						this.time = null
						this.textCode = '发送验证码'
						this.timeNub = 60
					}
                }, 1000);
                
                sendVerificationCode({phone}).then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        $Message({
                            content: '发送成功',
                            type: 'success'
                        });
                    }
                })
            },

            // 保存
            onClickSave(){
                //判断两次密码是否一直
                let {newPassword,passwordCheck,verificationCode} = this.userInfo;
                if(!verificationCode){
                    $Message({
						content: '请输入验证码',
						type: 'error'
                    });
                    return 
                }
                if(newPassword != passwordCheck){
                    $Message({
						content: '两次密码不一致',
						type: 'error'
                    });
                    return
                }
                updatePassword(this.userInfo).then(res=>{
                    if(res.data.code == 200){
                        $Message({
                            content: '成功',
                            type: 'success'
                        });
                        uni.navigateBack()
                    }
                })
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.user_seting{
    border: 1px solid #D8D8D8;
    border-bottom:none;
    font-size: 28rpx;
    .user_seting_li{
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1px solid #D8D8D8;
        align-items: center;
        justify-content: space-between;
        .flex{
            width: 230rpx;
        }
        .flexs{
            display: flex;
            align-items: center;
            .width{
                width: 192rpx;
            }
        }
        .width{
            width: 330rpx;
        }
    }
}
</style>