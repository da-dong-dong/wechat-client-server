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
                    <!-- <text class="colorH" v-if="listDetai.enableDeposit">(定金：{{listDetai.assemblyDeposit}})</text> -->
                </text>
                <!-- <div @click="onDelCollection()" class="font12 width60" v-if="colors">
                    <image  class="login_logo" src="/static/image/checkCall.png"></image>已收藏
                </div>
                <div @click="onCollection()" class="font12 width60" v-else>
                    <image  class="login_logo" src="/static/image/noShow.png"></image>收藏
                </div> -->
            </view>
        </view>

        <!-- 详细内容 -->
        <view class="content_text paddingRL40 marginRL30 colorADAD ">
            <!-- 定金 -->
            <view class="borderTop fontSize28" v-if="listDetai.enableDeposit">
                <view class="flex paddingTB20 flexCenten">
                    <text class="marginR30 fontSize30">定金</text>
                    <view>
                         预定金: <text class="colorH marginR10 fontWight">￥{{listDetai.assemblyDeposit}}</text>
                         尾款: <text class="fontWight">￥{{listDetai.assemblyPrice-listDetai.assemblyDeposit}}</text>
                    </view>
                </view>
            </view>

            <view class="context_li paddingB20 borderTop paddingTB20" >
                <view class="flex">
                    <div class="title fontSize30">服务</div>
                    <div class="list fontSize24">
                        <text class="textFlex"  v-if="listUl['assemblyItemDressInfos']">造型{{listUl['assemblyItemDressInfos']}}套</text>
                        <text class="textFlex"  v-if="listUl['bottom']">底片{{listUl['bottom']}}张</text>
                        <text class="textFlex"  v-if="listUl['refine']">精修{{listUl['refine']}}张</text>
                       
                        <text class="textFlex" v-for="(item,index) in listUl['goods']" :key="index">{{index}}{{item}}件</text>
                        
                    </div>
                </view>
            </view>
        </view>

        <!-- 图片展示 -->
        <view class="imgShow marginT30 marginRL30 marginB30 paddingB20">
            <!-- tab切换 -->
            <view class="imgTab flex fontSize30 textC marginB30">
                <view class="imgTab_li" :class="Index==index?'active':''" v-for="(item,index) in Tab" :key="index" @click="onClickTab(index)">
                    {{item}}
                    <div class="borderBottom" v-show="Index==index"></div>
                </view>
            </view>

            <!-- 展示 -->
            <view v-if="Index == 0?true:false" class="showTab padding20">
                <image mode='widthFix'  class="img marginB10 " v-for="(item,index) in listDetai.detailPhotoList" :key="index"  :src="item"></image>
            </view>

            <view v-else>
                <view class="paddingRL40" v-html="listDetai.serviceDesc"></view>
            </view>
        </view>

        <!-- 购物车定位 -->
        <buyCar type="details" @goCar="goCar" @addCar="addCar" @onQuick="onQuick"/>

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
import { getAssemblyOnlineDetail, cellectAssembly,getAssemblyCollect,delCollectOne } from '@/util/api/goods.js'
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
                listUl:{}, // 套系内容
                Id:0,
                colors:false, // 套系收费
                delCollId:null, // 记录id
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
                    // 循环赋值套系详情个数
                    // 服装个数
                    let assemblyItemDressInfos = 0
                    // 商品个数
                    let goods={}
                    // 底片
                    let bottom = 0
                    // 精修
                    let refine = 0
                    let ulArr = this.listDetai.assemblyItemList
                    ulArr.map(item=>{
                        // 服装
                        item.assemblyItemDressInfos.map(_=>{
                            assemblyItemDressInfos+=_.count
                        })
                        //商品个数
                        item.assemblyItemGoods.map(_=>{
                            if(goods.hasOwnProperty(_.name)){
                                goods[_.name]+=_.count
                            }else{
                                goods[_.name]=_.count
                            }
                        })
                        // 底片 精修
                        bottom+=item.bottomCount
                        refine+=item.refineCount
                    })
                    this.listUl={
                        goods,
                        assemblyItemDressInfos,
                        bottom,
                        refine
                    }
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
                    // 获取是否收藏
                    this.getAssemblyCollect()
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
                        assemblyType:this.listDetai.assemblyType, // 0 单日套系 1双日套系
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
                    assemblyId: this.Id,
                    assemblyType: this.listDetai.assemblyType,
                    enterpriseId: this.get_enterpriseId,
                    isCollect: true,
                    images: this.listDetai.coverPhoto,
                    userId: this.get_userId,
                    title: this.listDetai.name,
                }
                if (this.get_userId) {
                    await cellectAssembly(params)
                    uni.showToast({
                        title: '收藏成功',
                        duration: 2000
                    })
                    this.getAssemblyCollect()
                } else {
                    uni.showToast({
                        title: '请登录后再收藏',
                        duration: 2000
                    })
                }
            },

            // 删除收藏
            onDelCollection(){
                delCollectOne({id:this.delCollId}).then(res=>{
                    if(res.data.data){
                        this.delCollId = null
                        this.colors = false
                        uni.showToast({
                            title: '删除成功',
                            duration: 1500
                        })
                    }
                })
            },

            // 获取是否收藏
            getAssemblyCollect(){
                let params = {
                    appId: this.get_appId,
                    assemblyId: this.Id,
                    assemblyType: this.listDetai.assemblyType,
                    enterpriseId: this.get_enterpriseId,
                    userId: this.get_userId,
                }
                getAssemblyCollect(params).then(res=>{
                    if(res.data.data){
                        this.delCollId = res.data.data.id
                        this.colors = true
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

.boxDitel{
    background: #F9F9F9;
}
.borderTop{
    border-top: 1rpx solid #dedede;
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
        .title{
            flex: 1;
        }
        .list{
            display: flex;
            flex: 6;
            width: 20rpx;
            flex-wrap: wrap;
            line-height: 45rpx;
            text{
                margin-right: 40rpx;
            }
        }
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
        box-sizing: content-box;
        border-bottom: #EAEAEA 1rpx solid;
        margin-left: 30rpx;
        margin-right: 30rpx;
        padding-bottom: 20rpx;
        color: #A3A3A3;
        .imgTab_li{
            width: 50%;
            position: relative;
            .borderBottom{
                border-bottom: 2rpx solid #D3AA72;
                width: 100rpx;
                position: absolute;
                bottom: -21rpx;
                left: 108rpx;
            }
        }
        .active{
            color: #D3AA72;
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
.login_logo{
    width: 32rpx;
    height: 32rpx;
    display: inherit;
    margin: 0 auto;
}
.textFlex{
    white-space: nowrap;
    /* text-overflow: clip; */
    width: 135rpx;
    overflow: hidden;
}
</style>