<template>
	<view class="success-container">
		<view class="status_bar"></view>
		<view class="ic-wrapper">
			<u-icon name="checkmark-circle-fill" size="120" color="#059148"></u-icon>
		</view>
		<view class="text">{{text}}</view>
		<view class="btn-wrapper">
			<u-button size="medium" class="btn" @click="onTo">返回首页</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				text: ''
			}
		},
		onLoad (params) {
			this.text = params.text
			setTimeout(() => {
				this.onTo()
			}, 5000)
		},
		methods: {
			onTo () {
				uni.switchTab({
					url: '/pages/home/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.success-container {
		padding-top: 150rpx;
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		.ic-wrapper {
			text-align: center;
		}
		.text {
			margin-top: 30rpx;
			font-size: 34rpx;
			color: #666;
			text-align: center;
		}
		.btn-wrapper {
			margin-top: 50rpx;
			text-align: center;
		}
	}
</style>
