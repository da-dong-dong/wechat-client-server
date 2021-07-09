/******************************** 倒计时组件 ***************************************/
<template>
    <span class="flex"> 
        <i-icon class="icon" type="time" size="20" color="#D3AA72"  v-if="TimeText"/>
        <span>{{TimeText}}</span>
    </span>
</template>

<script>
    export default {
        data(){
            return {
                TimeText: '',
                now: 0,
                tiems: null,
            };
        },
        props: ['endtime'],
        methods:{
            formate(time){
                let hour = parseInt(time/1000/3600);
                let min = parseInt((time/1000 - hour * 3600)/60);
                let sec = parseInt(time/1000 - hour * 3600 - min * 60)
                this.TimeText =   this.numOLING(min) + ':' + this.numOLING(sec) 
            },
            // 加零
            numOLING(val){
                return val<10?'0'+val : val
            }
        },

        mounted(){
           this.tiems =  setInterval(()=>{
                this.now = new Date().getTime();
                this.formate((this.endtime+1000*60*30) - this.now);
                if((this.endtime+1000*60*30) - this.now<=0){
                    this.TimeText = ''
                    clearTimeout(this.tiems)
                    this.$emit('okOut')
                    return
                }
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>
.icon{
    margin-right: 6rpx;
}
.flex{
    justify-content: space-between;
    align-items: center;
}
</style>