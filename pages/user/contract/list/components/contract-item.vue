<template>
	<view class="contract-item-wrapper">
		<view class="left-item">
			<view class="title">{{info.contractNumber}}</view>
			<view class="text">船名：{{info.shipName}}</view>
			<view class="text">
				<text>舶拥有者：{{info.shipowner}}</text>
				<text>雇员：{{info.employeeName}}</text>
			</view>
		</view>
		<view class="right-item">
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped lang="scss">
	.contract-item-wrapper {
		background-color: #fff;
		padding: 30rpx 30rpx;
		color: #999;
		font-size: 26rpx;
		border-bottom: 1px solid #f6f6f6;
	}
</style>
