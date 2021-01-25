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
    </view>
</template>

<script>
import changeTimes from '@/components/time.vue'
import { mapMutations, mapGetters } from 'vuex'
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
            this.Index = options.index
        },
        data(){
            return{
                dateDetail:[
                    {"operationTime":1609430400000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1609516800000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1609603200000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1609689600000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1609776000000,"isVacation":true,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1609862400000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1609948800000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1610035200000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1610121600000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1610208000000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},
                    {"operationTime":1610294400000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610380800000,"isVacation":true,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610467200000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610553600000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610640000000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610726400000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610812800000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610899200000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1610985600000,"isVacation":true,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611072000000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611158400000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611244800000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611331200000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611417600000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611504000000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611590400000,"isVacation":true,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611676800000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611763200000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611849600000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1611936000000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]},{"operationTime":1612022400000,"isVacation":false,"defaultTypographyNum":10,"notInTypographyNum":0,"inTypographyNum":0,"addTypographyNum":0,"subTypographyNum":0,"reservationGroupVos":[{"operationType":"DEFAULT","groupTypeCategoryId":176,"isOnline":false,"reservationGroupTypeVos":[{"controlType":"ALL","timeFrames":[{"timeFrameStr":"08:00~20:00","startTime":"08:00","endTime":"20:00","timeFrameType":"BETWEEN","typographyCount":10,"useTypographyNum":0}]}]}]}],
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
                Index: 0,
            }
        },
        methods:{
            ...mapMutations('carList',[
				'mut_carListUpData'
            ]),

            // 获取时间
            getDate(e){
                this.times = e
            },
            enDate(e){
            },

            // 更新购物车
            onChangeCarList(val){
                let data = {
                    index:this.Index,
                    times:this.times,
                    ...val
                }
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