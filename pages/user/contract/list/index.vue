<template>
	<view class="user-contract-container">
		<view class="">
			<contract-item v-for="item in data" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
		</view>
		<u-loadmore :status="status"/>
	</view>
</template>

<script>
	import contractItem from './components/contract-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [pageMixin, dictMapMixin, userInfoMixin],
		components: {
			contractItem
		},
		data () {
			return {
				status: 'loadmore',
				data: [],
				idcard: undefined
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
			this.getUserInfoApi().then(() => {
				this.idcard = this.userInfo.idcard
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
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-contract-container {
		
	}
</style>
