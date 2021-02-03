/******************************** 预约时间 ***************************************/
<template>
    <view>
        <!-- 时间组件 -->
        <changeTimes :dateDetail="dateDetail" @getDate="getDate" @enDate="enDate"/>
        <!-- 档期选择 -->
        <view class="timeBox paddingRL40 ">
            <view class="fontWight paddingB20">当天档期费用 {{filesPrice}} 元</view>

            <view v-if="momeyTime">
                <view v-for="(item,index) in momeyTime" :key="index">
                    <view v-for="(item1,index1) in item['reservationGroupTypeVos']" :key="index1">
                        <view>{{item1.controlType |headerTime(item.groupTypeCategoryId,get_typeHeader)}}</view>
                        <view class="timeList flex">
                            <view class="list" v-for="(item2,index2) in item1['timeFrames']" :key="index2">
                                <view class="listTime" @click="onChangeCarList(item2, item1.typographyTypeId)">
                                    {{item2['timeFrameStr']}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            
            
        </view>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import changeTimes from '@/components/time.vue'
import { mapMutations, mapGetters } from 'vuex'
import { reservationPhotoDate, typographyCost } from '@/util/api/goods.js'
    export default {
        filters:{
            // 档期头部过滤
            headerTime(val,id,typeHeader){
                let text = ''
                switch (val) {
                    case "ALL":
                        text = `任意订单[${typeHeader.filter(item=>item.id== id)[0].name}]` 
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
            changeTimes
        },
         computed:{
            ...mapGetters('user',[
                'get_shopId',
            ]),
            ...mapGetters('carList',[
                'get_carList',
                'get_typeHeader'
            ]),
        },
        onLoad(options) {
            this.id = options.id
            this.Index = options.index
            this.orderType =options.orderType
            this.shopId = this.get_shopId.shopId
        },
        data(){
            return{
                shopId:15,
                dateDetail:[],
                momeyTime:null,
                times: '',
                Index: 0, // 索引
                id: null, // 当前id
                endTime:null, // 结束时间
                startTime:null, // 开始时间
                filesPrice:0, // 档期费
            }
        },
        methods:{
            ...mapMutations('carList',[
				'mut_quickListUpData'
            ]),

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
                    console.log(res)
                })
            },

           

            // 展示档期
            showTime(){
                let checkTime = new Date(this.pickerDate).getTime()-28800000
                let list = this.dateDetail.filter(item=>item.operationTime == checkTime)
                this.momeyTime = list[0].reservationGroupVos
                console.log(this.momeyTime)
            },

            // 更新购物车
            onChangeCarList(tiem,id){
                console.log('来啦',tiem,id)
               
                let data = {
                    id:this.id, // id值
                    index:this.Index, // 索引
                    times:this.times, // 时间 yy-mm-dd
                    filesPrice:this.filesPrice, // 全天费用
                    filesTime:tiem.startTime, // 档期 ,传开始时间
                    typographyTypeId: id // 模板ID
                }
                console.log(data,'*******')
                this.mut_quickListUpData(data)
                uni.navigateBack()
            }
        }
    }
</script>

<style lang="scss" scoped>
.timeList{
    justify-content: space-between;
    flex-wrap: wrap;
    .list{
        width: 220rpx;
        text-align: center;
        .listTime{
            width: 205rpx;
            display: inline-block;
            border: 1px solid #999;
            border-radius: 20rpx;
            padding: 20rpx 0;
        }
        margin:30rpx 0;
    }
}
</style>