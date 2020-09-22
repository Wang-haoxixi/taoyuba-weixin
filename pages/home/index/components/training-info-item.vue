<template>
	<view class="article-item-wrapper">
		<view @tap="onTo">
			<view class="title">{{info.title}}</view>
			<view class="desc text u-line-2">简介：{{info.description}}</view>
			<!-- <view class="text">来源：{{item.source}}</view> -->
			<view class="text">{{info.createTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		methods: {
			onTo () {
				let row = this.info
				if (row.isDispatch) {
					if (row.httpSrc) {
						uni.navigateTo({
							url: `/pages/base/web?src=${row.httpSrc}`
						})
					}
				} else {
					uni.navigateTo({
						url: `/pages/home/training-info/detail/index?id=${row.articleId}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article-item-wrapper {
		padding: 30rpx;
		background-color: #fff;
		.title {
			font-size: 30rpx;
			color: #333;
		}
		.text {
			margin-top: 10rpx;
			font-size: 26rpx;
			color: #999;
		}
	}
</style>

