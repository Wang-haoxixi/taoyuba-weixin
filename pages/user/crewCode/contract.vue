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
			<view class="shadow">
				<view class="name">
					船名：浙普渔68102
				</view>
				<view class="height">			
				</view>
				<view class="book">
					持证人：普通船员
				</view>
				<view class="book">
					雇主（甲方）：普通船员
				</view>
				<view class="book">
					雇主（乙方）：普通船员
				</view>
				<view class="book">
					合同时间：2021-08-09
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
            .height{
				height: 16rpx;
			}
			background-color: #F5F5F5;
			margin: 22rpx 0;
			border-radius: 22rpx;
			padding:32rpx 16rpx;
			.book {
				font-size: 22rpx;
				margin-top: 12rpx;
				font-weight: 400;
				color: #616161;
			}

			.right {
				font-size: 22rpx;
				margin-left: auto;
				margin-right: 22rpx;
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
