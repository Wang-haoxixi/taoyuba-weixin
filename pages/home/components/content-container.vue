<template>
	<view class="content-container">
		<view class="title">{{title}}</view>
		<view class="body-wrapper">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String
		}
	}
</script>

<style lang="scss" scoped>
	.content-container {
		.title {
			height: 88rpx;
			line-height: 88rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			font-size: 28rpx;
		}
		.body-wrapper {
			font-size: 26rpx;
			background-color: #fff;
			padding: 20rpx;
		}
	}
</style>
