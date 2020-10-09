<template>
	<!-- 在线测试 -->
	<view class="examination-container page-base phonex-mb">
		<view class="item" @tap="openExam">
			<view class="title u-line-2">标题</view>
			<view class="number">参与人数：500人</view>
			<view class="btn-wrapper">
				<u-button plain size="mini" :custom-style="customStyle">立即参与</u-button>
			</view>
		</view>
		<view class="item">
			<view class="title u-line-2">标题</view>
			<view class="number">参与人数：500人</view>
			<view class="btn-wrapper">
				<u-button plain size="mini" :custom-style="customStyle">立即参与</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: [],
				customStyle: {
					fontSize: '26rpx',
					color: '#409EFF',
					borderColor: '#409EFF'
				}
			}
		},
		methods: {
			openExam (id) {
				uni.showModal({
					title: '您确定参加模拟考试么',
					showCancel: true,
					success: ({confirm, cancel}) => {
						if (confirm) {
							uni.navigateTo({
								url: '/pages/home/examination/detail/index'
							})
							return
						}
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
<style scoped lang="scss">
	
	.examination-container {
		padding: 30rpx;
		.item {
			padding: 30rpx;
			background-color: #f6f6f6f6;
			border-radius: 30rpx;
			width: 100%;
			margin-bottom: 30rpx;
			.title {
				font-size: 32rpx;
				color: #333;
				margin-bottom: 15rpx;
				font-weight: 700;
			}
			.number {
				font-size: 26rpx;
				margin-bottom: 15rpx;
				color: #999;
			}
			.btn-wrapper {
				text-align: right;
			}
		}
	}
</style>
