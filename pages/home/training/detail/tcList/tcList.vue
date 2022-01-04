<template>
	<view>
		<view class="container-warp">
			<view class="tc-item">
				<view class="l">
					<view class="org">
						郑
					</view>
					<view class="info">
						<view class="name">
							郑基
						</view>
						<view class="job">
							副教授  ·  海洋
						</view>
						<view class="sex-age">
							<view class="sex">
								男
							</view>
							<view class="age">
								46岁
							</view>
						</view>
					</view>
				</view>
				<view class="r">
					<image :src="`${imgUrl}/icon-arrowright-t.png`" style="width: 16rpx;height: 44rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$IMAGE_URL,
			};
		},
	}
</script>

<style lang="scss" scoped>
.container-warp{
	margin: 24rpx;
	background-color: #FFFFFF;
	padding: 0rpx 32rpx 0 22rpx;
	border-radius: 16rpx;
	.tc-item{
		padding-top: 30rpx;
		padding-bottom: 24rpx;
		border-bottom: 2rpx solid rgba(237, 237, 237, .5);
		display: flex;
		.l{
			flex: 1;
			display: flex;
			.org{
				width: 112rpx;
				height: 112rpx;
				border-radius: 50%;
				background-color: #E8F1FE;
				color: #1F79F4;
				font: 500 36rpx PingFang SC;
				text-align: center;
				line-height: 112rpx;
				margin-right: 20rpx;
			}
			.info{
				.name{
					font: 500 32rpx PingFang SC;
				}
				.job{
					font: 400 28rpx PingFang SC;
					color: #666666;
					margin: 12rpx 0 16rpx;
				}
				.sex-age{
					color: #999999;
					font: 500 20rpx PingFang SC;
					display: flex;
					>view{
						padding: 6rpx 16rpx;
						background-color: #F9F9F9;
						border-radius: 8rpx;
					}
					.sex{
						margin-right: 16rpx;
					}
				}
			}
		}
		.r{
			width: 32rpx;
			align-self: center;
		}
	}
}
</style>
