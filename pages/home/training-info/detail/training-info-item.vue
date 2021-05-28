<template>
	<view class="article-item-wrapper" @click="onTo">
		<view>
			<u-image width="200rpx" height="140rpx" :src="imgUrl"></u-image>
		</view>
		<view class="article-item-wrapper-title">
			<view class="title">{{info.meetName}}</view>
			<view class="desc text u-line-2">{{info.meetStartTime.substring(0,10)}} <text style="color:#535353;margin-left: 20rpx">{{info.address}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		onShow() {
			console.log(this.info)
		},
		data () {
			return {
				imgUrl: `${this.$IMAGE_URL}/shipBanner.png`,
			}
		},
		methods: {
			onTo () {
				let row = this.info
				uni.navigateTo({
					url: `/pagesUser/user/video/list/faceToFaceDetail?id=${row.id}&type=1`,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.article-item-wrapper {
		padding: 30rpx;
		background-color: #fff;
		display: flex;
		.title {
			font-size: 30rpx;
			font-weight: 600;
			color: #333;
		}
		.text {
			margin-top: 10rpx;
			font-size: 26rpx;
			color: #999;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			max-width: 500rpx;
		}
		.article-item-wrapper-title {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 10rpx 20rpx;
		}
	}
</style>

