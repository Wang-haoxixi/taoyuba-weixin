<template>
	<view class="news-list-detail-container safe-bottom">
		<view class="search-wrapper">
			<static-search :placeholder="form.title || '搜索'" :to="`/pages/home/search/index?type=0&keyword=${form.title}`"></static-search>
		</view>
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
	import newsItem from '@/pages/home/index/components/news-item.vue'
	import staticSearch from '@/pages/home/index/components/search.vue'
	export default {
		components: {
			newsItem,
			staticSearch
		},
		mixins: [pageMixin],
		data () {
			return {
				status: 'loadmore',
				form: {
					title: '',
					type: undefined
				},
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
		onLoad (params) {
			if (params.keyword) {
				this.form.title = params.keyword
			}
				
			if (params.type) {
				this.form.type = params.type
			}
			this.getList()
		},
		onUnload () {
			uni.navigateBack({delta: 1})
			// uni.switchTab({
			// 	url: '/pages/home/index/index'
			// })
		},
		methods: {
			getList () {
				let params = Object.assign({
						size: this.page.size,
						current: this.page.current
					}, this.form)
				this.$http.get('/tybhrms/tybarticle/page', {
					params: params
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
		.search-wrapper {
			padding: 20rpx;
		}
		.news-list-content {
			background-color: #fff;
		}
	}
</style>
