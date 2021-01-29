/******************************** 个人信息 ***************************************/
<template>
    <view>
         <view class="user_seting marginT10">
            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">姓名</text>
                </view>
                <input class="width" type="text" placeholder="请输入姓名" v-model="userInfo.name"/>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

           <picker @change="change" :value="index" :range="sexArr">
                <view class="user_seting_li flex paddingRL20" >
                    <view class="flex">
                        <text class="paddingL20 color999">性别</text>
                    </view>
                    <text class="width">{{userInfo.sex}}</text>
                    <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
                </view>
            </picker>

            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">手机号码</text>
                </view>
                <input class="width" type="text" placeholder="请输入手机号码" v-model="userInfo.tal"/>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>

            <picker mode="date" :value="userInfo.time" @change="bindDateChange($event, userInfo)">
                <view class="user_seting_li flex paddingRL20" >
                    <view class="flex">
                        <text class="paddingL20 color999">生日</text>
                    </view>
                    <text class="width">{{userInfo.time ? userInfo.time : '生日' | times}}</text>
                    <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
                </view>
            </picker>

            <view class="user_seting_li flex paddingRL20" >
                <view class="flex">
                    <text class="paddingL20 color999">地址</text>
                </view>
                <pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion" class="width" >
                    <text >{{regionName?regionName:'地址'}}</text>
                </pick-regions>
                <i-icon class="icon" type="enter" size="20" color="#D8D8D8"  />
            </view>
        </view>

        <!-- 保存 -->
        <view class="saveBtn" @click="onClickSave">保存</view>
    </view>
</template>

<script>
import pickRegions from '@/components/pick-regions/pick-regions.vue'
    export default {
        components:{ pickRegions },
        computed:{
            regionName(){
                // 转为字符串
                return this.region.map(item=>item.name).join(' ')
            }
        },
        data(){
            return{
                userInfo:{
                    name:'大东东',
                    sex:'男',
                    tal:'13068254894',
                    address:'惠城区水口',
                    time:''

                },
                sexArr:['男','女'],
                index:0,
                region:[],
                defaultRegion:['广东省','广州市','番禺区'],
                defaultRegionCode:'440113'
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

             // 获取选择的地区
            handleGetRegion(region){
                this.region = region
                console.log(region)
            },
            
            // 保存
            onClickSave(){
                uni.navigateBack()
            }
        }
    }
</script>

<style lang="scss" scoped>
.user_seting{
    border: 1px solid #D8D8D8;
    border-bottom:none;
    font-size: 28rpx;
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