<template>
	<view class="video-detail-wrapper phonex-mb">
		<view class="video-detail-content">
			<!-- <video :enable-progress-gesture="false" :show-progress="false" :src="data.videoSrc :poster="data.videoImg"></video> -->
			<video
				id="myVideo"
				:initial-time="initialTime"
				@loadedmetadata="onLoadedmetadata"
				@ended="onEnded"
				@timeupdate="onTimeupdate"
				@pause="onPause"
				:enable-progress-gesture="false"
				:show-progress="true"
				:src="'https://ggkkmuup9wuugp6ep8d.exp.bcevod.com/mda-kgga63nfwb3jqygp/navideo720/mda-kgga63nfwb3jqygp.mp4'"
				:poster="data.videoImg"></video>
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
		<face-recognition v-model="show" @end="onFaceEnd"></face-recognition>
	</view>
</template>

<script>
	const TIME = 10
	import faceRecognition from '@/pages/components/face-recognition/index.vue'
	export default {
		components: {
			faceRecognition
		},
		data () {
			return {
				show: false,
				initialTime: 0,
				videoContext: null,
				faceTime: TIME,
				data: {}
			}
		},
		onLoad (params) {
			if (params.id) {
				this.getList(params.id)
			}
			this.faceTime += this.initialTime
		},
		onReady: function (res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			getList (id) {
				this.$http.get(`/tybhrms/tyblessonvideo/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			},
			onEnded () {},
			onPause () {},
			onTimeupdate (e) {
				let currentTime = e.detail.currentTime
				if (this.faceTime < currentTime) {
					this.videoContext.pause()
					this.faceTime += TIME
					this.show = true
				}
			},
			onFaceEnd () {
				this.videoContext.play()
				this.show = false
			},
			onLoadedmetadata (e) {
				console.log(e.detail)
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
