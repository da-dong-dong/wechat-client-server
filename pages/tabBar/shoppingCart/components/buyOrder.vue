/******************************** 确认订单 ***************************************/
<template>
    <view>
        <!-- 客户信息 -->
        <view  class="userInput paddingRL40">
            <view class="userInputBox ">
                <view class="paddingTB20 paddingL10">  客户信息  </view>
                <view class="paddingT10">
                    <view class="userbox flex paddingRL20" >
                        <view class="flex">
                            <text class="paddingRL40">姓名</text>
                            <input class="width" type="text" placeholder="请输入姓名" v-model="userInfo.name"/>
                        </view>
                        <i-icon class="icon" type="" size="30" color="#D8D8D8"  />
                    </view>
                    <picker @change="change" :value="index" :range="sexArr">
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL40">性别</text>
                                <text class="width">{{userInfo.sex}}</text>
                            </view>
                            <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
                        </view>
                    </picker>
                    <view class="userbox flex paddingRL20" >
                        <view class="flex">
                            <text class="paddingRL40">手机号码</text>
                            <input class="width" type="text" placeholder="请输入手机号" v-model="userInfo.tal"/>
                        </view>
                        <i-icon class="icon" type="" size="30" color="#D8D8D8"  />
                    </view>
                    <!-- 宝宝 -->
                    <view class="userbox flex paddingRL20" >
                        <view class="flex">
                            <text class="paddingRL40">宝宝姓名</text>
                            <input class="width" type="text" placeholder="请输入手机号" v-model="userInfo.tal"/>
                        </view>
                        <i-icon class="icon" type="" size="30" color="#D8D8D8"  />
                    </view>
                    <picker @change="changeBab" :value="index" :range="sexArr">
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL40">宝宝性别</text>
                                <text class="width">{{userInfo.sexBab}}</text>
                            </view>
                            <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
                        </view>
                    </picker>
                    <picker mode="date" :value="userInfo.time" @change="bindDateChange($event, userInfo)">
                        <view class="userbox flex paddingRL20" >
                            <view class="flex">
                                <text class="paddingRL40">宝宝生日</text>
                                <text class="width">{{userInfo.time ? userInfo.time : '生日' | times}}</text>
                            </view>
                            <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
                        </view>
                    </picker>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                userInfo:{
                    name:'大东东',
                    sex:'男',
                    tal:'13068254894',
                    address:'惠城区水口',
                    time:'',
                    sexBab:'男',

                },
                sexArr:['男','女'],
                index:0,
                indexBab:0
            }
        },
         methods:{
            // 性别
            change(e){
                this.index = Number(e.detail.value)
				this.userInfo.sex = this.sexArr[this.index]
            },
            
            // 宝宝性别
            changeBab(e){
                this.indexBab = Number(e.detail.value)
				this.userInfo.sexsexBab = this.sexArr[this.indexBab]
            },

            // 时间
            bindDateChange (e, item) {
				item.time = new Date(e.target.value).getTime()
            },
            
            // 保存
            onClickSave(){
                uni.navigateBack()
            }
        }
    }
</script>

<style lang="scss" scoped>
.userInput{
    box-sizing: content-box;
    .userInputBox{
        border: 1px solid #D1D1D1;
    }
    .userbox{
        border-bottom: 1px solid #D1D1D1;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        .flex{
            .width{
                width: 300rpx;
            }
            .paddingRL40{
                width: 150rpx;
            }
        }
    }
}
</style>