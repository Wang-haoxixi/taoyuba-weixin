<template>
	<!-- 招聘 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view style="position: fixed;top: 0;left: 0;right: 0;background-color: #f6f6f6;z-index: 20;">
			<view class="search-wrapper">
				<u-search placeholder="搜索" v-model="form.content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
			</view>
			<view class="dropdown-wrapper">
				<u-dropdown>
					<u-dropdown-item v-model="form.value1" title="职务" :options="options1" @change="(value) => {onChangeDrowdown('value1', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.value2" title="薪水" :options="options2" @change="(value) => {onChangeDrowdown('value2', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.value3" title="作业" :options="options3" @change="(value) => {onChangeDrowdown('value3', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.value4" title="排序" :options="options4" @change="(value) => {onChangeDrowdown('value4', value)}"></u-dropdown-item>
				</u-dropdown>
			</view>
		</view>
		
		<view class="content-wrapper" id="contentWrapper">
			<view class="item" v-for="(item, index) in data" :key="index" @tap="onTo(item.id)">
				<job-item :info="item"></job-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import jobItem from '@/pages/home/index/components/job-item.vue'
	export default {
		components: {
			jobItem,
		},
		data () {
			return {
				status: 'loadmore',
				options1: [
					{ label: '职务1', value: 1 },
					{ label: '职务2', value: 2 },
					{ label: '职务3', value: 3 }
				],
				options2: [
					{ label: '薪水1', value: 1 },
					{ label: '薪水2', value: 2 },
					{ label: '薪水3', value: 3 }
				],
				options3: [
					{ label: '作业1', value: 1 },
					{ label: '作业2', value: 2 },
					{ label: '作业3', value: 3 }
				],
				options4: [
					{ label: '正序', value: 1 },
					{ label: '倒叙', value: 2 }
				],
				form: {
					content: '',
					value1: 1,
					value2: 1,
					value3: 1,
					value4: 1
				},
				data: [
					{ id: 1, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 2, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 3, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 4, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 5, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 6, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 7, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 8, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 9, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 10, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' }
				],
				data1: [
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' }
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
					url: `/pages/home/recruit/detail/index?id=${id}`
				});
			},
			onChangeDrowdown (label, value) {
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.data = [{ id: 1, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 2, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 3, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 4, title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' }]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recruit-list-wrapper {
		.search-wrapper {
			padding: 20rpx;
		}
		.dropdown-wrapper {
			background-color: #fff;
			height: 80rpx;
			.dropdown-ref {
				background-color: #fff;
				top: 0;
				left: 0;
				right: 0;
				z-index: 10;
				::v-deep.__content {
					height: 100vh;
				}
			}
		}
		.content-wrapper {
			// margin-top: 0rpx;
			margin-top: 184rpx;
			background-color: #fff;
			.item {
				border-bottom: 1px solid #f6f6f6;
			}
		}
	}
</style>
