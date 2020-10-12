<template>
	<view class="news-item-wrapper">
		<view class="item-left">
			<u-image width="240rpx" height="160rpx" :src="info.image || noImg" :error-icon="errorImg" mode="scaleToFill"></u-image>
			<!-- <u-lazy-load :image="info.image || noImg" height="160" img-mode="scaleToFill" :error-img="errorImg"></u-lazy-load> -->
		</view>
		<view class="item-right">
			<view class="title u-line-2">{{info.title}}</view>
			<view class="source text">来源：{{info.source}}</view>
			<view class="time text">{{info.createTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		data () {
			return {
				errorImg: '/static/image/img/img.jpg',
				noImg: '/static/image/img/img.jpg'
			}
		}
	}
</script>

<style scoped lang="scss">
	.news-item-wrapper {
		display: flex;
		background-color: #fff;
		padding: 30rpx 30rpx;
		border-bottom: 1px solid #f6f6f6;
		.item-left {
			flex: 0 0 240rpx;
			height: 160rpx;
			overflow: hidden;
		}
		.item-right {
			flex: 1 1 auto;
			margin-left: 30rpx;
			overflow: hidden;
			color: #999;
			font-size: 26rpx;
			.title {
				color: #666;
				font-size: 28rpx;
			}
			.text {
				margin-top: 20rpx;
			}
		}
	}
</style>
