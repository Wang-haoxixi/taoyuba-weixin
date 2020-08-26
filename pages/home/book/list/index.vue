<template>
	<view class="book-list-container">
		<view class="book-content">
			<template v-for="item in data">
				<bookItem :key="item.id" :title="item.title" :info="item.info" :price="item.price" :imgUrl="item.bookImg"></bookItem>
			</template>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import bookItem from './components/book-item.vue'
	export default {
		components: {
			bookItem
		},
		mixins: [pageMixin],
		data () {
			return {
				data: []
			}
		},
		onPullDownRefresh () {
			this.data = []
			this.page.current = 1
			this.getList()
		},
		onLoad () {
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tybhrms/tybbook/page', {
					params: {
						size: this.page.size,
						current: this.page.current
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
					}
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style>
</style>
