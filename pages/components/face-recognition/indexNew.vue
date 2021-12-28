<template>
	<view class="face-recognition-container">
		<view style="font-size: 40rpx;font-weight: 700;margin: 20rpx 0 40rpx 0;width:100%;text-align: center;" v-if="!disabled">{{ title }}</view>
		<view class="face-recognition-wrapper">
<!-- 			<view class="number-wrapper" v-show="showNumber">
				{{number}}
			</view> -->
			<view class="image-wrapper" v-if="phoneSrc111">
				<u-image v-if="phoneSrc111" mode="widthFix" :src="phoneSrc111"></u-image>
			</view>
			<camera v-if="!phoneSrc111 && showCamera" device-position="front" class="camera-wrapper" flash="off" binderror="error"></camera>
		</view>
		<view class="text-wrapper" v-if="!disabled">
			请按照指示完成人脸验证
		</view>
<!-- 		<view class="btn-wrapper">
			<u-button type="primary" @click="takePhoto" size="medium" :loading="loading" :disabled="disabled">拍照</u-button>
		</view> -->
		<u-toast ref="uToast" />
<!-- 		<view class="facegif">
			<u-image :src="imgUrl" height="400rpx" width="400rpx"></u-image>
		</view> -->
	</view>
</template>

<script>
	let COUNT = 3
	import { TOKEN } from '@/common/config/index.js'
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			isFirst: Boolean,
			disabled: {
				type: Boolean,
				default: false
			},
		},
		data () {
			return {
				showCamera: false,
				visibleSync: false,
				timer: null,
				showNumber: false,
				number: 3,
				phoneSrc111: '',
				loading: false,
				_isFirst: false,
				show: false,
				imgUrl: `${this.$IMAGE_URL}/border.gif`,
				title: '请将人脸置于框内',
			}
		},
		watch: {
			value (newVal) {
				if (newVal) {
					this.open()
				} else {
					this.close()
				}
			},
			isFirst (newVal) {
				this._isFirst = newVal
			}
		},
		created () {
			uni.getSetting({
				success: (res) => {
					this.getAuthSetting(res)
					this.show = true
				},
				fail: () => {
				}
			})
		},
		onLoad (option) {
		},
		methods: {
			getAuthSetting (res) {
				// console.log('getAuthSetting', res.authSetting['scope.camera'])
				if (!res.authSetting['scope.camera']) {
					uni.authorize({
						scope:'scope.camera',
						success: () => {
							// console.log('成功', this.showCamera)
							this.showCamera = true
						},
						fail: () => {
							// console.log('失败', this.showCamera)
							uni.showModal({
							 	icon: 'none',
								title: '提示',
								content: '尚未进行授权，请打开相机权限',
								success: (res) => {
									if (res.confirm) {
										// console.log('重新获取')
										uni.openSetting({
											success: (res) => {
												this.getAuthSetting(res)
											}
										})
									} else {
										// console.log('重新开始')
										uni.getSetting({
											success: (res) => {
												this.getAuthSetting(res)
											},
											fail: () => {
												
											}
										})
									}
									
								},
								fail: () => {
									// console.log('重新开始')
									uni.getSetting({
										success: (res) => {
											this.getAuthSetting(res)
										},
										fail: () => {
											
										}
									})
								}
							 })
						}
					})
				} else {
					this.showCamera = true
				}
			},
			open () {
				this.visibleSync = true
			},
			close () {
				this.visibleSync = false
			},
			takePhoto () {
				// this.loading = true
				this.onPhone()
			},
			onPhone () {
				uni.setStorageSync('phoneSrc', '')
				this.timer = setInterval(() => {
				 		const ctx = uni.createCameraContext()
				 		ctx.takePhoto({
				 			quality: 'high',
				 			success: (res) => {
								console.log('takePhoto..', res)
								this.$http.upload('/admin/gather/face_location', {
									filePath: res.tempImagePath,
									name: 'file',
								}).then(({data})=>{
									console.log('face_location..111', data)
									if( data.code === 0 ){
										clearInterval(this.timer)
										// if( !uni.getStorageSync('phoneSrc111') ){
											this.phoneSrc111 = res.tempImagePath
											uni.setStorageSync('phoneSrc', this.phoneSrc111)
											this.$emit('phoneSrcTrain',this.phoneSrc111)
										// }
									}else{
										this.title = data.msg
									}
								})
				 			},
				 			fail: () => {
				 				this.loading = false
				 			}
				 		})
				}, 2000)
				// setTimeout(res=>{
				// 	const ctx = uni.createCameraContext()
				// 	ctx.takePhoto({
				// 		quality: 'high',
				// 		success: (res) => {
				// 			this.$http.upload('/admin/gather/face_location', {
				// 				filePath: res.tempImagePath,
				// 				name: 'file',
				// 			}).then(({data})=>{
				// 				console.log(data)
				// 				if( data.code === 0 ){
				// 					// clearInterval(this.timer)
				// 					// if( !uni.getStorageSync('phoneSrc') ){
				// 						this.phoneSrc = res.tempImagePath
				// 						uni.setStorageSync('phoneSrc', this.phoneSrc)
				// 						this.$emit('phoneSrc',this.phoneSrc)
				// 					// }
				// 				}else{
				// 					this.title = data.msg
				// 					setTimeout(res=>{
				// 						this.onPhone()
				// 					},2000)
				// 				}
				// 			})
				// 		},
				// 		fail: () => {
				// 			this.loading = false
				// 		}
				// 	})
				// },2000)
			},
			confirm () {
				this.show = false
				this.takePhoto()
			},
			cancel () {
				uni.setStorageSync('openIdObj', {
					openid: ''
				});
				this.confirm()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.facegif {
		position: absolute;
		top: 0;
		right: 0;
	}
	.face-recognition-container {
		background-color: rgba(255, 255, 255, .9);
		// position: fixed;
		// bottom: 0;
		// left: 0;
		// right: 0;
		// top: 0;
		z-index: 10000;
		position: relative!important;
		min-height: 100vh;
		padding-top: 50rpx;
		.face-recognition-wrapper {
			// position: absolute;
			// bottom: 0;
			// left: 0;
			// right: 0;
			// top: 0;
			// background-color: rgba(0, 0, 0, .5);
			position: relative;
			width: 400rpx;
			height: 400rpx;
			overflow: hidden;
			border-radius: 200rpx;
			margin: 0 auto;
			.camera-wrapper {
				width: 100%;
				height: 100%;
				overflow: hidden;
				z-index: -1;
				border-radius: 200rpx;
			}
			.number-wrapper {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				font-size: 250rpx;
				text-align: center;
				line-height: 400rpx;
				z-index: 2;
				color: #fff;
			}
			.image-wrapper {
				padding: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: -1;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.text-wrapper {
			font-size: 40rpx;
			margin-top: 100rpx;
			color: #999;
			text-align: center;
		}
		.btn-wrapper {
			text-align: center;
			margin-top: 100rpx;
		}
	}
</style>