<template>
	<view class="">
		<view class="choose-img-wrapper">
			<view class="img-item" v-for="(item,index) in url" :key="index">
				<u-image width="200rpx" height="200rpx" :key="index" :src="item" mode="scaleToFill" @click="openImg()"></u-image>
				<u-icon class="icon-delete"  v-if="status === 'update' && !disabled" name="close-circle-fill" color="#333" size="40" @click="deleteImg()"></u-icon>
			</view>
			<view class="add-upload" @click="onChooseImg" v-if="!disabled">
				<u-icon name="plus" color="#d7d7d7" size="80"></u-icon>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { API_URL } from '@/env'
	export default {
		props: {
			url: {
				type: Array,
				default: []
			},
			status: {
				type: String,
				default: 'update'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			// maxLength: {
			// 	type: Number,
			// 	default: 1
			// }
		},
		data () {
			return {
				show: false,
				current: 0,
			}
		},
		watch: {
		},
		methods: {
			onChooseImg () {
				let config_url = API_URL
				uni.chooseImage({
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						// let len = this.value.length
						// if ((this.maxLength - len) < tempFilePaths.length) {
						// 	this.$refs.uToast.show({
						// 		title: '最多上传1张照片'
						// 	})
						// }
						tempFilePaths.forEach((item, index) => {
							// if (index < (this.maxLength - len)) {
								this.$http.upload('/admin/file/upload/avatar', {
									filePath: item,
									name: 'file'
								}).then(({ data }) => {
									console.log('图片上传成功', data)
									if (data.code === 0) {
										// let arr = [data.data.url]
										this.$emit('getImg', data.data.url)
										
										// this.$emit('input', data.data.url)
									}
								})
							// }
						})
					}
				})
			},
			deleteImg (index) {
				this.$emit('delImg', index)
			},
			openImg () {
				uni.previewImage({
					current: 0,
					urls: this.url
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.choose-img-wrapper {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		.img-item {
			margin-right: 20rpx;
			position: relative;
			margin-top: 10rpx;
			.icon-delete {
				position: absolute;
				top: 8rpx;
				right: 8rpx;
			}
		}
		.add-upload {
			width: 200rpx;
			height: 200rpx;
			border: 1px solid #d7d7d7;
			text-align: center;
			line-height: 220rpx;
			margin-top: 10rpx;
		}
	}
	.content {
		image {
			width: 100%;
		}
	}
	.pic-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		z-index: 10;
		.pic-header {
			padding: 20rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
