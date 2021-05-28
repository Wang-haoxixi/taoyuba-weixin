<template>
	<view class="training-info-container">
		<view class="search-wrapper">
			<view class="search-wrapper-title" @click="show = true">
				<view>{{ active }}</view>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="search-wrapper-search">
				<static-search :placeholder="keyword || '搜索'" :to="`/pages/home/search/index?type=5&keyword=${keyword}&active=${active}`"></static-search>
			</view>
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<training-info-item :info="item" v-if="active === '在线教育'"></training-info-item>
				<detail :info="item" v-else></detail>
			</view>
		</view>
		<view class="loadmore">
			<u-loadmore :status="status" bg-color="#f6f6f6"/>
		</view>
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import staticSearch from '@/pages/home/index/components/search.vue'
	import trainingInfoItem from '@/pages/home/index/components/training-info-item.vue'
	import detail from '../detail/training-info-item.vue'
	export default {
		components: {
			staticSearch,
			trainingInfoItem,
			detail
		},
		props: {
			data: Array,
			keyword: String,
			activeType: Boolean,
		},
		data () {
			return {
				active: '在线教育',
				show: false,
				list: [
					{
						value: true,
						label: '面对面教育'
					},
					{
						value: false,
						label: '在线教育'
					}
				],
			}
		},
		onReady () {
			if( this.activeType ){
				this.active = '面对面教育'
			}else{
				this.active = '在线教育'
			}
		},
		methods: {
			confirm (e) {
				console.log(e)
				this.$emit('setactive',e[0].value)
				this.active = e[0].label
			},
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
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #4f4f4f;
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
