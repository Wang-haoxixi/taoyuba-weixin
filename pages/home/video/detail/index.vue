<template>
	<view class="video-detail-wrapper safe-bottom">
		<view class="video-detail-content">
			<!-- <video :enable-progress-gesture="false" :show-progress="false" :src="data.videoSrc :poster="data.videoImg"></video> -->
			<!-- 'https://ggkkmuup9wuugp6ep8d.exp.bcevod.com/mda-kgga63nfwb3jqygp/navideo720/mda-kgga63nfwb3jqygp.mp4' -->
			<video
				v-if="!show"
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
		<view class="content-wrapper" v-if="!show">
			<view class="title1 title">{{data.vedioName || ''}}</view>
			<view class="people">
				{{data.videoViewerNum || 0}}人学过
			</view>
			<view class="title title1">课程介绍</view>
			<view class="body-wrapper">
				{{data.videoDescript || ''}}
			</view>
		</view>
		<face-recognition ref="face" v-model="show" @end="onFaceEnd" :userInfo="userInfo" :isFirst="isFirst"></face-recognition>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	// const TIME = 3 * 60
	const TIME = 10
	const INTERVAL_TIME = 2 * 60
	// import faceRecognition from '../components/face-recognition/index.vue'
	// import faceRecognition from '@/pages/components/face-recognition/index.vue'
	import faceRecognition from '../components/face-recognition/indexFace.vue'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		components: {
			faceRecognition
		},
		data () {
			return {
				show: false,
				initialTime: 0,  // 指定视频初始播放位置，单位为秒（s）。
				time: 0,
				videoContext: null,
				faceTime: TIME, // 活体识别间隔时间
				intervalTime: INTERVAL_TIME, // 间隔记录时间
				data: {},
				videoId: undefined,
				isFirst: false,
				closeFace: false
			}
		},
		onLoad (params) {
			console.log('params..',params)
			this.videoId = params.id
			if (params.id) {
				this.getList(params.id)
				// this.getUserInfoApi().then(() => {
					// this.getList(params.id)
					// if (this.roles.includes(this.rolesType.crew.type)) {
					// 	this.getList(params.id)
					// } else {
					// 	this.$refs.uToast.show({
					// 		title: '请确认您的身份是船员',
					// 		back: true
					// 	})
					// }
				// }).catch(() => {
				// 	setTimeout(() => {
				// 		uni.navigateBack({
				// 			delta: 1
				// 		})
				// 	}, 1000)
				// })
			} else {
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
			// this.getList(params.id)
			this.faceTime += this.initialTime  // 180+0
			this.intervalTime += this.initialTime
			this.time = this.initialTime
			console.log('this.faceTime:', this.faceTime, 'this.intervalTime:', this.intervalTime, 'this.time:', this.time)
		},
		onReady (res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onUnload () {
			// console.log('onUnload', this.time)
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
				this.$http.get(`/tybhrms/tyblessonvideo/details/${id}`).then(({ data }) => {
					console.log('/tybhrms/tyblessonvideo/details...', data)
					if (data.code === 0) {
						this.data = data.data
						this.initialTime = this.data.learnTime || 0 //已经学习的时间
						this.faceTime = +this.faceTime + (+this.initialTime)  //活体识别间隔时间  180  
						console.log('faceTime..',this.faceTime)
						this.intervalTime = +this.intervalTime + (+this.initialTime)  //间隔记录时间  0
						console.log('intervalTime..',this.intervalTime)
						this.closeFace = this.data.leranStamp > 0
						console.log('closeFace..',this.closeFace)
						// if(this.videoContext){
						// 	this.videoContext.pause()
						// }
						// this.roles.includes(this.rolesType.crew.type) &&
						if (!this.closeFace) {
							this.$http.get(`/admin/user/details/${this.userInfo.username}`).then(({ data }) => {
								console.log('/admin/user/details..', data)
								if (data.code === 0) {
									let facePhoto = data.data.facePhoto
									if (facePhoto === '' || facePhoto == null) {
										this.isFirst = true
									}
									this.show = true
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}).catch((err) => {
								uni.navigateBack({
									delta: 1
								})
							})
							
						} else {
							this.show = false
						}
					}
				}).catch(() => {
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
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
			endSubmit () {
				this.$http.post('/tybhrms/tybLearnRecord/save', {
					learnTime: this.time,
					userId: this.userInfo.userId,
					videoId: this.videoId,
					idcard: this.userInfo.idCard,
					leranStamp: this.time
				}).then(() => {
					this.closeFace = true
				})
			},
			onPlay (e) {
				
			},
			// 当播放到末尾时触发
			onEnded (e) {
				this.endSubmit()
				if (!this.closeFace) {
					console.log('onEnded', e)
				}
			},
			// 当暂停播放时触发
			onPause (e) {
				console.log('onPause', this.intervalTime, e)
			},
			// 播放进度变化时触发
			onTimeupdate (e) {
				// console.log(e)
				let currentTime = e.detail.currentTime
				// console.log(currentTime)
				this.time = currentTime
				console.error(this.time);
				// this.roles.includes(this.rolesType.crew.type) && 
				if (!this.closeFace) {
					if (this.faceTime < currentTime) {
						this.videoContext.exitFullScreen()
						this.videoContext.pause()
						this.faceTime += TIME
						this.intervalTime += INTERVAL_TIME
						this.show = true
						// this.$refs.face.takePhoto()
						this.setLearnTime()
						// console.log('活体识别时间', currentTime, this.intervalTime)
						return
					}
				}
				// console.error(this.intervalTime);
				// console.error(currentTime)
				if (currentTime > this.intervalTime) {
					this.intervalTime += INTERVAL_TIME
					this.setLearnTime()
					console.log('记录时间', currentTime, this.intervalTime)
				}
			},
			onFaceEnd () {
				let time = this.time;
				console.error("faceend:"+time)
				console.log('onFaceEnd...')
				this.show = false
				// this.$nextTick(function(){
					this.initialTime = time;
					this.videoContext.play()
				// })
			},
			// 视频元数据加载完成时触发
			onLoadedmetadata (e) {
				console.log('onLoadedmetadata...',e.detail)
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
