
/******************************** 签名画布 ***************************************/
<template>
	<view class="cat-signature" @touchmove.stop.prevent="moveHandle">
		<view class="content">
			<view class="btns">
				<view class="btn" @tap="clear">重新签名</view>
				<view class="btn2" @tap="save">确认签名</view>
			</view>
			<canvas class='firstCanvas' :canvas-id="canvasId" @touchmove='move' @touchstart='start($event)' @touchend='end'
			 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error' />

		</view>
	</view>
</template>

<script>
import { updOrderContract } from '@/util/api/home.js'
import { mapActions, mapGetters } from 'vuex'
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowHeight;
		},
	})
	export default{
		name:'cat-signature',
		props:{
			visible: {
				type: Boolean,
				default: false
			},
			canvasId:{
				type: String,
				default: 'firstCanvas'
			}
		},
        onLoad(option){
            this.id = option.id
		},
		data(){
			return{
				show:false,
				visibleSync: false,
				signImage:'',
				hasDh:false,
				id: null
			}
		},
		watch:{
			visible(val) {
				this.visibleSync = val;
				this.show = val;
				this.getInfo()
			}
		},
		computed: {
            ...mapGetters('html', [
                'getHtmlStr'
            ])
        },
		created(options) {
			this.visibleSync = this.visible
			this.getInfo()
			setTimeout(() => {
				this.show = this.visible;
			}, 100)
		},
		methods:{
            ...mapActions('html',[
				'act_setHtml'
			]),
			hideSign () {
				this.clear()
				this.$emit('to-close')
			},
			getInfo(){
				//获得Canvas的上下文
				content = uni.createCanvasContext(this.canvasId,this)
				//设置线的颜色
				content.setStrokeStyle("#000")
				//设置线的宽度
				content.setLineWidth(5)
				//设置线两端端点样式更加圆润
				content.setLineCap('round')
				//设置两条线连接处更加圆润
				content.setLineJoin('round')
			},
			// 
			close() {
				this.show = false;
				this.hasDh = false;
				this.$emit('close')
				this.clear()
			},
			moveHandle(){
				
			},
			// 画布的触摸移动开始手势响应
			start(e){
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y,
				}
				touchs.push(point);
				this.hasDh = true
			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},
			
			// 画布的触摸移动结束手势响应
			end: function(e) {
				//清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}
			
			},
			
			// 画布的触摸取消响应
			cancel: function(e) {
				// console.log("触摸取消" + e)
			},
			
			// 画布的长按手势响应
			tap: function(e) {
				// console.log("长按手势" + e)
			},
			
			error: function(e) {
				// console.log("画布触摸错误" + e)
			},
			
			//绘制
			draw: function(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				// console.log(JSON.stringify(touchs))
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true);
				touchs.shift()
				
			},
			//清除操作
			clear: function() {
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
				// this.close()
				this.hasDh = false;
				this.$emit('clear')
			},
			onSave (path) {
                let str = new RegExp('<div style="color: blue;" class="location">(.*?)</div>')
                let htmlText = this.getHtmlStr
                let img  = `<img src="${path}" style="position: absolute;top: -50px;left: 0px;width: 100px; height: 100px;transform: rotate(-90deg);"/>`
                htmlText = htmlText.replace(str, img)
                let params = {
                    htmlText: htmlText,
                    id: this.id
				}
                updOrderContract(params).then(res => {
					this.act_setHtml(htmlText)
					var pages = getCurrentPages()
					var prevPage = pages[pages.length - 2] //上一个页面
					prevPage.$vm.signGo = false
					uni.navigateBack({ delta: 1 })
                })
            },
			save(){
				var that = this;
				if(!this.hasDh){
					uni.showToast({title:'请先签字',icon:'none'})
					return;
				}
				uni.showLoading({title:'生成中...', mask:true})
				setTimeout(()=>{
					uni.canvasToTempFilePath({
						canvasId: that.canvasId,
						success: function(res) {
							uni.request({
						　　　　url: res.tempFilePath,
						　　　　method: 'GET',
						　　　　responseType: 'arraybuffer',
						　　　　success: async _ => {
									console.log(555);
						　　　　　　 let base64 = wx.arrayBufferToBase64(_.data); //把arraybuffer转成base64
						　　　　　　 let toBase64Url = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
									that.onSave(toBase64Url)
					　　　　}
					　　});
						uni.hideLoading()
						that.hasDh = false;
						that.show = false;
						},
						fail:function(err){
							console.log(err)
							uni.hideLoading()
						}
					},this)
				},100)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cat-signature{
		height: 100vh;
		.content{
			// display: flex;
			background: red;
			background: #fff;
			display: flex;
			width: 100vw;
			height: 100vh;
			align-items: center;
			justify-content: center;
			.firstCanvas{
				margin: 20rpx 0;
				border: 1px dashed #999;
				height: 90vh;
				position: relative;
				right: 30rpx;
			}
			.btns{
				width: 200rpx;
				height: 100vh;
				font-size: 35rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				text-align: center;
				line-height: 82rpx;
				display: flex;
				flex-direction: column;
				// flex-direction: column;
				justify-content: space-around;
				.btn{
					width: 228rpx;
					height: 82rpx;
					border-radius: 4rpx;
					border: 2rpx solid #FF4852;
					color: #FF4852;
    				transform: rotate(90deg);
					position: relative;
					right: 23px;
				}
				.btn2{
					width: 228rpx;
					height: 82rpx;
					background: #FF4852;
					border-radius: 4rpx;
					color: #FFFFFF;
    				transform: rotate(90deg);
					position: relative;
					right: 23px;
				}
			}
		}
	}
	.a_return{
		padding-left: 70rpx;
		.red{
			color: #FF4852;
			padding: 0 10rpx;
		}
	}
</style>
