<template>
	<view class="message-detail-container phonex-mb">
		<view class="header-wrapper">
			<view class="title">您的申请已通过</view>
			<view class="time">2019.10.20</view>
		</view>
		<view class="content-wrapper">
			您于2019.10.20申请的“关于挖掘机的工作”已通过。感谢您的关注。
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (params) {
			console.log(params)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.message-detail-container {
		padding: 0 30rpx;
		.header-wrapper {
			padding: 30rpx 0;
			border-bottom: 1px solid #f6f6f6;
			.title {
				font-size: 36rpx;
				color: #333;
				margin-bottom: 20rpx;
			}
			.time {
				color: #999;
				text-align: right;
				font-size: 28rpx;
			}
		}
		.content-wrapper {
			padding: 20rpx 0;
			color: #999;
			font-size: 28rpx;
			line-height: 1.6;
		}
	}
</style>
