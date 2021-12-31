<template>
	<view class="face-recognition-container" v-if="visibleSync">
		<view style="font-size: 40rpx;font-weight: 700;margin: 20rpx 0 40rpx 0;width:100%;text-align: center;">{{ title }}</view>
		<view class="face-recognition-wrapper">
			<!-- <view class="number-wrapper" v-show="showNumber">
				{{number}}
			</view> -->
			<view class="image-wrapper" v-if="phoneSrc">
				<u-image v-if="phoneSrc" mode="widthFix" :src="phoneSrc"></u-image>
			</view>
			<camera v-if="!phoneSrc && showCamera" device-position="front" class="camera-wrapper" flash="off" binderror="error"></camera>
		</view>
		<view class="text-wrapper">
			请按照指示完成人脸验证
		</view>
		<!-- <view class="btn-wrapper">
			<u-button type="primary" @click="takePhoto" size="medium" :loading="loading">拍照</u-button>
		</view> -->
		<u-toast ref="uToast" />
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
			userInfo: Object,
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
							this.takePhoto()
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
					this.takePhoto()
				}
			},
			open () {
				this.visibleSync = true
				uni.getSetting({
					success: (res) => {
						console.log(123123123, res)
						this.getAuthSetting(res)
					},
					fail: () => {
						// console.log('一开始 fail')
					}
				})
			},
			close () {
				this.visibleSync = false
			},
			takePhoto () {
				this.loading = true
				// if (this._isFirst) {
				// 	uni.showModal({
				// 		content: '为了更好的向你提供船员便利服务，当前采集的信息只为验证是否为本人。同意采集请继续，否则请退出',
				// 		cancelText: '退出',
				// 		success: ({ confirm, cancel }) => {
				// 			if (confirm) {
				// 				this.showNumber = true
				// 				this.onPhone()
				// 				return
				// 			}
				// 			if (cancel) {
				// 				uni.navigateBack({
				// 					delta: 1
				// 				})
				// 			}
				// 		}
				// 	})
				// } else {
				// 	this.showNumber = true
				// 	this.onPhone()
				// }
				
				this.showNumber = true
				this.onPhone()
				
			},
			onPhone () {
				this.timer = setInterval(() => {
				 		const ctx = uni.createCameraContext()
				 		ctx.takePhoto({
				 			quality: 'high',
				 			success: (res) => {
								
								
								this.$http.upload('/admin/gather/face_location', {
									filePath: res.tempImagePath,
									name: 'file',
								}).then(({data})=>{
									if(data.code === 0){
										// clearInterval(this.timer)
										// this.title = data.msg
										this.phoneSrc = res.tempImagePath
										console.log('onPhone.........',this.phoneSrc)
										this.$http.upload('/admin/file/upload/avatar', {
											filePath: this.phoneSrc,
											name: 'file'
										}).then(({data})=>{
											if(data.code === 0){
												let filePath = data.data.url
												console.log('上传头像后的filePath...', filePath)
												
												
												this.$http.upload(`admin/file/faceMatch`,
													{
														formData: {
															userId: this.userInfo.userId,
															idcard: this.userInfo.idCard,
															file: filePath
														},
														filePath: this.phoneSrc,
														name: 'file'
													}
												).then(({data})=>{
													let msg = data.data
													console.log('msg..', msg)
													if(msg === '检测成功'){
														clearInterval(this.timer)
														
														this.phoneSrc = ''
														this.$emit('end')
														this.close()
													}else{
														this.$refs.uToast.show({
															title: '你当前的信息和系统数据不匹配，请重新验证'
														})
														this.phoneSrc = ""
													}
												})
											}else{
												this.phoneSrc = ''
											}
										})
									}else{
										this.title = data.msg
										this.phoneSrc = ''
									}
								})
								
					
				 			},
				 			fail: () => {
				 				this.loading = false
								this.phoneSrc = ''
				 			}
				 		})
				}, 3000)
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
		z-index: 10000;
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
				// width: 100%;
				// height: 100%;
				width: 400rpx;
				height: 400rpx;
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
					border-radius: 100%;
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
