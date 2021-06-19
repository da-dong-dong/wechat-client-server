/******************************** 登陆 ***************************************/
<template>
    <view>
       <view class="login_box">
           <view class="login_header">
               <image class="img" src="/static/image/login.png"></image>
           </view>

           <!-- 文字 -->
           <view class="login_text color333">
               <view v-if="showUserURl" class="fontWight marginB20"> {{appName}} </view>
                <view v-if="showUserURl" class="fontSize24">申请获取你的微信绑定的手机号</view>
                <view v-else class="fontSize24">申请获取你的微信号和头像</view>
           </view>

           <!-- 按钮 -->
           <button v-if="showUserURl" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="saveBtn">微信快捷登录</button>
           <button v-else class="saveBtn" open-type="getUserInfo" @getuserinfo="onClickUserInfoAPI" type="primary">同意</button>

           <!-- 按钮 -->
           <view v-if="showUserURl"  class="color999 fontSize24">使用手机号登录</view>

           <!-- 底部悬浮 -->
           <footText />

           <!-- 弹窗 -->
            <i-message id="message" />
       </view>
    </view>
</template>

<script>
import { mapActions,mapGetters,mapMutations } from 'vuex'
// 获取当前小程序信息
const accountInfo = uni.getAccountInfoSync(); 
// 获取ext
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
const { $Message } = require('@/wxcomponents/base/index');
import { getCode, setPhoneNoInfo, setUserInfo, getUserInfo } from '@/util/api/user.js'
    import footText from '@/components/footText.vue'
    export default {
        components:{footText},
        computed:{
			...mapGetters('user',[
                'get_headimgUrl'
			]),
        },
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
                showUserURl:true, // 是否是第一次获取用户信息
            }
        },
        methods:{
            ...mapActions('user',[
				'act_code',
                'act_nickName'
			]),
            ...mapMutations('user',[
                'mut_outCode'
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
           async getCode(param){
               let code = await getCode(param)
                code = code.data.data
                // 存储 
                this.act_code(code)
                // 存储本地
                uni.setStorage({
                    key: 'code',
                    data: code
                })
                let user = await getUserInfo()
                let {headimgUrl,nickName,phone,sex,birthday,province,city,area,id} = user.data.data
                console.log(headimgUrl)
                this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area,id})

                this.setPhoneNoInfo(this.phoneCode)
            },

            // 设置手机号
            setPhoneNoInfo(param){
                setPhoneNoInfo(param).then(res=>{
                    let code = res.data.code
                    let route = 1; //记录上一页路由
                    if(code == 200){
                        
                        // 判断是否第一次
                        if(!this.get_headimgUrl){
                            this.showUserURl = false
                            return 
                        }
                        // 判断路由返回当前页面
                        let pages = getCurrentPages();
                        for(let i=pages.length-1;i>=0;i--){
                            if(pages[i].route !== 'pages/login/index'){
                                route = pages[i].route
                                break
                            } 
                        }
                        // 判断是否是导航栏
                        if(route.indexOf("components/order_confirm") != -1 || route.indexOf("components/buyOrder") != -1 || route.indexOf("classify/feedBack") != -1 ){
                            uni.navigateTo({ 
                                url: `/${route}`
                            })
                        }else{
                            uni.switchTab({ 
                                url: `/${route}`
                            })
                        }
                        console.log(route)
                    }
                })
            },

            // 获取用户信息AIP
            getUserInfoAPI(){
                getUserInfo().then(res=>{
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area,id} = res.data.data
                    this.mut_outCode()
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area,id})
                })
                
            },

            // 获取用户信息
            onClickUserInfoAPI(val){
                let param = val.detail
                if(param.encryptedData){
                    param.errMsg = null
                    param.userInfo = null
                    setUserInfo(param).then(res=>{
                        let code = res.data.code
                        let route = 1; //记录上一页路由
                        if(code == 200){
                            // 判断路由返回当前页面
                            let pages = getCurrentPages();
                            for(let i=pages.length-1;i>=0;i--){
                                if(pages[i].route !== 'pages/login/index'){
                                    route = pages[i].route
                                    break
                                } 
                            }
                            // 判断是否是导航栏
                            if(route.indexOf("components/order_confirm") != -1 || route.indexOf("components/buyOrder") != -1 || route.indexOf("classify/feedBack") != -1 ){
                                uni.navigateTo({ 
                                    url: `/${route}`
                                })
                            }else{
                                uni.switchTab({ 
                                    url: `/${route}`
                                })
                            }
                            this.getUserInfoAPI()
                        }
                    })
                }else{
                    $Message({
                        content:'取消授权',
                        type: 'error'
                    });
                }
            },


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