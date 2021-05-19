<template>
	<scroll-view class="face-boss" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrestore="onRestore"
		:refresher-threshold="70" @refresherrefresh="onRefresh" @scrolltolower="scrolltolower" :lower-threshold="50">
		<view class="user-video-list-container safe-padding-bottom">
			<list-layout :data="data" empty-text="面对面教育培训" :loading="layoutLoading">
				<view class="video-item-wrapper" v-for="info in data" :key="info.id" @tap="onTo(info.id)">
					<view class="face-main">
						<view class="face-meetName">{{ info.meetName }}</view>
						<view class="face-time"><u-icon name="clock" size="28" color="#999999" style="margin-right: 10rpx"></u-icon>{{ info.signInTime || '暂无' }} - {{ info.signOutTime || '暂无' }}</view>
						<view class="face-address">
							<view>
								<u-icon name="map" size="28" color="#999999" style="margin-right: 10rpx"></u-icon>
								{{ info.address }}
							</view>
							<view>
								<view v-if="info.signInTime" class="face-sin">已签到</view>
								<view v-if="info.signOutTime" class="face-out">已签退</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" :margin-top="30" :margin-bottom="30"/>
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
				this.getList()
			},
			getList () {
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
				uni.navigateTo({
					url: `/pages/user/video/list/faceToFaceDetail?id=${row}`,
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-load-more-wrap {
		padding: 30rpx 0;
	}
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
		.face-address {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #999999;
			font-weight: 300;
		}
		.face-main {
			width: 100%;
		}
		.face-meetName {
			font-size: 38rpx;
		}
		.face-time {
			color: #999999;
			padding: 15rpx 0;
			font-weight: 300;
		}
		.face-sin {
			display: inline-block;
			padding: 0 20rpx;
			background: #F9F9F9;
			height: 50rpx;
			color: #999999;
			line-height: 50rpx;
			margin-right: 10rpx;
		}
		.face-out {
			display: inline-block;
			padding: 0 20rpx;
			background: rgba(24, 100, 177, 0.1);
			height: 50rpx;
			color: #1864B1;
			line-height: 50rpx;
		}
	}
</style>
