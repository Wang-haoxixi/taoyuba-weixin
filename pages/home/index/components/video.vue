<template>
	<view class="video-wrapper">
		<home-container>
			<view class="video-title" slot="header">
				<text class="text">渔民学院</text>
				<!-- <view class="reload" @tap="onReload">
					<u-icon name="reload" size="30"></u-icon>
					<text>换一批</text>
				</view> -->
			</view>
			<view class="video-content" v-if="data.length">
				<u-row gutter="16">
					<u-col span="8">
						<view class="video-content-left">
							<video-item class="large-video" :imageUrl="data[0].videoImg" @tap="onTo(data[0].vedioId)" :title="data[0].vedioName" :videoStyle="{height: '260rpx'}"></video-item>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<view>
								<video-item play-type="mini" :imageUrl="data[1].videoImg" @tap="onTo(data[1].vedioId)" :title="data[1].vedioName" :videoStyle="{height: '120rpx'}"></video-item>
							</view>
							<view style="margin-top: 20rpx;">
								<video-item class="large-video" play-type="mini" :imageUrl="data[2].videoImg"  @tap="onTo(data[2].vedioId)" :title="data[2].vedioName" :videoStyle="{height: '120rpx'}"></video-item>
							</view>
						</view>
					</u-col>
				</u-row>
				<view class="video-content-bottom">
					<u-row gutter="16">
						<u-col span="4">
							<video-item class="large-video" textPosition="bottom" :imageUrl="data[3].videoImg" play-type="mini"  @tap="onTo(data[3].vedioId)" :id="data[3].vedioId" :title="data[3].vedioName" :videoStyle="{height: '120rpx'}"></video-item>
						</u-col>
						<u-col span="4">
							<video-item class="large-video" textPosition="bottom" :imageUrl="data[4].videoImg" play-type="mini"  @tap="onTo(data[4].vedioId)" :id="data[4].vedioId" :title="data[4].vedioName" :videoStyle="{height: '120rpx'}"></video-item>
						</u-col>
						<u-col span="4">
							<video-item class="large-video" textPosition="bottom" :imageUrl="data[5].videoImg" play-type="mini"  @tap="onTo(data[5].vedioId)" :id="data[5].vedioId" :title="data[5].vedioName" :videoStyle="{height: '120rpx'}"></video-item>
						</u-col>
					</u-row>
				</view>
				<view class="more" @tap="onToList('/pages/home/video/list/index')">更多</view>
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
		data () {
			return {
				data: []
			}
		},
		onReady () {
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tybhrms/tyblessonvideo/page', {
					params: {
						size: 6,
						type: 3
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data.records
					}
				})
			},
			onTo (id) {
				if (id) {
					uni.navigateTo({
						url: `/pages/home/video/detail/index1?id=${id}`
					});
				}
			},
			onToList (path) {
				if (path) {
					uni.navigateTo({
						url: path
					});
				}
			},
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
				font-size: 32rpx;
			}
			.reload {
				font-size: 28rpx;
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
		.more {
			text-align: right;
			font-size: 28rpx;
			margin-top: 20rpx;
			padding: 10rpx 30rpx 0;
			border-top: 1px solid #f6f6f6;
			color: $color-blue;
		}
	}
</style>
