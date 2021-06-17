<template>
    <div class="secondary">
        <div class="oneContent" v-if="data.goodsShowType === 2 || data.goodsShowType === 3">
            <div class="oneRow" v-for="_ in rightList" :key="_.id" @click="onClickDetails(_.id)">
                <img class="h110" v-if="data.goodsShowType === 2" :src="_.coverPhoto" alt="">
                <img class="h200" v-if="data.goodsShowType === 3" :src="_.coverPhoto" alt="">
                <div class="title" v-if="data.showName === 1">{{_.imgTitle}}</div>
                <div class="desc fontSize25" v-if="data.showExtend === 1">{{_.imgIntroduction}} 不忘初心得东西需要时间等待</div>
            </div>
        </div>
        <div class="twoContent" v-if="data.goodsShowType === 0 || data.goodsShowType === 1">
            <div class="oneRow" v-for="_ in rightList" :key="_.id" @click="onClickDetails(_.id)">
                <img class="h110" v-if="data.goodsShowType === 0" :src="_.coverPhoto" alt="">
                <img class="h200" v-if="data.goodsShowType === 1" :src="_.coverPhoto" alt="">
                <div class="title" v-if="data.showName === 1">{{_.imgTitle}}</div>
                <div class="desc fontSize25" v-if="data.showExtend === 1">{{_.imgIntroduction}}</div>
            </div>
        </div>
        
        <view class="userCall">
            <button plain show-message-card session-from send-message-path send-message-title open-type='contact' style="border: 0; padding: 0; line-height: unset;">
                <img src="/static/image/userCall.png" alt="">
            </button>
        </view>
    </div>
</template>

<script>
import { getMaAssemblyOnlineTitle } from '@/util/api/goods.js'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            rightList: [],
            data: {
                goodsShowType: 0,
                showExtend: 0,
                showName: 0
            }
        }
    },
    computed:{
        ...mapGetters('user',[
            'get_appId',
            'get_enterpriseId',
            'get_shopId'
        ]),
    },
    onLoad(options) {
        this.getMaAssemblyOnlineTitle(options.id)
    },
    methods: {
        // 跳转详情
        onClickDetails(idx){
            uni.navigateTo({ 
                url: '/pages/tabBar/classify/newDetail?id=' + idx
            })
        },
        getMaAssemblyOnlineTitle(assemblyOnlineCategoryId){
            let param ={
                shopId: this.get_shopId.shopId,
                enterpriseId: this.get_enterpriseId,
                assemblyOnlineCategoryId,
                limit: 10,
                page: 1
            }
            getMaAssemblyOnlineTitle(param).then(res=>{
                console.log(res)
                if(!res.data.data){
                    this.rightList = []
                    return 
                }
                uni.setNavigationBarTitle({
                    title: res.data.data.category.name
                })
                this.rightList = res.data.data.list.records
                this.data = res.data.data.category
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.secondary{
    padding: 20rpx;
    .oneContent{
        .oneRow{
            margin-bottom: 20rpx;
            img{
                border-radius: 15rpx;
            }
        }
        .h110{
            width: 100%;
            height: 242rpx;
        }
        .h200{
            width: 100%;
            height: 490rpx;
        }
    }
    .twoContent{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .oneRow{
            margin-bottom: 20rpx;
            width: 340rpx;
        }
        .h110{
            width: 100%;
            height: 340rpx;
        }
        .h200{
            width: 100%;
            height: 486rpx;
        }
    }
}
.desc{
    color: #B3B3B3;
}
.title{
    padding: 10rpx 0;
    font-weight: 600;
}
</style>