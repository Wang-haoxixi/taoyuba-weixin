<template>
	<view class="info-item-wrapper">
		<view class="title u-line-1">
			<u-icon name="file-text" size="36" class="ic"></u-icon>
			{{info.title}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		}
	}
</script>

<style scoped lang="scss">
	.info-item-wrapper {
		padding: 30rpx;
		border-bottom: 1px solid #f6f6f6;
		.title {
			font-size: 30rpx;
			color: #666;
			.ic {
				margin-right: 10rpx;
			}
		}
	}
</style>
