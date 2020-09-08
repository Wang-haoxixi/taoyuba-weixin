<template>
	<view class="job-wrapper">
		<home-container>
			<u-tabs slot="header" font-size="32" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view class="" v-show="current === 0">
					<view class="job-item-content" v-for="(item, index) in data1" :key="item.recruitId">
						<job-item :info="item" @tap="onTo(item)"></job-item>
					</view>
				</view>
				<view class="news-content" v-show="current === 1">
					<view class="news-item-wrapper" v-for="item in data2" :key="item.articleId" @tap="onTo(item)">
						<view class="title u-line-1">{{item.title}}</view>
						<view class="desc u-line-1">{{item.description}}</view>
					</view>
				</view>
			</template>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	import jobItem from './job-item.vue'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		mixins: [dictMapMixin],
		components: {
			homeContainer,
			jobItem
		},
		data () {
			return {
				current: 0,
				list: [
					{ name: '船东招聘' },
					{ name: '企业招聘' },
				],
				data1: [],
				data2: []
			}
		},
		methods: {
			init() {
				this.getList1()
				this.getList2()
			},
			// tabs切换
			tabsChange (index) {
				this.current = index
			},
			// 船东招聘
			getList1 () {
				this.$http.get('/tybhrms/tybrecruit/page', {
					params: {
						size: 6
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data1 = this.setList(data.data.records)
					}
				})
			},
			getList2 () {
				this.$http.get('/tybhrms/tybarticle/page', {
					params: {
						size: 6,
						type: 6
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data2 = this.setList(data.data.records)
						this.data2.forEach(item => {
							item.positionIdLabel = item.title
						})
					}
				})
			},
			// 重构数据
			setList (data) {
				let dictData = this.dictMap['tyb_resume_position'] || []
				for (let i = 0, len = data.length; i < len; i++) {
					let val = data[i]
					let positionIdLabel = ''
					let result = dictData.find((item) => {
						return item.value === val.positionId
					})
					if (result) {
						positionIdLabel = result.label
					}
					data[i].positionIdLabel = positionIdLabel
				}
				return data
			},
			onTo (row) {
				if (row.recruitId) {
					uni.navigateTo({
						url: `/pages/home/recruit/detail/index?id=${row.recruitId}`
					})
				} else if (row.articleId) {
					if (row.isDispatch) {
						if (row.httpSrc) {
							uni.navigateTo({
								url: `/pages/base/web?src=${row.httpSrc}`
							})
						}
					} else {
						uni.navigateTo({
							url: `/pages/home/news/detail/index?id=${row.articleId}`
						})
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.job-wrapper {
		.news-content {
			padding: 0 30rpx;
		}
		// .job-item-content {
		// 	border-bottom: 1px solid #f6f6f6;
		// }
		.news-item-wrapper {
			padding: 30rpx 0;
			border-bottom: 1px solid #f6f6f6;
			.title {
				font-size: 28rpx;
				color: #666;
			}
			.desc {
				font-size: 26rpx;
				color: #aaa;
				margin-top: 20rpx;
			}
		}
	}
</style>
