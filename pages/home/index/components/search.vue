<template>
	<view class="search-wrapper" @tap="onTo">
		<u-icon name="search" size="34" color="#aaa"></u-icon>
		<text class="text">{{placeholder}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: String,
			to: String,
			redirect: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onTo () {
				if (this.to !== '') {
					if (this.redirect) {
						uni.redirectTo({
							url: this.to
						});
					} else {
						uni.navigateTo({
							url: this.to
						});
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-wrapper {
		line-height: 65rpx;
		height: 65rpx;
		padding: 0 16rpx;
		background-color: #fff;
		border-radius: 8rpx;
		.text {
			font-size: 28rpx;
			color: #bbb;
			margin-left: 10rpx;
		}
	}
</style>
