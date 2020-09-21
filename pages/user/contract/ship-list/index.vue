<template>
	<view class="user-contract-container">
		<view class="">
			<contract-item v-for="item in data" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
		</view>
		<u-loadmore :status="status"/>
	</view>
</template>

<script>
	import contractItem from '../list/components/contract-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		mixins: [pageMixin, dictMapMixin],
		components: {
			contractItem
		},
		data () {
			return {
				status: 'loadmore',
				data: []
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
		onLoad (params) {
			console.log('params', params)
			this.getList(params.shipNo)
		},
		methods: {
			getList (id) {
				this.$http.get('/mlms/tybcontract/listByShipName', {
					params: {
						size: this.page.size,
						current: this.page.current,
						shipNo: id
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
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-contract-container {
		
	}
</style>
