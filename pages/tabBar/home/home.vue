/******************************** 首页 ***************************************/
<template>
    <view>
        我是首页
       
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
const { $Message } = require('@/wxcomponents/base/index');
import { getLongin } from '@/util/api/user.js'
const accountInfo = uni.getAccountInfoSync();
    export default {
       
        mounted(){
            
        },
		 onLoad() {
            // 查看是否授权
            console.log('sss')
            wx.getUserInfo({
                    success: function(res) {
                    console.log(res.userInfo)
                    }
                })
            wx.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                    success: function(res) {
                    console.log(res.userInfo)
                    }
                })
                }
            }
            })
        },
        methods:{
            // 检查登陆
            checkLogin(){
                uni.authorize({
                    scope: 'scope.userInfo',
                    success() {
                        uni.getUserInfo({
                            provider: 'weixin',
                            success: function (infoRes) {
                                console.log(infoRes)
                                console.log('用户昵称为：' + infoRes.userInfo.nickName);
                            }
                        });
                    }
                })
                // 获取code值
                // uni.login({
                //     provider: 'weixin',
                //     success: function (res) {
                //         let param = {
                //             jsCode: res.code,
                //             appId:  accountInfo.miniProgram.appId
                //         }
                //         console.log(accountInfo.miniProgram.appId)
                //         // 获取用户信息
                //         uni.getUserInfo({
                //             provider: 'weixin',
                //             success: function (infoRes) {
                //                 console.log(infoRes)
                //                 console.log('用户昵称为：' + infoRes.userInfo.nickName);
                //             }
                //         });
                //         // getLongin(param).then(res=>{
                //         //     console.log(res);
                //         //     uni.getUserInfo({
                //         //         provider: 'weixin',
                //         //         success: function (infoRes) {
                //         //             console.log(infoRes)
                //         //             console.log('用户昵称为：' + infoRes.userInfo.nickName);
                //         //         }
                //         //     });
                //         // })
                //     }
                // });
            },
            getPhoneNumber(e) { 
                console.log(e) 
                console.log(e.detail.errMsg);  
                console.log(e.detail.iv);  
                console.log(e.detail.encryptedData);  
                
            },

           
        }   
    }
</script>

<style lang="scss" scoped>

</style>