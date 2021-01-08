<template>
    <view class="order_box">
        <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
        <swiper :current="TabCur" class="swiper"  :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
            <swiper-item  v-for="(item,index) in tabList" :key="index">
                <orederDetails v-if="item.path == 'details'"/>
                <orederEvaluate v-if="item.path == 'evaluate'"/>
            </swiper-item>
      </swiper>
    </view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import orederDetails from './tab/order-details.vue';
import orederEvaluate from './tab/order-evaluate.vue';
    export default {
        data() {
            return {
                TabCur: 4,
                tabList: [
                    { name: '详情',path: "details" }, 
                    { name: '进度',path: "progress" },
                    { name: '影集',path: "photo" },
                    { name: '底片下载',path: "down" },
                    { name: '评价',path: "evaluate" }
                ],
            }
        },
        components: { WucTab, orederDetails,orederEvaluate},
        onReady() {
            console.log('aaa')
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.order_box{
    background: #F5F8FD;
    height: 100vh;
}
.swiper{
    height: 100%;
}
</style>