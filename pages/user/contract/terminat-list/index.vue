<template>
	<view class="user-terminat-list-container safe-padding-bottom">
		<view class="user-terminat-list-wrapper">
			<view class="border" v-for="(item, index) in list" :key="item.id">
				<u-swipe-action :index="index" :show="item.show"
					@content-click="onContentClick(item)"
					@click="onClick"
					:options="options"
					@open="onOpen">
					<view class="terminat-list-item-wrapper">
						<view class="people">接收人：{{item.people}}</view>
						<view class="text">解除原因：{{item.reason}}</view>
						<view class="text">申请时间：{{item.time}}</view>
					</view>
				</u-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				current: -1,
				list: [
					{ id: 1, show: false, people: '国脉海洋', reason: '七天无理由解除', time: '2019.10.20' },
					{ id: 2, show: false, people: '国脉海洋', reason: '七天无理由解除', time: '2019.10.20' },
					{ id: 3, show: false, people: '国脉海洋', reason: '七天无理由解除', time: '2019.10.20' },
					{ id: 4, show: false, people: '国脉海洋', reason: '七天无理由解除', time: '2019.10.20' },
					{ id: 5, show: false, people: '国脉海洋', reason: '七天无理由解除', time: '2019.10.20' },
					{ id: 6, show: false, people: '国脉海洋', reason: '七天无理由解除', time: '2019.10.20' }
				],
				options: [
					{
						text: '同意',
						style: {
							backgroundColor: 'rgba(170, 170, 170, 1)'
						}
					},
					{
						text: '拒绝',
						style: {
							backgroundColor: 'rgba(255, 0, 0, 1)'
						}
					}
				]
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
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.user-terminat-list-container {
		.user-terminat-list-wrapper {
			.border {
				border-bottom: 1px solid #f6f6f6;
			}
			.terminat-list-item-wrapper {
				padding: 30rpx;
				background-color: #fff;
				color: #999;
				font-size: 28rpx;
				.people {
					color: #666;
				}
				.text {
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
