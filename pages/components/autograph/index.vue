<template>
	<view class="autograph-container">
		<u-modal v-model="showCanvas" width="95%" :show-title="false" show-cancel-button @confirm="onConfirm" @cancel="onCancel">
			<view class="">
				<view class="title-wrapper">
					<text>请在框内进行签名</text>
					<view class="clear" @click="clear">
						<text>清除</text>
					</view>
				</view>
				<view class="canvas-wrapper">
					<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
				</view>
			</view>
		</u-modal>
		
	</view>
</template>

<script>
	export default {
		props: {
			value: Boolean
		},
		data () {
			return {
				showCanvas: false,
				ctx:'',         //绘图图像
				points:[],       //路径点集合 
				signature:''
			}
		},
		watch: {
			value (newVal) {
				this.showCanvas = newVal
				if (this.showCanvas) {
					this.createCanvas()
				}
			}
		},
		methods: {
			//关闭并清空画布
			close () {
				this.showCanvas = false
				this.$emit('input', false)
				this.clear()
			},
			//创建并显示画布
			createCanvas () {
				this.showCanvas = true
				this.ctx = uni.createCanvasContext('mycanvas', this)   //创建绘图对象
				//设置画笔样式
				this.ctx.lineWidth = 4
				this.ctx.lineCap = 'round'
				this.ctx.lineJoin = 'round'
			},
			draw () {
				let point1 = this.points[0]
				let point2 = this.points[1]
				this.points.shift()
				this.ctx.moveTo(point1.X, point1.Y)
				this.ctx.lineTo(point2.X, point2.Y)
				this.ctx.stroke()
				this.ctx.draw(true)
			},
			//完成绘画并保存到本地
			finish (){
				let that = this
				uni.canvasToTempFilePath({
				  canvasId: 'mycanvas',
				  success: function(res) {
					let filePath = res.tempFilePath
					console.log('filePath', filePath)
					uni.getFileSystemManager().readFile({
						filePath: filePath,
						 encoding: 'base64', //编码格式
						 success: res => {
							 let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
							 console.log('base64', base64)
						 }
					})
					//   console.log(res)
					// that.api.uploadFile({
					// 	url: 'user/upload/one',
					// 	filePath: res.tempFilePath,
					// 	name: 'file',
					// 	success: (uploadFileRes) => {
					// 		console.log(uploadFileRes)
					// 		that.signature = uploadFileRes.data.url;
					// 		that.clear();
					// 		that.showCanvas = false;
					// 	}
					// })
					//保存到本地
					/* 
					
					let path = res.tempFilePath;
					uni.saveImageToPhotosAlbum({
						filePath:path,
					}) */
				  } 
				})
			},
			//清空画布
			clear () {
				let that = this
				uni.getSystemInfo({
					success: function(res) {
						let canvasw = res.windowWidth
						let canvash = res.windowHeight
						that.ctx.clearRect(0, 0, canvasw, canvash)
						that.ctx.draw(true)
					},
				})
			},
			//触摸开始，获取到起点
			touchstart (e) {
				let startX = e.changedTouches[0].x
				let startY = e.changedTouches[0].y
				let startPoint = {X: startX, Y: startY}
				this.points.push(startPoint)
				//每次触摸开始，开启新的路径
				this.ctx.beginPath()
			},
			touchmove (e) {
				let moveX = e.changedTouches[0].x
				let moveY = e.changedTouches[0].y
				let movePoint = {X: moveX, Y: moveY}
				this.points.push(movePoint)  //存点
				let len = this.points.length
				if (len >= 2){
					this.draw()  //绘制路径
				}
			},
			touchend () {
				this.points = []
			},
			onConfirm () {
				this.close()
			},
			onCancel () {
				this.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.autograph-container {
		.title-wrapper {
			padding: 30rpx 20rpx;
			display: flex;
			justify-content: space-between;
			
		}
		.canvas-wrapper {
			padding: 0 20rpx;
			.mycanvas{
					width: 100%;
					height: 600rpx;
					background-color: #ECECEC;
				}
		}
	}
</style>
