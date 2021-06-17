/******************************** 关于 ***************************************/
<template>
    <view class="aboutImg">
        <view class="imgs">
            <image class="img" v-for="item in aboutImg" :key="item" :src="item" mode="widthFix" />
        </view>
    </view>
</template>

<script>
    import { getReservationServer } from '@/util/api/user.js'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                aboutImg: []
            }
        },
        computed:{
			...mapGetters('user',[
                'get_appId',
                'get_enterpriseId'
			]),
        },
        mounted(){
            let params ={
                appId:this.get_appId,
                enterpriseId:this.get_enterpriseId
            }
            getReservationServer(params).then(res=>{
                let arr = []
                res.data.data.map(item=>{
                    arr.push(`//lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/${item}`)
                })
                this.aboutImg = arr
            })
        }
        
    }
</script>

<style lang="scss" scoped>
.aboutImg{
    background: #F5F5F5;
    padding: 30rpx;
    .imgs{
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .img{
            width: 100%;
        }
    }
}
</style>