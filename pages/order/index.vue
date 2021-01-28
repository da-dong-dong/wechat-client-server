<template>
    <view class="order_box">
        <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
        <swiper class="swiper_group"  :style="{height:scrollHeight*2+'rpx'}" :current="TabCur"   :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
            <swiper-item  v-for="(item,index) in tabList" :key="index">
                <orederDetails class="swiper_0" v-if="item.path == 'details'"/>
                <orederPhoto class="swiper_2" v-if="item.path == 'photo'"/>
                <orederPhotoDown class="swiper_3" v-if="item.path == 'down'"/>
                <orederEvaluate class="swiper_1" v-if="item.path == 'evaluate'"/>
            </swiper-item>
      </swiper>
    </view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import orederDetails from './tab/order-details.vue';
import orederEvaluate from './tab/order-evaluate.vue';
import orederPhoto from './tab/order-photo.vue';
import orederPhotoDown from './tab/order-photo-down.vue';
    export default {
        components: { WucTab, orederDetails,orederEvaluate,orederPhoto,orederPhotoDown},
        data() {
            return {
                scrollHeight:null, // 高度
                TabCur: 3,
                tabList: [
                    { name: '详情',path: "details" }, 
                    { name: '进度',path: "progress" },
                    { name: '影集',path: "photo" },
                    { name: '底片下载',path: "down" },
                    { name: '评价',path: "evaluate" }
                ],
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
                let info = uni.createSelectorQuery().in(this).select(`.swiper_${indx}`).boundingClientRect()
                info.exec(res => {
                    this.scrollHeight = res[0].height
                })
            }
        },
        updated(){
           this.getHtight(this.TabCur)
        },
    }
</script>

<style lang="scss" scoped>
.order_box{
    flex:1;
    display: flex;
    flex-direction: column;
    background: #F5F8FD;
    .swiper_group{
        flex: 1;
    }
}
.swiper{
    height: 100%;
}
</style>