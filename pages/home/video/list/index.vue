<template>
	<view class="video-list-container">
		<!-- <view class="static-search-wrapper">
			<static-search placeholder="搜索你感兴趣的视频"></static-search>
		</view> -->
		<view class="tabs-wrapper">
			<u-tabs :list="list" active-color="#409EFF" :bold="false" :is-scroll="false" :current="current" @change="onChange"></u-tabs>
		</view>
		<view class="list-wrapper" v-show="current === 0">
			<view v-for="item in data" :key="item.vedioId" @tap="onTo(item.vedioId)">
				<video-item :info="item"></video-item>
			</view>
		</view>
		<view class="list-wrapper" v-show="current === 1">
			<view v-for="item in data" :key="item.vedioId" @tap="onTo(item.vedioId)">
				<video-item :info="item"></video-item>
			</view>
		</view>
		<u-loadmore :status="status" />
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
					{ name: '渔民学院1', type: 1 }, { name: '渔民学院2', type: 2 }
				],
				current: 0,
				status: 'loadmore',
				data: [],
				data2: []
			}
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
			this.resetForm()
			this.getList()
		},
		onLoad () {
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tybhrms/tyblessonvideo/page', {
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
			onTo (id) {
				if (id) {
					uni.navigateTo({
						url: `/pages/home/video/detail/index?id=${id}`
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
			padding: 0rpx 10rpx 30rpx;
			.item {
				margin-bottom: 40rpx;
			}
		}
	}
	
</style>
