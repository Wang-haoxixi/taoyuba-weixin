<template>
	<view class="video-wrapper">
		<home-container>
			<view class="video-title" slot="header">
				<text class="text">热门视频</text>
				<view class="reload" @tap="onReload">
					<u-icon name="reload" size="24"></u-icon>
					<text>换一批</text>
				</view>
			</view>
			<view class="video-content">
				<u-row gutter="16">
					<u-col span="8">
						<view class="video-content-left">
							<view-item class="large-video" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '260rpx'}"></view-item>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<view>
								<view-item play-type="mini" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></view-item>
							</view>
							<view style="margin-top: 20rpx;">
								<view-item class="large-video" play-type="mini" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></view-item>
							</view>
						</view>
					</u-col>
				</u-row>
				<view class="video-content-bottom">
					<u-row gutter="16">
						<u-col span="4">
							<view-item class="large-video" textPosition="bottom" play-type="mini" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></view-item>
						</u-col>
						<u-col span="4">
							<view-item class="large-video" textPosition="bottom" play-type="mini" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></view-item>
						</u-col>
						<u-col span="4">
							<view-item class="large-video" textPosition="bottom" play-type="mini" title="[最新] 船员岗位培训进阶教学船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></view-item>
						</u-col>
					</u-row>
				</view>
				
			</view>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	import viewItem from './video-item.vue'
	export default {
		components: {
			homeContainer,
			viewItem
		},
		methods: {
			onReload () {}
		}
	}
</script>

<style scoped lang="scss">
	.video-wrapper {
		.video-title {
			color: #fff;
			display: flex;
			justify-content: space-between;
			padding: 0 50rpx;
			line-height: 80rpx;
			.text {
				font-size: 28rpx;
			}
			.reload {
				font-size: 24rpx;
				text {
					margin-left: 6rpx;
				}
			}
		}
		.video-content {
			padding: 30rpx 20rpx;
			.video-content-left {
				.mini-wrapper {
					margin-top: 10rpx;
					.mini-video {
						margin-left: 8rpx;
					}
				}
			}
			.large-video {
				width: 100%;
				height: 260rpx;
			}
		}
		.video-content-bottom {
			margin-top: 20rpx;
		}
	}
</style>
