/******************************** 位置定位 ***************************************/
<template>
    <view>
        <!-- 搜索 -->
        <search  @onSearch="onSearch"/>

        <!-- 定位 -->
        <city  :cityVal="cityVal" :showShopIdList="showShopIdList" @onSearch="onSearch"/>
        
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import search from '@/components/search.vue'
import city from '@/components/city.vue'
import amap from '@/util/lib/amap-wx.js'
import { mapActions,mapGetters } from 'vuex'

import { getCityShop } from '@/util/api/map.js' 
const { $Message } = require('@/wxcomponents/base/index');
    export default {
         computed:{
			...mapGetters('map',[
				'get_shopIdList'
            ]),
           
        },
        components:{
            search,
            city
        },
        mounted() {  
            this.getMpa()
            if(this.get_shopIdList){
                this.shopIdList = this.get_shopIdList
            }else{
                this.getCityShop()
            }
            console.log(this.get_shopId)
        },  
        data(){
            return{
                amapPlugin: null,
                key: '1795a944cf2bc0fa0a47e22b1b67e6aa', // 高德key
                cityVal: null, // 当前位置
                showShopIdList: [], // 过滤后
            }
        },
        methods:{
            ...mapActions('map',[
				'act_shopIdList'
			]),
            // 搜索
            onSearch(val){
                console.log(val)
                this.filterShop(val)
                console.log(this.showShopIdList)
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
                    }  
                }); 
            },

            // 获取当前所有门店
            getCityShop(){
                getCityShop().then(res=>{
                    this.shopIdList = res.data.data
                    this.act_shopIdList(res.data.data)
                })
            },

            // 过滤门店
            filterShop(val){
                if(val){
                    this.showShopIdList = this.get_shopIdList.filter(res=>res.city.includes(val))
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>