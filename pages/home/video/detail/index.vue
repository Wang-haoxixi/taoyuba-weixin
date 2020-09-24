<template>
	<view class="video-detail-wrapper phonex-mb">
		<view class="video-detail-content">
			<!-- <video :enable-progress-gesture="false" :show-progress="false" :src="data.videoSrc :poster="data.videoImg"></video> -->
			<!-- 'https://ggkkmuup9wuugp6ep8d.exp.bcevod.com/mda-kgga63nfwb3jqygp/navideo720/mda-kgga63nfwb3jqygp.mp4' -->
			<video
				id="myVideo"
				:initial-time="initialTime"
				@loadedmetadata="onLoadedmetadata"
				@ended="onEnded"
				@timeupdate="onTimeupdate"
				@pause="onPause"
				@play="onPlay"
				:enable-progress-gesture="false"
				:show-progress="true"
				:src="data.videoSrc"
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
		<face-recognition v-model="show" @end="onFaceEnd" :userInfo="userInfo"></face-recognition>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	const TIME = 3 * 60
	const INTERVAL_TIME = 5 * 60
	import faceRecognition from '@/pages/components/face-recognition/index.vue'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		components: {
			faceRecognition
		},
		data () {
			return {
				show: false,
				once: true,
				initialTime: 0,
				time: 0,
				videoContext: null,
				faceTime: TIME, // 活体识别间隔时间
				intervalTime: INTERVAL_TIME, // 间隔记录时间
				data: {},
				videoId: undefined
			}
		},
		onLoad (params) {
			this.videoId = params.id
			if (params.id) {
				this.getUserInfoApi().then(() => {
					if (this.roles[1] === 105) {
						this.getList(params.id)
					} else {
						this.$refs.uToast.show({
							title: '您无权利查看课程培训',
							back: true
						})
					}
				})
			}
			this.faceTime += this.initialTime
			this.intervalTime += this.initialTime
			this.time = this.initialTime
			// console.log('this.faceTime:', this.faceTime, 'this.intervalTime:', this.intervalTime, 'this.time:', this.time)
		},
		onReady (res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onUnload () {
			console.log('onUnload', this.time)
			if (Math.floor(this.time)) {
				this.$http.post('/tybhrms/tybLearnRecord/save', {
					learnTime: this.time,
					userId: this.userInfo.userId,
					videoId: this.videoId,
					idcard: this.userInfo.idCard
				})
			}
		},
		methods: {
			getList (id) {
				this.$http.get(`/tybhrms/tyblessonvideo/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
						this.initialTime = this.data.learnTime || 0
						this.faceTime = +this.faceTime + (+this.initialTime)
						this.intervalTime = +this.intervalTime + (+this.initialTime)
					}
				})
			},
			// 记录学习时间
			setLearnTime () {
				this.$http.post('/tybhrms/tybLearnRecord/save', {
					learnTime: this.time,
					userId: this.userInfo.userId,
					videoId: this.videoId,
					idcard: this.userInfo.idCard
				})
			},
			onPlay (e) {
				if (this.once) {
					this.videoContext.pause()
					this.show = true
					this.once = false
				}
			},
			onEnded (e) {
				this.setLearnTime()
				console.log('onEnded', e)
			},
			onPause (e) {
				console.log('onPause', this.intervalTime, e)
			},
			onTimeupdate (e) {
				let currentTime = e.detail.currentTime
				this.time = currentTime
				// console.log('faceTime:', this.faceTime, 'currentTime:', currentTime, 'intervalTime:', this.intervalTime)
				if (this.faceTime < currentTime) {
					this.videoContext.pause()
					this.faceTime += TIME
					this.intervalTime += INTERVAL_TIME
					this.show = true
					console.log('活体识别时间', currentTime, this.intervalTime)
					return
				}
				if (currentTime > this.intervalTime) {
					this.intervalTime += INTERVAL_TIME
					this.setLearnTime()
					console.log('记录时间', currentTime, this.intervalTime)
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
