<template>
    <view class="order_box">
        <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
        <!-- <view>
            <orederDetails v-if="TabCur === 0" :orderId="orderId" class="swiper_0" />
            <orederProgress v-if="TabCur === 1" :orderId="orderId" class="swiper_1" />
            <orederOnlineSign ref="orderSign" v-if="TabCur === 2" :orderId="orderId" class="swiper_2" />
        </view> -->
        <view class="order_content">
            <neworederDetails v-if="TabCur === 0" :orderId="orderId" class="swiper_0" />
            <neworderProgress v-if="TabCur === 1" :orderId="orderId" class="swiper_1"/>
            <!-- <neworderSignture v-if="TabCur === 2" :orderId="orderId" class="swiper_2"/> -->
            <orederOnlineSign ref="orderSign" v-if="TabCur === 2" :orderId="orderId" class="swiper_2" />
        </view>
       <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import orederDetails from './tab/order-details.vue';
import neworederDetails from './detail/order-detail.vue';
import orederEvaluate from './tab/order-evaluate.vue';
import orederPhoto from './tab/order-photo.vue';
import orederPhotoDown from './tab/order-photo-down.vue';
import orederOnlineSign from './tab/order-online-sign.vue';
import orederProgress from './tab/order-progress.vue';
import neworderProgress from './detail/order-progress.vue'
import neworderSignture from './detail/order-signture.vue'
    export default {
        components: {
            WucTab,
            orederDetails,
            neworederDetails,
            orederEvaluate,
            orederPhoto,
            orederPhotoDown,
            orederProgress,
            orederOnlineSign,
            neworderProgress,
            neworderSignture
        },
        data() {
            return {
                orderId:null,// 订单id
                scrollHeight:null, // 高度
                TabCur: null,
                tabList: [
                    { name: '详情',path: "details" }, 
                    { name: '进度',path: "progress" },
                    // { name: '影集',path: "photo" },
                    { name: '网签',path: "onlinesign" },
                    // { name: '评价',path: "evaluate" }
                ],
            }
        },
        onLoad(options) {
            this.orderId = options.id
            this.TabCur = 1
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
    // background: #F5F8FD;
    background: #F9F9F9;
    height: 100vh;
    overflow: auto;
    .swiper_group{
        flex: 1;
    }
    .order_content{
        padding: 20rpx;
    }
}
.swiper{
    height: 100%;
}
</style>