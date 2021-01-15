/******************************** 微信登陆 ***************************************/
<template>
    <view>
        code值{{get_code}}
        <button @click="onClickLogin">登陆</button>
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号码</button>
        <button open-type="getUserInfo" @getUserInfo="getUserInfo">获取用户信息</button>

        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import { getLongin } from '@/util/api/user.js'
// 获取当前小程序信息
const accountInfo = uni.getAccountInfoSync(); 
const base64 = require('@/util/lib/base64.js').Base64;
var tiem = null
    export default {
        computed:{
			...mapGetters('user',[
				'get_code'
			]),
		},
        onLoad(options) {
            this.checkTimeCode()
        },
        methods:{
            ...mapActions('user',[
				'act_code'
			]),
            // 获取code
            codeLogin(){
                uni.login({
                    provider: 'weixin',
                    success:(res) => {
                        let param = {
                            jsCode: res.code,
                            authorizerAppid:  accountInfo.miniProgram.appId
                        }
                        console.log(accountInfo.miniProgram.appId)
                        getLongin(param).then(res=>{
                            let code = res.data.data
                            // 存储 
                            this.act_code(code)
                            let codeJons = JSON.parse(base64.decode(code.split('.')[1])).exp+'000';
                            console.log(code)
                            console.log(codeJons)
                            // 存储本地
                            uni.setStorage({
                                key: 'code',
                                data: code
                            })
                            // 开启计时器
                            tiem = setInterval(() => {
                                console.log(parseInt((codeJons-new Date().getTime())/1000/60))
                                if(parseInt((codeJons - new Date().getTime())/1000/60)== 5){
                                    clearInterval(tiem)
                                    uni.removeStorage({
                                        key: 'code',
                                        success: (result) => {
                                            this.checkTimeCode()
                                        },
                                        fail: (error) => {}
                                    })
                                    
                                }
                            }, 1000);
                        })
                    }
                });
            },
            // 检查code
            checkTimeCode(){
                let _this = this
                clearInterval(tiem)
                uni.getStorage({
					key: 'code',
					success: (res)=> {
                        let data = res.data
                        console.log(data)
                        let codeJons = JSON.parse(base64.decode(data.split('.')[1])).exp+'000';
                        let times = parseInt((codeJons-new Date().getTime())/1000/60)
                        // 判断120分钟
                        console.log(times)
                        if(times <= 5){
                            console.log('请求');
                            this.codeLogin()
                        }else{
                            this.act_code(data)
                            console.log('2小时再次请求')
                            // uni.redirectTo({
                            //     url:'/pages/login/wecatCheck'
                            // })
                           tiem = setInterval(() => {
                                console.log(parseInt((codeJons-new Date().getTime())/1000/60))
                                if(parseInt((codeJons - new Date().getTime())/1000/60) == 5){
                                    clearInterval(tiem)
                                    uni.removeStorage({
                                        key: 'code',
                                        success: (result) => {
                                            this.checkTimeCode()
                                        },
                                        fail: (error) => {}
                                    })
                                    
                                }
                            }, 1000);
                        }
					},
					fail: (err)=>{
                        this.codeLogin();
					}
				})
            },
            // 登陆获取授权信息
            onClickLogin(){
                console.log('授权');
                uni.switchTab({
                    url:'/pages/tabBar/my/my'
                })
            },
            // 获取用户信息
            getUserInfo(val){
                console.log(val)
            },
            // 获取手机号码
            getPhoneNumber(val){
                console.log(val)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>