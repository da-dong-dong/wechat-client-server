/******************************** 订单 ***************************************/
<template>
    <view class="order_box" >
        <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :show-border="showBorder"></wuc-tab>
           
            <swiper class="swiper_group" :style="{height:scrollHeight*2+'rpx'}" :current="TabCur"  :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
                <swiper-item  v-for="(item,index) in tabList" :key="index">
                    <!-- <orederAll :class="'swiper_'+ index" v-if="TabCur == index"/> -->
                    <orederAll class="swiper_0" v-if="item.path == 'all'"/>
                    <orederNoAppointment class="swiper_1" v-if="item.path == 'noAppointment'"/>
                    <orederGoOn class="swiper_2" v-if="item.path == 'goOn'"/>
                    <orederNoClose class="swiper_3" v-if="item.path == 'close'"/>
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
import orederNoClose from './tab/order-no-close.vue';
    export default {
        components: { WucTab, orederAll,orederNoAppointment,orederGoOn,orederNoClose},
        data() {
            return {
                TabCur: 0,
                showBorder:false,
                tabList: [
                    { name: '全部',path: "all" }, 
                    { name: '未预约',path: "noAppointment" },
                    { name: '进行中',path: "goOn" },
                    { name: '完成/关闭',path: "close" }
                ],
                scrollHeight:null
            }
        },
        mounted(){
           this.getHtight(this.TabCur)
           
        },
        methods: {
            tabChange(index) {
                this.TabCur = index;
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
                        this.scrollHeight = res[0].height
                    })
                }, 500);
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
    
    .swiper_group{
        flex: 1;
    }
}
.swiper{
    height: 100%;
}

</style>