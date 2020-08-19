<template>
	<view class="list-wrapper">
		<view class="title" v-if="title">{{title}}</view>
		<view class="content-wrapper">
			<u-cell-item :value="item.time" v-for="(item, index) in list" :key="index">
				<view slot="title" class="content u-line-1">{{item.content}}
					<u-badge :is-dot="true" type="error" class="dot" v-if="item.dot"></u-badge>
				</view>
			</u-cell-item>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			list: Array
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
