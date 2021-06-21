/******************************** 预约时间组件 ***************************************/
<template>
	<view class="bigBox">
		<!-- 头部 -->
		<view class="header">
			<!-- 日历年月 -->
			<view class="Y_M_Box">
				<!-- 上个月 -->
			  <view class='icon' @tap='lastMonth'>
					<i-icon type="enterinto_fill" size="20" color="#D3AB75" />
			  </view>
				<!-- 显示年月 -->
				<view class="Y_M">
					<picker mode="date" fields="year" :value="pickerDate" :start="pickerStartDate" :end="pickerEndDate" @change="DateChange">
						<view class="showDate">{{pickerDate}} 年</view>
					</picker>
				</view>
			  <!-- 下个月 -->
			  <view class='icon' @tap='nextMonth'>
					<i-icon type="enterinto_fill" size="20" color="#D3AB75" />
			  </view>
			</view>
			<!-- 星期 -->
		</view>
		<!-- 日历主体 -->
        <view class="flex flex_1">
            <div class="month_content">
                <div v-for="_ in 12" :key="_" :class="{ current: currentMonth === (_ + 1)}" @click="clickMonth(_ + 1)">
                    {{_ + 1}} 月
                </div>
            </div>
            <view class="flex_1">
                <view class="calenarBox">
                    <view class="weekBox">
                        <view v-for="(item,index) in weekArr" :key="index">{{item}}</view>
                    </view>
                    <view class="flex flex_wrap myList">
						<view class="bg list" v-for="(item,index) in dateAllArr" :key="index"
						 :class="{ noBg: !noBg(dateDetail,(item.num - 1)), boforeTime: boforeTimeFun(item.date) , optional: bgColor(dateDetail,(item.num-1)), currentDay: item.num === currentDay }"
						  @click="enDate(dateDetail,item.num,item.date,index)">
							{{ item.num ? item.num : '' }}
						</view>
                    </view>
                </view>
                <slot></slot>
            </view>
        </view>
		<i-message id="message" />	
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	export default{
		props:['dateDetail'],
		filters:{
			typographyNum(arr,i){
				if(i !== NaN){
					if(arr[i]){
						// 是否休息
						let isVacation = arr[i].isVacation
						if(isVacation){
							return '休息'
						}else{
							// 可预约时间
							let can = arr[i].defaultTypographyNum
							// 已预约时间
							let ed = arr[i].inTypographyNum
							// 剩余
							let ing = can - ed
							//return `${can}/${ed}/${ing}`
							return `${ed}/${can}`
						}
					}
				}
			},
		},
		data(){
			return{
				// picker
				pickerDate:'',
				pickerStartDate:'2010-01-01',
				pickerEndDate:'2050-12-31',
				
				weekArr:['一', '二', '三', '四', '五', '六', '日' ],
				
				// 日历
				dateAllArr: [],
                currentMonth: 1,
                currentDay: 1
			}
		},
        computed: {
            currentTime () {
                let str = `${this.pickerDate}-${this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth }-${this.currentDay < 10 ? '0' + this.currentDay : this.currentDay}`
                return str
            }
        },
		created(){
			this.getNowDate();
		},
		methods:{
			boforeTimeFun (time) {
				console.log(time);
				let now = new Date().getTime()
				let timeNum = new Date(time).getTime() + (24 * 60 * 60 * 1000)
				console.log(now);
				console.log(timeNum);
				return now > timeNum
			},
			clickMonth (_) {
                this.currentMonth = _
                this.dateInit()
            },
			// 获取当天日期
			getNowDate(){
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
                this.currentMonth = date.getMonth() + 1
                this.currentDay = date.getDate()
                this.pickerDate = year
				this.dateInit()
			},
			
			// 日月补0
			completeDate(value) {
				return value < 10 ? "0" + value:value;
			},
			
			// 获取日历本体
			dateInit(){
				this.show = false
				// let arr = this.pickerDate.split('-')
				
				// 当前年份
				// let nowYear = Number(arr[0])
				let nowYear = Number(this.pickerDate)
				// 当前月份
				// let nowMonth = Number(arr[1])
				let nowMonth = this.currentMonth
                
				// 获得当月多少天
				let dayNums = new Date(nowYear, nowMonth, 0).getDate();
				
				// 获取当月1号对应的星期
				let startWeek = new Date(nowYear + '/' + nowMonth + '/' + 1).getDay() - 1
				let dateAllArr = []
				let obj = [];
				
				for (let i = 0; i < startWeek + dayNums ; i++){
					if(i >= startWeek){
						obj = {
							num: i-startWeek + 1,
							date: `${nowYear}-${this.completeDate(nowMonth)}-${this.completeDate(i-startWeek+1)}`,
							data:null
						}
					} else {
						obj = []
					}
					dateAllArr[i] = obj
				}
				this.dateAllArr = dateAllArr
			},
			
			// 判断是否需要背景色
			noBg(arr,i){
				if(String(i)){
					if(arr[i]){
						let isVacation = arr[i].isVacation
						if(isVacation){
							return false
						}else{
							return true
						}
					}
				}else{
					return false
				}
			},
			
			// 判断可不可选背景色
			bgColor(arr,i){
				if(String(i)){
					if(arr[i]){
						// 可预约时间
						let can = arr[i].defaultTypographyNum
						// 已预约时间
						let ed = arr[i].inTypographyNum
						// 剩余
						let ing = can - ed
						if( ing > 0 ){
							return true
						}else{
							return false
						}
					}
				}
			},

			// 切换上月
			lastMonth(){
                this.pickerDate = Number(this.pickerDate) - 1
			},
			// 切换下月
			nextMonth(){
                this.pickerDate = Number(this.pickerDate) + 1
			},
			// 日历选择返回
			DateChange(e){
				// this.pickerDate = e.detail.value + `-01`
				this.pickerDate = e.detail.value
				this.dateInit()
			},		
		
			enDate(detail,num,time,index){
				if (this.boforeTimeFun(time)) {
					$Message({
						content: '该日期不可选',
						type: 'warning'
					});
					return
				}
                let arr = this.dateAllArr[index].date.split('-')
				// this.pickerDate = this.dateAllArr[index].date
				this.pickerDate = arr[0]
                this.currentMonth = Number(arr[1])
                this.currentDay = Number(arr[2])
				let isVacation = detail[num-1].isVacation
				if(!isVacation){
					this.$emit('enDate',time)
				}else{
					$Message({
						content: '该时间为休息日',
						type: 'warning'
					});
				}
			}
		},
		watch:{
			currentTime(){
				this.$emit('getDate', this.currentTime);
			},
			dateDetail(val){
				//重新加载日期
				this.dateInit()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		font-size: 32rpx;
		flex: 1;
		display: flex;
		height: 100%;
		flex-direction: column;
		.flex_1{
			overflow: auto;
		}
		.header{
			// width: 690rpx;
            width: 100vw;
            // margin-top: 20rpx;
			// margin: 30rpx;
			// margin-bottom: 0rpx;
			border-radius: 10rpx 10rpx 0 0 ;
			// color: #FFFFFF;
			// background-color: #34B9C0;
            background: #FFF;
            // margin-bottom: 10rpx;
			.Y_M_Box{
				padding: 30rpx 0 ;
				width: 300rpx;
				display: flex;
				justify-content: space-between;
				margin-left: 50%;
				transform: translateX(-50%);
				.icon:nth-child(1){
					transform:rotateY(180deg)
				}
				.Y_M{
					.showDate{
						padding: 0 15rpx;
						color: #D3AA72;
					}
				}
			}
		}
        .weekBox{
            display: flex;
            justify-content: space-around;
            padding-bottom: 20rpx;
        }
        .month_content{
            background: #fff;
            width: 160rpx;
            text-align: center;
            height: 100%;
			display: flex;
			flex-direction: column;
            div{
                // padding: 25rpx 0;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
            }
            .current{
                position: relative;
                // color: #D3AB75;
				background: #f5f5f5;
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    width: 6rpx;
                    bottom: 0;
                    top: 0;
                    left: 0;
                    height: auto;
                    background: #D3AB75;
                }
            }
        }
		.calenarBox{
			// width: 690rpx;
			margin: 20rpx;
			padding: 30rpx 10rpx;
			// margin-top: 0rpx;
			// display: flex;
			flex-wrap:wrap;
			background-color: #FFFFFF;
			box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
			border-radius: 30rpx;
            .flex_wrap{
                flex-wrap: wrap;
            }
			.myList{
				.list{
					color: #414143;
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					text-align: center;
					/* padding: 10rpx; */
					/* margin-right: 1rpx; */
					// padding-top: 10rpx;
					// padding-left: 9rpx;
					line-height: 70rpx;
					margin-top: 10rpx;
					margin-left: 4rpx;
				}
				.bg{
					// border-radius: 10rpx;
					.typographyNum{
						font-size: 18rpx;
						padding: 5rpx;
					}
				}
				.noBg{
					color: #999999;
					.typographyNum{
						color: #FF0000;
					}
				}
				.boforeTime{
					color: #999999;
				}
				.optional{
					// background-color: #D3AB75;
					// color: #FFFFFF;
					// background-color: #FFFFFF;
					// color: #000;
					// box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
				}
				.ban{
					background-color: #CCCCCC;
					color: #FFFFFF;
					box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
				}
                .currentDay{
                    background: #D3AB75;
                    color: #fff;
                }
			}
		}
	}
</style>
