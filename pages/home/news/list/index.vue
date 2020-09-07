<template>
	<view class="news-list-detail-container phonex-mb">
		<view class="news-list-content">
			<view v-for="item in data" :key="item.articleId" @tap="onTo(item)">
				<news-item :info="item"></news-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import newsItem from './components/news-item.vue'
	export default {
		components: {
			newsItem
		},
		mixins: [pageMixin],
		data () {
			return {
				status: 'loadmore',
				data: []
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
			this.getList()
		},
		onLoad () {
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tybhrms/tybarticle/page', {
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
			onTo (row) {
				if (row.isDispatch) {
					if (row.httpSrc) {
						uni.navigateTo({
							url: `/pages/base/web?src=${row.httpSrc}`
						})
					}
				} else {
					uni.navigateTo({
						url: `/pages/home/news/detail/index?id=${row.articleId}`
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.news-list-detail-container {
		background-color: #fff;
	}
</style>
