<template>
	<view class="main-container phonex-mb">
		<view class="status_bar"></view>
		<view class="header-wrapper">
			<view class="logo-wrapper">
				<image :src="`${imgUrl}/logo.png`"></image>
			</view>
			<view class="title">淘渔吧</view>
		</view>
		<view class="form-wrapper">
			
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				imgUrl: this.$IMAGE_URL
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-container {
		.status_bar {
			height: var(--status-bar-height);
			background-color: #409eff;
			width: 100%;
		}
		.header-wrapper {
			width: 100%;
			height: 600rpx;
			padding-top: 100rpx;
			background-color: #409eff;
			.logo-wrapper {
				margin: 0rpx auto;
				width: 200rpx;
				height: 186rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title {
				font-size: 50rpx;
				color: #fff;
				margin-top: 50rpx;
				text-align: center;
			}
		}
	}
</style>
