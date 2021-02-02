/******************************** 预约时间 ***************************************/
<template>
    <view>
        <!-- 时间组件 -->
        <changeTimes :dateDetail="dateDetail" @getDate="getDate" @enDate="enDate"/>
        <!-- 档期选择 -->
        <view class="timeBox paddingRL40 ">
            <view class="fontWight paddingB20">热门档期需另付档期费用</view>
            <view class="timeList flex"> 
                <view class="list" v-for="(item,index) in momeyTime" :key="index" @click="onChangeCarList(item)">
                    <view class="listTime">{{item.filesTime}}</view>
                    <view class="fontSize24 marginT10">{{item.filesPrice?'此档期需另外付':''}}{{item.filesPrice}}</view>
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
        components:{
            changeTimes
        },
         computed:{
            ...mapGetters('carList',[
				'get_carList'
            ]),
        },
        onLoad(options) {
            this.id = options.id
            this.Index = options.index
        },
        data(){
            return{
                shopId:14,
                dateDetail:[],
                momeyTime:[
                    {
                        filesTime:'08：00',
                        filesPrice:''
                    },
                    {
                        filesTime:'09：00',
                        filesPrice:''
                    },
                    {
                        filesTime:'10：00',
                        filesPrice:''
                    },
                    {
                        filesTime:'14：00',
                        filesPrice:'200'
                    },
                    {
                        filesTime:'15：00',
                        filesPrice:'200'
                    },
                    {
                        filesTime:'16：00',
                        filesPrice:'200'
                    },
                ],
                times: '',
                Index: 0, // 索引
                id: null, // 当前id
                endTime:null, // 结束时间
                startTime:null, // 开始时间
            }
        },
        methods:{
            ...mapMutations('carList',[
				'mut_carListUpData'
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
                }
                reservationPhotoDate(param).then(res=>{
                    this.dateDetail = res.data.data
                })
            },

            // 查询档期费用
            typographyCost(){
                let param ={
                    reservationShopId:this.shopId,
                    dateStr: this.pickerDate
                }
                typographyCost(param).then(res=>{
                    console.log(res)
                })
            },

            // 更新购物车
            onChangeCarList(val){
                let data = {
                    id:this.id,
                    index:this.Index,
                    times:this.times,
                    ...val
                }
                console.log(data)
                this.mut_carListUpData(data)
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
            width: 110rpx;
            display: inline-block;
            border: 1px solid #999;
            padding:10rpx 20rpx;
            border-radius: 20rpx;
        }
        margin:30rpx 0;
    }
}
</style>