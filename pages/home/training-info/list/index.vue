<template>
	<view class="training-info-container">
		<view class="search-wrapper">
			<static-search :placeholder="form.title || '搜索'" :to="`/pages/home/search/index?type=5&keyword=${form.title}`"></static-search>
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<training-info-item :info="item"></training-info-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import staticSearch from '@/pages/home/index/components/search.vue'
	import trainingInfoItem from '@/pages/home/index/components/training-info-item.vue'
	export default {
		components: {
			staticSearch,
			trainingInfoItem
		},
		mixins: [pageMixin],
		data () {
			return {
				status: 'loadmore',
				form: {
					title: ''
				},
				data: []
			}
		},
		onLoad (params) {
			if (params.keyword) {
				this.form.title = params.keyword
			}
			this.getList()
		},
		onUnload () {
			uni.navigateBack({delta: 1})
			// uni.switchTab({
			// 	url: '/pages/home/index/index'
			// })
		},
		onPullDownRefresh () {
			this.data = []
			this.page.current = 1
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
		methods: {
			getList () {
				this.$http.get('/tybhrms/tybarticle/page', {
					params: {
						size: this.page.size,
						current: this.page.current,
						title: this.form.title,
						type: 8
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-wrapper {
		padding: 20rpx;
	}
	.content-wrapper {
		.item {
			border-bottom: 1px solid #f6f6f6;
		}
	}
</style>
