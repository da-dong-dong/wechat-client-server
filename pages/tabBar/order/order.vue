/******************************** 订单 ***************************************/
<template>
    <view class="order_box" >
        <s-pull-scroll class="right_box flex paddingT10" ref="pullScroll" :back-top="true" :pullUp="loadData">
            <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :show-border="showBorder"></wuc-tab>
        
            <view v-for="(item,index) in tabList" :key="index">
                 <orederNoBuy :class="'swiper_'+ index" v-if="TabCur == index" :get_carList="get_carList" @onOrderClose="onOrderClose"/>
            </view>
            <!-- <swiper class="swiper_group" :style="{height:scrollHeight+'px'}" :current="TabCur"  :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
                <swiper-item  v-for="(item,index) in tabList" :key="index">
                    <orederAll class="swiper_4" v-if="item.path == 'all'"/>
                    <orederNoBuy class="swiper_1" v-if="item.path == 'noBuy'"/>
                    <orederNoAppointment class="swiper_2" v-if="item.path == 'noAppointment'"/>
                    <orederGoOn class="swiper_3" v-if="item.path == 'goOn'"/>
                    <orederNoGoin class="swiper_0" v-if="item.path == 'noGoIn'"/>
                </swiper-item>
            </swiper>  -->
        </s-pull-scroll>
      <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import orederAll from './tab/order-all.vue';
import orederNoAppointment from './tab/order-no-appointment.vue';
import orederGoOn from './tab/order-go-on.vue';
import orederNoGoin from './tab/order-no-goins.vue';
import orederNoBuy from './tab/order-no-buy.vue';
import sPullScroll from '@/components/s-pull-scroll';
import { orderList, orderClose } from '@/util/api/order.js'
import { mapGetters } from 'vuex'
    export default {
        components: { WucTab, orederAll,orederNoAppointment,orederGoOn,orederNoGoin,orederNoBuy,sPullScroll},
        computed:{
            ...mapGetters('map',[
				'get_shopIdList'
			]),
        },
        data() {
            return {
                TabCur: 0,
                showBorder:false,
                tabList: [
                     { name: '进行中',path: "goOn" },
                    { name: '未付款',path: "noBuy" },
                    { name: '未预约',path: "noAppointment" },
                    { name: '未到店',path: "noGoIn" },
                     { name: '全部/关闭',path: "all" } 
                ],
                scrollHeight:null,
                get_carList:[],
                rightList:[],
                showNoMore:false,
                page:1,
                total:5, // 总数量
                list:[], // 总数据
            }
        },
        onLoad(){
            this.refresh();
		},
        mounted(){
            // 获取
            //this.orderList()
            
        },
        onShow() {
            this.list = [];
            uni.getStorage({
                key: 'orderId',
                success: res => {
                    this.TabCur = 1
                    this.orderList()
                    uni.removeStorageSync('orderId');
                    uni.navigateToMiniProgram({
                        appId: res.data.jumpAppId,
                        envVersion: 'release', // develop（开发版），trial（体验版），release（正式版）
                        path: `pages/pay/pay?outTradeNo=${res.data.outTradeNo}`,
                        extraData: res.data,
                        success(res) {
                            // 返回成功
                            console.log(res)
                        }
                    })
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
            // 取消订单
            onOrderClose(orderId){
                // 取消订单接口
                orderClose({orderId}).then(res=>{
                    if(res.data.code == 200){
                        this.orderList()
                    }
                })
            },

            // 设置数据
            setData(idx){
                let setList = null
                switch (idx) {
                    case 0:
                        // 进行中
                        setList = this.list.filter(item=> (item.sumPrice - item.incomePrice > 0  && !item.isClose) || (!item.reservationPhotoInfoVos && !item.isClose) || (!item.isToShop && !item.isClose))
                        setList.map(item=>{
                            if(!item.reservationPhotoInfoVos){
                                item.state = '未预约'
                            }
                            if(!item.isToShop){
                                item.state = '未到店'
                            }
                        })
                        this.get_carList = setList
                        break;
                
                     case 1:
                        // 未付款
                        setList = this.list.filter(item=>item.sumPrice - item.incomePrice > 0 && !item.isClose )
                        setList.map(item=>item.state = null)
                        this.get_carList = setList
                        break;

                    case 2:
                        // 未预约
                        setList = this.list.filter(item=>!item.reservationPhotoInfoVos && !item.isClose)
                        
                        setList.map(item=>item.state = '未预约')
                        this.get_carList = setList

                        break;
                    case 3:
                        // 未到店
                        setList = this.list.filter(item=>!item.isToShop && !item.isClose)
                        setList.map(item=>item.state = '未到店')
                        this.get_carList = setList
                        
                        break;

                    case 4:
                        // 全部
                         setList= this.list.filter(item=>item)
                         setList.map(item=>{
                            if(!item.reservationPhotoInfoVos){
                                item.state = '未预约'
                            }
                            if(!item.isToShop){
                                item.state = '未到店'
                            }
                        })
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

.order_box{
    flex:1;
    display: flex;
    flex-direction: column;
    background: #F9F9F9;
    .swiper_group{
        flex: 1;
    }
}
.swiper{
    height: 100%;
}

</style>