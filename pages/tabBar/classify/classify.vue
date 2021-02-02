/******************************** 分类 ***************************************/
<template>
    <view>
        <s-pull-scroll class="right_box flex paddingT10" ref="pullScroll" :back-top="true" :pullUp="loadData">
            <view class="classify flex">
                <!-- 左侧 -->
                <view class="left_box textC">
                    <view class="fixed">
                        <view class="paddingTB20 fontSize26" :class="Index==index?'active':''" v-for="(item,index) in leftList" :key="item.name" @click="onClickTab(index,item.id)">
                            {{item.name}}
                        </view>
                    </view>
                </view>
                <!-- 右侧 -->
                <view class="right_box flex paddingT10">
                    <view class="right_li textC padding5 marginRL10 "  v-for="(item) in rightList" :key="item.id" @click="onClickDetails(item.id)">
                        <image class="img" :src="item.coverPhoto"></image>
                        <view class="fontSize24 fontWight color000">{{item.assemblyName}}</view>
                    </view>
                </view>
            </view>
       </s-pull-scroll>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
const { $Message } = require('@/wxcomponents/base/index');
import { getListAssemblyOnlineCategory, getPageAssemblyOnline, getAssemblyOnlineDetail } from '@/util/api/goods.js'
	import sPullScroll from '@/components/s-pull-scroll';
    export default {
        components:{sPullScroll},
        computed:{
			...mapGetters('user',[
                'get_appId',
                'get_enterpriseId'
			]),
        },
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
                shopId:14,
				total:0, // 总数量
                Index:0, // 索引
                leftList:null,
                rightList:[],
                page:0,
                id:0,
            }
        },
        onLoad(){
			this.refresh();
		},
        mounted(){
            this.getListAssemblyOnlineCategory()
        },
        methods:{
            // 获取套系类别列表
            getListAssemblyOnlineCategory(){
                let param ={
                    shopId:this.shopId,
                    enterpriseId:this.get_enterpriseId
                }
                getListAssemblyOnlineCategory(param).then(res=>{
                    this.leftList = res.data.data
                    this.id = this.leftList[0].id

                    this.getPageAssemblyOnline()
                })
            },

            // 获取套系分页
            getPageAssemblyOnline(){
                let param ={
                    shopId:this.shopId,
                    enterpriseId:this.get_enterpriseId,
                    assemblyOnlineCategoryId:this.id,
                    limit:10,
                    page:this.page
                }
                getPageAssemblyOnline(param).then(res=>{
                    if(!res.data.data){
                        // $Message({
                        //     content:'暂无数据',
                        //     type: 'error'
                        // });
                        this.rightList = []

                        return 
                    }
                    this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.rightList.push(i)
					})
                })
            },

            // 更新索引
            onClickTab(idx,id){
                this.Index = idx
                this.id = id
                this.rightList = [];
                this.getPageAssemblyOnline()
            },

            // 跳转详情
            onClickDetails(idx){
                uni.navigateTo({ 
                    url: '/pages/tabBar/classify/components/details?id=' + idx  
                })
            },


            // 组件
			refresh () {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			loadData (pullScroll) {
				if (pullScroll.page == 1) {
					this.rightList = [];
				}
				if(!this.showNoMore){
					this.page = pullScroll.page
				}
				if(this.rightList.length < this.total){
					this.getPageAssemblyOnline()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				pullScroll.success();
			},
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
        z-index: 1000;
        .fixed{
            width: 200rpx;
            background: #F9F9F9;
            height: 100vh;
            color: #7D7E80;
        }
        .active{
            color: #FF4852;
            background: #fff;
            border-left: 1px solid #FF4852;
        }
    }

    // 右侧
    .right_box{
        width: 550rpx;
        height: 100%;
        flex-wrap: wrap;
        .right_li{
            width: 236rpx;
            height: 276rpx;
            margin-bottom: 20rpx;
            .img{
                width: 236rpx;
                height: 236rpx;
                border-radius: 20rpx;
            }
        }
    }
}
</style>