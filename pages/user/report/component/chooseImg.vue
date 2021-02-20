<template>
	<view class="">
		<view class="choose-img-wrapper">
			<view class="img-item" v-for="(item, index) in value">
				<u-image width="200rpx" height="200rpx" :key="index" :src="item" mode="scaleToFill" @click="openImg(index)"></u-image>
				<u-icon class="icon-delete" name="close-circle-fill" color="#333" size="40" @click="deleteImg(index)"></u-icon>
			</view>
			<view class="add-upload" @click="onChooseImg">
				<u-icon name="plus" color="#d7d7d7" size="80"></u-icon>
			</view>
		</view>
		<view v-if="show" class="pic-wrapper">
			<view class="pic-header">
				<view class="icon-left">
					<u-icon name="arrow-left" color="#333" size="34" @click="closePopup"></u-icon>
				</view>
				<view class="pic-center">
					{{current + 1}}/{{value.length}}
				</view>
				<view class="icon-right">
					<u-icon name="trash" color="#333" size="34" @click="deleteImgSwiper"></u-icon>
				</view>
			</view>
			<view class="content">
				<swiper class="swiper" style="height: 100vh;" :current="current" @change="onChangeSwiper">
					<swiper-item v-for="(item, index) in value" :key="index">
						<image :src="item" mode="widthFix" style="width: 100%;"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import { API_URL } from '@/env'
	export default {
		props: {
			value: Array
		},
		data () {
			return {
				show: false,
				current: 0
			}
		},
		methods: {
			openPopup (index) {
				this.current = index
				this.show = true
			},
			closePopup () {
				this.show = false
			},
			onChooseImg () {
				let config_url = API_URL
				uni.chooseImage({
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach((item) => {
							this.$http.upload('/admin/file/upload/avatar', {
								filePath: item,
								name: 'file'
							}).then(({ data }) => {
								console.log('图片上传成功', data)
								if (data.code === 0) {
									let arr = [data.data.url]
									this.$emit('getImgs', data.data.url)
								}
							})
						})
						// this.$emit('getImgs', tempFilePaths)
					}
				})
			},
			deleteImg (index) {
				this.value.splice(index, 1)
				let arr = []
				arr = arr.concat(this.value)
				this.$emit('input', arr)
			},
			openImg (index) {
				this.openPopup(index)
			},
			onChangeSwiper (event) {
				this.current = event.detail.current
			},
			deleteImgSwiper () {
				this.value.splice(this.current, 1)
				let arr = []
				arr = arr.concat(this.value)
				this.$emit('input', arr)
				if (this.current > this.value.length - 1) {
					this.current = this.value.length - 1
				}
				if (this.value.length === 0) {
					this.closePopup()
				}
			}
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
