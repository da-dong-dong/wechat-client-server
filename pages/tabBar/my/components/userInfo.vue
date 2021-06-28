/******************************** 个人信息 ***************************************/
<template>
    <view class="user_box HeaderBorderTop">
         <view class="user_seting marginT10">
             <!-- 头像 -->
             <view class="user_logo">
                    <image v-if="get_headimgUrl" class="login_logo" :src="get_headimgUrl"></image>
                    <image v-else class="login_logo" src="/static/image/my/userImg.png"></image>
             </view>
             <!-- 文字 -->
             <view class="color333 fontSize32 fontWight paddingRL30 paddingB20">拍摄人信息</view>
            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">姓名</text>
                </view>
                <input class="width" type="text" placeholder="请输入姓名" v-model="userInfo.nickName" @blur="onClickSave"/>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

           <picker @change="change" :value="Index" :range="sexArr">
                <view class="user_seting_li flex paddingRL20" >
                    <view class="flex">
                        <text class="paddingL20 color999">性别</text>
                    </view>
                    <text class="width">{{sexArr[userInfo.sex-1]}}</text>
                    <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
                </view>
            </picker>

            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">手机号码</text>
                </view>
                <input class="width" type="text" placeholder="请输入手机号码" v-model="userInfo.phone" @blur="onClickSave"/>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

            <picker mode="date" :value="userInfo.birthday" @change="bindDateChange($event, userInfo)">
                <view class="user_seting_li flex paddingRL20" >
                    <view class="flex">
                        <text class="paddingL20 color999">生日</text>
                    </view>
                    <text class="width">{{userInfo.birthday ? userInfo.birthday : '可选' | times}}</text>
                    <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
                </view>
            </picker>

            <view class="user_seting_li flex paddingRL20" style="border:none">
                <view class="flex">
                    <text class="paddingL20 color999">地址</text>
                </view>
                <pick-regions :defaultRegion="region"  @getRegion="handleGetRegion" class="width" style="white-space: nowrap; text-overflow: ellipsis; width: 53%;" >
                    <text >{{region?region.join(' '):'可选'}}</text>
                </pick-regions>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>
        </view>

        <!-- 保存 -->
        <!-- <view class="saveBtn" @click="onClickSave(false)">保存</view> -->
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pickRegions from '@/components/pick-regions/pick-regions.vue'
import { getUserInfo, updateUserInfo } from '@/util/api/user.js'
    export default {
        components:{ pickRegions },
        computed:{
            ...mapGetters('user',[
                'get_headimgUrl',
                'get_nickName',
                'get_phone',
                'get_sex',
                'get_birthday',
                'get_province',
                'get_city',
                'get_area',
			]),
            regionName(){
                // 转为字符串
                return this.region.join(' ')
            }
        },
        data(){
            return{
                userInfo:{
                    nickName:'大东东',
                    sex:1,
                    phone:'13068254894',
                    birthday:''
                },
                Index:0,
                sexArr:['男','女'],
                region:[]
            }
        },
        onLoad(){
            // 初始化数据
            console.log(this.get_birthday)
            this.userInfo.nickName = this.get_nickName
            this.userInfo.phone = this.get_phone
            this.userInfo.sex = this.get_sex
            this.userInfo.birthday =  this.get_birthday ? this.get_birthday : new Date().getTime()
            this.userInfo.province = this.get_province
            this.userInfo.city = this.get_city
            this.userInfo.area = this.get_area
            this.region[0] = this.get_province
            this.region[1] = this.get_city
            this.region[2] = this.get_area
                
        },
        methods:{
            ...mapActions('user',[
				'act_nickName'
            ]),

            // 性别
            change(e){
                this.Index = Number(e.detail.value)
                this.userInfo.sex = this.Index==0?1:2

                // 失去焦点保存
                this.onClickSave(true)
            },
            
            // 时间
            bindDateChange (e, item) {
				this.userInfo.birthday = new Date(e.target.value).getTime()

                // 失去焦点保存
                this.onClickSave(true)
            },

             // 获取选择的地区
            handleGetRegion(region){
                this.region = region.map(item=>item.name)
                this.userInfo.province = this.region[0]
                this.userInfo.city = this.region[1]
                this.userInfo.area = this.region[2]

                // 失去焦点保存
                this.onClickSave(true)
            },
            
            // 保存
            onClickSave(noBack){
                console.log(noBack)
                console.log(this.userInfo.birthday);
                console.log(this.userInfo)
                updateUserInfo(this.userInfo).then(res=>{
                    let code = res.data.code
                    if(code == 200){
                        let {headimgUrl,nickName,phone,sex,birthday,province,city,area,id} = this.userInfo
                        this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area,id})
                        if(!noBack){
                            uni.navigateBack()
                        }
                    }
                })
               
            }
        }
    }
</script>

<style lang="scss" scoped>
.user_box{
    height: 100vh;
    background: #F5F5F5;
    padding: 30rpx;
}
.user_seting{
    border-radius: 30rpx;
    background: #fff;
    font-size: 28rpx;
    .user_seting_li{
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1px solid #EEEEEE;
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
.user_logo{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50rpx 0;
    .login_logo{
        width: 194rpx;
        height: 194rpx;
        border-radius: 50%;
    }
}
.user_text{

}
</style>