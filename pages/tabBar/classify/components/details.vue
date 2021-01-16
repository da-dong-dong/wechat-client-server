/******************************** 套系详情 ***************************************/
<template>
   <view>
        <!-- 轮播 -->
        <banner :imgs="imgs"/>

        <!-- 内容文字 -->
        <view class="content marginT10 padding10 marginRL10">
            <view>
                套系名称：<text>8899宝宝照</text>
            </view>
            <view class="paddingTB20">
                套系价格：<text class="colorRed">￥8899</text>
            </view>
            <view>
                服务内容：
            </view>
            <view class="context_li  flex">
                <view class="flex paddingRL20 paddingT10">
                    <text>8寸水晶册</text><text>X 1</text>
                </view>
                <view class="flex paddingRL20 paddingT10">
                    <text>8寸水晶册</text><text>X 1</text>
                </view>
                <view class="flex paddingRL20 paddingT10">
                    <text>8寸水晶册</text><text>X 1</text>
                </view>
            </view>
        </view>

        <!-- 图片展示 -->
        <view class="imgShow marginT10 marginRL10">
            <!-- tab切换 -->
            <view class="imgTab flex fontSize36 textC">
                <view class="imgTab_li">产品展示</view>
               <view class="imgTab_li">产品展示</view>
            </view>

            <!-- 展示 -->
            <view class="showTab">
                
            </view>
        </view>
   </view>
</template>

<script>
import banner from '@/components/banner.vue'
    export default {
        components:{
            banner
        },
        data(){
            return{
                Tab:['产品展示','服务说明'],
                Index:0, // tab 索引
                imgs:['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.hnol.net%2Fc%2F2015-09%2F13%2F00%2F201509130021357341-2381913.jpg&refer=http%3A%2F%2Fimage.hnol.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613293081&t=c85ce60267bf1fbde8f1ceea384cbbe0','https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200323%2F2be76653f64243cba41121f37c9d3a7b.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613293081&t=e7256a161ec94190054909ca3fee1f29','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.nosdn.127.net%2FSoxuWTMB9XeJi9v0ZFU2SMf%3Dv%3D5z2fhhDYDUAU5fJiCFC1533199826960compressflag.jpg&refer=http%3A%2F%2Fdingyue.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613293081&t=591b0f9e12fdc8a0e762cb36cf8e7945']
            }
        },
        onLoad(options) {
            console.log(options.id)
        }
    }
</script>

<style lang="scss" scoped>
.content{
    border: 1px solid #9BA3B7;
    font-size: 32rpx;
    box-sizing: content-box;
    .context_li{
        flex-wrap: wrap;
        font-size: 28rpx;
        .flex{
            width: 300rpx;
            justify-content: space-between;
        }
    }
}
.imgShow{
    border: 1px solid #9BA3B7;
    box-sizing: content-box;
    .imgTab{
        .imgTab_li{
            width: 50%;
            .active{
                color: #34B9C2;
            }
        }
    }
}
</style>