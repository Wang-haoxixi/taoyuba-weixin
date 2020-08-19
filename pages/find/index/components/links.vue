<template>
	<view class="links-wrapper">
		<scroll-view scroll-x="true">
			<view class="content-wrapper">
				<view class="item" v-for="(item, index) in data" :key="index">
					<view class="iconfont icontianqi"></view>
					<text class="text">{{item.label}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: [
					{ label: '台风预报' },
					{ label: '潮汐预报' },
					{ label: '近岸预报' },
					{ label: '渔区气象' },
					{ label: '大风预报' }
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.links-wrapper {
		width: 100%;
		overflow: hidden;
		background-color: #fff;
		.content-wrapper {
			width: 900rpx;
			display: flex;
			flex-wrap: nowrap;
			padding: 20rpx 20rpx;
			.item {
				width: 200rpx;
				text-align: center;
				color: #666;
				.iconfont {
					font-size: 60rpx;
				}
				.text {
					display: block;
					margin-top: 10rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
