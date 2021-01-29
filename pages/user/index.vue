<template>
    <view>
       <view class="user_box">
           <view class="user_info">
               <view class="user_info_img flex">
                   <view class="info_img"></view>
                   <view>吴彦祖</view>
               </view>
                <view class="user_info_but flex">
                    <view>13502424878</view>
                    <view class="info_but_text">更换</view>
               </view>
           </view>
           <!-- 订单信息 -->
           <view class="user_tab" >
               <view class="user_tab_text">我的订单</view>
           </view>
           <!-- 订单 -->
           <view class="user_order">
               <view class="order_box">
                   <view class="order_top">
                       <image class="order_top_img" src="/static/image/user_loc.png"></image>
                       <view>郑州金夫人</view>
                       <view class="order_lien"></view>
                   </view>
                   <view class="order_info">
                       <view class="order_info_flx">
                           <view>
                               订单类型：<text>婚纱订单</text>
                           </view>
                           <view>
                               服务阶段：<text>拍摄</text>
                           </view>
                       </view>
                      <view class="order_info_flx">
                           <view>
                               拍照时间：<text class="red">未安排</text>
                           </view>
                       </view>
                        <view class="order_info_flx">
                           <view class="flex">
                               订单人员：<text class="red">张三</text><image @click="onClickPhone('13506585784')" class="order_top_img" src="/static/image/user_phone.png"></image>
                           </view>
                       </view>
                       <view class="order_info_btn_box">
                           <view class="order_info_btn">查看详细</view>
                       </view>
                       
                   </view>
               </view>
               
           </view>
           
       </view>
        <!-- 底部悬浮 -->
        <footText />
           
       <!-- 遮罩层 -->
        <modulPhone v-if="phoneShow" :phone="phone" @cancel="cancel" @ok="ok"/>
       
    </view>
</template>

<script>
   import footText from '@/components/footText.vue'
   import modulPhone from '@/components/modulPhone.vue'
    export default {
        components:{footText,modulPhone},
        data(){
            return{
                phone:'',
                phoneShow:false,
                phoneShows:true
            }
        },
        methods:{
            onClickPhone(phone){
                this.phone = phone
                this.phoneShow = true
            },
            cancel(){
                this.phoneShow = false
            },
            ok(){
               uni.makePhoneCall({
                    // 手机号
                    phoneNumber: this.phone, 

                    // 成功回调
                    success: (res) => {
                        this.phoneShow = false;
                        
                    },

                    // 失败回调
                    fail: (res) => {
                        this.phoneShow = false;
                    }
                    
                }); 
            },
            
        }
    }
</script>

<style lang="scss" scoped>
.user_box{
    padding: 0 30rpx;
    min-height: 100vh;
    background: #F5F8FD;
    box-sizing: content-box;
    overflow: auto;
}
.flex{
    display: flex;
    align-items: center;
}
.user_info{
    height: 176rpx;
    margin-top: 30rpx;
    display: flex;
    background: #fff;
    border-radius: 88rpx  4rpx  4rpx  88rpx;
    justify-content: space-around;
    align-items: center;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    .info_img{
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        background: red;
        margin-right: 20rpx;
    }
    .info_but_text{
        width: 88rpx;
        height: 40rpx;
        line-height: 40rpx;
        background: #FF4852;
        border-radius: 16rpx;
        box-shadow: 0 4rpx 14rpx #FF4852;
        text-align: center;
        color: #fff;
        margin-left: 20rpx;
        font-weight: 400;
    }
}
.user_tab{
    height: 48rpx;
    background: url('/static/image/user_my.png') no-repeat;
    margin: 40rpx auto;
    background-position-x: center;
    .user_tab_text{
        text-align: center;
        font-size: 30rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
    }
}
.user_order{
    padding-bottom: 30rpx;
    .order_box{
        margin-bottom: 30rpx;
    }
    .order_top{
        padding-left: 14rpx;
        display: flex;
        align-items: center;
        position: relative;
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        .order_top_img{
            width: 22rpx;
            height: 24rpx;
            margin-right: 16rpx;
        }
        .order_lien{
            position: absolute;
            width: 2rpx;
            height: 58rpx;
            background: #FF4852;
            top: 30rpx;
            left: 22rpx;
        }
    }
    .order_info{
        position: relative;
        margin-top: 24rpx;
        min-height: 328rpx;
        background: #FFFFFF;
        border-radius: 16rpx; 
        .order_info_flx{
            padding-top: 24rpx;
            padding:  24rpx 35rpx 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            text{
                color:#333333;
                font-weight: bold;
            }
            .red{
                color:#FF2402
            }
            .order_top_img{
                width: 100rpx;
                height: 50rpx;
            }
        }
        .order_info_btn_box{
            margin-top: 20rpx;
            text-align: right;
        }
        .order_info_btn{
            width: 164rpx;
            height: 64rpx;
            border-radius: 32rpx;
            border: 2rpx solid #DCE9FF;
            font-size: 28rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FF4852;
            text-align: center;
            line-height: 64rpx;
            display: inline-block;
            margin-right: 35rpx;
        }
    }
}
</style>