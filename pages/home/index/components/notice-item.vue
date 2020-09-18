<template>
	<view class="notice-item-wrapper">
		<template v-if="type === 'text'">
			<view class="text-wrapper">
				<text class="title ellipsis">{{info.title}}</text>
				<text class="time">{{getTime(info.createTime)}}</text>
			</view>
		</template>
		<template v-else-if="type === 'miniImg'">
			<view class="mini-img-wrapper">
				<view class="mini-img-wrapper-left">
					<text class="title two-ellipsis">{{info.title}}</text>
					<text class="time">{{info.createTime}}</text>
				</view>
				<view class="mini-img-wrapper-right">
					<u-lazy-load :image="info.img" class="lazy-image" height="140" img-mode="scaleToFill"></u-lazy-load>
					<!-- <image :src="info.img" mode="scaleToFill"></image> -->
				</view>
			</view>
		</template>
		<template v-else-if="type === 'largeImg'">
			<view class="large-img-wrapper">
				<view class="large-img-wrapper-image">
					<image :src="info.img" mode="scaleToFill"></image>
				</view>
				<view class="large-img-wrapper-content">
					<text class="title ellipsis">{{info.title}}</text>
					<text class="time">{{info.createTime}}</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			// text 文字类型 miniImg 小图类型 miniImg 大图类型
			type: {
				type: String,
				default: 'text'
			},
			info: {
				type: Object,
				default: () => {}
			}
		},
		data () {
			return {
				loadingImg: '/static/uView/loading.png',
				errorImg: '/static/uView/load_error.png'
			}
		},
		methods: {
			getTime (time) {
				if (time) {
					let t = +new Date(time)
					return this.$tools.timestamp(t / 1000)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.notice-item-wrapper {
		padding: 30rpx 30rpx 0;
		.text-wrapper {
			padding-bottom: 30rpx;
			border-bottom: 1px solid #f6f6f6;
			color: #666;
			text {
				display: block;
			}
		}
		.title {
			font-size: 30rpx;
			color: #666;
		}
		.time {
			font-size: 28rpx;
			margin-top: 25rpx;
			text-align: right;
			color: #aaa;
		}
		.mini-img-wrapper {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1px solid #f6f6f6;
			.mini-img-wrapper-left {
				flex: 1 1 auto;
				margin-right: 20rpx;
				text {
					display: block;
				}
				.title {
					color: #666;
					font-size: 30rpx;
					height: 84rpx;
					overflow: hidden;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.mini-img-wrapper-right {
				flex: 0 0 200rpx;
				height: 140rpx;
				width: 200rpx;
				overflow: hidden;
				border-radius: 10rpx;
				.lazy-image {
					width: 100%;
					height: 140rpx;
				}
			}
		}
		.large-img-wrapper {
			padding-bottom: 20rpx;
			border-bottom: 1px solid #f6f6f6;
			.large-img-wrapper-image {
				width: 100%;
				height: 340rpx;
				border-radius: 10rpx;
				overflow: hidden;
				margin-bottom: 10rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title {
				margin-top: 16rpx;
			}
			text {
				display: block;
			}
		}
	}
</style>
