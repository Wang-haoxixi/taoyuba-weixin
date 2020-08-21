<template>
	<view class="notice-item-wrapper">
		<template v-if="type === 'text'">
			<view class="text-wrapper">
				<text class="title ellipsis">{{info.title}}</text>
				<text class="time">{{info.time}}</text>
			</view>
		</template>
		<template v-else-if="type === 'miniImg'">
			<view class="mini-img-wrapper">
				<view class="mini-img-wrapper-left">
					<text class="title two-ellipsis">{{info.title}}</text>
					<text class="time">{{info.time}}</text>
				</view>
				<view class="mini-img-wrapper-right">
					<image :src="info.img"></image>
				</view>
			</view>
		</template>
		<template v-else-if="type === 'largeImg'">
			<view class="large-img-wrapper">
				<view class="large-img-wrapper-image">
					<image :src="info.img"></image>
				</view>
				<view class="large-img-wrapper-content">
					<text class="title ellipsis">{{info.title}}</text>
					<text class="time">{{info.time}}</text>
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
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.notice-item-wrapper {
		padding: 30rpx 30rpx 0;
		.text-wrapper {
			padding: 20rpx 0;
			border-bottom: 1px solid #f6f6f6;
			color: #666;
			text {
				display: block;
			}
		}
		.title {
			font-size: 30rpx;
		}
		.time {
			font-size: 26rpx;
			margin-top: 25rpx;
			text-align: right;
			color: #999;
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
				image {
					width: 100%;
					height: 100%;
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
