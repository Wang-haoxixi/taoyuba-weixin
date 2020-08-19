<template>
	<view class="home-container">
		<view class="content-header">
			<slot name="header"></slot>
		</view>
		<view class="content-body">
			<slot></slot>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.home-container {
		width: 100%;
		margin-bottom: 30rpx;
		background: url('#{$img-url}/home-bg1.png') no-repeat;
		background-size: 100%;
		.content-header {
			height: 80rpx;
			// width: 500rpx;
		}
		.content-body {
			margin: 10rpx 30rpx 0;
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 10rpx;
		}
	}
</style>
