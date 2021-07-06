/******************************** 品牌选择 ***************************************/
<template>
    <view class="brandBox">
        <!-- <view class="brandTop color000 fontSize36 fontWight paddingT40 marginB30">
            选择当前品牌
        </view> -->
        <!-- 顶部导航 -->
		<uni-nav-bar fixed statusBar >
			<view class="navText">两醒影像</view>
			<view slot="left">
				<view class="navCrt">
					<view class="textOv">品牌选择</view>
				</view>
			</view>
		</uni-nav-bar>
        <div class="w690">
            <view class="brandList fontSize32 fontWight marginB30" v-for="(item,index) in get_barmd" :key="index" @click="setBrand(item.useShopId)" :style="{ 'background-image': `url(${item.images})`}">
                <view class="brandListText">
                    <view class="fontWight fontSize40 brean_name">{{item.name}}</view>
                    <text class="font20 paddingT10">{{item.remarks?item.remarks:''}}</text>
                </view>
            </view>
        </div>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
import {mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        computed: {
			...mapGetters('map',[
				'get_barmd',
                'get_shopIdList',
                'get_location',
                'get_city'
            ]),
            ...mapGetters('user',[
				'get_enterpriseId'
			])
        },
        methods:{
            ...mapMutations('map',[
				'mut_barmdId',
                'mut_city'
            ]),
            ...mapMutations('carList',[
				'mut_carListDelAll'
            ]),

            ...mapActions('map',[
				'act_shopIdList'
			]),
            ...mapMutations('user',[
				'mut_shopId'
            ]),
            
            // 设置品牌
            setBrand(id){
                // 存储当前品牌
                this.mut_barmdId(id);
                
                //  清空购物车
                this.mut_carListDelAll()

                // 获取门店
                let param = {
                    extConfig: this.get_enterpriseId,
                    shopIds: id
                }
                this.act_shopIdList(param)
                let arrMin = []
                let locationArr = this.get_location
                let index = 0
                this.get_shopIdList.map(item=>{
                    let x = Math.abs(item.locationX-locationArr[0])
                    let y = Math.abs(item.locationY-locationArr[1])
                    arrMin.push(x+y)
                })
                console.log(arrMin)
                index = this.getMinIndex([arrMin])
                this.mut_shopId(this.get_shopIdList[index])
                    // 本地存储当前门店
                    uni.setStorage({
                        key: 'shopId',
                        data: this.get_shopIdList[index]
                    })
                    uni.switchTab({
                        url:'/pages/tabBar/home/home'
                    })
                    // 判断市辖区
                    if(this.get_shopIdList[index].city == "市辖区"){
                        this.mut_city(this.get_shopIdList[index].province)
                    }else{
                        this.mut_city(this.get_shopIdList[index].city)
                    }
                // uni.navigateTo({
                // 	url:'/pages/tabBar/shoppingCart/components/changeRegion?flage=123'
                // })
            },
            // 获取最小下标
            getMinIndex(arr) {
                let min = arr[0];
                //声明了个变量 保存下标值
                let index = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (min > arr[i]) {
                        min = arr[i];
                        index = i;
                    }
                }
                return index;
            }
        },
        onLoad () {
            uni.setNavigationBarColor({
                frontColor: '##333333',
                backgroundColor: '#ffffff'
            })
        }
    }
</script>

<style lang="scss" scoped>
.brandBox{
    width: 100vw;
    min-height: 100vh;
    background: #ffffff;
    box-sizing: border-box;
    .navText{
        width: 100%;
        text-align: center;
        font-size: 32rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #333333;
    }
    .navCrt{
        width: 130rpx;
        border: 1px solid #D6D6D6;
        border-radius: 50rpx;
        height: 55rpx;
        left: 60rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-left: 10rpx;
        padding-right: 10rpx;
        .textOv{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 28rpx;
        }
    }
}
.w690{
    width: 690rpx;
    margin: 28rpx auto;
}
.brandList{
    height: 390rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-color: #d8d8d8;
    text{
       display: inline-block; 
    }
    .brandListText{
        padding-top: 220rpx;
        color: #fff;
        text-align: center;
    }
    .font20{
        font-size: 20rpx;
        font-family: SourceHanSansCN;
        font-weight: 300;
    }
    .brean_name{
        font-size: 40rpx;
        font-family: MingHei_B;
        font-weight: 700;
    }
}
</style>