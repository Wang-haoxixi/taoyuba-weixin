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
							<video-item class="large-video" id="1" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '260rpx'}"></video-item>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<view>
								<video-item play-type="mini" id="1" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></video-item>
							</view>
							<view style="margin-top: 20rpx;">
								<video-item class="large-video" id="1" play-type="mini" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></video-item>
							</view>
						</view>
					</u-col>
				</u-row>
				<view class="video-content-bottom">
					<u-row gutter="16">
						<u-col span="4">
							<video-item class="large-video" id="1" textPosition="bottom" play-type="mini" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></video-item>
						</u-col>
						<u-col span="4">
							<video-item class="large-video" id="1" textPosition="bottom" play-type="mini" title="[最新] 船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></video-item>
						</u-col>
						<u-col span="4">
							<video-item class="large-video" id="1" textPosition="bottom" play-type="mini" title="[最新] 船员岗位培训进阶教学船员岗位培训进阶教学" :videoStyle="{height: '120rpx'}"></video-item>
						</u-col>
					</u-row>
				</view>
			</view>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	import videoItem from './video-item.vue'
	export default {
		components: {
			homeContainer,
			videoItem
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
