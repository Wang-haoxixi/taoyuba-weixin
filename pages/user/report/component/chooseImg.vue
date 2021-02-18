<template>
	<view class="">
		<view class="choose-img-wrapper">
			<view class="img-item" v-for="(item, index) in value">
				<u-image width="200rpx" height="200rpx" :key="index" :src="item" mode="scaleToFill"></u-image>
				<u-icon class="icon-delete" name="close-circle-fill" color="#333" size="40" @click="deleteImg(index)"></u-icon>
			</view>
			<view class="add-upload" @click="onChooseImg">
				<u-icon name="plus" color="#d7d7d7" size="80"></u-icon>
			</view>
		</view>
		<u-popup
			mode="top"
			v-model="show"
			:duration="50"
			closeable
			:zoom="false"
			height="100%"
			safe-area-inset-bottom>
			<view class="content">
				<u-swiper height="auto" :list="listImg" :autoplay="false"></u-swiper>
				<!-- <image :src="imgs[current]" mode="aspectFit" width="100%"></image> -->
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			value: Array
		},
		data () {
			return {
				show: false,
				current: 0,
				listImg: []
			}
		},
		methods: {
			openPopup (index) {
				console.log('index', index)
				let img2 = this.value.splice(0, index) || []
				let img1 = this.value.splice(index - 1) || []
				let imgs = img1.concat(img2)
				console.log('img1', img1)
				console.log('img2', img2)
				imgs.forEach((item) => {
					let obj = { image: item }
					this.listImg.push(obj)
				})
				console.log('this.listImg', this.listImg)
				this.show = true
			},
			closePopup () {
				this.listImg = []
				this.show = false
			},
			onChooseImg () {
				uni.chooseImage({
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						this.$emit('getImgs', tempFilePaths)
					}
				})
			},
			deleteImg (index) {
				this.value.splice(index, 1)
				let arr = []
				arr = arr.concat(this.value)
				this.$emit('input', arr)
				console.log('this.value', this.value)
				// this.$emit('deleteImg', index)
			},
			openImg (index) {
				this.openPopup(index)
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
		padding: 40rpx 0;
	}
</style>
