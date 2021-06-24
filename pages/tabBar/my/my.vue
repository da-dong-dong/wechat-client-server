/******************************** 我的 ***************************************/
<template>
    <view class="boxs">
         <uni-nav-bar id="editor" fixed statusBar title="我的"></uni-nav-bar>
        <!-- 用户信息 -->
        <view class="user_seting padd32" >
            <view class="flex" style="margin-bottom: 65rpx;">
                <div class="flex_1">
                    <div class="register" v-if="!get_headimgUrl" @click="getUserInfoAPI(false)">
                        登录/注册
                        <div class="text">拍出自然美</div>
                    </div>
                    <div class="register" v-if="get_nickName">
                        {{get_nickName}}
                        <div class="text">拍出自然美</div>
                    </div>
                </div>
                <div>
                    <image v-if="get_headimgUrl" class="login_logo" :src="get_headimgUrl" @click="setUserInfoImg" style="background: #ECECEC;"></image>
                    <image v-else @click="getUserInfoAPI(false)" class="login_logo" src="/static/image/my/wdl.png"></image>
                </div>
            </view>
            <view class="menu_list">
                <div class="flex mar_t22">
                    <button class="newImgFlex"  @click="getUserInfo" type="primary">
                        <image class="newImg" src="/static/image/my/new1.png"></image>
                        <span>个人资料</span>
                    </button>
                    <div class="newImgFlex" @click="onClikcPage('/pages/order/detail/order-my')">
                        <image class="newImg" src="/static/image/my/new2.png"></image>
                        <span>我的相册</span>
                    </div>
                    <button class="newImgFlex" plain show-message-card session-from send-message-path send-message-title open-type='contact' style="border: 0; padding: 0;">
                        <image class="newImg " src="/static/image/my/new3.png"></image>
                        <span>专属顾问</span>
                    </button>
                    <div class="newImgFlex" @click="onClickService('mack')">
                        <image class="newImg " src="/static/image/my/new4.png"></image>
                        <span>预约协议</span>
                    </div>
                </div>
                <div class="flex mar_t40">
                    <!-- 需要修改 -->
                    <div class="newImgFlex" @click="onClikcPage('/pages/zyd_page/standard/index')">
                        <image class="newImg " src="/static/image/my/new5.png"></image>
                        <span>标准服务</span>
                    </div>
                    <div class="newImgFlex" @click="onClickFeedBack">
                       <image class="newImg " src="/static/image/my/new6.png"></image>
                        <span>意见反馈</span>
                    </div>
                    <div class="newImgFlex" @click="onClikcPage('/pages/collection/index')">
                        <image class="newImg " src="/static/image/my/new7.png"></image>
                        <span>我的收藏</span>
                    </div>
                    <div class="newImgFlex" @click="onClikcPage('/pages/tabBar/my/components/about')">
                        <image class="newImg " src="/static/image/my/new8.png"></image>
                        <span>关于北遇</span>
                    </div>
                </div>
            </view>
        </view>

        <!-- 封面故事 -->
        <view class="cover_content" v-if="imgList.length > 0">
            <div class="bold_T">封面故事</div>
            <scroll-view class="scroll-view_H" scroll-x="true" >
                <view class="scroll-view-item_H" v-for="_ in imgList" :key="_.id">
                    <div class="flex" @click="toWebView(_)">
                        <img class="small_img" :src="_.icon" />
                        <div class="flex_1">
                            <div class="title">{{_.title}}</div>
                            <div class="colorA6">{{_.descs}}</div>
                        </div>
                    </div>
                </view>
            </scroll-view>
        </view>
        <view class="outView" @click="getUserInfoAPI(false)" v-if="!get_headimgUrl" >
            登陆
        </view>
        <view class="outView" @click="onClickOut" v-else >
            退出登陆
        </view>
        <!-- 弹窗 -->
        <i-message id="message" :style="{marginTop:`${heightNav}px`}"/>

        <!-- 设置用户弹窗 -->
        <modulUser v-if="showModalUser" @cancel="cancel"/>

        

        <!-- 底部导航 -->
		<tabBar :index="5"></tabBar>
    </view>
</template>

<script>
// 获取当前小程序信息
const accountInfo = uni.getAccountInfoSync(); 
import { mapGetters, mapActions, mapMutations } from 'vuex'
const { $Message } = require('@/wxcomponents/base/index');
import { setUserInfo, getUserInfo, getCode } from '@/util/api/user.js'
import { getTextImageList } from '@/util/api/order.js'
import modulUser from './components/modulUser';
    export default {
        components: { modulUser},
        computed:{
			...mapGetters('user',[
                'get_phone',
                'get_nickName',
                'get_headimgUrl',
                'get_appId',
                'get_enterpriseId',
                'get_code'
			]),
        },
        onLoad(options) {
            uni.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
        },
        onShow() {
            // 路由返回触发更新
            //this.getUserInfoAPI()
        },
        data(){
            return{
                jsCode:null, //存储登陆code
                userCode:'', // 用户信息
                imgList: [],
                heightNav:0,
                showModalUser:false, // 设置用户弹窗
            }
        },
        mounted(){
            // 获取用户
            //this.getUserInfoAPI()
            //this.login()
            this.getTextImageList()
            // 获取高度
            const query = uni.createSelectorQuery().in(this);
            query.select('#editor').boundingClientRect(data => {
                this.heightNav = data.height
            }).exec();
        },
        methods:{
            ...mapActions('user',[
                'act_nickName',
                'act_code'
            ]),
            ...mapMutations('user',[
                'mut_outCode'
            ]),
            toWebView (_) {
                uni.navigateTo({ 
                    url: `/pages/tabBar/my/components/web_view?url=${_.link}&title=${_.title}` 
                })
            },
            // 获得图文列
            getTextImageList () {
                let params = {
                    appId: this.get_appId,
                    enterpriseId: this.get_enterpriseId
                }
                getTextImageList(params).then(res => {
                    console.log('图文', res)
                    this.imgList = res.data.data
                })
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
                        console.log('获取了code值',this.jsCode)
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
                    setUserInfo(this.userCode).then(res=>{
                        this.getUserInfoAPI('1')
                    })
                })
            },
            
            // 获取用户信息AIP
            getUserInfoAPI(flag){
                getUserInfo().then(res=>{
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area,id} = res.data.data
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area,id})
                    if(flag){
                        this.onClickUserInfo()
                    }
                })
            },
            // 获取用户信息
            getUserInfo(val){
                this.getUserInfoAPI('1')
            },
            onClikcPage (url) {
                uni.navigateTo({ 
                    url
                })
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
            onClickFeedBack () {
                uni.navigateTo({
                    url:'/pages/tabBar/classify/myFeedBack'
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
                        this.mut_outCode()
                        this.act_code(null)
                    },
                    fail: (error) => {}
                })
                
            },

            // 设置用户弹窗
            setUserInfoImg(){
                this.showModalUser = true
            },

            // 
            cancel(){
                this.showModalUser = false
            }
        },
        // 监听cood
		watch:{
			get_code(val){
                if(!val) return
				this.getUserInfoAPI(false)
			}
		}
    }
</script>

<style lang="scss" scoped>
.newImg{
    width: 45rpx;
    height: 45rpx;
}
.menu_list{
    // display: flex;
    padding: 20rpx;
    padding-top: 30rpx;
    margin-top: 30rpx;
    border-top: 1px solid #ECECEC;
    .flex{
        justify-content: space-between;
        div{
            text-align: center;
            display: flex;
            flex-direction: column;
            .iconfont{
                font-size: 48rpx;
                margin-bottom: 10rpx;
            }
        }
        &.mar_t40{
            margin-top: 50rpx;
        }
        &.mar_t22{
            margin-top: 35rpx;
        }
    }
    span{
        font-size: 24rpx;
        color: #676768;
    }
}
.mar_t10{
    margin-top: 20rpx;
}
.boxs{
    height: 100vh;
    background: #F9F9F9;
    box-sizing: border-box;
    padding: 0rpx 0 160rpx;
    overflow: auto;
    .uni-status-bar{
        height: 0;
    }
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
.padd32{
    padding: 32rpx;
}
// 用户设置
.user_seting{
    box-sizing: border-box;
    border-bottom:none;
    width: 686rpx;
    background: #fff;
    border-radius: 20rpx;
    margin: 20rpx auto 20rpx;
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
    .register{
        margin-top: 20rpx;
        font-size: 40rpx;
        font-weight: 600;
        .text{
            font-size: 28rpx;
            color: #999999;
            padding-top: 10rpx;
        }
    }
}
.colorA6{
    color: #A6A6A6;
}
// 用户信息
.user_box{
    height: 404rpx;
    // background: linear-gradient(180deg, #FF6D75 60%, rgba(255, 255, 255, 0) 100%);
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
}
.login_logo{
    width: 126rpx;
    height: 126rpx;
    border-radius: 50%;
}
.cover_content{
    width: 686rpx;
    margin: auto;
    .small_img{
        width: 120rpx;
        height: 120rpx;
        margin-right: 10rpx;
        border-radius: 50%;
    }
    .title{
        font-family: PingFang SC;
        font-weight: bold;
        margin: 10rpx 0;
        font-size: 28rpx;
    }
    .bold_T{
        font-family: Source Han Sans CN;
        font-weight: bold;
        font-size: 30rpx;
    }
}
.scroll-view-item_H{
    padding: 60rpx 40rpx;
    display: inline-block;
    background: #fff;
    border-radius: 20rpx;
	width: 560rpx;
	height: 240rpx;
    margin-left: 30rpx;
    box-sizing: border-box;
    font-size: 26rpx;
    &:first-child{
        margin-left: 0;
    }
}

.scroll-view_H{
    width: 100%;
	height: 240rpx;
	overflow: hidden;
 	white-space: nowrap;
    border-radius: 20rpx;
    margin: 20rpx 0;
}
.outView{
    text-align: center;
    font-size: 32rpx;
    font-family: SourceHanSansCN;
    font-weight: 300;
    color: #999999;
    height: 80rpx;
    line-height: 80rpx;
}
.newImgFlex{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 125rpx;
    line-height: 60rpx;
    }
</style>