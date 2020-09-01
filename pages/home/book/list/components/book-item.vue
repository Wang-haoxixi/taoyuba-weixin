<template>
	<view class="book-list-item">
		<view class="image-wrapper">
			<!-- <u-image width="170" height="200" :src="imgUrl" mode="scaleToFill"></u-image> -->
			<image :src="imgUrl"></image>
		</view>
		<view class="content-wrapper">
			<view class="title">{{title}}</view>
			<view class="info">适用人员：{{info}}</view>
			<view class="price">价格：￥{{price}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgUrl: String,
			title: String,
			price: String,
			info: String
		}
	}
</script>

<style scoped lang="scss">
	.book-list-item {
		display: flex;
		background-color: #fff;
		padding: 30rpx;
		border-bottom: 2rpx solid #f6f6f6;
		.image-wrapper {
			flex: 0 0 170rpx;
			height: 200rpx;
			overflow: hidden;
			border-radius: 10rpx;
			image {
				height: 100%;
				width: 100%;
			}
		}
		.content-wrapper {
			flex: 1 1 auto;
			margin-left: 20rpx;
			line-height: 1.2;
			font-size: 30rpx;
			color: #666;
			.title {
				color: #ba1b20;
			}
			.info, .price {
				margin-top: 20rpx;
			}
		}
	}
</style>
