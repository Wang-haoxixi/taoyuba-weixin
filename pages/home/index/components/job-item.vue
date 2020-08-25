<template>
	<view class="list-item-wrapper" @tap="onTo">
		<view class="list-item_left">
			<view class="title">
				<text class="name ellipsis">{{info.positionIdLabel}}</text>
			</view>
			<view class="content">
				<text>￥{{info.salary}}</text>
				<text class="price-type">{{info.priceType}}</text>
			</view>
			<view class="time">
				发布时间：{{getTime(info.createTime)}}
			</view>
		</view>
		<view class="list-item_right" v-if="!hideBtn">
			<view class="">
				<u-button @click="onTo" :custom-style="{backgroundColor: 'rgba(64, 158, 255, 1)', height: '60rpx', lineHight: '60rpx', color: '#fff', fontSize: '26rpx', padding: '10rpx 20rpx'}">{{btnText}}</u-button>
			</view>
			<view class="right-content">
				<slot name="right"></slot>
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
			btnText: {
				type: String,
				default: '申请'
			},
			hideBtn: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onTo () {
				this.$emit('to', this.info)
			},
			// 获取时间
			getTime (time) {
				return this.$tools.dateFormat('YYYY-mm-dd', new Date(time))
			},
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
			.content {
				font-size: 26rpx;
				color: #409EFF;
				.price-type {
					margin-left:  15rpx;
				}
			}
			.time {
				font-size: 24rpx;
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
