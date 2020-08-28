<template>
	<view class="contract-item-wrapper">
		<view class="header">
			<text class="title">{{info.title}}</text>
			<text class="name">持证人：{{info.name}}</text>
		</view>
		<view class="body">
			<text class="text">雇主：{{info.company}}</text>
			<text>雇员：{{info.people}}</text>
		</view>
		<view class="footer">创建时间：{{info.createTime}}</view>
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
	.contract-item-wrapper {
		background-color: #fff;
		padding: 30rpx 30rpx;
		color: #999;
		font-size: 26rpx;
		border-bottom: 1px solid #f6f6f6;
		.header {
			.title {
				color: #666;
				font-size: 30rpx;
				margin-right: 20rpx;
			}
		}
		.body, .footer {
			margin-top: 20rpx;
			.text {
				margin-right: 20rpx;
			}
		}
	}
</style>
