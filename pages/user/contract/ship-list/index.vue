<template>
	<view class="user-contract-container">
		<!-- <template v-if="data.length > 0">
			<view class="">
				<contract-item v-for="item in data" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
		</template>
		<template v-else>
			<view class="empty-wrapper">
				<u-empty text="暂无合同" mode="list"></u-empty>
			</view>
		</template> -->
		<list-layout :data="data" empty-text="暂无合同">
			<view class="">
				<contract-item v-for="item in data" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
		</list-layout>
	</view>
</template>

<script>
	import contractItem from '../list/components/contract-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	export default {
		mixins: [pageMixin, dictMapMixin],
		components: {
			contractItem,
			listLayout
		},
		data () {
			return {
				status: 'loadmore',
				data: []
			}
		},
		onReachBottom() {
			this.getList()
			// if (this.page.total > this.page.current * this.page.size) {
			// 	this.status = 'loading'
			// 	this.page.current++
			// 	this.getList()
			// } else{
			// 	this.status = 'nomore'
			// }
		},
		onPullDownRefresh () {
			this.data = []
			// this.page.current = 1
			this.getList()
		},
		onLoad (params) {
			console.log('params', params)
			this.getList(params.shipNo)
		},
		methods: {
			getList (id) {
				this.$http.get('/tmlms/tybcontract/listByShipName', {
					params: {
						// size: this.page.size,
						// current: this.page.current,
						shipNo: id
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = result
						console.log(this.data)
						// this.data = this.data.concat(result.records)
						// console.log(result, this.data)
						// this.page.total = result.total
						// if (this.page.total <= this.page.size) {
						// 	this.status = 'nomore'
						// }
					}
					// uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-contract-container {
		.empty-wrapper {
			padding-top: 100rpx;
		}
	}
</style>
