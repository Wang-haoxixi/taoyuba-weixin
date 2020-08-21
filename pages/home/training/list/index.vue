<template>
	<!-- 培训机构 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view class="search-wrapper">
			<u-search placeholder="搜索" v-model="content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
		</view>
		<view class="dropdown-wrapper" ref="dropdown">
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index" @tap="onTo(item.id)">
				<trainning-item :info="item" btn-text="查看详情">
					<text slot="right">联系人：{{item.publisher}}</text>
				</trainning-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import trainningItem from '@/pages/home/index/components/training-item.vue'
	export default {
		components: {
			trainningItem,
		},
		data () {
			return {
				status: 'loadmore',
				content: '',
				data: [
					{ id: 1, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 2, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 3, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 4, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 5, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 6, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 7, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 8, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' }
				],
				data1: [
					{ title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' }
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
