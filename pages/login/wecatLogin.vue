/******************************** 微信登陆 ***************************************/
<template>
    <view>
        <button class="marginB10" @click="onClickLogin" type="primary">登陆</button>
        <button v-if="numBerShow" class="marginB10" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" type="primary">授权手机号码</button>
        <button v-if="infoShow" class="marginB10" open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary">授权用户信息</button>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import { getCode, getAuthorState, setPhoneNoInfo, setUserInfo } from '@/util/api/user.js'
// 获取当前小程序信息
const accountInfo = uni.getAccountInfoSync(); 
const base64 = require('@/util/lib/base64.js').Base64;
const { $Message } = require('@/wxcomponents/base/index');
var tiem = null
    export default {
        computed:{
			...mapGetters('user',[
				'get_code'
			]),
        },
        data(){
            return{
                numBerShow: false, // 授权电话
                infoShow: false, // 授权用户信息
            }
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
                        getCode(param).then(res=>{
                            let code = res.data.data
                            // 存储 
                            this.act_code(code)
                            let codeJons = JSON.parse(base64.decode(code.split('.')[1])).exp+'000';
                            console.log(code)
                            console.log(JSON.parse(base64.decode(code.split('.')[1])))
                            // 存储本地
                            uni.setStorage({
                                key: 'code',
                                data: code
                            })
                            // 开启计时器
                            tiem = setInterval(() => {
                                console.log(parseInt((codeJons-new Date().getTime())/1000/60))
                                if(parseInt((codeJons - new Date().getTime())/1000/60) <= 5){
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
                                if(parseInt((codeJons - new Date().getTime())/1000/60) <= 5){
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
                            this.onClickLogin()
                        }
					},
					fail: (err)=>{
                        this.codeLogin();
					}
				})
            },

            // 登陆获取授权信息
            onClickLogin(){
                // 判断是否拿到code
                if(this.get_code){
                    getAuthorState().then(res=>{
                        let {isPhoneInfoAuthorization,isUserInfoAuthorization} = res.data.data
                        if(isPhoneInfoAuthorization && isUserInfoAuthorization){
                            uni.switchTab({
                                url:'/pages/tabBar/my/my'
                            })
                        }else{
                            $Message({
                                content:'请授权',
                                type: 'error'
                            });
                        }
                        this.numBerShow = !isPhoneInfoAuthorization
                        this.infoShow = !isUserInfoAuthorization
                    })
                    
                }else{
                    this.checkTimeCode()
                }
                
            },

            // 获取用户信息
            getUserInfo(val){
                let param = val.detail
                if(param.encryptedData){
                    param.errMsg = null
                    param.userInfo = null
                    setUserInfo(param).then(res=>{
                        this.infoShow = false
                        if(!this.numBerShow && !this.infoShow){
                            uni.switchTab({
                                url:'/pages/tabBar/my/my'
                            })
                        }
                    })
                }else{
                    $Message({
                        content:'取消授权',
                        type: 'error'
                    });
                }
            },

            // 获取手机号码
            getPhoneNumber(val){
                let param = val.detail
                if(param.encryptedData){
                    param.errMsg = null
                    setPhoneNoInfo(param).then(res=>{
                        this.numBerShow = false
                        if(!this.numBerShow && !this.infoShow){
                            uni.switchTab({
                                url:'/pages/tabBar/my/my'
                            })
                        }
                    })
                }else{
                    $Message({
                        content:'取消授权',
                        type: 'error'
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>