<template>
	<!-- 船员招聘 -->
	<view class="user-recruit-container page-base safe-padding-bottom">
		<view class="recruit-item-wrapper">
			<view @tap="onTo(`/pages/release/recruit/edit?id=${item.recruitId}`)" v-for="item in data" :key="item.recruitId">
				<recruit-item :info="item"></recruit-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import recruitItem from './components/recruit-item.vue'
	export default {
		components: {
			recruitItem
		},
		mixins: [pageMixin],
		data () {
			return {
				status: 'loadmore',
				data: []
			}
		},
		onLoad () {
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
		onPullDownRefresh () {
			this.data = []
			this.page.current = 1
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tybhrms/tybrecruit/mypage', {
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
					uni.stopPullDownRefresh()
				}).catch(() => {
					
				})
			},
			onTo (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-recruit-container {
		background-color: #fff;
	}
</style>
