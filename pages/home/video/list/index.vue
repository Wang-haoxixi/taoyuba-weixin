<template>
	<view class="video-list-container safe-padding-bottom">
		<!-- <view class="static-search-wrapper">
			<static-search placeholder="搜索你感兴趣的视频"></static-search>
		</view> -->
		<view class="tabs-wrapper">
			<u-tabs :list="list" active-color="#409EFF" :bold="false" :is-scroll="false" :current="current" @change="onChange"></u-tabs>
		</view>
		<view v-show="current === 0">
			<view class="list-wrapper">
				<view v-for="item in data" :key="item.vedioId" @tap="onTo(item.vedioId, 'test')">
					<video-item :info="item"></video-item>
				</view>
			</view>
			<view class="loadmore">
				<u-loadmore :status="status" bg-color="#f6f6f6"/>
			</view>
		</view>
		<view v-show="current === 1">
			<view class="list-wrapper" >
				<view v-for="item in data1" :key="item.vedioId" @tap="onTo(item.vedioId, 'test')">
					<video-item :info="item"></video-item>
				</view>
			</view>
			<view class="loadmore">
				<u-loadmore :status="status1" bg-color="#f6f6f6"/>
			</view>
		</view>
		<view v-show="current === 2">
			<view class="list-wrapper">
				<view v-for="item in data2" :key="item.vedioId" @tap="onTo(item.vedioId)">
					<video-item :info="item"></video-item>
				</view>
			</view>
			<view class="loadmore">
				<u-loadmore :status="status" bg-color="#f6f6f6"/>
			</view>
		</view>
	</view>
</template>

<script>
	import staticSearch from '@/pages/home/index/components/search.vue'
	import videoItem from './components/video-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	export default {
		components: {
			staticSearch,
			videoItem
		},
		mixins: [pageMixin],
		data () {
			return {
				list: [
					{ name: '课程培训', type: 2 }, { name: '安全教育', type: 1 }, { name: '渔业知识', type: 3 }
				],
				current: 0,
				status: 'loadmore',
				status1: 'loadmore',
				data: [],
				data1: [],
				page1: {
					total: 0,
					current: 1,
					size: 10
				},
				data2: [],
				page2: {
					total: 0,
					current: 1,
					size: 10
				}
			}
		},
		onReachBottom() {
			if (this.current === 0) {
				if (this.page1.total > this.page1.current * this.page1.size) {
					this.status1 = 'loading'
					this.page1.current++
					this.getList1()
				} else {
					this.status1 = 'nomore'
				}
			} else if (this.current === 0) {
				if (this.page2.total > this.page2.current * this.page2.size) {
					this.status2 = 'loading'
					this.page2.current++
					this.getList2()
				} else {
					this.status1 = 'nomore'
				}
			}else {
				if (this.page.total > this.page.current * this.page.size) {
					this.status = 'loading'
					this.page.current++
					this.getList()
				} else {
					this.status = 'nomore'
				}
			}
		},
		onPullDownRefresh () {
			if (this.current === 0) {
				this.data = []
				this.page.current = 1
				this.getList()
			} else if (this.current === 1) {
				this.data1 = []
				this.page1.current = 1
				this.getList1()
			} else {
				this.data2 = []
				this.page2.current = 1
				this.getList2()
			}
			
		},
		onLoad () {
			this.getList()
			this.getList1()
			this.getList2()
		},
		methods: {
			getList2 () {
				this.$http.get('/tybhrms/tyblessonvideo/page', {
					params: {
						size: this.page1.size,
						current: this.page1.current,
						type: 3
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data2 = this.data2.concat(result.records)
						this.page2.total = result.total
						if (this.page2.total <= this.page2.size) {
							this.status2 = 'nomore'
						}
						if (this.page2.total === this.data2.length) {
							this.status2 = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			getList1 () {
				this.$http.get('/tybhrms/tyblessonvideo/page', {
					params: {
						size: this.page1.size,
						current: this.page1.current,
						type: 1
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data1 = this.data1.concat(result.records)
						this.page1.total = result.total
						if (this.page1.total <= this.page1.size) {
							this.status1 = 'nomore'
						}
						if (this.page1.total === this.data1.length) {
							this.status1 = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			getList () {
				this.$http.get('/tybhrms/tyblessonvideo/page', {
					params: {
						size: this.page.size,
						current: this.page.current,
						type: 2
					}
				}).then(({ data }) => {
					console.log('list..', data)
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
						if (this.page.total <= this.page.size) {
							this.status = 'nomore'
						}
						if (this.page.total === this.data.length) {
							this.status = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			onTo (id, name) {
				if (id) {
					uni.navigateTo({
						url: name ? `/pages/home/video/detail/index?id=${id}` : `/pages/home/video/detail/index1?id=${id}`
						// url: `/pages/home/video/detail/index1?id=${id}`
					});
				}
			},
			onChange (index) {
				this.current = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-list-container {
		.static-search-wrapper {
			padding: 20rpx 20rpx;
			background-color: #f8f8f8;
		}
		.tabs-wrapper {
			border-bottom: 1px solid #f6f6f6;
		}
		.list-wrapper {
			background-color: #fff;
			// padding: 0rpx 10rpx 30rpx;
			.item {
				margin-bottom: 40rpx;
			}
		}
		.loadmore {
			margin-top: 20rpx;
		}
	}
</style>
