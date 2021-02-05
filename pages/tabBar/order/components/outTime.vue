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
                TimeText: '00:00',
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
                this.TimeText =  hour + ':' + min + ':' + sec + '';
            }
        },

        mounted(){
           this.tiems =  setInterval(()=>{
                this.now = new Date().getTime();
                if(this.endtime - this.now<=0){
                    this.TimeText = '00:00'
                    clearTimeout(this.tiems)
                    return
                }
                this.formate(this.endtime - this.now);
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>

</style>