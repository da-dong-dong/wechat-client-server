/******************************** 位置定位 ***************************************/
<template>
    <view class="regionBox">
        <!-- 搜索 -->
        <search  @onSearch="onSearch"/>

        <!-- 定位 -->
        <city  :cityVal="cityVal" :barmd="get_barmd"  :showShopIdList="showShopIdList" @onSearch="onSearch" @onSetShopId="onSetShopId" @onChageBarmd="onChageBarmd"/>
        
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import search from '@/components/search.vue'
import city from '@/components/city.vue'
import amap from '@/util/lib/amap-wx.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
        },
        mounted() {  
            this.getMpa()
            this.filterShop(this.get_city)
        },  
        data(){
            return{
                quick:false,
                Index: 0, // 索引
                id: null, // 当前id
                amapPlugin: null,
                key: '1795a944cf2bc0fa0a47e22b1b67e6aa', // 高德key
                cityVal: null, // 当前位置
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

            // 搜索
            onSearch(val){
                this.filterShop(val)
            },

            // 获取当地位置
            getMpa(){
                this.amapPlugin = new amap.AMapWX({  
                    key: this.key  
                });  
                
                this.amapPlugin.getRegeo({  
                    success: (data) => {  
                        let {city} = data[0].regeocodeData.addressComponent
                        this.cityVal = city
                        //this.filterShop(this.get_city)
                        // 显示品牌所有门店
                        this.showShopIdList = this.get_shopIdList
                    },
                    fail: (err) =>{
                        this.showShopIdList = this.get_shopIdList
                    }
                }); 
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
                }
                
            },

            // 切换品牌
            onChageBarmd(){
                uni.redirectTo({ 
                    url: '/pages/brand/brand' 
                })
            },

            // 过滤门店
            filterShop(val){
                if(val){
                    this.showShopIdList = this.get_shopIdList.filter(res=> {
                            if(res.city){
                               return  res.city.includes(val)
                            }
                        })
                    
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.regionBox{
    background: #F9F9F9;
    min-height: 100vh;
}
</style>