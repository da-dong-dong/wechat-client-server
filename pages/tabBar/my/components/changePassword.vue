/******************************** 修改密码 ***************************************/
<template>
    <view>
         <view class="user_seting marginT10">
            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">手机号码</text>
                </view>
                <input class="width" type="text" placeholder="请输入手机号码" v-model="userInfo.tal"/>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">验证码</text>
                </view>
                <input class="width" type="text" placeholder="请输入验证码" v-model="userInfo.code"/>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>
            
            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">新密码</text>
                </view>
                <input class="width" type="text" placeholder="请输入密码" v-model="userInfo.password"/>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>

            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <i-icon class="icon" type="setup" size="30" color="#D8D8D8"  />
                    <text class="paddingL20">确认密码</text>
                </view>
                <input class="width" type="text" placeholder="请输入确认密码" v-model="userInfo.passwordCheck"/>
                <i-icon class="icon" type="enter" size="30" color="#D8D8D8"  />
            </view>
           
        </view>

        <!-- 保存 -->
        <view class="but" @click="onClickSave">保存</view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                userInfo:{
                    tal:'13068254894',
                    code:'',
                    password:'',
                    passwordCheck:''
                },
                sexArr:['男','女'],
                index:0,
                
            }
        },
        methods:{
            // 性别
            change(e){
                this.index = Number(e.detail.value)
				this.userInfo.sex = this.sexArr[this.index]
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
.but{
    width: 300rpx;
    height: 80rpx;
    background: #5CA4A8;
    text-align: center;
    line-height: 80rpx;
    color: #fff;
    border-radius: 20rpx;
    margin: 100rpx auto;
}
.user_seting{
    border: 1px solid #D8D8D8;
    border-bottom:none;
    .user_seting_li{
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1px solid #D8D8D8;
        align-items: center;
        justify-content: space-between;
        .flex{
            width: 230rpx;
        }
        .width{
            width: 330rpx;
        }
    }
}
</style>