<template>
	<view class="bottom">
		<view class="bottom-view">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'bottomButton'
	}
</script>

<style lang="scss">
	.bottom {
		box-shadow: 0 -4rpx 6rpx rgba(174, 191, 211, 0.13);
		width: 750rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: #FFFFFF;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	
		/* #endif */
		.bottom-view{
			padding: 32rpx;
		}
	}
</style>
