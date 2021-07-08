/******************************** 订单 ***************************************/
<template>
    <view class="order_box" >
        <uni-nav-bar id="editor" fixed statusBar title="订单列表" :border="false"></uni-nav-bar>

        <s-pull-scroll class="right_box flex paddingT10" ref="pullScroll" :back-top="true" :pullUp="loadData" >
             <view  :style="{height:`${heightNav}px`}"></view>
            <view>
                <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :show-border="showBorder" ></wuc-tab>
            </view>
            <view class="order_box_content">
                <orederOne  v-for="(item,index) in tabList" :key="index" v-if="TabCur == index" :get_carList="get_carList" @onBuy="onBuy" @onOrderClose="onOrderClose" @onDelOrder="onDelOrder"/>
            </view>
        </s-pull-scroll>
        
        <!-- 弹窗 -->
        <i-message id="message" :style="{marginTop:`${heightNav}px`}"/>

        <!-- 底部导航 -->
		<tabBar :index="4"></tabBar>
    </view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import orederAll from './tab/order-all.vue';
import orederNoAppointment from './tab/order-no-appointment.vue';
import orederGoOn from './tab/order-go-on.vue';
import orederNoGoin from './tab/order-no-goins.vue';
import orederNoBuy from './tab/order-no-buy.vue';
import orederOne from './tab/new-order-one.vue';
import sPullScroll from '@/components/s-pull-scroll';
import { orderList, orderClose, orderPay,orderDelete } from '@/util/api/order.js'
const { $Message } = require('@/wxcomponents/base/index');
import { mapGetters } from 'vuex'
    export default {
        components: { WucTab, orederAll,orederNoAppointment,orederGoOn,orederNoGoin,orederNoBuy,orederOne,sPullScroll},
        computed:{
            ...mapGetters('map',[
				'get_shopIdList'
			]),
            ...mapGetters('user',[
                'get_enterpriseId'
			]),
        },
        data() {
            return {
                TabCur: 0,
                showBorder:true,
                tabList: [
                     { name: '全部',path: "all" },
                    { name: '未付款',path: "noBuy" },
                    { name: '待拍摄',path: "noAppointment" },
                    { name: '进行中',path: "goOn" },
                    { name: '已完成',path: "noGoIn" },
                    
                ],
                scrollHeight:null,
                get_carList:[],
                rightList:[],
                showNoMore:false,
                page:1,
                total:5, // 总数量
                list:[], // 总数据
                heightNav:0
            }
        },
        onLoad(){
            this.refresh();
		},
        mounted(){
            // 获取
            //this.orderList()
            // 获取高度
            const query = uni.createSelectorQuery().in(this);
            query.select('#editor').boundingClientRect(data => {
                this.heightNav = data.height
            }).exec();
            
        },
        onShow() {
            this.list = [];
            uni.getStorage({
                key: 'orderId',
                success: res => {
                    this.TabCur = 1
                    this.orderList()
                    uni.removeStorageSync('orderId');
                    this.navigateToMiniProgram(res.data)
                },
                fail:()=> {
                    this.TabCur=0
                    this.orderList()
                }
            })
        },
        methods: {
            tabChange(index) {
                this.TabCur = index;
                this.setData(this.TabCur)
                
            }, 
            swiperChange(val){
                this.TabCur = val.detail.current
            },

            // 获取所有订单数据
            orderList(){
                orderList().then(res=>{
                    this.list = res.data.data;
                   
                    this.setData(this.TabCur)
                })
            },

            // 立刻支付
            onBuy(orderId){
                orderPay({orderId}).then(res=>{
                    if(res.data.code == 200){
                        this.navigateToMiniProgram(res.data.data)
                    }
                })
            },
            // 取消订单
            onOrderClose(orderId){
                // 取消订单接口
                orderClose({orderId}).then(res=>{
                    if(res.data.code == 200){
                        this.orderList()
                    }
                })
            },

            // 删除订单
            onDelOrder(orderId){
                let param ={
                    orderId,
                    enterpriseId:this.get_enterpriseId
                }
               // 删除订单接口
                orderDelete(param).then(res=>{
                    if(res.data.code == 200){
                        this.orderList()
                    }
                })
            },

            // 跳转支付
            navigateToMiniProgram(data){
                let {jumpAppId,outTradeNo,payJumpMa,paySign,prepayId,nonceStr,timestamp} = data
                // 判断是否跳转支付
                if(payJumpMa){
                    uni.navigateToMiniProgram({
                        appId: jumpAppId,
                        envVersion: 'release', // develop（开发版），trial（体验版），release（正式版）
                        path: `pages/pay/pay?outTradeNo=${outTradeNo}`,
                        extraData: outTradeNo,
                        success(res) {
                            // 返回成功
                            console.log(res)
                        }
                    })
                }else{
                    uni.requestPayment({
                        provider: 'wxpay',
                        timeStamp: timestamp.toString(),
                        nonceStr: nonceStr,
                        package: `prepay_id=${prepayId}`,
                        signType: 'RSA',
                        paySign: paySign,
                        success: res => {
                            $Message({
                                content: "支付成功",
                                type: 'success'
                            });
                            console.log(res)
                        },
                        fail: err => {
                            $Message({
                                content: "支付失败",
                                type: 'error'
                            });
                            console.log(err)
                        }
                    });
                }
                
            },
            // 设置数据
            setData(idx){
                let setList = null
                switch (idx) {
                    case 0:
                        // 全部
                         setList= this.list.filter(item=>item)
                         setList.map(item=>{
                            if(item.sumPrice - item.incomePrice > 0 && !item.isClose){
                                item.state = null
                            }else if(!item.isPhotoAccomplish && !item.isClose){
                                item.state = '待拍摄'
                            }else{
                                item.state = '已关闭'
                            }
                            item.isType = 'ye'
                        })
                        this.get_carList = setList
                        break;
                    case 1:
                        // 未付款
                        setList = this.list.filter(item=>item.sumPrice - item.incomePrice > 0 && !item.isClose )
                        setList.map(item=>{
                            item.state = null;
                            item.isType = 'ye'
                        })
                        this.get_carList = setList
                        break;
                    case 2:
                        // 待拍摄
                        setList = this.list.filter(item=>!item.isPhotoAccomplish && !item.isClose)
                        
                        setList.map(item=>{
                            item.state = '待拍摄'
                            item.isType = 'no'
                        })
                        this.get_carList = setList

                        break;

                    case 3:
                        // 进行中
                        setList = this.list.filter(item=> (item.sumPrice - item.incomePrice > 0  && !item.isClose) || (!item.isPhotoAccomplish && !item.isClose))
                        setList.map(item=>{
                            if(!item.isPhotoAccomplish){
                                item.state = '待拍摄'
                            }
                            if(item.sumPrice - item.incomePrice > 0  && !item.isClose){
                                item.state = null
                            }
                            item.isType = 'no'
                        })
                        this.get_carList = setList
                        break;
                    case 4:
                        // 已完成
                        setList = this.list.filter(item=>item.isOrderAccomplish && !item.isClose)
                        setList.map(item=>item.state = '已完成')
                        this.get_carList = setList
                        
                        break;
                }
            },

            

            // 组件
			refresh () {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			loadData (pullScroll) {
				if (pullScroll.page == 1) {
					this.rightList = [];
				}
				if(!this.showNoMore){
					this.page = pullScroll.page
                }
				if(this.rightList.length < this.total){
                    //this.getPageAssemblyOnline()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				pullScroll.success();
			},
        },
        
    }
</script>

<style lang="scss" scoped>
.nav-bar{
    margin-bottom: 20rpx;
}
.order_box{
    flex:1;
    display: flex;
    flex-direction: column;
    background: #F5F5F5;
    height: 100vh;
    .swiper_group{
        flex: 1;
    }
    .order_box_content{
        padding: 20rpx;
    }
}
.swiper{
    height: 100%;
}

</style>