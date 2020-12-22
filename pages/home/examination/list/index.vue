<template>
	<!-- 在线测试 -->
	<view class="examination-container page-base safe-padding-bottom">
		<view class="item" @tap="openExam(item)" v-for="(item, index) in data" :key="index">
			<view class="title u-line-2">{{item.kind || ''}}</view>
			<!-- <view class="number">参与人数：{{ item.testNumber || 0}}人</view> -->
			<view class="number">
				职务等级：
			</view>
			<view class="number u-line-2">
				<text v-for="(n, index) in item.list">{{n.level ? n.level : n.examName}}{{index === (item.list.length - 1) ? '' : '，'}}</text>
			</view>
			<view class="btn-wrapper">
				<u-button plain size="mini" :custom-style="customStyle" @click="openExam(item)">立即参与</u-button>
			</view>
		</view>
		<u-loadmore :status="status" />
		<u-toast ref="uToast" />
		<u-select v-model="show" :list="list" v-if="show" @confirm="onConfirm"></u-select>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		mixins: [pageMixin],
		data () {
			return {
				show: false,
				list: [],
				data: [],
				status: 'loadmore',
				customStyle: {
					fontSize: '26rpx',
					color: '#409EFF',
					borderColor: '#409EFF'
				}
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
		onShow () {
			this.data = []
			this.page.current = 1
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tmlms/exam_examination/page', {
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
						if (this.page.total === this.data.length) {
							this.status = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			setList (data) {
				this.list = []
				let list = []
				for (let i = 0, len = data.length; i < len; i++) {
					let obj = {
						label: data[i].level ? data[i].level : data[i].examName,
						value: data[i].id
					}
					list.push(obj)
				}
				this.list = cloneDeep(list)
			},
			openExam (row) {
				console.log('openExam', row)
				this.setList(row.list)
				this.show = true
			},
			onConfirm (e) {
				let id = e[0].value
				uni.showModal({
					title: '您确定参加模拟考试么',
					showCancel: true,
					success: ({confirm, cancel}) => {
						if (confirm) {
							this.$http.post('/tmlms/exam_answer/create_test_pager', {
								examinationId: id
							}).then(({ data }) => {
								if (data.code === 0) {
									uni.navigateTo({
										url: `/pages/home/examination/detail/index?id=${data.data.id}`
									})
								} else {
									this.$refs.uToast.show({
										title: '参与失败',
									})
								}
							})
							// .catch(({data}) => {
							// 	console.log('data error', data)
							// 	if (data.code === 1) {
							// 		this.$refs.uToast.show({
							// 			title: data.msg || '参与失败',
							// 		})
							// 	}
							// })
							
						}
					}
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	
	.examination-container {
		padding: 30rpx;
		.item {
			padding: 30rpx;
			background-color: #f6f6f6f6;
			border-radius: 30rpx;
			width: 100%;
			margin-bottom: 30rpx;
			.title {
				font-size: 32rpx;
				color: #333;
				margin-bottom: 15rpx;
				font-weight: 700;
			}
			.number {
				font-size: 26rpx;
				margin-bottom: 15rpx;
				color: #999;
			}
			.btn-wrapper {
				text-align: right;
			}
		}
	}
</style>
