/******************************** 宝宝 ***************************************/
<template>
    <view>
        <view class="paddingT10">
            <!-- 姓名 -->
            <view class="userbox flex paddingRL20" >
                <view class="flex">
                    <text class="paddingRL20">{{babe.callName}}</text>
                    <input class="width" type="text" placeholder="请输入姓名" v-model="babe.name"/>
                </view>
                <i-icon class="icon" type="" size="20" color="#707070"  />
            </view>
            <!-- 性别 -->
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
            <!-- 生日 -->
            <picker mode="date" :value="babe.birthdayTime" @change="bindDateChange($event, babe)">
                <view class="userbox flex paddingRL20" >
                    <view class="border flex paddingTB20">
                        <view class="flex">
                            <text class="paddingRL20">生日</text>
                            <text class="width">{{babe.birthdayTime ? babe.birthdayTime : '生日' | times}}</text>
                        </view>
                        <i-icon class="icon" type="enter" size="20" color="#707070"  />
                    </view>
                </view>
            </picker>
        </view>
        
    </view>
</template>

<script>
    export default {
		data(){
			return{
				babe:{
                    birthdayLunar: true, // 农历还是阴历
                    birthdayTime: '', // 出生日期
                    callName: "男宝", // 宝宝称呼
                    display: true, // 是否显示
                    name: "", // 宝宝姓名
                    sex: true, // 性别，false：女，true：男
                    zodiac: ""
                },
                sexArr:['男','女'],
                indexBab:0,
			}
		},
		methods:{
			// 宝宝性别
            changeBab(e){
                this.indexBab = Number(e.detail.value)
                this.babe.sex = this.indexBab==0?true:false
                this.babe.callName = this.indexBab==0?"男宝":"女宝"
            },

            // 宝宝生日
            bindDateChange (e, item) {
				item.birthdayTime = new Date(e.target.value).getTime()
            },

			save(){
                
                return this.babe
            }
		},
    }
</script>

<style lang="scss" scoped>
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
</style>