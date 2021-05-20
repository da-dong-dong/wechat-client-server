/******************************** 位置定位 ***************************************/
<template>
    <view class="regionBox">
        <!-- 搜索 -->
        <search  @onSearch="onSearch"/>

        <!-- 定位 -->
        <city  :cityVal="cityVal" :barmd="get_barmd"  :showShopIdList="showShopIdList" @onSearch="filterShop" @onSetShopId="onSetShopId" @onChageBarmd="onChageBarmd" @onChangeCity="onChangeCity"/>
        
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import search from '@/components/search.vue'
import city from '@/components/city.vue'
import { mapGetters, mapMutations } from 'vuex'

const { $Message } = require('@/wxcomponents/base/index');
    export default {
         computed:{
			...mapGetters('map',[
                'get_shopIdList',
                'get_city',
                'get_barmd',
            ]),
           
        },
        components:{
            search,
            city
        },
        onLoad(options) {
            // 判断门店选择
            this.quick = options.quick
            this.id = options.id
            this.Index = options.index
            this.changeCity = options.changeCity
        },
        mounted() {  
            console.log(this.changeCity)
            // 判断是否更改城市
            if(this.changeCity === 'changeCity'){
                this.filterShop(this.get_city)
            }else{
                // 显示品牌所有门店
                this.showShopIdList = this.get_shopIdList
            }
            this.cityVal = this.get_city
        },  
        data(){
            return{
                quick:false,
                Index: 0, // 索引
                id: null, // 当前id
                amapPlugin: null,
                key: '1795a944cf2bc0fa0a47e22b1b67e6aa', // 高德key
                cityVal: null, // 当前位置
                changeCity: false, // 是否更改城市
                showShopIdList: [], // 过滤后
            }
        },
        methods:{
            ...mapMutations('user',[
				'mut_shopId'
            ]),

            ...mapMutations('carList',[
				'mut_quickListUpDataShopId'
            ]),

            ...mapMutations('map',[
				'mut_city'
            ]),

            // 搜索
            onSearch(val){
                // 判断搜索是否为空
                if(val.length === 0) {
                    this.showShopIdList = this.get_shopIdList
                }else{
                    this.filterShopSearch(val)
                }
            },

            // 设置门店
            onSetShopId(val){
                if(this.quick){
                    // 设置立刻下单门店
                    let data = {
                        id:this.id,
                        index:this.Index,
                        shopId: val.shopId,
                        shopName: val.shopName,
                        shopNo: val.shopNo
                    }
                    this.mut_quickListUpDataShopId(data)
                    this.mut_shopId(val)
                    uni.navigateBack()
                }else{
                    this.mut_shopId(val)
                    // 本地存储当前门店
                    uni.setStorage({
                        key: 'shopId',
                        data: val
                    })
                    uni.switchTab({
                        url:'/pages/tabBar/home/home'
                    })
                    this.mut_city(this.cityVal)
                }
                
            },

            // 切换品牌
            onChageBarmd(){
                uni.redirectTo({ 
                    url: '/pages/brand/brand' 
                })
            },

            // 切换城市
            onChangeCity(){
                uni.redirectTo({ 
                    url:'/pages/tabBar/home/components/cityList' 
                })
            },

            // 过滤城市门店
            filterShop(val){
                this.cityVal = val
                if(val){
                    this.showShopIdList = this.get_shopIdList.filter(res=> {
                            let listArr = false
                            if(res.city){
                                if(val.indexOf(res.city) != -1 || res.city.indexOf(val)!= -1){
                                    listArr = true
                                }else if(val.indexOf(res.area) != -1 || res.area.indexOf(val)!= -1){
                                    listArr = true
                                }else if(val.indexOf(res.province) != -1 || res.province.indexOf(val)!= -1){
                                    listArr = true
                                }
                               return  listArr
                            }
                        })
                }
            },

            // 过滤搜索门店
            filterShopSearch(val){
                if(val){
                    this.showShopIdList = this.get_shopIdList.filter(res=> {
                            if(res.shopName){
                               return  res.shopName.includes(val)
                            }
                        })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.regionBox{
    background: #F9F9F9;
    min-height: 100vh;
}
</style>