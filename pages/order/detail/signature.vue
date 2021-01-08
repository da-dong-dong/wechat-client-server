<template>
    <view>
        <catsignature @save="save" :visible='true' v-if="flag"/>
    </view>
</template>

<script>
    import catsignature from '@/components/cat-signature/cat-signature.vue'
    export default {
        components:{catsignature},
        data(){
            return{
                flag : true
            }
        },
        onLoad(option){
			console.log(option.id)
		},
        methods:{
            save(res){
                console.log(res);
                this.flag = false
                uni.navigateBack()
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>