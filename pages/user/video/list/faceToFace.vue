<template>
	<scroll-view style="height: 300px;" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrestore="onRestore"
		:refresher-threshold="70" @refresherrefresh="onRefresh">
		<view class="user-video-list-container safe-padding-bottom">
			<list-layout :data="data" empty-text="面对面教育为空" :loading="layoutLoading">
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
			this.layoutLoading = true
			this.data = []
			this.page.current = 1
			this.getList()
		},
		methods: {
			onRefresh () {
				this.layoutLoading = true
				this.data = []
				this.page.current = 1
				this.getList()
			},
			getList () {
				console.log(this.userInfo)
				this.$http.get('/tmlms/trainMeetSign/myPage', {
					params: {
						size: this.page.size,
						current: this.page.current,
						phone: this.userInfo.phone
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
