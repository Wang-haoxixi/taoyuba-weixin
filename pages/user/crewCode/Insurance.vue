<template>
	<view>
		<view class="head">
			<view class="name">
				<view class="title">
					我的保险
				</view>
				<view class="right">
					全部（4）
				</view>
			</view>
			<view class="image" v-for="item in list">
				<view class="time">
					保险期限：2020-08-08 至 2020-08-31
				</view>
				<view class="nameA">
					<view class="">
						保额：5000万
					</view>
					<view class="center">
						保险人：XXX
					</view>
					<view class="rightA">
						受益人：XXX
					</view>
				</view>
				<u-image width="100%" height="210rpx" mode="scaleToFill" :src="item.src">

				</u-image>

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
                list:[{
					src:"https://img.taoyu58.com/upload/202109/457d2726-dbd0-4fec-b245-316310cb44bc_baoxian1.png"
				},
				{
					src:"https://img.taoyu58.com/upload/202109/a14d5e2b-c1db-44b2-bfda-1e3411dd2f58_baoxian2.png"
				},
				{
					src:"https://img.taoyu58.com/upload/202109/1c671083-86e2-418b-8392-e172b3298832_baoxian3.png"
				},
				{
					src:"https://img.taoyu58.com/upload/202109/c566176b-6655-4dec-b942-8c4614d253bc_baoxian4.png"
				}]
					
					
				
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

	.head {
		.image {
			position: relative;

			.time {
				position: absolute;
				z-index: 99;
				color: #FFFFFF;
				bottom: 54rpx;
				left: 16rpx;
				font-size: 24rpx;
				letter-spacing: 3rpx;
				font-weight: 300;
			}

			.nameA {
				position: absolute;
				display: flex;
				z-index: 99;
				color: #FFFFFF;
				bottom: 15rpx;
				left: 16rpx;
				font-size: 24rpx;
				letter-spacing: 3rpx;
				font-weight: 300;

				.center {
					margin-left: 62rpx;
				}

				.rightA {
					margin-left: 62rpx;
				}
			}
		}

		.name {
			.title {
				font-weight: 600;
				font-size: 32rpx;
				margin-left: 16rpx;
			}

			.right {
				flex: 1;
				text-align: right;
			}

			display: flex;
			margin-bottom: 48rpx;
		}

		margin: 32rpx;
		padding: 32rpx 16rpx;
		border-radius: 22rpx;
		width: 686rpx;
		background-color: white;
		padding-bottom: 45rpx;

		.avatar {
			padding: 64rpx 64rpx;
		}
	}
</style>
