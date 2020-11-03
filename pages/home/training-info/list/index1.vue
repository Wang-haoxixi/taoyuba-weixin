<template>
	<view class="training-info-container">
		<view class="search-wrapper">
			<static-search :placeholder="keyword || '搜索'" :to="`/pages/home/search/index?type=5&keyword=${keyword}`"></static-search>
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
	import staticSearch from '@/pages/home/index/components/search.vue'
	import trainingInfoItem from '@/pages/home/index/components/training-info-item.vue'
	export default {
		components: {
			staticSearch,
			trainingInfoItem
		},
		props: {
			data: Array,
			keyword: String
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
