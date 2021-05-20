/******************************** 服务协议 ***************************************/
<template>
    <view>
        <view class="paddingRL40" v-html="testData"></view>
        <!-- 按钮 -->
        <view  class="saveBtn" @click="onBck"> 确定 </view>
         <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAssemblyDescription, getAgreementDescription } from '@/util/api/user.js'
    export default {
        computed:{
			...mapGetters('user',[
                'get_appId',
                'get_enterpriseId'
			]),
        },
        onLoad(options) {
            this.type = options.type
            if(this.type=='setUp'){
                this.setUp()
                uni.setNavigationBarTitle({
                    title: '服务说明'
                })
            }else{
                this.mack()
                uni.setNavigationBarTitle({
                    title: '协议说明'
                })
            }
        },
        data(){
            return{
                type:'',
                testData:''
            }
        },
        methods:{
            // 预约服务
            setUp(){
                let param = {
					appId:this.get_appId,
					enterpriseId:this.get_enterpriseId
				}
                getAssemblyDescription(param).then(res=>{
                    this.testData = res.data.data
                })
            },

            // 协议说明
            mack(){
                let param = {
					appId:this.get_appId,
					enterpriseId:this.get_enterpriseId
				}
                getAgreementDescription(param).then(res=>{
                    this.testData = res.data.data
                })
            },
            // 返回
            onBck(){
                uni.navigateBack()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>