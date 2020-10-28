<template>
	<view class="face-recognition-container" v-if="visibleSync">
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
	</view>
</template>

<script>
	import { TOKEN } from '@/common/config/index.js'
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			userInfo: Object
		},
		data () {
			return {
				showCamera: false,
				visibleSync: false,
				timer: null,
				showNumber: false,
				number: 3,
				phoneSrc: '',
				loading: false
			}
		},
		watch: {
			value (newVal) {
				if (newVal) {
					this.open()
				} else {
					this.close()
				}
			}
		},
		created () {
			console.log('onshow')
			uni.getSetting({
				success: (res) => {
					this.getAuthSetting(res)
				},
				fail: () => {
					// console.log('一开始 fail')
				}
			})
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
				this.showNumber = true
				this.loading = true
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
								// console.log('res', res)
				 				this.phoneSrc = res.tempImagePath
								// 图片转化为base64
								uni.getFileSystemManager().readFile({
								    filePath: this.phoneSrc, //选择图片返回的相对路径
								    encoding: 'base64', //编码格式
								    success: res => { //成功的回调
								        let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
										// 活体识别
										// this.$tools.jsonForm
										this.$http.upload(`/admin/file/person/verify`,
											{
												// params: this.$tools.jsonForm({
												// 	idcard: this.userInfo.idCard,
												// 	name: this.userInfo.realName,
												// 	fileStr: base64
												// })
												formData: {
													idcard: this.userInfo.idCard,
													name: this.userInfo.realName,
													fileStr: base64
												},
												filePath: this.phoneSrc,
												name: 'file'
											}
										).then(({ data }) => {
								        	if (data.data === '检测成功') {
								        		this.loading = false
								        		this.phoneSrc = ''
								        		this.close()
								        	} else {
								        		this.$refs.uToast.show({
								        			title: '活体识别失败',
								        			back: true
								        		})
								        	}
								        })
								    }
								})
				 			},
				 			fail: () => {
				 				this.loading = false
				 			}
				 		})
				 	}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.face-recognition-container {
		background-color: rgba(255, 255, 255, .9);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
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
			margin: 100rpx auto 0;
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
