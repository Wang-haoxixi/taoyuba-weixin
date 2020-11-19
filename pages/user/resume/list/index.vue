<template>
	<view class="user-resume-list safe-padding-bottom">
		<view class="item" v-for="(item, index) in list" :key="item.id" >
			<u-swipe-action :index="index" :show="item.show"
				@content-click="onContentClick(item)"
				@click="onClick"
				:options="options"
				@open="onOpen"
				>
				<job-item :info="item" hide-btn></job-item>
			</u-swipe-action>
		</view>
		<u-modal v-model="showModal" content="确定删除吗" :show-title="false" @confirm="onConfirm"></u-modal>
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
				showModal: false,
				list: [
					{ id: 1, show: false, title: '船舶维修钳工1', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 2, show: false, title: '船舶维修钳工2', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 3, show: false, title: '船舶维修钳工3', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 4, show: false, title: '船舶维修钳工4', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 5, show: false, title: '船舶维修钳工5', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ id: 6, show: false, title: '船舶维修钳工6', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' }
				],
				options: [
					{
						text: '编辑',
						style: {
							backgroundColor: 'rgba(170, 170, 170, 1)'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: 'rgba(255, 0, 0, 1)'
						}
					}
				],
				current: -1
			}
		},
		methods: {
			onClick (index, index1) {
				if (index1 === 1) {
					this.current = index
					this.showModal = true
				} else {
					this.current = -1
					this.list[index].show = false
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			onOpen (index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false
				})
				this.current = -1
			},
			onConfirm () {
				if (this.current !== -1) {
					this.list.splice(this.current, 1)
					this.$u.toast(`删除成功`)
				}
			},
			// 点击内容时触发
			onContentClick (row) {
				uni.navigateTo({
					url: `/pages/home/resume/detail/index?id=${row.id}`
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.user-resume-list {
		.item {
			border-bottom: 1px solid #f6f6f6;
		}
	}
</style>
