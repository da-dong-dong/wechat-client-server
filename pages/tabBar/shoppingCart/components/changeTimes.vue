/******************************** 预约时间 ***************************************/
<template>
    <view class="changeTime_content flex_col">
        <view class="shop_view">
            <div class="flex_1">
                <div class="flex">
                    <i class="iconfont iconposition-highlighted"></i>
                    {{get_shopId?get_shopId.shopName:'请选择门店'}}
                </div>
                <div class="font10 pad_l16">{{ get_shopId && get_shopId.address ? get_shopId.address : '' }}</div>
            </div>
            <div class="changeShop" @click="onChangeShopId">
                <i class="iconfont iconfangzu"></i>
                <span class="font10">
                    切换门店
                </span>
            </div>
        </view>
        <!-- 时间组件 -->
        <changeTimes class="flex_1 flex_col" :dateDetail="dateDetail" @getDate="getDate" @enDate="enDate">
            <!-- 档期选择 -->
            <view class="timeBox">
                <view class="fontWight paddingB20">当天档期费用 {{filesPrice}} 元</view>

                <view v-if="momeyTime && !isVacation">
                    <view v-for="(item,index) in momeyTime" :key="index">
                        <view v-for="(item1,index1) in item['reservationGroupTypeVos']" :key="index1">
                            <view>{{item1.controlType | headerTime(item.groupTypeCategoryId,get_typeHeader)}}</view>
                            <view class="timeList flex" v-for="(item2,index2) in item1['timeFrames']" :key="index2">
                                <view class="list" v-for="(index3) in item2['useTypographyNum']" :key="index3">
                                    <view class="listTime active">
                                        {{item2['timeFrameStr']}}
                                    </view>
                                </view>
                                <view class="list" v-for="(index3) in item2['typographyCount'] - item2['useTypographyNum']" :key="index3">
                                    <view class="listTime" @click="onChangeCarList(item2, item1.typographyTypeId)">
                                        {{item2['timeFrameStr']}}
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </changeTimes>
        <!-- 弹窗 -->
        <i-message id="message" />
        <!-- 档期弹窗 -->
        <modulPhone v-if="flag" :phone="testData" @cancel="cancel" @ok="ok"/>
    </view>
</template>

<script>
import changeTimes from './time.vue'
import modulPhone from '@/components/modulPhone.vue'
import { mapMutations, mapGetters } from 'vuex'
import { reservationPhotoDate, typographyCost } from '@/util/api/goods.js'
import { getReservationDescription } from '@/util/api/user.js'
    export default {
        filters:{
            // 档期头部过滤
            headerTime(val,id,typeHeader){
                let text = ''
                switch (val) {
                    case "ALL":
                        // text = `任意订单[${typeHeader.filter(item=>item.id== id)[0].name}]` 
                        text = `任意订单`
                        break;
                
                    case "WEDDING_DRESS":
                        text = '婚纱订单'
                        break;
                    case "BABY":
                        text = '儿童订单'
                        break;
                    case "PREGNANT":
                        text = '孕妇订单'
                        break;
                    case "PORTRAY":
                        text = '写真订单'
                        break;
                    case "SERVICE":
                        text = '服务订单'
                        break;
                    case "WEDDING":
                        text = '婚庆订单'
                        break;
                
                    default:
                        break;
                }

                return text
            }
        },
        components:{
            changeTimes,
            modulPhone
        },
         computed:{
            ...mapGetters('user',[
                'get_shopId',
                'get_appId',
                'get_enterpriseId'
            ]),
            ...mapGetters('carList',[
                'get_carList',
                'get_typeHeader'
            ]),
        },
        onLoad(options) {
            uni.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            this.id = options.id
            this.Index = options.index
            this.orderType =options.orderType
            this.shopId = options.shopId
            // 档期协议
            this.mack() 
        },
        data(){
            return{
                shopId:15,
                dateDetail:[],
                momeyTime:null,
                times: '',
                flag:false, // 弹窗档期开关
                testData:'', // 档期协议
                Index: 0, // 索引
                id: null, // 当前id
                endTime:null, // 结束时间
                startTime:null, // 开始时间
                filesPrice:0, // 档期费
                isVacation:true, // 是否休息日
                // 存储
                dataItem:'',
                dataId:''
            }
        },
        methods:{
            ...mapMutations('carList',[
				'mut_quickListUpData'
            ]),

            // 切换门店
            onChangeShopId(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeRegion?quick=true'
                })
            },

            // 获取时间
            getDate(e){
                this.times = e
                this.pickerDate = e
                this.getCalendar()
                this.reservationPhotoDate()
                this.typographyCost()
                
            },
            enDate(e){
            },

            // 获取日历信息
            getCalendar(){
                let arr = this.pickerDate.split('-')
				// 当前年份
				let nowYear = Number(arr[0])
				// 当前月份
				let nowMonth = Number(arr[1])
				// 获得当月多少天
				let dayNums = new Date(nowYear, nowMonth, 0).getDate();
				// 开始时间
				let startTime = Date.parse(new Date(`${nowYear}-${this.completeDate(nowMonth)}-01`))
				this.startTime = Number(startTime) - 28800000 //减去8小时时间戳
				// 结束时间
				let endTime = Date.parse(new Date(`${nowYear}-${this.completeDate(nowMonth)}-${dayNums}`))
				this.endTime = Number(endTime) - 28800000 //减去8小时时间戳
            },	

            // 日月补0
			completeDate(value) {
				return value < 10 ? "0" + value:value;
			},

            // 获取预约拍照档期
            reservationPhotoDate(){
                let param ={
                    reservationShopId:this.shopId,
                    endTime:this.endTime,
                    startTime:this.startTime,
                    orderType :this.orderType
                }
                reservationPhotoDate(param).then(res=>{
                    this.dateDetail = res.data.data
                    // 展示档期
                    this.showTime()
                })
            },

            // 查询档期费用
            typographyCost(){
                let param ={
                    reservationShopId:this.shopId,
                    dateStr: this.pickerDate
                }
                typographyCost(param).then(res=>{
                    this.filesPrice = res.data.data
                })
            },

           

            // 展示档期
            showTime(){
                console.log(new Date(this.pickerDate))
                let checkTime = new Date(this.pickerDate).getTime()-28800000
                console.log(this.dateDetail);
                console.log(checkTime);
                let list = this.dateDetail.filter(item=>item.operationTime == checkTime)
                this.momeyTime = list[0].reservationGroupVos
                this.isVacation = list[0].isVacation
                console.log(this.momeyTime,list[0])
            },

            // 预约服务
            mack(){
                let param = {
					appId:this.get_appId,
					enterpriseId:this.get_enterpriseId
				}
                getReservationDescription(param).then(res=>{
                    this.testData = res.data.data
                })
            },

            // 档期弹窗
            ok(){
                this.flag = false
                let data = {
                    id:this.id, // id值
                    index:this.Index, // 索引
                    times:this.times, // 时间 yy-mm-dd
                    filesPrice:this.filesPrice, // 全天费用
                    filesTime:this.dataItem.startTime, // 档期 ,传开始时间
                    typographyTypeId: this.dataId // 模板ID
                }
                console.log(data,'*******')
                this.mut_quickListUpData(data)
                uni.navigateBack()
            },
            cancel(){
                this.flag = false
            },

            // 更新购物车
            onChangeCarList(tiem,id){
                console.log('来啦',tiem,id)
                this.flag = true
                this.dataItem = tiem
                this.dataId = id
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.mar_t10{
    margin-top: 20rpx;
}
.timeList{
    // justify-content: space-between;
    flex-wrap: wrap;
    .list{
        width: 180rpx;
        text-align: center;
        margin: 10rpx 0;
        font-size: 26rpx;
        .active{
            background: #D3AB75;
        }
    }
    .listTime{
        display: inline-block;
        border-radius: 20rpx;
        padding: 18rpx 10rpx;
        background: #fff;
    }
}
.changeTime_content{
    background: #F9F9F9;
    overflow: auto;
    height: 100vh;
    .shop_view{
        border-radius: 0 0 30rpx 30rpx;
        background: #fff;
        display: flex;
        padding: 30rpx 20rpx;
        box-sizing: border-box;
    }
    .iconposition-highlighted, .iconfangzu{
        color: #D3AB75;
    }
    .changeShop{
        text-align: center;
        width: 90rpx;
    }
    .pad_l16{
        padding-left: 32rpx;
    }
    .font10{
        font-size: 20rpx;
    }
    .center{
        text-align: center;
    }
}
.flex_col{
    display: flex;
    flex-direction: column;
}
.timeBox{
    margin: 20rpx;
}
</style>