<template>
	<view>
		<view class="head">
			<view class="time">
				<view class="">
				数据更新时间：	
				</view>
				<view class="time-real">
					{{time}}
				</view>
			</view>
			<view class="status">
				<view class="content">
					我的履历状态：
					<view class="check">
						{{status}}
					</view>
				</view>
				<view class="width">
				</view>
				<view class="content">
					累计工作时间：
					<view class="check">
						{{status}}
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="year">
				2021年
			</view>
			<view class="shadow">
				<view class="name">
					<u-tag text="上船" mode="dark" />
					<view style="width: 16rpx;">			
					</view>
					船名：浙普渔68102
				</view>
				<view class="bottom">
					<view class="book">
						职务证书：普通船员
					</view>
					<view class="book">
						来源：合同
					</view>
					<view class="right">
						2021-03-02
					</view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				status: "正常",
				time: "2021-08-11 12:00:00",
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E9F3FF;
	}
	.card {
		margin: 32rpx;
		padding: 16rpx;
		border-radius: 22rpx;
		width: 686rpx;
		background-color: white;
		.year {
			margin-left: 18rpx;
			font-weight: 700;
		}
		.shadow {
			.name {
				display: flex;
				// justify-content: center;
				align-items: center;
				font-weight: 700;
			}
			background-color: #F5F5F5;
			margin: 22rpx 0;
			border-radius: 22rpx;
			padding:32rpx 16rpx;
			// height: 100rpx;
			.bottom {
				margin-top: 32rpx;
				display: flex;
				.book {
					font-size: 22rpx;
					margin-right: 32rpx;
				}

				.right {
					font-size: 22rpx;
					margin-left: auto;
					margin-right: 22rpx;
				}
			}
		}
	}
	.time {
		margin-top: 28rpx;
		// color: #016EFF;
		display: flex;
		.real {
			margin-left: 16rpx;
		}
	}
	.head {
		margin: 32rpx;
		border-radius: 22rpx;
		width: 686rpx;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		padding-bottom: 32rpx;
		.status {
			display: flex;
			margin-top: 32rpx;
			.width {
				width: 32rpx;
			}
			.content {
				display: flex;
				font-weight: 700;
			}
			.check {
				color: #016EFF;
			}
		}
	}
</style>
