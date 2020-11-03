<template>
	<!-- 培训机构 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view class="search-wrapper">
			<static-search :placeholder="keyword || '搜索'" :to="`/pages/home/search/index?type=4&keyword=${keyword}`"></static-search>
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
	import staticSearch from '@/pages/home/index/components/search.vue'
	export default {
		props: {
			data: Array,
			keyword: String
		},
		components: {
			trainningItem,
			staticSearch
		},
		methods: {
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
