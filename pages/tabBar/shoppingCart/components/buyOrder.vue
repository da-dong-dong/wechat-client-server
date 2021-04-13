/******************************** 确认订单 ***************************************/
<template>
    <view class="boxs">
        <!-- 客户信息 -->
        <view  class="userInput paddingRL20 marginB10">
            <view  class="userInputBox">
                <!-- 客户 -->
                <userInfoModule ref="refUser" :type="get_quickList[0].orderType" ></userInfoModule>
                <!-- 宝宝 -->
                <babeModule ref="refBaba" v-if="get_quickList[0].orderType =='BABY'"></babeModule>
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
                                <text class="fontWight colorRed">
                                    ￥{{item.price}}
                                    <text v-if="item.enableDeposit">(定金：{{item.assemblyDeposit}})</text>
                                </text>
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
                    <view class="carTime  flex" @click="onChangeTime(item.id,index,item.shopId)">
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

         <!-- 购物车定位 -->
        <buyCar type="buyCar" @onQuick="onQuick"/>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import buyCar from '@/components/buyCar.vue'
import userInfoModule from './userInfo/userInfo.vue'
import babeModule from './userInfo/babe.vue'
const { $Message } = require('@/wxcomponents/base/index');
import { listCategory, order, orders } from '@/util/api/goods.js'
    export default {
        components:{
            buyCar,
            userInfoModule,
            babeModule
        },
        computed:{
			...mapGetters('user',[
                'get_shopId',
            ]),

            ...mapGetters('carList',[
				'get_quickList'
            ]),
            
        },
        mounted(){
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
                flag:true, // 开关
            }
        },
         methods:{
             ...mapActions('user',[
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
                        text = sex==1?'孕爸':'孕妈'
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
            onChangeTime(id,index,shopId){
                uni.navigateTo({ 
                    url: `/pages/tabBar/shoppingCart/components/changeTime?id=${id}&index=${index}&orderType=${this.get_quickList[0].orderType}&shopId=${shopId}`
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
                this.flag = false

                // 客户信息
                let userInfoData = this.$refs.refUser.save()
                // 宝宝信息
                let refBabaData = []
                if(this.get_quickList[0].orderType == "BABY"){
                    refBabaData.push(this.$refs.refBaba.save())
                }
                
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
                // 组装 客户
                param.customerGroupDto.onlineCustomerBabyDtos = refBabaData
                param.customerGroupDto.onlineCustomerContactDtos = userInfoData
               
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
               
                //下单
                order(param).then(res=>{
                    let data = res.data.data
                    if(res.data.code !== 200){
                        this.flag = true
                    }else{
                        uni.setStorage({
							key: 'orderId',
							data: data
						})
						uni.switchTab({
                            url:'/pages/tabBar/order/order'
                        })
                    }
                    console.log(data)
                    
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