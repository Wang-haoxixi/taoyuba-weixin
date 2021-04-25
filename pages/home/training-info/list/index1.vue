<template>
	<view class="training-info-container">
		<view class="search-wrapper">
			<view class="search-wrapper-title">
				
			</view>
			<view class="search-wrapper-search">
				<static-search :placeholder="keyword || '搜索'" :to="`/pages/home/search/index?type=5&keyword=${keyword}`"></static-search>
			</view>
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<training-info-item :info="item"></training-info-item>
			</view>
		</view>
		<view class="loadmore">
			<u-loadmore :status="status" bg-color="#f6f6f6"/>
		</view>
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		.search-wrapper-title {
			width: 30%;
			height: 65rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
			opacity: 1;
			border-radius: 3px;
		}
		.search-wrapper-search {
			width: 65%;
		}
	}
	.content-wrapper {
		.item {
			border-bottom: 1px solid #f6f6f6;
		}
	}
</style>
