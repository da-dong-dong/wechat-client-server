/******************************** 首页 ***************************************/
<template>
    <view class="homeContent">
        <view v-for="(item, index) in homeList" :key="index">
        	<view class="searchContent" v-if="item.type === 'search'" :style="{ 'background-image': `url(${item.data.backImg})` }">
				<view class="uni-input">{{item.data.title}}</view>
        	</view>
			<view class="shopContent" v-if="item.type === 'shop'">
				<span class="flex_1">当前门店: 利亚方舟</span>
				<i class="iconfont iconhtbArrowright02"></i>
			</view>
			<view v-if="item.type === 'carousel'">
				<swiper class="swiper" :autoplay="item.data.autoplay" indicator-dots :style="{ height: item.data.height * 2 + 'rpx'}">
					<swiper-item v-for="(_, _i) in item.data.imgs" :key="_i">
						<view class="swiper-item uni-bg-red" :style="{ height: item.data.height * 2 + 'rpx'}">
							<img :src="_.src" class="wh100"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view v-if="item.type === 'oneImg'">
				<img :src="item.data.src" alt="" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%' }" style="vertical-align:top;">
			</view>
			<view class="btnContent" v-if="item.type === 'moreBtn'" :style="{ 'height': item.data.height * 2 + 'rpx', 'width': '100%', 'background-image': `url(${item.data.backImg})` }">
				<img class="imgOne" :src="_.src" alt="" v-for="(_, _index) in item.data.imgs" :key="_index">
			</view>
			
			<view v-if="item.type === 'moreImg'" :style="{ 'background-image': `url(${item.data.backImg})` }">
				<view class="moreimgContent" :style="{ 'height': `${item.data.titleRow.height + 'px'}`, 'color': `${item.data.titleRow.color}`, 'font-size': `${item.data.titleRow.size + 'px'}` }">
					<span class="flex_1">{{item.data.titleRow.title}}</span>
					<i class="iconFlex iconfont iconhtbArrowright02"></i>
				</view>
				<view class="flex rowFlex" v-for="(_, i) in item.data.picRow" :key="i" :style="{ 'height': `${_.height + 'px'}`, 'width': '100%' }">
					<img class="autoWH" :src="sub.src" alt="" v-for="(sub, _i) in _.imgs" :key="_i" :style="{ 'width': getWidth(_.imgs, sub.col, _i) }">
				</view>
			</view>
        </view>
       
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
	// 
const { $Message } = require('@/wxcomponents/base/index');
import { getLongin } from '@/util/api/user.js'
const accountInfo = uni.getAccountInfoSync();
    export default {
		data () {
			return {
				homeList: []
			}
		},
        mounted(){
            
        },
		 onLoad() {
            // 查看是否授权
            console.log('sss')
            wx.getUserInfo({
                    success: function(res) {
                    console.log(res.userInfo)
                    }
                })
            wx.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                    success: function(res) {
                    console.log(res.userInfo)
                    }
                })
                }
            }
            })
			let jsonStr = `[{"act":false,"img":"http://h5.dooring.cn/h5_plus/static/03-%E8%A1%A8%E5%8D%95.f4be06e8.png","name":"切换门店","type":"shop","data":{"link":"","backImg":""}},{"act":false,"img":"http://h5.dooring.cn/h5_plus/static/03-%E8%A1%A8%E5%8D%95.f4be06e8.png","name":"搜索栏","type":"search","data":{"title":"搜索提示","link":"","backImg":""}},{"act":false,"img":"http://h5.dooring.cn/h5_plus/static/01-%E8%BD%AE%E6%92%AD.4f8281c4.png","name":"轮播图组件","type":"carousel","data":{"imgs":[{"src":"http://h5.dooring.cn/h5_plus/static/01-%E8%BD%AE%E6%92%AD.4f8281c4.png","title":"测试1","desc":"","link":""},{"src":"http://h5.dooring.cn/h5_plus/static/05-%E5%9B%BE%E6%A0%87.3db768a4.png","title":"测试2","desc":"","link":""}],"height":100,"autoplay":false}},{"act":false,"img":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","type":"oneImg","name":"单图组件","data":{"src":"http://h5.dooring.cn/h5_plus/static/01-%E8%BD%AE%E6%92%AD.4f8281c4.png","title":"测试1","desc":"","link":"","height":100}},{"act":false,"img":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","type":"oneImg","name":"单图组件","data":{"src":"http://h5.dooring.cn/h5_plus/static/01-%E8%BD%AE%E6%92%AD.4f8281c4.png","title":"测试1","desc":"","link":"","height":100}},{"act":false,"img":"http://h5.dooring.cn/h5_plus/static/05-%E5%9B%BE%E6%A0%87.3db768a4.png","name":"组合按钮","type":"moreBtn","data":{"imgs":[{"src":"http://h5.dooring.cn/h5_plus/static/01-%E8%BD%AE%E6%92%AD.4f8281c4.png","title":"测试1","desc":"","link":""},{"src":"http://h5.dooring.cn/h5_plus/static/05-%E5%9B%BE%E6%A0%87.3db768a4.png","title":"测试2","desc":"","link":""},{"src":"http://h5.dooring.cn/h5_plus/static/05-%E5%9B%BE%E6%A0%87.3db768a4.png","title":"测试2","desc":"","link":""},{"src":"http://h5.dooring.cn/h5_plus/static/05-%E5%9B%BE%E6%A0%87.3db768a4.png","title":"测试2","desc":"","link":""},{"src":"http://h5.dooring.cn/h5_plus/static/05-%E5%9B%BE%E6%A0%87.3db768a4.png","title":"测试2","desc":"","link":""}],"height":100,"backImg":""}},{"act":true,"img":"http://h5.dooring.cn/h5_plus/static/09-%E9%80%9A%E7%9F%A5.1ec0e750.png","name":"组合图","type":"moreImg","data":{"backImg":"","titleRow":{"title":"标题","size":14,"color":"#000","height":32,"link":""},"picRow":[{"height":100,"imgs":[{"src":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","link":"","col":1}]},{"height":100,"imgs":[{"src":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","link":"","col":1},{"src":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","link":"","col":1}]},{"height":100,"imgs":[{"src":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","link":"","col":1},{"src":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","link":"","col":1},{"src":"http://h5.dooring.cn/h5_plus/static/06-%E5%9B%BE%E7%89%87%E7%BB%84%E4%BB%B6.bf261d65.png","link":"","col":1}]}]}}]`
			let jsonData = JSON.parse(jsonStr)
			console.log(jsonData)
			this.homeList = jsonData
        },
        methods:{
			getWidth (data, col, i) {
				let len = data.length
				let maxCol = Math.max(...data.map(_ => _.col))
				let minCol = Math.min(...data.map(_ => _.col))
				switch (len) {
					case 1:
						return '100%'
					case 2:
						if (maxCol === minCol) {
							return i === 0 ? '66%' : '32%'
						}
					return col === maxCol ? '66%' : '32%'
					case 3:
						return '32%'
				}
			},
            // 检查登陆
            checkLogin(){
                uni.authorize({
                    scope: 'scope.userInfo',
                    success() {
                        uni.getUserInfo({
                            provider: 'weixin',
                            success: function (infoRes) {
                                console.log(infoRes)
                                console.log('用户昵称为：' + infoRes.userInfo.nickName);
                            }
                        });
                    }
                })
                // 获取code值
                // uni.login({
                //     provider: 'weixin',
                //     success: function (res) {
                //         let param = {
                //             jsCode: res.code,
                //             appId:  accountInfo.miniProgram.appId
                //         }
                //         console.log(accountInfo.miniProgram.appId)
                //         // 获取用户信息
                //         uni.getUserInfo({
                //             provider: 'weixin',
                //             success: function (infoRes) {
                //                 console.log(infoRes)
                //                 console.log('用户昵称为：' + infoRes.userInfo.nickName);
                //             }
                //         });
                //         // getLongin(param).then(res=>{
                //         //     console.log(res);
                //         //     uni.getUserInfo({
                //         //         provider: 'weixin',
                //         //         success: function (infoRes) {
                //         //             console.log(infoRes)
                //         //             console.log('用户昵称为：' + infoRes.userInfo.nickName);
                //         //         }
                //         //     });
                //         // })
                //     }
                // });
            },
            getPhoneNumber(e) { 
                console.log(e) 
                console.log(e.detail.errMsg);  
                console.log(e.detail.iv);  
                console.log(e.detail.encryptedData);  
                
            },

           
        }   
    }
</script>

<style lang="scss" scoped>
@import url('./icon.css');
.homeContent{
	font-size: 24rpx;
}
.searchContent{
    padding: 10rpx 20rpx;
    background-repeat: no-repeat;
    background-size: cover;
	font-size: 24rpx;
	.uni-input{
		border: 2rpx solid #dcdee2;
		border-radius: 8rpx;
		padding: 10rpx;
		color: #dcdee2;
	}
 }
.wh100{
	width: 100%;
	height: 100%;
}
.shopContent{
	padding: 14rpx 10rpx 14rpx 30rpx;
	display: flex;
	background-repeat: no-repeat;
	background-size: cover;
	.flex_1{
		flex: 1;
		display: flex;
		align-items: center;
	}
}
.btnContent{
    display: flex;
    padding: 10rpx 40rpx;
    justify-content: space-around;
    background-repeat: no-repeat;
    background-size: cover;
	box-sizing: border-box;
    .imgOne{
      flex: 1;
	  width: auto;
	  height: auto;
      max-width: 60px;
    }
 }
 
.moreimgContent{
	 display: flex;
	 padding: 5px 20px;
	 padding-right: 5px;
	 justify-content: space-around;
	 background-repeat: no-repeat;
	 background-size: cover;
	 .flex_1{
	    display: flex;
	    align-items: center;
	 }
	 .iconFlex{
	    display: flex;
	    align-items: center;
	 }
}
.flex_1{
    flex: 1;
}
.rowFlex{
	padding: 0px 15px;
	justify-content: space-between;
	margin-bottom: 10px;
	box-sizing: border-box;
}
.flex{
	display: flex;
}
.autoWH{
	width: auto;
	height: auto;
}
</style>