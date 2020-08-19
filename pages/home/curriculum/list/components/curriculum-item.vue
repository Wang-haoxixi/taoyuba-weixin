<template>
	<view class="list-item-wrapper">
		<view class="list-item_left">
			<view class="title">
				<text class="name ellipsis">{{info.title}}</text>
				<text class="address">{{info.name}}</text>
			</view>
			<view class="time ellipsis">
				<text>开班时间：{{info.time}}</text>
			</view>
			<view class="info ellipsis">
				<text>培训天数：{{info.day}}天</text>
			</view>
		</view>
		<view class="list-item_right" v-if="!hideBtn">
			<view class="">
				<u-button :custom-style="{backgroundColor: 'rgba(64, 158, 255, 1)', height: '60rpx', lineHight: '60rpx', color: '#fff', fontSize: '26rpx', padding: '10rpx 20rpx'}">报名</u-button>
			</view>			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {}
			},
			hideBtn: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-item-wrapper {
		display: flex;
		padding: 15px;
		line-height: 2;
		.list-item_left {
			flex: 1 1 auto;
			width: 100%;
			overflow: hidden;
			.title {
				font-size: 28rpx;
				color: #666;
				display: flex;
				align-items: center;
				.name {
					max-width: 280rpx;
					line-height: 1.2;
					display: inline-block;
				}
				.address {
					margin-left: 15rpx;
					color: #999;
					font-size: 24rpx;
				}
			}
			.time {
				font-size: 26rpx;
				color: #999;
				width: 100%;
				overflow: hidden;
				.price-type {
					margin-left:  15rpx;
				}
			}
			.info {
				width: 100%;
				overflow: hidden;
				font-size: 26rpx;
				color: #999;
			}
		}
		.list-item_right {
			flex: 0 0 180rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			.right-content {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
</style>
