<template>
	<!-- 求职 -->
	<view class="recruit-list-wrapper">
		<view class="search-wrapper">
			<u-search placeholder="搜索" v-model="content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index" @tap="onTo(item.id)">
				<job-item :info="item" btnText="查看简历">
					<text slot="right">发布人：{{item.publisher}}</text>
				</job-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import jobItem from '@/pages/home/index/components/job-item.vue'
	export default {
		components: {
			jobItem
		},
		data () {
			return {
				status: 'loadmore',
				content: '',
				data: [
					{ id: 1, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ id: 2, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ id: 3, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ id: 4, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ id: 5, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ id: 6, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ id: 7, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ id: 8, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' }
				],
				data1: [
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ title: '船舶维修钳工2', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ title: '船舶维修钳工3', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ title: '船舶维修钳工4', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' }
				],
			}
		},
		onReachBottom() {
			this.status = 'loading';
			setTimeout(() => {
				this.data = this.data.concat(this.data1)
				this.status = 'loading';
			}, 2000)
		},
		methods: {
			onSearch () {},
			getList () {},
			onTo (id) {
				uni.navigateTo({
					url: `/pages/home/resume/detail/index?id=${id}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recruit-list-wrapper {
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		/* #endif */
		.search-wrapper {
			padding: 20rpx;
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
