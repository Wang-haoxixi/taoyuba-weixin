<template>
	<view class="page-bottom message-container safe-bottom">
		<template v-if="!showLoginBtn">
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
							<template v-if="name === 'message'">
								<u-cell-item :value="item.time" v-for="(item, index) in data" :key="index" @tap="onTo(item)">
									<view slot="title" class="content u-line-1">
									{{item.name}}
										<u-badge :is-dot="true" type="error" class="dot" v-if="item.isRead === '0'"></u-badge>
									</view>
								</u-cell-item>
							</template>
							<template v-else-if="name === 'notification'">
								<u-cell-item :value="item.time" v-for="(item, index) in data" :key="index" @tap="onTo(item)">
									<view slot="title" class="content u-line-1">
										{{item.bulletinTitle}}
										<u-badge :is-dot="true" type="error" class="dot" v-if="item.isRead === '0' && this.type"></u-badge>
									</view>
								</u-cell-item>
							</template>
						</view>
					</view>
					<u-loadmore :status="status" />
				</list-layout>
			</view>
		</template>
		<template v-else>
			<no-login/>
		</template>
		<tyb-tarbar :current-index="3"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	// import messageList from './components/list.vue'
	import messageMenu from './components/menu.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	import noLogin from '@/pages/components/noLogin/index1.vue'
	import { isLogin } from '@/common/utils/login.js'
	export default {
		mixins: [pageMixin],
		components: {
			tybTarbar,
			messageMenu,
			// messageList,
			listLayout,
			noLogin
		},
		data () {
			return {
				showLoginBtn: true,
				status: 'loadmore',
				data: [],
				type: 1,
				name: 'message',
				path: '/pages/message/detail/index'
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
			isLogin().then(data => {
				if (data) {
					if (this.data.length === 0) {
						this.page.current = 1
						this.page.total = 0
						this.status = 'loading'
						this.getList()
					}
					this.showLoginBtn = false
				} else{
					this.showLoginBtn = true
				}
			})
		},
		onHide () {
			this.page.current = 1
			this.page.total = 0
			this.status = 'loading'
			this.data = []
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
				console.log(`${this.path}?id=${row.id}`)
				uni.navigateTo({
					url: `${this.path}?id=${row.id}`
				})
				// if (this.name === 'notification') {
				// 	uni.navigateTo({
				// 		url: `/pages/message/notification/detail/index?id=${row.id}`
				// 	})
				// } else if (this.name === 'message') {
				// 	uni.navigateTo({
				// 		url: `/pages/message/detail/index?id=${row.id}`
				// 	})
				// }
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
			getNotificationList () {
				this.$http.get('/tmlms/bulletin/getPage', {
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
				this.name = row.name
				this.path = row.path
				if (this.type) {
					this.getList()
				} else {
					this.getNotificationList()
				}
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
