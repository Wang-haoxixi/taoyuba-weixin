<template>
	<scroll-view class="face-boss" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrestore="onRestore"
		:refresher-threshold="70" @refresherrefresh="onRefresh" @scrolltolower="scrolltolower" :lower-threshold="50">
		<view class="user-video-list-container safe-padding-bottom">
			<list-layout :data="data" empty-text="视频学习记录为空" :loading="layoutLoading">
				<view class="video-item-wrapper" v-for="info in data" :key="info.id" @tap="onTo(info)">
					<view class="item-left">
						<u-lazy-load :image="info.videoImg" height="150" img-mode="scaleToFill"></u-lazy-load>
						<view class="finished" v-if="info.leranStamp > 0">完</view>
					</view>
					<view class="item-right">
						<view class="title u-line-1">{{info.vedioName}}</view>
						<view class="text">{{info.leranStamp > 0 ? '已学完' : `已学习了${getVideoTime(info.learnTime)}`}}</view>
					</view>
				</view>
				<u-loadmore :status="status" />
			</list-layout>
		</view>
	</scroll-view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		components: {
			listLayout
		},
		mixins: [pageMixin, userInfoMixin],
		data () {
			return {
				status: 'loadmore',
				layoutLoading: false,
				data: [],
				triggered: false,
			}
		},
		onReady () {
			this.layoutLoading = true
			this.triggered = true
			// this.getList()
		},
		onReachBottom() {
			if (this.page.total > this.page.current * this.page.size) {
				this.status = 'loading'
				this.page.current++
				this.getList()
			} else{
				this.status = 'nomore'
			}
		},
		onPullDownRefresh () {
			this.layoutLoading = true
			this.data = []
			this.page.current = 1
			this.getList()
		},
		methods: {
			scrolltolower (e) {
				if (this.page.total > this.page.current * this.page.size) {
					this.status = 'loading'
					this.page.current++
					this.getList()
				} else{
					this.status = 'nomore'
				}
			},
			onRefresh () {
				this.layoutLoading = true
				this.data = []
				this.page.current = 1
				this.triggered = true
				this.getList()
			},
			getList () {
				this.$http.get('/tybhrms/tybLearnRecord/page', {
					params: {
						size: this.page.size,
						current: this.page.current,
						userId: this.userInfo.userId
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
						if (this.page.total <= this.page.size) {
							this.status = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
					this.triggered = false
					this.layoutLoading = false
				}).catch(() => {
					this.layoutLoading = false
				})
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			getVideoTime (time) {
				let t = Math.floor(+time)
				let format = {
					h: '',
					m: '',
					s: '',
				}
				let h = Math.floor((t / 3600) % 24)
				let m = Math.floor((t / 60) % 60)
				let s = Math.floor(t % 60)
				let result = ''
				if (h) {
					format.h = h < 10 ? '0' + h : h,
					result = result + format.h + ':'
				}
				if (m) {
					format.m = m < 10 ? '0' + m : m,
					result = result + format.m + ':'
				} else {
					result += '00:'
				}
				if (s) {
					format.s = s < 10 ? '0' + s : s,
					result += format.s
				} else {
					result += '00'
				}
				return result ? result : '00:00'
			},
			onTo (row) {
				if (row.videoId) {
					uni.navigateTo({
						url: `/pages/home/video/detail/index?id=${row.videoId}`,
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.face-boss {
		height: 100vh;
		background-color: white;
		padding-top:44px;
		box-sizing: border-box;
	}
	.video-item-wrapper {
		display: flex;
		background-color: #fff;
		padding: 30rpx 30rpx;
		border-bottom: 1px solid #f6f6f6;
		.item-left {
			flex: 0 0 180rpx;
			height: 150rpx;
			overflow: hidden;
			position: relative;
			border-radius: 15rpx;
			.finished {
				position: absolute;
				display: inline-block;
				padding: 5rpx 15rpx;
				color: #fff;
				background-color: #ed748f;
				font-size: 24rpx;
				right: 0;
				top: 0;
				border-bottom-left-radius: 15rpx;
			}
		}
		.item-right {
			flex: 1 1 auto;
			margin-left: 30rpx;
			overflow: hidden;
			color: #999;
			font-size: 28rpx;
			.title {
				color: #666;
				font-size: 30rpx;
			}
			.text {
				margin-top: 70rpx;
				font-size: 26rpx;
			}
		}
		.empty-container {
			padding-top: 100rpx;
		}
	}
</style>
