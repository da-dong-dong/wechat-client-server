/******************************** 位置组件 ***************************************/
<template>
    <view>
         <view class="city  paddingTB20">
            <view class="cityTop flex">
                <view>
                    <text>当前定位城市：</text>
                    <text> {{cityVal?cityVal:'正在定位...'}} </text>
                </view>
                <!-- 切换品牌 -->
                <view class="color333" v-if="barmd" @click="onChageBarmd">切换品牌</view>
            </view>
            <view class="cityLi flex paddingTB20">
                <text v-for="(item) in cityLi" :key="item" @click="onClickVla(item)">{{item}}</text>
                <text @click="onChangeCity">更多</text>
            </view>
        </view>

        <view class="cityDate paddingTB20 " v-for="(item,index) in showShopIdList" :key="index" >
           
            <view class="shopImg ">
                <img lazy-load v-if="item.shopImages" :src="item.shopImages" alt="">
            </view>
            <view class="dateLi colorH">
                <view class="fontSize32 fontWight">
                    {{item.shopName}}
                </view>
                <view class="paddingT20 color999 fontSize24">
                    地址：{{`${item.province}${item.city}${item.area}`}}
                </view>
                <view class="color999 fontSize24 marginT10">
                    营业时间：{{item.businessHours?item.businessHours:''}}
                </view>
                <view class="btnLIst paddingT20">
                    <view class="btnBox marginR30" @click="onClickPhone('123456789')">拨打门店电话</view>
                    <view class="btnBox" @click="onClickShop(item)">前往门店</view>
                </view>
            </view>
        </view>
        <!-- 遮罩层 -->
        <modulPhone v-if="phoneShow" :phone="phone" type="phone" @cancel="cancel" @ok="ok"/>
    </view>
</template>

<script>
    import modulPhone from '@/components/modulPhone.vue'
    export default {
        components:{modulPhone},
       props:['cityVal','showShopIdList','barmd'],
        data(){
            return{
                phoneShow:false,
                phone:'',
                cityLi: ['北京','上海','广州','深圳','惠州']
            }
        },
        methods:{
            // 拨打电话
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

            // 更换城市
            onChangeCity(){
                this.$emit('onChangeCity')
            },

            // 门店id
            onClickShop(item){
                this.$emit('onSetShopId',item)
            },

            // 点击过滤
            onClickVla(val){
                this.$emit('onSearch',val)
            },

            // 切换品牌
            onChageBarmd(){
                this.$emit('onChageBarmd')
            }
        }
    }
</script>

<style lang="scss" scoped>
.city{
    box-sizing: border-box;
    margin: 0 50rpx;
    font-size: 30rpx;
    .cityLi{
        box-sizing: border-box;
        justify-content: space-between;
        font-size: 28rpx;
    }
    .cityTop{
        justify-content: space-between;
    }
}
.cityDate{
    box-sizing: border-box;
    font-size: 32rpx;
    .shopImg{
        width: 100%;
        height: 460rpx;
        background-color: #d8d8d8;
        margin-bottom: 60rpx;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .dateLi{
        padding-left: 80rpx;
        box-sizing: content-box;
        box-sizing: border-box;
    }
    .btnLIst{
        display: flex;
        .btnBox{
            height: 80rpx;
            width: 230rpx;
            border-radius: 10rpx;
            background-color: #D3AA72;
            text-align: center;
            line-height: 80rpx;
            color: #fff;
            font-size: 26rpx;
        }
    }
}
</style>