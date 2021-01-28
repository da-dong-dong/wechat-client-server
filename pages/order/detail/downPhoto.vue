/******************************** 下载图片 ***************************************/
<template>
    <view>
        <view class="downPhoto">
             <checkbox-group>
                <view class="imgList">
                    <view class="chebos" v-for="(item,index) in imgs" :key="index">
                        <image class="img"  :src="item"></image>
                        <checkbox :value="index" class="checks" color="#5893FF"/>
                    </view>
                </view>
             </checkbox-group>
        </view>
    </view>
</template>

<script>
    export default {
         onLoad(options) {
            console.log(options.id)
        },
        data(){
            return{
                imgs:['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw960h1280%2F20180303%2F06cb-fwnpcnt4630086.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614342958&t=83729dc55178b3a20b7bdd01ceeec87c','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11283463979%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614343070&t=34e42d49f8e18b362530c40065400d4d','https://pic3.zhimg.com/80/v2-b5e65c9b4d34fe2dc097cdeed2022086_720w.jpg','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F20%2F20160820165627_QMNnA.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614343362&t=a5b9a4e2c52970c6ad7b18d6f2f76df3','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1222017046,1654915567&fm=26&gp=0.jpg']
            }
        }
    }
</script>

<style lang="scss" scoped>
.downPhoto{
    padding:18rpx 30rpx;
    .imgList{
         display: grid;
    grid-template-columns: repeat(auto-fill, 33.33%);
        }
    .chebos{
        width: 228rpx;
        height: 228rpx;
        margin-bottom: 10rpx;
        position: relative;
        .img{
            width: 228rpx;
            height: 228rpx;
            border-radius: 20rpx;
        }
        .checks{
            position: absolute;
            top: 10rpx;
            right: 10rpx;
            border-radius: 50%;
        }
    }
}
</style>