/******************************** 城市页面 ***************************************/
<template>
    <view>
        <t-city @bindCity="bindCity" :city="get_city"/>
    </view>
</template>

<script>
    import TCity from '@/components/t-city/t-city.vue';
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        components:{
            't-city':TCity
        },
        computed: {
			...mapGetters('map',[
				'get_city'
			]),
		},
        
        methods:{
            ...mapMutations('map',[
				'mut_city'
            ]),
            ...mapMutations('user',[
				'mut_shopId'
			]),
            //点击城市时触发,event = {cityId,cityName,spell}
            bindCity({cityName,city}){
                this.mut_city(cityName || city)
                // 跳转门店选择
                console.log('触发')
                uni.removeStorage({
                    key: 'shopId',
                    success: (result) => {
                        this.mut_shopId(null)
                        uni.redirectTo({
                            url:'/pages/tabBar/shoppingCart/components/changeRegion?changeCity=changeCity'
                        })
                    },
                    fail: (error) => {}
                })
                
                
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>