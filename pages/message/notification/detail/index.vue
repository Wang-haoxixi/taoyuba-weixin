<template>
	<view class="message-detail-container safe-bottom">
		<view class="header-wrapper">
			<view class="title">{{data.bulletinTitle}}</view>
			<view class="time">{{data.createTime}}</view>
		</view>
		<view class="content-wrapper">
			<u-parse :html="data.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: {}
			}
		},
		onLoad (params) {
			if (params.id) {
				this.getList(params.id)
			}
		},
		methods: {
			getList (id) {
				this.$http.get(`/tmlms/bulletin/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			}
		}
	}
</script>
<style>
page {
	background-color: #fff;
}	
</style>
<style lang="scss" scoped>
	.message-detail-container {
		padding: 0 30rpx;
		.header-wrapper {
			padding: 30rpx 0;
			border-bottom: 1px solid #f6f6f6;
			.title {
				font-size: 36rpx;
				color: #333;
				margin-bottom: 20rpx;
			}
			.time {
				color: #999;
				text-align: right;
				font-size: 28rpx;
			}
		}
		.content-wrapper {
			padding: 20rpx 0;
			color: #999;
			font-size: 28rpx;
			line-height: 1.6;
		}
	}
</style>
