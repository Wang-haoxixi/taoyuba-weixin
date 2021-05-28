<template>
	<view class="face-boss">
		<view class="content">
			<u-icon name="minus-circle-fill" size="160" color="red" v-if="option.content == '会议未开始' || option.content == '会议已结束' || option.content == '会议结束' || option.content == '签到时间结束'"></u-icon>
			<u-icon name="checkmark-circle" size="160" color="#42b983" v-else></u-icon>
		</view>
		<view class="content">{{ option.content }}</view>
		<view class="content" style="margin-top: 30%">
			<u-button @click="sumbit">返回首页</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		},
		data () {
			return {
				option: {},
			}
		},
		components: {
		},
		watch: {
		},
		created () {
		},
		onLoad (option) {
			this.option = option
		},
		methods: {
			sumbit () {
				uni.switchTab({
					url: '/pages/home/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.face-boss {
		padding-top: 10%;
		background: white;
		min-height: 100vh;
		.content {
			text-align: center;
			width: 50%;
			margin: 50rpx auto;
			font-size: 50rpx;
		}
	}
</style>