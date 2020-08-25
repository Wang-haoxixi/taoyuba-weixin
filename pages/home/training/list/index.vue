<template>
	<!-- 培训机构 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view class="search-wrapper">
			<u-search placeholder="搜索" v-model="content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
		</view>
		<view class="dropdown-wrapper" ref="dropdown">
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<trainning-item :info="item" btn-text="查看详情" @to="onTo"></trainning-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import trainningItem from '@/pages/home/index/components/training-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	export default {
		mixins: [pageMixin],
		components: {
			trainningItem,
		},
		data () {
			return {
				status: 'loadmore',
				content: '',
				data: [],
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
		onLoad () {
			this.getList()
		},
		methods: {
			onSearch () {},
			getList () {
				this.$http.get('/tmlms/dept/pageForAll', {
					params: {
						size: this.page.size,
						current: this.page.current
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
					}
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
