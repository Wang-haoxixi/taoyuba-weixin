<template>
	<view>
		<view class="head">
			<view >
				<view class="time">
					<view class="">
					数据更新时间：	
					</view>
					<view class="time-real">
						{{time}}
					</view>
				</view>
			</view>
			<view class="content">
				<view class="top">
					<view class="title">
						船员证书
					</view>
					<view class="name">
						<view class="hui">
							证书类型：
						</view>
						<view class="black">
							船员证书
						</view>
					</view>
					<view class="name">
						<view class="hui">
							证书职务：
						</view>
						<view class="black">
							船员证书
						</view>
					</view>
					<view class="name">
						<view class="hui">
							有效日期：
						</view>
						<view class="black">
							20200603
						</view>
					</view>
					<view class="name">
						<view class="hui">
							发证日期：
						</view>
						<view class="black">
							20200603
						</view>
					</view>
					<view class="name">
						<view class="hui">
							证书编号：
						</view>
						<view class="black">
							20200603
						</view>
					</view>
				</view>
				<u-image width="100%" height="345" mode="scaleToFill"  :src="src"></u-image>
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
				src:"https://img.taoyu58.com/upload/202109/ce22e278-472c-4b3c-bf9d-725183b961a5_sfz1.png"
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
	
	.time {
		margin-top: 28rpx;
		letter-spacing: 3rpx;
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
		.content{
			position: relative;
			margin-top: 48rpx;
			width: 654rpx;
			.top{
				z-index: 99;
				position: absolute;
				top: 32rpx;
				left: 16rpx;
				.title{
					font-weight: 600;
					letter-spacing: 3rpx;
					font-size: 32rpx;
					margin-bottom: 32rpx;
				}
				.name{
					margin-top: 12rpx;
					display: flex;
					font-size: 24rpx;
					letter-spacing: 3rpx;
					.hui{
						color: #777777;
					}
					.black{
						font-weight: 600;
					}
				}
			}
		}
	}
</style>
