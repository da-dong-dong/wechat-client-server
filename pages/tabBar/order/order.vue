/******************************** 订单 ***************************************/
<template>
    <view class="order_box" >
        <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :show-border="showBorder"></wuc-tab>
           
            <!-- <view v-for="(item,index) in tabList" :key="index">
                 <orederAll :class="'swiper_'+ index" v-if="TabCur == index" :get_carList="get_carList"/>
            </view> -->
            <swiper class="swiper_group" :style="{height:scrollHeight*2+'rpx'}" :current="TabCur"  :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
                <swiper-item  v-for="(item,index) in tabList" :key="index">
                    <orederAll class="swiper_4" v-if="item.path == 'all'"/>
                    <orederNoBuy class="swiper_1" v-if="item.path == 'noBuy'"/>
                    <orederNoAppointment class="swiper_2" v-if="item.path == 'noAppointment'"/>
                    <orederGoOn class="swiper_3" v-if="item.path == 'noGoIn'"/>
                    <orederNoGoin class="swiper_0" v-if="item.path == 'goOn'"/>
                </swiper-item>
            </swiper> 

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
    export default {
        components: { WucTab, orederAll,orederNoAppointment,orederGoOn,orederNoGoin,orederNoBuy},
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
                get_carList:null
            }
        },
        mounted(){
           this.getHtight(this.TabCur)
           this.setData(this.TabCur)
        },
        methods: {
            tabChange(index) {
                this.TabCur = index;
                this.setData(this.TabCur)
                // 修改标题
                // uni.setNavigationBarTitle({
                //     title: option.typeName
                // });
            }, 
            swiperChange(val){
                this.TabCur = val.detail.current
            },

            // 封装获取高度
            getHtight(indx){
                setTimeout(() => {
                    let info = uni.createSelectorQuery().in(this).select(`.swiper_${indx}`).boundingClientRect()
                    info.exec(res => {
                        console.log(res)
                        this.scrollHeight = res[0].height
                    })
                }, 500);
            },

            // 模拟数据
            setData(idx){
                switch (idx) {
                    case 0:
                        this.get_carList=[
                                {
                                    id:201001001,
                                    name:'889宝宝照',
                                    price:8889,
                                    imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                                    times:'2020-10-18',
                                    filesTime:'16:00',
                                    filesPrice:'123',
                                    noOrder:false
                                },
                            ]
                        break;
                
                     case 1:
                        this.get_carList=[
                            {
                                id:201001001,
                                name:'889宝宝照',
                                price:8889,
                                imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                                times:'2020-10-18',
                                filesTime:'16:00',
                                filesPrice:'123',
                                noOrder:true
                            }
                           
                        ]
                        break;

                    case 2:
                        this.get_carList=[
                             {
                                id:201001001,
                                name:'889宝宝照',
                                price:8889,
                                imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                                times:'',
                                filesTime:'',
                                filesPrice:'',
                                noOrder:false
                            }
                        ]
                        break;
                    case 3:
                        this.get_carList=[
                            {
                                id:201001001,
                                name:'889宝宝照',
                                price:8889,
                                imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                                times:'2020-10-18',
                                filesTime:'16:00',
                                filesPrice:'123',
                                noOrder:false
                            }
                        ]
                        break;

                    case 4:
                         this.get_carList=[
                                {
                                    id:201001001,
                                    name:'889宝宝照',
                                    price:8889,
                                    imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                                    times:'2020-10-18',
                                    filesTime:'16:00',
                                    filesPrice:'123',
                                    noOrder:true
                                },
                                {
                                    id:201001001,
                                    name:'889宝宝照',
                                    price:8889,
                                    imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                                    times:'2020-10-18',
                                    filesTime:'16:00',
                                    filesPrice:'123',
                                    noOrder:false
                                },
                                {
                                    id:201001001,
                                    name:'889宝宝照',
                                    price:8889,
                                    imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
                                    times:'',
                                    filesTime:'',
                                    filesPrice:'',
                                    noOrder:false
                                }
                            ]
                        break;
                
                
                }
            }
        },
        watch:{
            TabCur(newVal){
                
                this.getHtight(newVal)
            }
        }
        
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