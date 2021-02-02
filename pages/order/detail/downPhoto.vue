/******************************** 下载图片 ***************************************/
<template>
    <view>
        <view class="downPhoto">
             <checkbox-group  @change="onChangeList">
                <view class="imgList">
                    <view class="chebos" v-for="(item,index) in photoList" :key="index">
                        <image class="img"  :src="item.imgs"></image>
                        <checkbox :checked="item.checked" :value="index" class="checks" color="#FF4852"/>
                    </view>
                </view>
             </checkbox-group>
        </view>
        <!-- 底部 -->
        <view class="foots flex paddingRL40 fontSize28">
            <view class="flex">
                <checkbox-group @change="onChangeAll">
                    <checkbox class="paddingL10" value='1' :checked="allFlag.checked"  />
                </checkbox-group>全选
            </view>
            <view class="btn">下载（{{num}}）</view>
        </view>
    </view>
</template>

<script>
    export default {
         onLoad(options) {
            console.log(options.id)
        },
        data(){
            return{
                num:0,
                photoList:[
                    {   checked:false,
                        imgs:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw960h1280%2F20180303%2F06cb-fwnpcnt4630086.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614342958&t=83729dc55178b3a20b7bdd01ceeec87c',
                    },
                     {  checked:false,
                        imgs:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw960h1280%2F20180303%2F06cb-fwnpcnt4630086.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614342958&t=83729dc55178b3a20b7bdd01ceeec87c',
                    },
                     {  checked:false,
                        imgs:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw960h1280%2F20180303%2F06cb-fwnpcnt4630086.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614342958&t=83729dc55178b3a20b7bdd01ceeec87c',
                    },
                     {  checked:false,
                        imgs:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw960h1280%2F20180303%2F06cb-fwnpcnt4630086.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614342958&t=83729dc55178b3a20b7bdd01ceeec87c',
                    },
                     {  checked:false,
                        imgs:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw960h1280%2F20180303%2F06cb-fwnpcnt4630086.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614342958&t=83729dc55178b3a20b7bdd01ceeec87c',
                    },
                ],
                allFlag: {
                    value: 'cb',
                    checked: false
                },
            }
        },
        methods:{
            // 全选
            onChangeAll(e){
                if (e.detail.value.length == 0) {
                    this.photoList.map(item => this.$set(item, 'checked', false))
                    this.$set(this.allFlag, 'checked', false)
                } else {
                    this.photoList.map(item => this.$set(item, 'checked', true))
                    this.$set(this.allFlag, 'checked', true)
                }
            },

            // 选择列表
            onChangeList(e){
                let items = this.photoList,
                    values = e.detail.value;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i]
                    if(values.includes(i.toString())){
                        item.checked = true
                    }else{
                        item.checked = false
                    }
                }
            }
        },
        watch:{
            photoList:{
                handler:function(val){
                    let num = 0
                    val.map(item=>{
                        console.log(item)
                        if(item.checked){
                            num +=1
                        }
                    })
                    this.num = num

                    val.length == num ? this.$set(this.allFlag, 'checked', true) :this.$set(this.allFlag, 'checked', false)
                   
                },
                deep:true
            }
        }
    }
</script>

<style lang="scss" scoped>
// 底部
.foots{
    width: 100%;
    height: 92rpx;
    background: #fff;
    box-shadow: 0px -8rpx 14rpx 0rpx rgba(131, 131, 131, 0.5);
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .flex{
        align-items: center;
    }
    .btn{
        width: 160rpx;
        height: 60rpx;
        background: linear-gradient(180deg, #FF6D75 0%, #FF4852 100%);
        border-radius: 30rpx;
        text-align: center;
        line-height: 60rpx;
        color: #fff;
    }
}
.downPhoto{
    padding:18rpx 30rpx;
    margin-bottom: 92rpx;
    .imgList{
         display: grid;
    grid-template-columns: repeat(auto-fill, 33.33%);
        }
    .chebos{
        width: 228rpx;
        height: 228rpx;
        margin-bottom: 10rpx;
        position: relative;
        .img{
            width: 228rpx;
            height: 228rpx;
            border-radius: 20rpx;
        }
        .checks{
            position: absolute;
            top: 10rpx;
            right: 10rpx;
            border-radius: 50%;
        }
    }
}
</style>