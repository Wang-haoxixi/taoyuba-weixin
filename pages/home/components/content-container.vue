<template>
	<view class="content-container">
		<view class="title" v-if="title">{{title}}</view>
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
			font-size: 32rpx;
			font-weight: 700;
		}
		.body-wrapper {
			font-size: 30rpx;
			background-color: #fff;
			padding: 20rpx;
		}
	}
</style>
