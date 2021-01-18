/******************************** 位置定位 ***************************************/
<template>
    <view>
        <!-- 搜索 -->
        <search  @onSearch="onSearch"/>

        <!-- 定位 -->
        <city  :cityVal="cityVal"/>

    </view>
</template>

<script>
import search from '@/components/search.vue'
import city from '@/components/city.vue'
import amap from '@/util/lib/amap-wx.js';  
    export default {
        components:{
            search,
            city
        },
        onLoad() {  
            this.getMpa()
        },  
        data(){
            return{
                amapPlugin: null,
                key: '1795a944cf2bc0fa0a47e22b1b67e6aa', 
                cityVal: null,
            }
        },
        methods:{
            // 搜索
            onSearch(val){
                console.log(val)
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>