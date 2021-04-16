<template>
	<view class="face-recognition-container">
		<view class="face-recognition-wrapper">
			<view class="number-wrapper" v-show="showNumber">
				{{number}}
			</view>
			<view class="image-wrapper" v-if="phoneSrc">
				<u-image v-if="phoneSrc" mode="widthFix" :src="phoneSrc"></u-image>
			</view>
			<camera v-if="!phoneSrc && showCamera" device-position="front" class="camera-wrapper" flash="off" binderror="error"></camera>
		</view>
		<view class="text-wrapper">
			请完成人脸指示认证
		</view>
		<view class="btn-wrapper">
			<u-button type="primary" @click="takePhoto" size="medium" :loading="loading">拍照</u-button>
		</view>
		<u-toast ref="uToast" />
<!-- 		<view class="facegif">
			<u-image :src="imgUrl" height="250rpx" width="250rpx"></u-image>
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
			isFirst: Boolean
		},
		data () {
			return {
				showCamera: false,
				visibleSync: false,
				timer: null,
				showNumber: false,
				number: 3,
				phoneSrc: '',
				loading: false,
				_isFirst: false,
				show: false,
				imgUrl: `${this.$IMAGE_URL}/faceGif.gif`,
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
			uni.setStorageSync('openIdObj', {
				openid: option.openid
			});
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
				this.loading = true
				this.showNumber = true
				this.onPhone()
			},
			onPhone () {
				this.timer = setInterval(() => {
				 	this.number--
				 	if (this.number <= 0) {
				 		clearInterval(this.timer)
				 		this.showNumber = false
				 		this.number = 3
				 		const ctx = uni.createCameraContext()
				 		ctx.takePhoto({
				 			quality: 'high',
				 			success: (res) => {
				 				this.phoneSrc = res.tempImagePath
								uni.setStorageSync('phoneSrc', this.phoneSrc);
								this.$emit('phoneSrc',this.phoneSrc)
				 			},
				 			fail: () => {
				 				this.loading = false
				 			}
				 		})
				 	}
				}, 1000)
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
			border-radius: 50%;
			margin: 0 auto;
			.camera-wrapper {
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 50%;
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
				z-index: 1;
				color: #fff;
			}
			.image-wrapper {
				padding: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.text-wrapper {
			font-size: 30rpx;
			margin-top: 50rpx;
			color: #999;
			text-align: center;
		}
		.btn-wrapper {
			text-align: center;
			margin-top: 100rpx;
		}
	}
</style>