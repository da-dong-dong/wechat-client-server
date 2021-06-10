/******************************** 套系详情 ***************************************/
<template>
   <view class="boxDitel">
        <!-- 轮播 -->
        <banner :imgs="listDetai.topCarouseList"/>

        <!-- 内容文字 -->
        <view class="content  padding10 marginRL30">
            <view class="flex content_top">
                <text>{{listDetai.name}}</text>
                <text class="colorH">
                    ￥{{listDetai.assemblyPrice?listDetai.assemblyPrice:''}}
                    <text class="colorH" v-if="listDetai.enableDeposit">(定金：{{listDetai.assemblyDeposit}})</text>
                </text>
                <div @click="onCollection()" class="font12">
                    <i class="iconfont iconshoucang"></i>收藏
                </div>
            </view>
        </view>

        <!-- 详细内容 -->
        <view class="content_text paddingRL40 marginRL30 colorADAD ">
            <!-- 定金 -->
            <view class="borderTop fontSize28" v-if="listDetai.enableDeposit">
                <view class="flex paddingTB20 flexCenten">
                    <text class="marginR30 fontSize30">定金</text>
                    <view>
                         预定金: <text class="colorH marginR10">￥{{listDetai.assemblyDeposit}}</text>
                         尾款: <text class="fontWight">￥{{listDetai.assemblyPrice-listDetai.assemblyDeposit}}</text>
                    </view>
                </view>
            </view>

            <!-- 详情 -->
            <view class="context_li paddingB20 borderTop" v-for="(item,index) in listDetai['assemblyItemList']" :key='index'>
                <view class=" fontSize28  fontWight paddingTB20 ">详情内容-{{item.name}}</view>
                <!-- 底片 -->
                <view class="marginB10 flexCenten fontSize28">
                    <view>
                         <text class="marginR30">底片{{item.bottomCount}}张</text>
                         <text>精修{{item.refineCount}}张</text>
                    </view>
                </view>

                <!-- 景点 -->
                <view class="paddingTB20" v-if="item['assemblyItemPlaces'].length">
                    <view class="fontSize28  fontWight marginB10">拍摄景点</view>
                    <view class="flex fontSize28 " v-for="(item1,index1) in item['assemblyItemPlaces']" :key='index1'>
                        <view>
                            <text class="fintSize30 fontWight">·</text>
                            <text class="paddingL10">{{item1.name}}</text>
                        </view>
                    </view>
                </view>

                <!-- 服装 -->
                <view class="paddingTB20" v-if="item['assemblyItemDressInfos'].length">
                    <view class="fontSize28  fontWight marginB10">服装</view>
                    <view class="flex fontSize28  " v-for="(item1,index1) in item['assemblyItemDressInfos']" :key='index1'>
                        <view>
                            <text class="fintSize30 fontWight">·</text>
                            <text class="paddingL10">{{item1.name}}</text>
                        </view>
                        <text>{{`X ${item1.count}`}}</text>
                    </view>
                </view>
                
                <!-- 商品 -->
                <view class="paddingTB20" v-if="item['assemblyItemGoods'].length">
                    <view class="fontSize28  fontWight marginB10">商品</view>
                    <view class="flex fontSize28 " v-for="(item1,index1) in item['assemblyItemGoods']" :key='index1'>
                        <view>
                            <text class="fintSize30 fontWight">·</text>
                            <text class="paddingL10">{{item1.name}}</text>
                        </view>
                        <text>{{`P数： ${item1.countP}`}}</text>
                        <text>{{`X ${item1.count}`}}</text>
                    </view>
                </view>

                <!-- 服务 -->
                <view class="paddingTB20" v-if="item['assemblyItemServices'].length">
                    <view class="fontSize28  fontWight marginB10">服务</view>
                    <view class="flex fontSize28 " v-for="(item1,index1) in item['assemblyItemServices']" :key='index1'>
                        <view>
                            <text class="fintSize30 fontWight">·</text>
                            <text class="paddingL10">{{item1.name}}</text>
                        </view>
                    </view>
                </view>
                    
            </view>
        </view>

        <!-- 图片展示 -->
        <view class="imgShow marginT10 marginRL30 marginB30 paddingB20">
            <!-- tab切换 -->
            <view class="imgTab flex fontSize24 textC marginB30">
                <view class="imgTab_li" :class="Index==index?'active':''" v-for="(item,index) in Tab" :key="index" @click="onClickTab(index)">{{item}}</view>
            </view>

            <!-- 展示 -->
            <view v-if="Index == 0?true:false" class="showTab padding20">
                <image mode='widthFix'  class="img marginB10 " v-for="(item,index) in listDetai.detailPhotoList" :key="index"  :src="item"></image>
            </view>

            <view v-else>
                <view class="paddingRL40" v-html="testData"></view>
            </view>
        </view>

        <!-- 购物车定位 -->
        <buyCar type="details" @goCar="goCar" @addCar="addCar" @onQuick="onQuick"/>

        <!-- 客服 -->
        <!-- <view class="userCall">
            <button plain session-from="大东东" open-type='contact' style="border: 0; padding: 0; line-height: unset;">
                <img src="/static/image/userCall.png" alt="">
            </button>
        </view> -->
        <!-- 客服 -->
        <view class="userCall">
            <button plain show-message-card session-from send-message-path send-message-title open-type='contact' style="border: 0; padding: 0; line-height: unset;">
                <img src="/static/image/userCall.png" alt="">
            </button>
        </view>
         <!-- 弹窗 -->
        <i-message id="message" />
   </view>
</template>

<script>
import banner from '@/components/banner.vue'
import buyCar from '@/components/buyCar.vue'
import { getAssemblyOnlineDetail, cellectAssembly } from '@/util/api/goods.js'
import { getAssemblyDescription } from '@/util/api/user.js'
import { addRecommendOne } from '@/util/api/order.js'
 import { mapMutations, mapGetters } from 'vuex'
    export default {
        computed:{
			...mapGetters('user',[
                'get_appId',
                'get_enterpriseId',
                'get_userId',
                'get_shopId'
			])
        },
        components:{
            banner,
            buyCar
        },
        
        data(){
            return{
                Tab:['产品展示','服务说明'],
                listDetai:[], // 详情数据
                testData:'', // 套系服务说明
                serverList:null, // 服务内容
                Index:0, // tab 索引
                Id:0,
               }
        },
        onLoad(options) {
            this.Id = options.id;
            this.getAssemblyOnlineDetail()

            this.getAssemblyDescription()
        },
        methods:{
            ...mapMutations('carList',[
                'mut_carListAdd',
                'mut_quickListAdd'
            ]),

            // 获取线上套系详情
            getAssemblyOnlineDetail(){
                let param = {
                    enterpriseId:this.get_enterpriseId,
                    id:this.Id
                }
                getAssemblyOnlineDetail(param).then(res=>{
                    this.listDetai = res.data.data
                    console.log(this.listDetai)
                    uni.setNavigationBarTitle({
                        title: res.data.data.name
                    })
                    let params = {
                        appId: this.get_appId,
                        assemblyId: this.listDetai.assemblyId,
                        browseUser: this.get_userId,
                        enterpriseId: this.get_enterpriseId
                    }
                    this.get_userId && addRecommendOne(params)
                })
            },

            // 套系服务说明 
            getAssemblyDescription(){
                let param = {
					appId:this.get_appId,
					enterpriseId:this.get_enterpriseId
				}
                getAssemblyDescription(param).then(res=>{
                    this.testData = res.data.data
                })
            },

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
            addCar(flag){
                let datas={
                        buyBool: true,
                        id:this.listDetai.id,
                        name:this.listDetai.name,
                        price:this.listDetai.assemblyPrice,
                        imgs:this.listDetai.detailPhotoList?this.listDetai.detailPhotoList[0]:'',
                        times:'',
                        filesTime:'',
                        filesPrice:'',
                        orderType:this.listDetai.orderType,
                        shopId: this.get_shopId.shopId,
                        shopName: this.get_shopId.shopName,
                        shopNo: this.get_shopId.shopNo,
                        enableDeposit:this.listDetai.enableDeposit, // 定金开启
                        assemblyDeposit:this.listDetai.assemblyDeposit, // 定金
                    }
                // 判断是否立刻下单
                if(flag){
                    this.mut_quickListAdd([datas])
                }else{
                    this.mut_carListAdd(datas)
                    uni.showToast({
                        title: '添加购物车成功',
                        duration: 2000
                    })
                }
            },

            // 立刻预约
            onQuick(){
                this.addCar('quick')
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/order_confirm'
                })
            },
            // 收藏
            async onCollection () {
                let params = {
                    appId: this.get_appId,
                    assemblyId: this.listDetai.assemblyId,
                    assemblyType: this.listDetai.assemblyType,
                    enterpriseId: this.get_enterpriseId,
                    isCollect: true,
                    images: this.listDetai.coverPhoto,
                    userId: this.get_userId,
                    title: this.listDetai.name
                }
                if (this.get_userId) {
                    await cellectAssembly(params)
                    uni.showToast({
                        title: '收藏成功',
                        duration: 2000
                    })
                } else {
                    uni.showToast({
                        title: '请登录后再收藏',
                        duration: 2000
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

.boxDitel{
    background: #F9F9F9;
}
.borderTop{
    border-top: 1rpx solid #F6F6F6;
}
.content{
    background: rgba(255,255,255,0.8);
    border-radius: 20rpx 20rpx 0 0;
    font-size: 34rpx;
    box-sizing: content-box;
    .content_top{
        padding: 40rpx 25rpx;
        justify-content: space-between;
        font-weight: bold;
    }
}
// 详细内容
.content_text{
    background: rgba(255,255,255,0.8);
    border-radius: 0 0 20rpx 20rpx;
    .context_li{
        .flex{
            justify-content: space-between;
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
            color: #D6A972;
            font-weight: bold;
        }
    }
    .showTab{
        box-sizing: content-box;
        .marginB10{
            margin-bottom: -8rpx;
            vertical-align: bottom;
        }
    }
}
.font12{
    font-size: 20rpx;
    color: #6B6B6B;
    text-align: center;
    font-weight: 500;
}
</style>