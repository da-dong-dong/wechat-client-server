/******************************** 倒计时组件 ***************************************/
<template>
    <text>
        {{TimeText}}
    </text>
</template>

<script>
    export default {
        data(){
            return {
                TimeText: '00:00 已关闭',
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
                this.TimeText =  hour + ':' + min + ':' + sec + '' + '待付款';
            }
        },

        mounted(){
           this.tiems =  setInterval(()=>{
                this.now = new Date().getTime();
                this.formate((this.endtime+1000*60*30) - this.now);
                if((this.endtime+1000*60*30) - this.now<=0){
                    this.TimeText = '00:00 已关闭'
                    clearTimeout(this.tiems)
                    return
                }
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>

</style>