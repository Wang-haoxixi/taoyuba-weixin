<template>
	<view class="choose-img-wrapper">
		<view class="img-item" v-for="(item, index) in imgs">
			<u-image width="200rpx" height="200rpx" :key="index" :src="item" mode="scaleToFill"></u-image>
		</view>
		<view class="add-upload" @click="onChooseImg">
			<u-icon name="plus" color="#d7d7d7" size="80"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgs: Array
		},
		methods: {
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
</style>
