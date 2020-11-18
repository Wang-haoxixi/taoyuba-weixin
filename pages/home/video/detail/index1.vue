<template>
	<view class="video-detail-wrapper safe-bottom">
		<view class="video-detail-content">
			<video :src="data.videoSrc" :poster="data.videoImg"></video>
		</view>
		<view class="content-wrapper">
			<view class="title1 title">{{data.vedioName || ''}}</view>
			<view class="people">
				{{data.videoViewerNum || 0}}人学过
			</view>
			<view class="title title1">课程介绍</view>
			<view class="body-wrapper">
				{{data.videoDescript || ''}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: {}
			}
		},
		onLoad (params) {
			if (params.id) {
				this.getList(params.id)
			}
		},
		methods: {
			getList (id) {
				this.$http.get(`/tybhrms/tyblessonvideo/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-detail-wrapper {
		.video-detail-content {
			video {
				width: 100%;
			}
		}
		.content-wrapper {
			color: #999;
			.title {
				height: 88rpx;
				line-height: 88rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 28rpx;
			}
			.title1 {
				color: #333;
			}
			.people {
				font-size: 26rpx;
				padding: 0rpx 30rpx;
			}
			.body-wrapper {
				font-size: 26rpx;
				background-color: #fff;
				padding: 20rpx;
			}
		}
	}
</style>
