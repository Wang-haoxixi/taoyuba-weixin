<template>
	<view class="user-video-list-container">
		<view class="video-item-wrapper" v-for="info in data" :key="info.id" @tap="onTo(info)">
			<view class="item-left">
				<u-lazy-load :image="info.videoImg" height="150" img-mode="scaleToFill"></u-lazy-load>
			</view>
			<view class="item-right">
				<view class="title u-line-1">{{info.vedioName}}</view>
				<view class="text">已学习了{{getVideoTime(info.learnTime)}}</view>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	export default {
		mixins: [pageMixin],
		data () {
			return {
				status: 'loadmore',
				data: []
			}
		},
		onReady () {
			this.getList()
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
			this.data = []
			this.page.current = 1
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tybhrms/tybLearnRecord/page', {
					params: {
						size: this.page.size,
						current: this.page.current
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
				})
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
				}
				if (s) {
					format.s = s < 10 ? '0' + s : s,
					result += format.s
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
	.video-item-wrapper {
		display: flex;
		background-color: #fff;
		padding: 30rpx 30rpx;
		border-bottom: 1px solid #f6f6f6;
		.item-left {
			flex: 0 0 180rpx;
			height: 150rpx;
			overflow: hidden;
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
			}
		}
	}
</style>
