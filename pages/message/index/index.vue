<template>
	<view class="page-bottom message-container">
		<!-- 菜单 -->
		<view class="header-wrapper">
			<message-menu @choose="onChoose"></message-menu>
		</view>
		
		<!-- 系统消息 -->
		<!-- <message-list title="最新系统消息" :list="data1"></message-list> -->
		<view class="content-wrapper">
			<message-list :list="data"></message-list>
		</view>
		<tyb-tarbar :current-index="3"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	import messageList from './components/list.vue'
	import messageMenu from './components/menu.vue'
	import pageMixin from '@/pages/mixins/page.js'
	export default {
		mixins: [pageMixin],
		components: {
			tybTarbar,
			messageMenu,
			messageList
		},
		data () {
			return {
				status: 'loadmore',
				data: [
					{ id: 1, content: '您的申请已通过您的申请已通过您的申请已通过', time: '2019.01.01' },
					{ id: 2, content: '您的申请已通过', time: '2019.01.01', dot: true },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' }
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
		onLoad () {
			this.getList()
		},
		methods: {
			getList () {
				return
				this.$http.get('', {
					params: {
						size: this.page.size,
						current: this.page.current
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
			margin-top: 190rpx;
		}
	}
	
</style>
