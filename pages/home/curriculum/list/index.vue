<template>
	<!-- 培训开课 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view class="search-wrapper">
			<u-search placeholder="搜索" v-model="content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
		</view>
		<view class="dropdown-wrapper" ref="dropdown">
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index" @tap="onTo(item.id)">
				<curriculum-item :info="item"></curriculum-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import curriculumItem from './components/curriculum-item.vue'
	export default {
		components: {
			curriculumItem
		},
		data () {
			return {
				status: 'loadmore',
				content: '',
				data: [
					{ id: 1, title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ id: 2, title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ id: 3, title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ id: 4, title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ id: 5, title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ id: 6, title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ id: 7, title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 }
				],
				data1: [
					{ title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 },
					{ title: '东方培训机构', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: 30 }
				],
			}
		},
		onLoad () {
			console.log('dropdown', this.$refs.dropdown)
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
					url: `/pages/home/curriculum/detail/index?id=${id}`
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
