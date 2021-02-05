/******************************** 确认订单 ***************************************/
<template>
    <view class="boxs">
        <!-- 客户信息 -->
        <view  class="userInput paddingRL20">
            <view class="userInputBox ">
                <view class="paddingTB20  paddingRL20 fontSize32 fontWight">  客户信息  </view>
                <view class="paddingT10">
                    <!-- 婚纱 -->
                    <view v-if="get_quickList[0].orderType == 'WEDDING_DRESS'">
                        <!-- 默认获取用户信息 -->
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL20">姓名</text>
                                <input class="width" type="text" placeholder="请输入姓名" v-model="onlineCustomerContactDtos.name"/>
                            </view>
                            <i-icon class="icon" type="" size="20" color="#707070"  />
                        </view>
                        <picker @change="change" :value="index" :range="sexArr">
                            <view class="userbox flex paddingRL20" >
                                <view class="border flex paddingTB20">
                                    <view class="flex">
                                        <text class="paddingRL20">性别</text>
                                        <text class="width">{{sexArr[userInfo.sex-1]}}</text>
                                    </view>
                                    <i-icon class="icon" type="enter" size="20" color="#707070"  />
                                </view>
                            </view>
                        </picker>
                        <view class="userbox flex paddingRL20" >
                            <view class="border flex paddingTB20 bottm">
                                <view class="flex">
                                    <text class="paddingRL20">手机号码</text>
                                    <input class="width" type="text" placeholder="请输入手机号" v-model="onlineCustomerContactDtos.mobile"/>
                                </view>
                                <i-icon class="icon" type="" size="20" color="#707070"  />
                            </view>
                        </view>
                        <!-- 第二位 -->
                        
                        <view class="userbox flex paddingRL20" >
                            <view class="flex ">
                                <text class="paddingRL20">姓名</text>
                                <input class="width" type="text" placeholder="请输入姓名" v-model="onlineCustomerContactDtos1.name"/>
                            </view>
                            <i-icon class="icon" type="" size="20" color="#707070"  />
                        </view>
                        <picker @change="change1" :value="index1" :range="sexArr">
                            <view class="userbox flex paddingRL20" >
                                <view class="border flex paddingTB20">
                                    <view class="flex">
                                        <text class="paddingRL20">性别</text>
                                        <text class="width">{{sexArr[userInfo.sex1-1]}}</text>
                                    </view>
                                    <i-icon class="icon" type="enter" size="20" color="#707070"  />
                                </view>
                            </view>
                        </picker>
                        <view class="userbox flex paddingRL20" >
                            <view class="border flex paddingTB20">
                                <view class="flex">
                                    <text class="paddingRL20">手机号码</text>
                                    <input class="width" type="text" placeholder="请输入手机号" v-model="onlineCustomerContactDtos1.mobile"/>
                                </view>
                                <i-icon class="icon" type="" size="20" color="#707070"  />
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL20">姓名</text>
                                <input class="width" type="text" placeholder="请输入姓名" v-model="onlineCustomerContactDtos.name"/>
                            </view>
                            <i-icon class="icon" type="" size="20" color="#707070"  />
                        </view>
                        <picker @change="change" :value="index" :range="sexArr">
                            <view class="userbox flex paddingRL20" >
                                <view class="border flex paddingTB20">
                                    <view class="flex">
                                        <text class="paddingRL20">性别</text>
                                        <text class="width">{{sexArr[userInfo.sex-1]}}</text>
                                    </view>
                                    <i-icon class="icon" type="enter" size="20" color="#707070"  />
                                </view>
                            </view>
                        </picker>
                        <view class="userbox flex paddingRL20" >
                            <view class="border flex paddingTB20">
                                <view class="flex">
                                    <text class="paddingRL20">手机号码</text>
                                    <input class="width" type="text" placeholder="请输入手机号" v-model="onlineCustomerContactDtos.mobile"/>
                                </view>
                                <i-icon class="icon" type="" size="20" color="#707070"  />
                            </view>
                        </view>
                    </view>
                    <!-- 宝宝 -->
                    <view v-if="get_quickList[0].orderType == 'BABY'">
                        <view class="userbox flex paddingRL20" >
                            <view class="border flex paddingTB20">
                                <view class="flex">
                                    <text class="paddingRL20">宝宝姓名</text>
                                    <input class="width" type="text" placeholder="请输入姓名" v-model="onlineCustomerBabyDtos.name"/>
                                </view>
                                <i-icon class="icon" type="" size="20" color="#707070"  />
                            </view>
                        </view>
                        <picker @change="changeBab" :value="indexBab" :range="sexArr">
                            <view class="userbox flex paddingRL20" >
                                <view class="border flex paddingTB20">
                                    <view class="flex">
                                        <text class="paddingRL20">宝宝性别</text>
                                        <text class="width">{{sexArr[indexBab]}}</text>
                                    </view>
                                    <i-icon class="icon" type="enter" size="20" color="#707070"  />
                                </view>
                            </view>
                        </picker>
                        <picker mode="date" :value="onlineCustomerBabyDtos.birthdayTime" @change="bindDateChange($event, onlineCustomerBabyDtos)">
                            <view class="userbox flex paddingRL20" >
                                <view class="border flex paddingTB20">
                                    <view class="flex">
                                        <text class="paddingRL20">宝宝生日</text>
                                        <text class="width">{{onlineCustomerBabyDtos.birthdayTime ? onlineCustomerBabyDtos.birthdayTime : '生日' | times}}</text>
                                    </view>
                                    <i-icon class="icon" type="enter" size="20" color="#707070"  />
                                </view>
                            </view>
                        </picker>
                    </view>
                </view>
            </view>
        </view>

        <!-- 已选套系 -->
        <view class="paddingRL20" v-if="get_quickList.length">
            <view class="carBuyList"  v-for="(item,index) in get_quickList" :key="index">
                <view class="carLi marginB20 padding20">
                    <view class="carData flex marginB20">
                        <image class="img" :src="item.imgs"></image>
                        <view class="carData_text">
                            <view class="flex">
                                <text>{{item.name}}</text>
                            </view>
                            <view class="textNub flex">
                                <text>X1</text>
                                <text class="fontWight colorRed">￥{{item.price}}</text>
                            </view>
                        </view>
                    </view>

                    <!-- 档期费 -->
                    <view class="flex priceAdd fontSize30" v-if="item.filesPrice">
                        <text>档期附加费</text>
                        <text>￥{{item.filesPrice}}</text>
                    </view>
                    
                </view>
                
                <!-- 预约时间 -->
                <view class="marginT10 carTimeBox marginB20">
                    <view class="carTime  flex" @click="onChangeTime(item.id,index)">
                        <text class="paddingRL40">预约时间</text>
                        <view class="flex">
                            <text class="" v-if="item.times">{{item.times}} {{item.filesTime}}</text>
                            <text class="" v-else>请选择</text>
                            <i-icon class="icon paddingRL30" type="enter" size="20" color="#707070"  />
                        </view>
                    </view>
                    <view class="carTime flex" @click="onChangeShopId(item.id,index)">
                        <text class="paddingRL40">预约门店</text>
                        <view class="flex">
                            <text class="">{{item.shopName?item.shopName:'请选择'}}</text>
                            <i-icon class="icon paddingRL30" type="enter" size="20" color="#707070"  />
                        </view>
                    </view>
                </view>    
            </view>
        </view>

         <!-- 顾客须知 -->
        <view class="textDet paddingRL20 paddingT10 marginB10 colorDDD">
            <view>
                <i-icon class="icon" type="warning_fill" size="18" color="#FCB901"  />
                 顾客须知：
            </view>
            <text>预约成功后拍摄前48小时可免费修改两次,不足48小时需收20%改期费</text>
        </view>

        <!-- 服务协议 -->
        <view class="serve flex colorRed paddingRL10 fontSize28">
            <checkbox-group @change="onChangeAll">
                <checkbox class="paddingL10" value='1'  />
            </checkbox-group>
            <text @click="onClickServe">服务协议</text>
        </view>
         <!-- 购物车定位 -->
        <buyCar type="buyCar" @onQuick="onQuick"/>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import buyCar from '@/components/buyCar.vue'
const { $Message } = require('@/wxcomponents/base/index');
import { getUserInfo } from '@/util/api/user.js'
import { listCategory, order, orders } from '@/util/api/goods.js'
    export default {
        components:{
            buyCar
        },
        computed:{
			...mapGetters('user',[
                'get_shopId',
                'get_phone',
                'get_nickName',
                'get_sex',
            ]),

            ...mapGetters('carList',[
				'get_quickList'
            ]),
            
        },
        mounted(){
            // 获取用户 判断是否存在
            if(!this.get_phone || !this.get_nickName){
                this.getUserInfoAPI()
            }else{
                // 初始数据
                this.onlineCustomerContactDtos.name = this.get_nickName
                this.userInfo.sex = this.get_sex
                if(this.get_sex == 1){
                    this.userInfo.sex1 = 2
                }else{
                   this.userInfo.sex1 = 1 
                }
                this.onlineCustomerContactDtos.mobile = this.get_phone
            }

            // 档期类别
            this.listCategory()
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
                    callName: "", // 联系人称呼
                    display: true, // 是否显示
                    email: "", // 邮箱
                    main: true, // 是否主联系人
                    mobile: "", // 手机号码
                    name: "", // 客户姓名
                    qq: "", // QQ
                    sex: true, // 	性别，false：女，true：男
                    tel: "", // 固定电话
                    wechat: "", //	微信
                    workUnit: "", // 工作单位
                },
                onlineCustomerContactDtos1:{
                    address: "", // 地址
                    birthdayLunar: true, // 是否农历
                    birthdayTime: 0, // 出生日期
                    callName: "", // 联系人称呼
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
                userInfo:{
                    sex:'男',
                    sex1:'男'
                },
                sexArr:['男','女'],
                index:0,
                index1:0,
                indexBab:0,
                check: false, // 协议
                flag:true, // 开关
            }
        },
         methods:{
             ...mapActions('user',[
                'act_nickName',
                'act_typeHeader'
            ]),

            ...mapActions('carList',[
                'act_typeHeader'
            ]),

             // 获取类别
            listCategory(){
                listCategory({categoryType:'TYPOGRAPHY_GROUP'}).then(res=>{
                    this.act_typeHeader(res.data.data) 
                })
            },
            
            // 获取用户信息AIP
            getUserInfoAPI(){
                getUserInfo().then(res=>{
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area} = res.data.data
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area})
                    // 初始数据
                    this.onlineCustomerContactDtos.name = nickName
                    this.userInfo.sex = sex
                    if(sex == 1){
                        this.userInfo.sex1 = 2
                    }else{
                        this.userInfo.sex1 = 1 
                    }
                    this.onlineCustomerContactDtos.mobile = phone
                })
            },
            // 订单类型判断客户
            // 过滤订单类型显示不同用户
            orderUserInfo(val,sex){
                console.log(val,sex)
                let text = '';
                switch (val) {
                    case 'WEDDING_DRESS':
                        text = sex==1?'新郎':'新娘'
                        break;
                    case 'PREGNANT':
                        text = '孕妈'
                        break;
                    case 'BABY':
                        text = sex==1?'爸爸':'妈妈'
                        break;
                    case 'PORTRAY':
                        text = sex==1?'先生':'女士'
                        break;
                    case 'SERVICE':
                        text = sex==1?'先生':'女士'
                        break;
                    case 'WEDDING':
                        text = sex==1?'新郎':'新娘'
                        break;
                    default:
                        break;
                }
                return text 
            },
            // 性别
            change(e){
                this.index = Number(e.detail.value)
                this.userInfo.sex = this.index==0?1:2
            },
            // 性别1
            change1(e){
                this.index1 = Number(e.detail.value)
                this.userInfo.sex1 = this.index1==0?1:2
            },
            
            // 宝宝性别
            changeBab(e){
                this.indexBab = Number(e.detail.value)
				this.onlineCustomerBabyDtos.sex = this.indexBab==0?true:false
            },

            // 宝宝生日
            bindDateChange (e, item) {
				item.birthdayTime = new Date(e.target.value).getTime()
            },

            // 修改预约时间
            onChangeTime(id,index){
                uni.navigateTo({ 
                    url: `/pages/tabBar/shoppingCart/components/changeTime?id=${id}&index=${index}&orderType=${this.get_quickList[0].orderType}`
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

            // 协议
            onChangeAll(e){
                this.check = !this.check
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
                this.flag = false
                // if(!this.check){
                //     $Message({
                //         content:'请勾选协议',
                //         type: 'error'
                //     });
                //     return
                // }
                // 组装数据
                let param = {
                    // 	客户组
                    customerGroupDto:{
                        onlineCustomerBabyDtos:[],
                        onlineCustomerContactDtos:[]
                    },
                    orderDtos:[], // 	订单商品信息
                    orderShopId: this.get_shopId.shopId // 开单门店ID
                }
                // 宝宝昵称
                this.onlineCustomerBabyDtos.callName = this.onlineCustomerBabyDtos.sex?'男宝':'女宝'
                // 订单判断用户昵称
                this.onlineCustomerContactDtos.callName = this.orderUserInfo(this.get_quickList[0].orderType,this.userInfo.sex)
                // 判断用户性别
                this.onlineCustomerContactDtos.sex = this.userInfo.sex==1?true:false
                
                param.customerGroupDto.onlineCustomerBabyDtos.push(this.onlineCustomerBabyDtos)
                // 判断订单类型
                if(this.get_quickList[0].orderType != 'BABY'){
                    param.customerGroupDto.onlineCustomerBabyDtos = null
                }
                param.customerGroupDto.onlineCustomerContactDtos.push(this.onlineCustomerContactDtos)
                // 判断第二用户是否填手机号
                if(this.onlineCustomerContactDtos1.mobile){
                    this.onlineCustomerContactDtos1.sex = this.userInfo.sex1==1?true:false
                    this.onlineCustomerContactDtos1.callName = this.orderUserInfo(this.get_quickList[0].orderType,this.userInfo.sex1)
                    param.customerGroupDto.onlineCustomerContactDtos.push(this.onlineCustomerContactDtos1)
                }
                // 组装 订单信息
                
                this.get_quickList.map(item=>{
                    let json = {}
                    json.reservationPhotoDto = {} //预约信息
                    json.assemblyId = item.id // 套系ID
                    json.reservationPhotoDto.reservationDate = new Date(item.times).getTime()-28800000  // 预约时间 时间戳
                    json.reservationPhotoDto.reservationShopId = item.shopId //	预约门店ID
                    json.reservationPhotoDto.reservationTime = item.filesTime // 预约门店ID
                    json.reservationPhotoDto.typographyTypeId = item.typographyTypeId //模板ID
                    param.orderDtos.push(json)
                })
                console.log(param)
                console.log('支付页',this.get_quickList)
                // 下单
                order(param).then(res=>{
                    let data = res.data.data
                    if(res.data.code !== 200){
                        this.flag = true
                    }
                    console.log(data)
                    uni.navigateToMiniProgram({
                        appId: data.jumpAppId,
                        envVersion: 'release', // develop（开发版），trial（体验版），release（正式版）
                        path: `pages/pay/pay?outTradeNo=${data.outTradeNo}`,
                        extraData: data,
                        success(res) {
                            // 返回成功
                            console.log(res)
                        }
                    })
                })
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.boxs{
    background: #F9F9F9;
}
.userInput{
    box-sizing: content-box;
    .userInputBox{
        background: #FFFFFF;
        border-radius: 20rpx;
    }
    .userbox{
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        box-sizing: content-box;
        margin-bottom: 20rpx;
        .flex{
            .width{
                width: 300rpx;
            }
            .paddingRL20{
                width: 150rpx;
            }
        }
    }
    .border{
        width: 100%;
        border-top: 1px solid #D1D1D1;   
        justify-content: space-between;
        align-items: center;
    }
}
.textDet{
    font-size: 18rpx;
}
.carLi{
        min-height: 234rpx;
        box-sizing: content-box;
        background: #FFFFFF;
        border-radius: 20rpx;
       .carData{
           justify-content: space-between;
           font-size: 30rpx;
           height: 200rpx;
           border-bottom:1px solid #D1D1D1;   
           .img{
               width: 160rpx;
               height: 160rpx;
               border-radius: 20rpx;
           }
           .carData_text{
               width: 450rpx;
               .textNub{
                   margin-top: 80rpx;
               }
               .flex{
                   justify-content: space-between;
                   align-items: center;
               }
           }
       }
       // 档期
       .priceAdd{
           justify-content: space-between;
       }
    }
.carTimeBox{
    background: #FFFFFF;
    border-radius: 20rpx;
    font-size: 28rpx;
    color: #333333;
    .carTime{
        align-items: center;
        justify-content: space-between;
        height: 90rpx;
        .flex{
            align-items: center;
        }
        &:nth-child(1){
            border-bottom: 1rpx solid #D1D1D1;
        }
    }
}
.bottm{
    border-bottom:1px solid #D1D1D1;
}
</style>