<template>
	<view class="info-container phonex-mb">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="content-wrapper">
			<page-training-info v-show="current === 1" ref="trainingInfo"></page-training-info>
			<page-training v-show="current === 0" ref="training"></page-training>
			<page-book v-show="current === 3" ref="book"></page-book>
		</view>
	</view>
</template>

<script>
	import pageBook from '../book/list/index'
	import pageTraining from '../training/list/index'
	import pageTrainingInfo from '../training-info/list/index'
	export default {
		components: {
			pageBook,
			pageTraining,
			pageTrainingInfo
		},
		data () {
			return {
				current: 0,
				list: [
					{ name: '培训机构' },
					{ name: '培训信息' },
					{ name: '职业规划' },
					{ name: '教材订购' }
				],
				keyword: '',
				status0: 'loadmore',
				status1: 'loadmore',
				data0: [],
				data1: [],
				page0: {
					total: 0,
					current: 1,
					size: 10
				},
				page1: {
					total: 0,
					current: 1,
					size: 10
				}
			}
		},
		onPullDownRefresh () {
			if (this.current === 0) {
				this.data0 = []
				this.page0.current = 1
				this.$refs.training.getList()
			} else if (this.current === 1) {
				this.data1 = []
				this.page1.current = 1
				this.$refs.trainingInfo.getList()
			}
			
		},
		onReachBottom() {
			if (this.current === 0) {
				if (this.page0.total > this.page0.current * this.page0.size) {
					this.status0 = 'loading'
					this.page0.current++
					this.$refs.training.getList()
				} else{
					this.status0 = 'nomore'
				}
			} else if (this.current === 1) {
				if (this.page1.total > this.page1.current * this.page1.size) {
					this.status1 = 'loading'
					this.page1.current++
					this.$refs.trainingInfo.getList()
				} else{
					this.status1 = 'nomore'
				}
			}
			
		},
		onLoad (params) {
			let index = +params.index
			if (index) {
				this.current = index
			}
			if (params.keyword) {
				this.keyword = params.keyword
			}
			this.init()
		},
		onUnload () {
			uni.navigateBack({delta: 1})
		},
		methods: {
			init () {
				this.getList0()
				this.getList1()
				this.$refs.book.getList()
			},
			getList0 () {
				this.$http.get('/tmlms/dept/pageForAll', {
					params: {
						size: this.page.size,
						current: this.page.current,
						deptName: this.keyword
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data0 = this.data0.concat(result.records)
						this.page0.total = result.total
						if (this.page0.total <= this.page0.size) {
							this.status0 = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			getList1 () {
				this.$http.get('/tybhrms/tybarticle/page', {
					params: {
						size: this.page.size,
						current: this.page.current,
						title: this.keyword,
						type: 8
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data1 = this.data1.concat(result.records)
						this.page1.total = result.total
						if (this.page1.total <= this.page1.size) {
							this.status1 = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			change(index) {
				this.current = index
				if (this.current === 2) {
					uni.navigateTo({
						url: `/pages/base/web?src=https://m.taoyu58.com/careerplanning`
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-container {
		
	}
</style>
