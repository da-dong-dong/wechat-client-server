/******************************** 分类 ***************************************/
<template>
    <view>
      <view class="classify flex">
            <!-- 左侧 -->
            <view class="left_box textC">
                <view class="fixed">
                    <view class="paddingTB20" :class="Index==index?'active':''" v-for="(item,index) in list" :key="item.name" @click="onClickTab(index)">
                        {{item.name}}
                    </view>
                </view>
            </view>
            <!-- 右侧 -->
            <view class="right_box flex paddingT10">
                <view class="right_li textC padding5 marginRL10 "  v-for="(item,index) in list[Index].data" :key="item.name" @click="onClickDetails(index)">
                    <image class="img" :src="item.url"></image>
                    <view>{{item.str}}</view>
                </view>
            </view>
      </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                list:[{
                    name:'热卖套系',
                    data:[{
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'999儿童'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222儿童'
                    }]
                },
                {
                    name:'个人写真',
                    data:[{
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'999写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222写真'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'666写真'
                    }]
                },
                 {
                    name:'儿童套系',
                    data:[{
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'999儿童'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888儿童'
                    },
                    ]
                },
                {
                    name:'孕妈套系',
                    data:[{
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'999孕妈'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'888孕妈'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'222孕妈'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'666孕妈'
                    },
                    {
                        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2Fup%2F0a%2F1d%2F30%2F0a1d3089cddf6fc52588891d583b78ed.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613273432&t=12dbfbf9a754204df8c5b3bb1f986258',
                        str:'666孕妈'
                    }]
                }],
                Index:0,// 索引
            }
        },
        methods:{
            // 更新索引
            onClickTab(idx){
                this.Index = idx
            },

            // 跳转详情
            onClickDetails(idx){
                uni.navigateTo({ 
                    url: '/pages/tabBar/classify/components/details?id=' + idx  
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.webView{
    width: 500rpx;
    height: 100prx;
}
.classify{
    font-size: 28rpx;
    // 左侧
    .left_box{
        width: 200rpx;
        position: flex;
        .fixed{
            width: 200rpx;
            border-right: 1px solid black;
            height: 100vh;
            font-size: 32rpx;
        }
        .active{
            color: #57AD91;
        }
    }

    // 右侧
    .right_box{
        width: 550rpx;
        height: 100%;
        flex-wrap: wrap;
        .right_li{
            width: 240rpx;
            height: 200rpx;
            border: 1px solid #9BA3B7;
            box-shadow: 0px 0px 3px #9BA3B7;
            margin-bottom: 20rpx;
            .img{
                height: 140rpx;
            }
        }
    }
}
</style>