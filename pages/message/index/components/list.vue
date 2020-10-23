<template>
	<view class="list-wrapper">
		<view class="content-wrapper">
			<u-cell-item :value="item.time" v-for="(item, index) in list" :key="index" @tap="onTo(item)">
				<view slot="title" class="content u-line-1">{{item.name}}
					<u-badge :is-dot="true" type="error" class="dot" v-if="item.isRead === '0'"></u-badge>
				</view>
			</u-cell-item>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		methods: {
			onTo (row) {
				row.isRead = '1'
				uni.navigateTo({
					url: `/pages/message/detail/index?id=${row.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-wrapper {
		.title {
			line-height: 88rpx;
			font-size: 28rpx;
			padding: 0 20rpx;
			color: #999;
		}
		.content-wrapper {
			background-color: #fff;
		}
		.content {
			display: inline-block;
			max-width: 400rpx;
			position: relative;
			padding-right: 20rpx;
			color: #999;
			font-size: 28rpx;
			.dot {
				position: absolute;
				top: -20rpx;
				right: -10rpx;
			}
		}
	}
</style>
