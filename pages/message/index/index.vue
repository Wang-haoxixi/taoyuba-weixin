<template>
	<view class="page-bottom message-container phonex-mb">
		<!-- 菜单 -->
		<view class="header-wrapper">
			<message-menu @choose="onChoose"></message-menu>
		</view>
		
		<!-- 系统消息 -->
		<!-- <message-list title="最新系统消息" :list="data1"></message-list> -->
		<view class="" style="height: 190rpx;">
			
		</view>
		<view class="content-wrapper">
			<list-layout :data="data" empty-text="暂无消息" :loading="false">
				<view class="list-wrapper">
					<view class="content-wrapper">
						<u-cell-item :value="item.time" v-for="(item, index) in data" :key="index" @tap="onTo(item)">
							<view slot="title" class="content u-line-1">{{item.name}}
								<u-badge :is-dot="true" type="error" class="dot" v-if="item.isRead === '0'"></u-badge>
							</view>
						</u-cell-item>
					</view>
				</view>
				<u-loadmore :status="status" />
			</list-layout>
		</view>
		<tyb-tarbar :current-index="3"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	// import messageList from './components/list.vue'
	import messageMenu from './components/menu.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	export default {
		mixins: [pageMixin],
		components: {
			tybTarbar,
			messageMenu,
			// messageList,
			listLayout
		},
		data () {
			return {
				status: 'loadmore',
				data: [
					// { id: 1, content: '您的申请已通过您的申请已通过您的申请已通过', time: '2019.01.01' },
					// { id: 2, content: '您的申请已通过', time: '2019.01.01', dot: true },
					// { id: 3, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 4, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 3, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 4, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 3, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 4, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 3, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 4, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 3, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 4, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 3, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 4, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 3, content: '您的申请已通过', time: '2019.01.01' },
					// { id: 4, content: '您的申请已通过', time: '2019.01.01' }
				],
				type: 1
			}
		},
		onReachBottom() {
			if (this.page.total > this.page.current * this.page.size) {
				this.status = 'loading'
				this.page.current++
				this.getList()
			} else{
				this.status = 'nomore'
			}
		},
		onShow () {
			if (this.data.length === 0) {
				this.page.current = 1
				this.page.total = 0
				this.status = 'loading'
				this.getList()
			}
		},
		watch: {
			type () {
				this.data = []
				this.page.current = 1
				this.page.total = 0
				this.status = 'loading'
			}
		},
		methods: {
			onTo (row) {
				row.isRead = '1'
				uni.navigateTo({
					url: `/pages/message/detail/index?id=${row.id}`
				})
			},
			getList () {
				// return
				this.$http.get('/tmlms/sysMsg/page', {
					params: {
						size: this.page.size,
						current: this.page.current,
						type: this.type
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
						if (this.page.total <= this.page.size) {
							this.status = 'nomore'
						}
					}
				})
			},
			onChoose (row) {
				if (this.type === row.type) {
					return
				}
				this.type = row.type
				this.getList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.message-container {
		.header-wrapper {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			z-index: 10;
		}
		.content-wrapper {
			// margin-top: 190rpx;
		}
	}
	.list-wrapper {
		.title {
			line-height: 88rpx;
			font-size: 28rpx;
			padding: 0 20rpx;
			color: #999;
		}
		.content-wrapper {
			background-color: #fff;
		}
		.content {
			display: inline-block;
			max-width: 400rpx;
			position: relative;
			padding-right: 20rpx;
			color: #999;
			font-size: 28rpx;
			.dot {
				position: absolute;
				top: -20rpx;
				right: -10rpx;
			}
		}
	}
</style>
