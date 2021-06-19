<template>
    <view class="order_confirm_detail">
        <view class="msg_div">
            <div class="title">客户信息</div>
            <div class="flex">
               <span class="name">{{onlineCustomerContactDtos.callName}}</span>
               <span class="flex_1">
                   <input class="uni-input" :value="onlineCustomerContactDtos.name"  @input="(e) => { onlineCustomerContactDtos.name = e.detail.value }" placeholder="请输入您的姓名" />
               </span>
            </div>
            <div class="flex">
                <span class="name">联系方式</span>
                <span class="flex_1">
                    <input class="uni-input" :value="onlineCustomerContactDtos.mobile" @input="(e) => { onlineCustomerContactDtos.mobile = e.detail.value }" placeholder="请输入您的联系方式" />
                </span>
            </div>
            <div class="flex">
                <span class="name">{{onlineCustomerContactDtos1.callName}}</span>
                <span class="flex_1">
                    <input class="uni-input" :value="onlineCustomerContactDtos1.name" @input="(e) => { onlineCustomerContactDtos1.name = e.detail.value }" placeholder="请输入您的姓名" />
                </span>
            </div>
            <div class="flex">
                <span class="name">联系方式</span>
                <span class="flex_1">
                    <input class="uni-input" :value="onlineCustomerContactDtos1.mobile" @input="(e) => { onlineCustomerContactDtos1.mobile = e.detail.value }" placeholder="请输入您的联系方式" />
                </span>
            </div>
            <div class="flex no_border">
                <span class="name">婚期</span>
                <span class="flex_1 r_icon">
                    <picker class="txt_r" mode="date" @change="bindDateChange">
                        <view class="uni-input">{{ typeTime | times('请选择您的婚期') }}</view>
                    </picker>
                    <i class="iconfont iconleft"></i>
               </span>
            </div>
        </view>
        
        <view class="" v-if="get_quickList.length">
            <view v-for="(item,index) in get_quickList" :key="index">
                <view class="msg_div" >
                    <div class="title">订单信息</div>
                    <view class="flex no_border" >
                        <img class="h145" :src="item.imgs"/>
                        <view class="flex_1">
                            <view class="padding">
                                <span class="font600">{{item.name}}</span>
                                <span class="float_r colorA3">￥{{item.price}}</span>
                            </view>
                            <view class="font14">
                                预付金: <span class="orange">￥{{item.assemblyDeposit ? item.assemblyDeposit : 0 }}</span> 
                            </view>
                            <view class="font14">
                                尾款: ￥{{ item.assemblyDeposit ? item.price - item.assemblyDeposit : item.price }}
                            </view>
                        </view>
                    </view>
                </view>

                <view class="msg_div">
                    <div class="flex">
                        <span class="name">预约时间</span>
                        <span class="flex_1 r_icon" @click="onChangeTime(item.id,index,item.shopId,0)">
                                <text class="" v-if="item.times">{{item.times}} {{item.filesTime}}</text>
                                <text class="" v-else>请选择</text>
                                <i class="iconfont iconleft"></i>
                        </span>
                    </div>
                    <div class="flex" v-if="item.assemblyType === 1">
                        <span class="name">预约时间</span>{{}}
                        <span class="flex_1 r_icon" @click="onChangeTime(item.id,index,item.shopId,1)">
                                <text class="" v-if="item.times1">{{item.times1}} {{item.filesTime1}}</text>
                                <text class="" v-else>请选择</text>
                                <i class="iconfont iconleft"></i>
                        </span>
                    </div>
                    <div class="flex no_border" @click="onChangeShopId(item.id,index)">
                        <span class="name">预约门店</span>
                        <span class="flex_1 r_icon">
                                {{item.shopName?item.shopName:'请选择'}}
                                <i class="iconfont iconleft"></i>
                        </span>
                    </div>
                </view>
            </view>
        </view>

        <view class="msg_div">
			<!-- {{ discountNum * 10 }}折优惠 -->
           <div class="title border"> 邀请福利
               <span class="float_r circle" :class="{ current: discountBool }" @click="() => { discountBool = !discountBool }"></span>
           </div>
           <template v-if="discountBool">
            <div class="flex">
                <span class="name">介绍人</span>
                <span class="flex_1">
                    <input class="uni-input" :value="introduceName" @input="(e) => { introduceName = e.detail.value }" placeholder="请输入介绍人" />
                </span>
            </div>
            <div class="flex no_border">
                <span class="name">手机号码</span>
                <span class="flex_1">
                    <input class="uni-input" @input="changeInput" :value="introduceMobil" placeholder="请输入手机号码" :maxlength="11"/>
                </span>
            </div>
           </template>
        </view>

        <view class="footer">
            <div class="footer_l">
                预定金: <span class="orange">￥{{sumPayment}}</span>
            </div>
            <span class="footer_r" @click="onQuick">立即支付</span>
        </view>

        <!-- 弹窗信息 -->
        <uni-popup ref="popup" type="dialog">
            <uni-popup-dialog mode="base" content="您输入的介绍人的手机号不存在，不能享受优惠" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
        </uni-popup>

        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { listCategory, order } from '@/util/api/goods.js'
import { get_discount, getCustomerContactByMobile } from '@/util/api/order.js'
import {  getUserInfo,  } from '@/util/api/user.js'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
const { $Message } = require('@/wxcomponents/base/index');
    export default {
       components:{ uniPopupDialog},
        computed:{
			...mapGetters('user',[
                'get_shopId',
                'get_phone',
                'get_nickName',
                'get_appId',
                'get_enterpriseId'
            ]),
            ...mapGetters('carList',[
				'get_quickList'
            ]),
            sumPayment () {
                let sum = 0
                this.get_quickList.forEach(_ => {
                    sum += _.assemblyDeposit ? _.assemblyDeposit : 0
                })
                return sum
            }
        },
        mounted(){
            // 档期类别
            this.onlineCustomerContactDtos1.mobile = this.get_phone
            this.onlineCustomerContactDtos1.name = this.get_nickName
            this.listCategory()
            this.get_discount()
            if(!this.get_phone){
                // 获取用户信息AIP
                getUserInfo().then(res=>{
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area,id} = res.data.data
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area,id})
                    this.onlineCustomerContactDtos1.mobile = phone
                    this.onlineCustomerContactDtos1.name = nickName
                })
            }
        },
        onUnload(){
            let pages = getCurrentPages();
            let backNum = 0
            let backFlag = false; // 记录是否跳过登录页
            for(let i=pages.length-1;i>=0;i--){
                console.log(pages[i].route)
                if(pages[i].route === 'pages/tabBar/classify/components/details'){
                    break
                } 
                backNum++
            }
            //上一个页面
            if(pages[pages.length - 2].route === 'pages/login/index'){
                backFlag = true
            }else{
                backFlag = false
            } 
            if(backFlag){
                uni.navigateBack({//返回
                    delta: backNum
                })
            }
            this.onlineCustomerContactDtos1.mobile = this.get_phone
            this.onlineCustomerContactDtos1.name = this.get_nickName
            
        },
        data(){
            return{
                // 宝宝
                onlineCustomerBabyDtos:{
                    birthdayLunar: true, // 农历还是阴历
                    birthdayTime: '', // 出生日期
                    callName: "", // 宝宝称呼
                    display: true, // 是否显示
                    name: "", // 宝宝姓名
                    sex: true, // 性别，false：女，true：男
                    zodiac: ""
                },
                // 客户
                onlineCustomerContactDtos:{
                    address: "", // 地址
                    birthdayLunar: true, // 是否农历
                    birthdayTime: 0, // 出生日期
                    callName: "女士", // 联系人称呼
                    display: true, // 是否显示
                    email: "", // 邮箱
                    main: true, // 是否主联系人
                    mobile: "", // 手机号码
                    name: "", // 客户姓名
                    qq: "", // QQ
                    sex: false, // 	性别，false：女，true：男
                    tel: "", // 固定电话
                    wechat: "", //	微信
                    workUnit: "", // 工作单位
                },
                onlineCustomerContactDtos1:{
                    address: "", // 地址
                    birthdayLunar: true, // 是否农历
                    birthdayTime: 0, // 出生日期
                    callName: "男士", // 联系人称呼
                    display: true, // 是否显示
                    email: "", // 邮箱
                    main: false, // 是否主联系人
                    mobile: "", // 手机号码
                    name: "", // 客户姓名
                    qq: "", // QQ
                    sex: true, // 	性别，false：女，true：男
                    tel: "", // 固定电话
                    wechat: "", //	微信
                    workUnit: "", // 工作单位
                },
                discountBool: false,
                discountCan: false,
                typeTime: null,
                discountNum: 1,
                introduceName: '',
                introduceMobil: '',
                flag: true // 开关
            }
        },
         methods:{
            ...mapActions('carList',[
                'act_typeHeader'
            ]),
            ...mapActions('user',[
                'act_nickName',
            ]),
            async get_discount () {
                let parms = {
                    appId: this.get_appId,
                    enterpriseId: this.get_enterpriseId
                }
                let res = await get_discount(parms)
                this.discountNum = res.data.data
            },
            async getCustomerContactByMobile () {
                let parms = {
                    enterpriseId: this.get_enterpriseId,
                    mobile: this.introduceMobil
                }
                let res = await getCustomerContactByMobile(parms)
                console.log('是否能享受折扣', res.data)
                // 禁止支付
                if(!res.data.data) {
                    // this.flag = false
                    this.$refs.popup.open()
                }else{
                    // this.flag = true
                }
                this.discountCan = res.data.data
            },
            // 输入手机号
            changeInput (e) {
                this.introduceMobil = e.detail.value
                if (this.introduceMobil.length >= 11) {
      //               if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.introduceMobil))){ 
      //                   $Message({
						// 	content: '手机号码有误，请重填',
						// 	type: 'error',
						// }); 
      //                   return false; 
      //               } 
                    this.getCustomerContactByMobile()
                }
            },
            // 关闭弹窗
            close() {
                this.$refs.popup.close()
                this.introduceMobil = ''
            },
            confirm() {
                this.introduceMobil = ''
                this.$refs.popup.close()
            },
            // 婚纱
			bindDateChange (e) {
				this.typeTime = new Date(e.target.value).getTime()
            },
             // 获取类别
            listCategory(){
                listCategory({categoryType:'TYPOGRAPHY_GROUP'}).then(res=>{
                    this.act_typeHeader(res.data.data) 
                })
            },

            // 修改预约时间
            onChangeTime(id,index,shopId,assemblyType){
                uni.navigateTo({ 
                    url: `/pages/tabBar/shoppingCart/components/changeTimes?id=${id}&index=${index}&orderType=${this.get_quickList[0].orderType}&shopId=${shopId}&assemblyType=${assemblyType}`
                })
            },

            // 选择门店
            onChangeShopId(id,index){
                uni.navigateTo({ 
                    url: `/pages/tabBar/shoppingCart/components/changeRegion?id=${id}&index=${index}&quick=${true}`
                })
            },
            
            // 保存
            onClickSave(){
                uni.navigateBack()
            },


            // 跳转服务协议
            onClickServe(){
                uni.navigateTo({ 
                    url: `/pages/tabBar/my/components/serviceAgreement?type=mack`
                })
            },

            // 支付页
            onQuick(){
                if(!this.flag) return
                if(this.discountBool && this.introduceMobil.length < 11){
                //     if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.introduceMobil))){ 
					$Message({
						content: '手机号码需要十一位',
						type: 'error',
					}); 
					return
                //     }
                }
				// if(this.discountBool && !this.discountCan) {
				// 	$Message({
				// 		content: '该介绍人手机号不存在, 不能享受优惠',
				// 		type: 'error',
				// 	}); 
				// 	return
				// }
                this.flag = false

                // 客户信息
                let userInfoData =  []
                // 判断第一项是否有值
                if(this.onlineCustomerContactDtos.name){
					this.onlineCustomerContactDtos1.main = false
                    userInfoData =  [ this.onlineCustomerContactDtos, this.onlineCustomerContactDtos1 ]
                }else{
					this.onlineCustomerContactDtos1.main = true
                    userInfoData =  [  this.onlineCustomerContactDtos1 ]
                    // userInfoData[0].main = true
                }
                // 宝宝信息
                // let refBabaData = []
                // if(this.get_quickList[0].orderType == "BABY"){
                //     refBabaData.push(this.$refs.refBaba.save())
                // }
                
                // 组装数据
                let param = {
                    // 	客户组
                    customerGroupDto:{
                        onlineCustomerBabyDtos:[],
                        onlineCustomerContactDtos:[],
                        referrerName: this.introduceName,
                        referrerMobile: this.introduceMobil
                    },
                    orderDtos:[], // 	订单商品信息
                    discount: this.discountBool && this.discountCan ? this.discountNum : 1,
                    weddingDay: this.typeTime,
                    orderShopId: this.get_shopId.shopId // 开单门店ID
                }
                // 组装 客户
                // param.customerGroupDto.onlineCustomerBabyDtos = refBabaData
                param.customerGroupDto.onlineCustomerContactDtos = userInfoData
               

                // 组装 订单信息
                
                this.get_quickList.map(item=>{
                    let json = {}
                    let arr = []
                    json.reservationPhotoDto = {} //预约信息
                    json.assemblyId = item.id // 套系ID
                    json.reservationPhotoDto.reservationDate = new Date(item.times).getTime()-28800000  // 预约时间 时间戳
                    json.reservationPhotoDto.reservationShopId = item.shopId //	预约门店ID
                    json.reservationPhotoDto.reservationTime = item.filesTime // 预约门店ID
                    json.reservationPhotoDto.typographyTypeId = item.typographyTypeId //模板ID
                    
                    arr.push(json.reservationPhotoDto)
                    if(item.times1 !== undefined){
                        arr.push({
                            reservationDate : new Date(item.times1).getTime()-28800000,  // 预约时间 时间戳
                            reservationShopId : item.shopId, //	预约门店ID
                            reservationTime : item.filesTime1, // 预约门店ID
                            typographyTypeId : item.typographyTypeId1, //模板ID
                        })
                    }
                    json.reservationPhotoDto = arr
                    param.orderDtos.push(json)
                })
                console.log(param,'请求参数')
                //console.log('支付页！',this.get_quickList)
               
                //下单
                order(param).then(res=>{
                    let data = res.data.data
                    if(res.data.code !== 200){
                        this.flag = true
                        if(res.data.code === -1){
                            uni.switchTab({
                                url:'/pages/tabBar/order/order'
                            })
                        }
                    }else{
                        uni.setStorage({
							key: 'orderId',
							data: data
						})
						uni.switchTab({
                            url:'/pages/tabBar/order/order'
                        })
                    }
                    console.log(data,'支付结果')
                    
                })
                
            }
        }
    }
</script>

<style lang="less" scoped>
.order_confirm_detail{
    height: 100vh;
    padding: 20rpx;
    overflow: auto;
    box-sizing: border-box;
    background: #F9F9F9;
    overflow: auto;
    padding-bottom: 100rpx;
    .border{
        border-bottom: 1px solid #ECECEC;
    }
    .footer{
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        height: 100rpx;
        background: #fff;
        box-sizing: border-box;
        padding: 10rpx 20rpx;
        display: flex;
        .footer_l{
            flex: 1;
            display: flex;
            align-items: center;
        }
        .footer_r{
            color: #fff;
            display: flex;
            align-items: center;
            background: #D3AB75;
            border-radius: 30rpx;
            justify-content: center;
            width: 200rpx;
            margin: 4rpx 0;
        }
    }
    .msg_div{
        padding: 20rpx 0;
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
    }
    .title{
        font-weight: 600;
        font-size: 30rpx;
        padding: 20rpx;
    }
    .float_r{
        float: right;
    }
    .flex{
        padding: 20rpx;
        border-bottom: 1px solid #ECECEC;
        .name{
            width: 140rpx;
            margin-right: 80rpx;
            text-align: justify;
            text-align-last: justify;
            height: 40rpx;
        }
        .name:after {
            content: "";
            width: 100%;
            height: 0;
            display: inline-block;
            visibility: hidden;
        }
        .h145{
            width: 150rpx;
            height: 150rpx;
            margin-right: 20rpx;
            border-radius: 10rpx;
        }
        .flex_1{
            view{
                padding: 8rpx 0;
            }
        }
        .r_icon{
            display: flex;
            justify-content: flex-end;
            .iconfont{
                display: flex;
                width: 60rpx;
                justify-content: center;
                align-items: center;
            }
            .txt_r{
                flex: 1;
            }
        }
        .font600{
            font-weight: 600;
        }
        .padding{
            padding: 10rpx 0;
        }
        .font14{
            font-size: 26rpx;
            color: #A3A3A3;
        }
        .colorA3{
            color: #A3A3A3;
        }
    }
    .orange{
        color: #D3AB75;
    }
    .no_border{
        border: none;
    }
    .circle{
        width: 42rpx;
        height: 42rpx;
        border-radius: 50%;
        border: 1px solid #ECECEC;
        display: flex;
        justify-content: center;
        align-items: center;
        &.current{
            border: 1px solid #D3AB75;
        }
        &.current::after{
            display: block;
            content: '';
            width: 30rpx;
            height: 30rpx;
            border-radius: 50%;
            background: #D3AB75;
        }
    }
}
</style>
