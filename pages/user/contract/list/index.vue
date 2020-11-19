<template>
	<view class="user-contract-container safe-padding-bottom">
		<!-- <template v-if="data.length">
			<view class="">
				<contract-item v-for="item in data" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
			<u-loadmore :status="status"/>
		</template>
		<template v-else>
			<view class="empty-container">
				<u-empty text="暂无合同" mode="list"></u-empty>
			</view>
		</template> -->
		<list-layout :data="data" empty-text="暂无合同" :loading="false">
			<view class="">
				<contract-item v-for="item in data" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
			<u-loadmore :status="status"/>
		</list-layout>
	</view>
</template>

<script>
	import contractItem from './components/contract-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	export default {
		mixins: [pageMixin, dictMapMixin, userInfoMixin],
		components: {
			contractItem,
			listLayout
		},
		data () {
			return {
				status: 'loadmore',
				data: [],
				idcard: undefined,
				layoutLoading: false
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
		onPullDownRefresh () {
			this.data = []
			this.page.current = 1
			this.getList()
		},
		onReady () {
			this.layoutLoading = true
			this.getUserInfoApi().then(() => {
				this.idcard = this.userInfo.idCard
				this.getList()
			})
		},
		methods: {
			getList () {
				this.$http.get('/tmlms/tybcontract/mycon', {
					params: {
						size: this.page.size,
						current: this.page.current,
						idcard: this.idcard
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
					uni.stopPullDownRefresh()
					this.layoutLoading = false
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-contract-container {
		.empty-container {
			padding-top: 100rpx;
		}
	}
</style>
