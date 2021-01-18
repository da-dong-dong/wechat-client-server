/******************************** 位置组件 ***************************************/
<template>
    <view>
         <view class="city  paddingTB20">
            <text>当前定位城市：</text>
            <text> {{cityVal}} </text>
            <view class="cityLi flex paddingTB20">
                <text v-for="(item) in cityLi" :key="item">{{item}}</text>
            </view>
        </view>

        <view class="cityDate paddingTB10 marginRL10 ">
            <view class="dateLi marginRL10 padding10">
                <view >
                    惠州水口店
                    <i-icon class="icon paddingL20 paddingL10" type="coordinates" size="24" color="#87898A"  />
                    <text class="fontSize26">1.3公里</text>
                </view>
                <view class="paddingTB20">
                    地址：广东省惠州市惠城区水口
                </view>
            </view>
            <view class="dateBorder "></view>
        </view>
       <view class="cityDate paddingTB10 marginRL10 ">
            <view class="dateLi marginRL10 padding10">
                <view >
                    惠州水口店
                    <i-icon class="icon paddingL20 paddingL10" type="coordinates" size="24" color="#87898A"  />
                    <text class="fontSize26">1.3公里</text>
                </view>
                <view class="paddingTB20">
                    地址：广东省惠州市惠城区水口
                </view>
            </view>
            <view class="dateBorder "></view>
        </view>
    </view>
</template>

<script>
 
    export default {
       props:['cityVal'],
        data(){
            return{
                cityLi: ['北京','上海','广州','深圳','惠州']
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
.city{
    box-sizing: border-box;
    margin: 0 80rpx;
    .cityLi{
        box-sizing: border-box;
        justify-content: space-between;
        font-size: 28rpx;
    }
}
.cityDate{
    box-sizing: border-box;
    font-size: 34rpx;
    .dateLi{
        background: #E1E4E6;
        border: 1px solid #999;
        box-sizing: content-box;
    }
    .dateBorder{
        width: 500rpx;
        height: 2px;
        margin: 20rpx auto;
        background: #DDDDDD;
    }

}
</style>