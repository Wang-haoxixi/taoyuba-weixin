<template>
	<view>
		<face @phoneSrc="phoneSrc" ref="face"></face>
	</view>
</template>

<script>
	import face from './components/face-recognition/indexNew.vue'
	export default {
		props: {
		},
		data () {
			return {
			}
		},
		components: {
			face
		},
		watch: {
		},
		created () {
		},
		onLoad (option) {
		},
		onShow() {
			this.$refs.face.takePhoto()
		},
		methods: {
			phoneSrc (phoneSrc) {
				console.log('phoneSrc//', phoneSrc)
				this.$http.upload('/admin/file/upload/avatar', {
					filePath: phoneSrc,
					name: 'file'
				}).then(({ data }) => {
					console.log("upload11", data)
					if (data.code === 0) {
						let filePath = data.data.url
						let user = this.$cache.get('userInfo')
						this.$http.upload(`admin/file/faceMatch`,
							{
								formData: {
									userId: user.userId,
									// name: this.userInfo.realName,
									file: filePath
								},
								filePath: phoneSrc,
								name: 'file'
							}
						).then(({ data }) => {
							console.log('渔船..111',data)
							let msg = data.data
							console.log(msg)
							if (msg === '检测成功') {
								this._isFirst = false
								this.loading = false
								this.saveInformation()
							} else {
								uni.showToast({
									icon: 'none',
									title: msg
								})
								this.$refs.face.takePhoto()
								this.loading = false
								this.phoneSrc = ''
							}
				        })
					}else{
						uni.showToast({
							icon: 'none',
							title: data.msg
						})
						this.$refs.face.takePhoto()
					}
				})
			},
			saveInformation() {
				let data = uni.getStorageSync('cardInformation')
				this.$http.post('/tmlms/tyb_order_certificate_holder/save', {
					...data
				}).then(({ data }) => {
					console.log('saveInformation..', data)
					if( data.code === 0 ){
						uni.showToast({
							title: '实名认证已完成!'
						})
						uni.switchTab({
							url: '/pages/user/index/index'
						});
					}else{
						uni.showToast({
							duration: 3000,
							icon: 'none',
							title: data.msg
						})
						this.$refs.face.takePhoto()
					}
				})
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