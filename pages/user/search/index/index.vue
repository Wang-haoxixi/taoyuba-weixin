<template>
	<view class="user-search-container">
		<view class="">
			<u-search placeholder="渔船名" v-model="shipName"></u-search>
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="item in data" :key="item.id">
				<view class="">
					
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	export default {
		mixins: [pageMixin],
		data () {
			return {
				status: 'loadmore',
				shipName: ''
			}
		},
		onPullDownRefresh () {
			this.data = []
			this.page.current = 1
			this.resetForm()
			this.getList()
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
		methods: {
			getList () {
				this.$http.get('/tybship/tybship/newpage', {
					params: {
						shipName,
						size: this.page.size,
						current: this.page.current,
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(this.setList(result.records))
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

<style>
</style>
