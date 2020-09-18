<template>
	<view class="list-item-wrapper" @tap="onTo">
		<view class="list-item_left">
			<view class="title">
				<text class="name ellipsis">{{info.deptName}}</text>
				
			</view>
			<view class="time ellipsis">
				{{info.address}}
				<!-- <template v-if="info.phone">
					<u-icon name="phone"></u-icon>
					<text>{{info.phone}}</text>
				</template>
				<template v-else>
					<text>报名时间：{{info.time}}</text>
				</template> -->
			</view>
			<!-- <view class="info ellipsis">
				{{info.text}}
			</view> -->
		</view>
		<view class="list-item_right">
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
				default: '签到'
			}
		},
		methods: {
			onTo () {
				this.$emit('to', this.info.userId)
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
				font-size: 30rpx;
				color: #666;
				display: flex;
				align-items: center;
				.name {
					max-width: 450rpx;
					line-height: 1.2;
					display: inline-block;
				}
				.address {
					margin-left: 15rpx;
					color: #999;
					font-size: 28rpx;
				}
			}
			.time {
				font-size: 28rpx;
				color: #409EFF;
				width: 100%;
				overflow: hidden;
				.price-type {
					margin-left:  15rpx;
				}
			}
			.info {
				width: 100%;
				overflow: hidden;
				font-size: 28rpx;
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
				font-size: 28rpx;
				color: #999;
			}
		}
	}
</style>
