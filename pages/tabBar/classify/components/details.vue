/******************************** 套系详情 ***************************************/
<template>
   <view class="boxDitel">
        <!-- 轮播 -->
        <banner :imgs="imgs"/>

        <!-- 内容文字 -->
        <view class="content marginB30 padding10 marginRL10">
            <view class="flex content_top">
                <text>8899宝宝照</text>
                <text class="colorRed">￥8899</text>
            </view>
            <view class="content_text flex">
                <view class="content_text_l">
                    服务内容
                </view>
                <view class="context_li  flex">
                    <view class="flex paddingRL20 paddingT10">
                       <i-icon class="icon " type="right" size="20" color="#FF4852"  />
                       <text>8寸水晶册</text><text>X 1</text>
                    </view>
                    <view class="flex paddingRL20 paddingT10">
                        <i-icon class="icon " type="right" size="20" color="#FF4852"  />
                        <text>8寸水晶册</text><text>X 1</text>
                    </view>
                    <view class="flex paddingRL20 paddingT10">
                        <i-icon class="icon " type="right" size="20" color="#FF4852"  />
                        <text>8寸水晶册</text><text>X 1</text>
                    </view>
                </view>
            </view>
            
        </view>

        <!-- 图片展示 -->
        <view class="imgShow marginT10 marginRL10">
            <!-- tab切换 -->
            <view class="imgTab flex fontSize24 textC marginB30">
                <view class="imgTab_li" :class="Index==index?'active':''" v-for="(item,index) in Tab" :key="index" @click="onClickTab(index)">{{item}}</view>
            </view>

            <!-- 展示 -->
            <view v-if="Index == 0?true:false" class="showTab padding10">
                <image class="img marginB10 " v-for="(item,index) in imgs" :key="index"  :src="item"></image>
            </view>

            <view v-else>
                <text>文案</text>
                <text>文案</text>
                <text>文案</text>
                <text>文案</text>
            </view>
        </view>

        <!-- 购物车定位 -->
        <buyCar type="details" @goCar="goCar" @addCar="addCar" @onQuick="onQuick"/>
   </view>
</template>

<script>
import banner from '@/components/banner.vue'
import buyCar from '@/components/buyCar.vue'
 import { mapMutations, mapGetters } from 'vuex'
    export default {
        components:{
            banner,
            buyCar
        },
        
        data(){
            return{
                Tab:['产品展示','服务说明'],
                Index:0, // tab 索引
                Id:0,
                imgs:['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.hnol.net%2Fc%2F2015-09%2F13%2F00%2F201509130021357341-2381913.jpg&refer=http%3A%2F%2Fimage.hnol.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613293081&t=c85ce60267bf1fbde8f1ceea384cbbe0','https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200323%2F2be76653f64243cba41121f37c9d3a7b.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613293081&t=e7256a161ec94190054909ca3fee1f29','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.nosdn.127.net%2FSoxuWTMB9XeJi9v0ZFU2SMf%3Dv%3D5z2fhhDYDUAU5fJiCFC1533199826960compressflag.jpg&refer=http%3A%2F%2Fdingyue.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613293081&t=591b0f9e12fdc8a0e762cb36cf8e7945']
            }
        },
        onLoad(options) {
            this.Id = options.id
        },
        methods:{
            ...mapMutations('carList',[
				'mut_carListAdd'
            ]),

            // 切换tab
            onClickTab(idx){
                this.Index = idx
            },

            // 进入购物车
            goCar(){
                uni.switchTab({
                    url:'/pages/tabBar/shoppingCart/shoppingCart'
                })
            },

            // 添加到购物车
            addCar(){
                let datas={
                        id:this.Id,
                        name:'889宝宝照',
                        price:8889,
                        imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                        times:'',
                        filesTime:'',
                        filesPrice:''
                    }
                this.mut_carListAdd(datas)
            },

            // 立刻预约
            onQuick(){
                this.addCar()
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/buyOrder'
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
.boxDitel{
    background: #F9F9F9;
}
.content{
    background: rgba(255,255,255,0.8);
    border-radius: 20rpx;
    font-size: 30rpx;
    box-sizing: content-box;
    .content_top{
        padding: 40rpx 25rpx;
        justify-content: space-between;
        border-bottom: 1px solid #DDDDDD;
        font-weight: bold;
    }
    .content_text{
        justify-content: space-around;
        align-items: center;
        font-size: 24rpx;
        color:#999999;
        .content_text_l{
            width: 80rpx;
            line-height: 40rpx;
            font-size: 30rpx;
            margin-left: 40rpx;
        }
    }
    .context_li{
        flex-wrap: wrap;
        width: 550rpx;
        .flex{
            width: 230rpx;
            height: 80rpx;
            align-items: center;
            justify-content: space-between;
            .icon{
                padding-right: 20rpx;
            }
        }
    }
}
.imgShow{
    background: #fff;
    border-radius: 20rpx;
    .imgTab{
        padding-top: 30rpx;
        .imgTab_li{
            width: 50%;
        }
        .active{
            color: #FF4852;
            font-weight: bold;
        }
    }
    .showTab{
        box-sizing: content-box;
    }
}
</style>