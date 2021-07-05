/******************************** 专属顾问 ***************************************/
<template>
    <view class="oneryBox">
        <view class="top">
            <view class="topUser"> 
                <span>我的专属顾问</span>
                <input class="uni-input" @blur="blurInput" :value="introduceMobil" placeholder-style="color: #e8e8e8" placeholder="请输入您的顾问工号" /> 
            </view>
            <view class="topPhone" @click="onClickCallPhone">
                <i class="iconfont icon-dianhua"></i>拨打电话
            </view>
        </view>

        <view class="btnUser">
            <button class="newImgFlex" plain show-message-card session-from send-message-path send-message-title open-type='contact' style="border: 0; padding: 0;">
                <span>咨询一下 还无顾问</span>
                <i-icon class="icon" type="enter" size="20" color="#707070"  />
            </button>
        </view>

        <!-- 弹窗错误 -->
        <view v-if="showGoos" class="showGoos">
            <i-icon class="icon marginT20 marginB10" type="close" size="35" color="#FFFFFF"  />
            <text class="goods">请输入正确工号</text>
        </view>

        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
    import { setJobNumber,getJobNumber } from '@/util/api/user.js'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                introduceMobil:'',
                showGoos:false,
                phoneNumber: '13068254894' //仅为示例
            }
        },
        computed:{
			...mapGetters('user',[
                'get_userId',
                'get_enterpriseId',
                'get_jobNumber'
			]),
        },
        onLoad(){
            this.introduceMobil = this.get_jobNumber
        },
        methods:{
            // 拨打电话
            onClickCallPhone(){
                this.getJobNumber()
                uni.makePhoneCall({
                    phoneNumber:this.phoneNumber
                })
            },

            // 输入手机号弹窗
            blurInput(e){
                this.introduceMobil = e.detail.value
                console.log(this.introduceMobil)
                this.setJobNumber()
            },   

            // 获取工号
            getJobNumber(){
                let params = {
                    enterpriseId:this.get_enterpriseId,
                    jobNumber:this.get_jobNumber,
                    userId:this.get_userId
                }
                getJobNumber(params).then(res=>{
                    console.log(res)
                })
            },

            // 设置工号
            setJobNumber(){
                let params = {
                    enterpriseId:this.get_enterpriseId,
                    jobNumber:this.introduceMobil,
                    userId:this.get_userId
                }
                setJobNumber(params).then(res=>{
                    if(res.data.code == 400){
                        this.showGoos = true
                        setTimeout(()=>{
                            this.showGoos = false
                        },2000)
                    }
                    console.log(res)
                })
            }
        }
        
    }
</script>

<style lang="scss" scoped>
.oneryBox{
    position:fixed;
    top:0;
    left: 0;
    bottom: 0;
    right:0;
    background: #F5F5F5;
    border-top: 1px solid #DDDDDD;
    padding: 30rpx;
    font-size: 28rpx;
    color: #686868;
}
.top{
    background: #fff;
    border-radius: 30rpx;
}
.topUser{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1px solid #F0F0F0;
}
.topPhone{
    padding: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont{
        color: #D3AA72;
        font-size: 35rpx;
        margin-right: 15rpx;
    }
}
.btnUser{
    background: #fff;
    border-radius: 30rpx;
    padding: 15rpx 30rpx;
    margin-top: 30rpx;
}
.newImgFlex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    color: #686868;
}
.showGoos{
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    width: 310rpx;
    height: 245rpx;
    background: #666666;
    opacity: 0.8;
    border-radius: 21px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    .goods{
        color: #fff;
        padding: 5rpx 48rpx 20rpx;
        text-align: center;
        font-size: 30rpx;
        font-family: SourceHanSansCN;
        font-weight: 300;
    }
}
</style>