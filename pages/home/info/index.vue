<template>
	<view class="info-container phonex-mb">
		<view class="tab-wrapper">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#409EFF"></u-tabs>
		</view>
		<view style="height: 80rpx;"></view>
		<view class="content-wrapper">
			<page-training-info :keyword="title" :data="data1" v-show="current === 1" ref="trainingInfo"></page-training-info>
			<page-training :keyword="deptName" :data="data0" v-show="current === 0" ref="training"></page-training>
			<page-book v-show="current === 3" ref="book"></page-book>
		</view>
	</view>
</template>

<script>
	import pageBook from '../book/list/index'
	import pageTraining from '../training/list/index1'
	import pageTrainingInfo from '../training-info/list/index1'
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
				deptName: '',
				title: '',
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
					this.getList0()
				} else{
					this.status0 = 'nomore'
				}
			} else if (this.current === 1) {
				if (this.page1.total > this.page1.current * this.page1.size) {
					this.status1 = 'loading'
					this.page1.current++
					this.getList1()
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
			// console.log('params', params)
			if (params.title) {
				this.title = params.title
			}
			if (params.deptName) {
				this.deptName = params.deptName
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
						size: this.page0.size,
						current: this.page0.current,
						deptName: this.deptName
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
						size: this.page1.size,
						current: this.page1.current,
						title: this.title,
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
				if (index === 2) {
					uni.navigateTo({
						url: `/pages/base/web?src=https://m.taoyu58.com/careerplanning`
					})
					return
				}
				this.current = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-container {
		.tab-wrapper {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			z-index: 10;
		}
	}
</style>
