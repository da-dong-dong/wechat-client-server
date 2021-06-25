<template>
    <view class="buy_cart_content">
        <uni-nav-bar fixed statusBar id="editor" title="购物车"></uni-nav-bar>
        <div class="pad20">
            <view v-if="get_carList.length > 0">
                <view class="msg_div">
                    <div class="topShop">
                        <span class="topSelect fontWight">已选门店</span>
                        <view class="topShopText">
                            <view>{{get_shopId?get_shopId.shopName:'请选择门店'}}</view>
                            <view class="orange paddingL20" @click="onChangeShopId">切换 <i-icon type="enter" size="20" color="#D3AA72" /></view>
                        </view>
                    </div>
                    <uni-swipe-action>
                        <uni-swipe-action-item v-for="(_, i) in get_carList" :key="i">
                            <view class="flex" @click="onClickDetails(_.id)">
                                <view class="radio">
                                    <radio class="scale75" color="#D3AB75" :checked="_.buyBool" @click="radioChange(_)"/>
                                </view>
                                <img class="h145" :src="_.imgs" />
                                <view class="flex_1">
                                    <view class="padding">
                                        <span class="font600">{{_.name}}</span>
                                        <span class="float_r colorA3">￥{{_.enableDeposit?_.assemblyDeposit:_.price}}</span>
                                    </view>
                                    <view class="font14">
                                        总 价:<span class="orange fontWight">￥{{_.price}}</span>
                                    </view>
                                    <view class="font14 paddingT5">
                                        尾 款:￥{{_.enableDeposit?_.price - _.assemblyDeposit:_.price}}
                                    </view>
                                </view>
                            </view>
                            <template v-slot:right>
                                <view class="del" @click="onCarListDel(i)">删除</view>
                            </template>
                        </uni-swipe-action-item>
                    </uni-swipe-action>


                    <view class="flex buy_content flexCenten"  v-if="get_carList.length > 0">
                        <view class="radio">
                            <radio class="scale75" color="#D3AB75" :checked="buyAllBool" @click="allChange"/>
                        </view>
                        <div class="buy_all">全选</div>
                        <view class="buy_txt">
                            <view class="font18 fontFamilyST fontWight">
                                合计: <span class="orange">￥{{ sumPrice }}</span>
                            </view>
                        </view>
                        <view class="go_sub" @click="onQuick">
                            去预约
                        </view>
                    </view>
                </view>
            </view>
            <view class="showList carLi" v-else>
                <div class="flex_col">
                    <img class="w144"  src="/static/image/my/wdl.png">
                    <div>您暂时还没有您还没加购产品喔~</div>
                </div>
            </view>
            <view class="recommend">
               <view class="borders"></view>
               <view class="text">为你推荐</view>
               <view class="borders"></view>
            </view>
            <div class="twoContent">
                <div class="oneRow" v-for="_ in recommentList" :key="_.assemblyOnlineId" @click="onClickDetails(_.assemblyOnlineId)">
                    <img class="h110" :src="_.coverPhoto"/>
                    <div class="tow_title">{{_.assemblyName}}</div>
                    <div class="desc" >
                        ￥ {{_.assemblyPrice}}
                        <span class="iconfont icon1202youjiantou gt_icon"></span>
                    </div>
                </div>
            </div>
        </div>
       <!-- 客服 -->
        <view class="userCall">
            <button plain show-message-card session-from send-message-path send-message-title open-type='contact' style="border: 0; padding: 0; line-height: unset;">
                <img src="/static/image/userCall.png" alt="">
            </button>
        </view>
        <!-- 弹窗 -->
        <i-message id="message" :style="{marginTop:`${heightNav}px`}"/>
        <!-- 底部导航 -->
		<tabBar :index="3"></tabBar>
    </view>
</template>

<script>
const accountInfo = uni.getAccountInfoSync(); 
import { mapGetters, mapMutations, mapActions } from 'vuex'
import buyCar from '@/components/buyCar.vue'
import { getRecommendAssemblyList } from '@/util/api/order.js'
import { getUserInfo } from '@/util/api/user.js'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

const { $Message } = require('@/wxcomponents/base/index');
    export default {
        components:{
            buyCar,
            uniSwipeAction,
            uniSwipeActionItem
        },
        computed:{
			...mapGetters('user',[
				'get_shopId',
                'get_appId',
                'get_userId',
                'get_enterpriseId'
            ]),
            ...mapGetters('carList',[
				'get_carList'
            ]),
            sumPrice () {
                let sum = 0
                this.get_carList.forEach(_ => {
                    if(_.enableDeposit){
                        sum += _.assemblyDeposit
                    }else{
                        if (_.buyBool) {
                            sum += _.price
                        }
                    }

                    
                })
                return sum
            }
        },
        data(){
            return{
                jsCode: null,
               check:'',
               buyAllBool: true,
               recommentList: [],
               heightNav:0
            }
        },
        onLoad(options) {
            uni.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
        },
        onShow () {
            console.log('数据', this.get_carList)
            this.getRecommendAssemblyList()
        },
        mounted () {
            this.login()
            // 获取高度
            const query = uni.createSelectorQuery().in(this);
            query.select('#editor').boundingClientRect(data => {
                this.heightNav = data.height
            }).exec();
        },
        methods:{
            ...mapActions('user',[
                'act_nickName',
                'act_code'
            ]),
            
            onClickDetails(idx){
                uni.navigateTo({ 
                    url: '/pages/tabBar/classify/components/details?id=' + idx
                })
            },
            // 获取用户信息AIP
            getUserInfoAPI(){
                getUserInfo().then(res=>{
                    console.log('获取用户信息AIP', res)
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area,id} = res.data.data
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area,id})
                    this.getRecommendAssemblyList()
                })
            },
            // 获取code值
            login(){
                uni.login({
                    provider: 'weixin',
                    success:(res) => {
                        // 获取code值
                        let param = {
                            jsCode: res.code,
                            authorizerAppid:  accountInfo.miniProgram.appId
                        }
                        this.jsCode = param
                        console.log('获取了code值',this.jsCode)
                        this.getUserInfoAPI()
                    }
                });
            },
            ...mapMutations('carList',[
                'mut_carListDel',
                'mut_carListDelAll',
                'mut_quickListAdd'
            ]),
            getRecommendAssemblyList () {
                let params = {
                    appId: this.get_appId,
                    browseUser: this.get_userId,
                    enterpriseId: this.get_enterpriseId
                }
                getRecommendAssemblyList(params).then(res => {
                    console.log('推荐套系', res);
                    this.recommentList = res.data.data
                })
            },
            // 切换门店
            onChangeShopId(){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeRegion?quick=true' 
                })
            },
            allChange () {
                this.buyAllBool = !this.buyAllBool
                this.get_carList.forEach(_ => {
                    _.buyBool = this.buyAllBool
                })
            },
            radioChange (e) {
                e.buyBool = !e.buyBool
                this.buyAllBool = this.get_carList.filter(_ => _.buyBool).length === this.get_carList.length
            },
            // 修改预约时间
            onChangeTime(index){
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/changeTimes?index=' +  index
                })
            },
            // 清空
            onCarListDelAll(){
                this.mut_carListDelAll()
            },

            // 清空单个
            onCarListDel(index){
                this.mut_carListDel(index)
                uni.showToast({
                    title: '删除成功',
                    duration: 1500
                })
            },

            // 跳支付页
            onQuick(){
                let carList = this.get_carList;
                
                if(!carList.length){
                    $Message({
                        content:'请选择商品',
                        type: 'error'
                    });
                    return
                }
                // 判断是否存在不同订单
                for (let i = 0; i < carList.length - 1; i++) {
                    for (let j = i + 1; j < carList.length; j++) {
                        console.log(carList[i].orderType)
                        if (carList[i].orderType !== carList[j].orderType) {
                            $Message({
                                content:'请选择相同类型订单',
                                type: 'error'
                            });
                            return false
                        }
                    }
                }
                this.mut_quickListAdd(carList)
                uni.navigateTo({ 
                    url: '/pages/tabBar/shoppingCart/components/order_confirm'
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.topShop{
    display: flex;
    justify-content: space-between;
    line-height: 50rpx;
    color: #000000;
    padding: 0 20rpx 20rpx;
    box-sizing: content-box;
    border-bottom: 1rpx solid #ECECEC;
    font-size: 30rpx;
    .topShopText{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50rpx;
        color: #414143;
        .paddingL20{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
.buy_cart_content{
    height: 100vh;
    // padding: 20rpx;
    padding-bottom: 150rpx;
    overflow: auto;
    box-sizing: border-box;
    background: #f5f5f5;
    overflow: auto;
    .recommend{
        text-align: center;
        margin-bottom: 30rpx;
        margin-top: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .borders{
            width: 200rpx;
            border-bottom: 2rpx solid #ECECEC;
        }
        .text{
            text-align: center;
            padding: 0 20rpx;
        }
    }
    .pad20{
        padding: 20rpx;
    }
    .msg_div{
        padding: 20rpx 0;
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
    }
    .title_div{
        padding: 20rpx;
        border-bottom: 1px solid #ECECEC;
        display: flex;
        .title{
            width: 200rpx;
            font-weight: 600;
            font-size: 30rpx;
        }
        .title_shop{
            text-align: right;
            flex: 1;
        }
    }
    .flex{
        padding: 20rpx;
        border-bottom: 1px solid #ECECEC;
        .h145{
            width: 150rpx;
            height: 150rpx;
            margin-right: 20rpx;
            border-radius: 10rpx;
        }
        .radio{
            display: flex;
            align-items: center;
            width: 50rpx;
            margin-right: 10rpx;
        }
        .flex_1{
            
        }
        
        .font600{
            font-weight: 600;
        }
        .padding{
            padding: 10rpx 0 20rpx;
        }
        .font14{
            font-size: 26rpx;
            color: #A3A3A3;
        }
        .font18{
            font-size: 36rpx;
        }
        .colorA3{
            color: #A3A3A3;
        }
    }
    .float_r{
        float: right;
    }
    .orange{
        color: #D3AB75;
    }
    .no_border{
        border: none;
    }
    .buy_content{
        border: none;
        .buy_all{
            width: 80rpx;
            margin-right: 20rpx;
            display: flex;
            align-items: center;
        }
        .buy_txt{
            flex: 1;
        }
        .go_sub{
            background: #D3AB75;
            border-radius: 40rpx;
            color: #fff;
            width: 160rpx;
            display: flex;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;
            margin: 6rpx 0;
            height: 60rpx;
            line-height: 60rpx;
        }
    }
}
.twoContent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    .oneRow{
        background: #fff;
        margin-bottom: 30rpx;
        width: 340rpx;
        border-radius: 10rpx;
    }
    .h110{
        width: 100%;
        height: 415rpx;
        border-radius: 10rpx;
    }
    .desc{
        padding: 0 10rpx 30rpx;
        font-weight: 600;
        line-height: 30rpx;
    }
    .tow_title{
        padding: 20rpx 10rpx 10rpx;
        color: #b2b2b2;
        font-size: 26rpx;
    }
    .gt_icon{
        float: right;
        color: #D4AD72;
        font-size: 30rpx;
    }
}
.orange{
    color: #D3AB75;
}
.showList{
    margin-bottom: 50rpx;
    height: 400rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    // color: #9D9D9D;
    color: #d8d8d8;
    .flex_col{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .w144{
        width: 144rpx;
        height: 144rpx;
    }
}
.del{
    color: #fff;
    background: #FF3B30;
    text-align: center;
    display: flex;
    align-items: center;
    padding: 0rpx 20rpx;
    height: 100%;
}
</style>
