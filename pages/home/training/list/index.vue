<template>
	<!-- 培训机构 -->
	<view class="recruit-list-wrapper safe-padding-bottom">
		<view class="search-wrapper">
			<static-search :placeholder="form.deptName || '搜索'" :to="`/pages/home/search/index?type=4&keyword=${form.deptName}`"></static-search>
		</view>
		<view class="dropdown-wrapper" ref="dropdown">
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<trainning-item :info="item" btn-text="详情" @to="onTo"></trainning-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import trainningItem from '@/pages/home/index/components/training-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import staticSearch from '@/pages/home/index/components/search.vue'
	export default {
		mixins: [pageMixin],
		components: {
			trainningItem,
			staticSearch
		},
		data () {
			return {
				status: 'loadmore',
				form: {
					deptName: '',
				},
				data: [],
			}
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
		onLoad (params) {
			if (params.keyword) {
				this.form.deptName = params.keyword
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
				this.$http.get('/tmlms/dept/pageForAll', {
					params: params
				}).then(({ data }) => {
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
			onTo (id) {
				uni.navigateTo({
					url: `/pages/home/training/detail/index?id=${id}`
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.recruit-list-wrapper {
		.search-wrapper {
			padding: 20rpx;
		}
		.dropdown-wrapper {
			// position: sticky;
			// height: 87rpx;
			background-color: #fff;
			position: relative;
			z-index: 10000;
		}
		.content-wrapper {
			margin-top: 0rpx;
			background-color: #fff;
			.item {
				border-bottom: 1px solid #f6f6f6;
			}
		}
	}
</style>
