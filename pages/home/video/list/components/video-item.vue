<template>
	<view class="video-item-wrapper ">
		<view class="item-left">
			<u-lazy-load :image="info.videoImg" height="200" img-mode="scaleToFill"></u-lazy-load>
		</view>
		<view class="item-right">
			<view class="title u-line-1">{{info.vedioName}}</view>
			<view class="text">{{info.source}}</view>
			<view class="text">{{info.videoViewerNum}}人次学过</view>
			<view class="text">免费</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-item-wrapper {
		display: flex;
		background-color: #fff;
		padding: 30rpx 30rpx;
		border-bottom: 1px solid #f6f6f6;
		.item-left {
			flex: 0 0 240rpx;
			height: 200rpx;
			overflow: hidden;
			border-radius: 10rpx;
		}
		.item-right {
			flex: 1 1 auto;
			margin-left: 30rpx;
			overflow: hidden;
			color: #999;
			font-size: 26rpx;
			.title {
				color: #666;
				font-size: 30rpx;
			}
			.text {
				margin-top: 20rpx;
			}
		}
	}
</style>
