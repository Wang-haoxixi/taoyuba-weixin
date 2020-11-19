<template>
	<view class="job-wrapper">
		<home-container>
			<u-tabs slot="header" font-size="32" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view class="" v-show="current === 0" v-if="data1.length">
					<view class="job-item-content" v-for="(item, index) in data1" :key="index">
						<job-item :info="item" @tap="onTo(item)" :dictMap="dictMap" @to="onTo(item)"></job-item>
					</view>
					<view class="more" @tap="onToList('/pages/home/recruit/list/index')">更多</view>
				</view>
				<view class="news-content" v-show="current === 1" v-if="data2.length">
					<view class="news-item-wrapper" v-for="(item, index) in data2" :key="index" @tap="onTo(item)">
						<view class="title u-line-1">{{item.title}}</view>
						<view class="desc u-line-1">{{item.description}}</view>
					</view>
					<view class="more" @tap="onToList('/pages/home/news/list/index?type=6')">更多</view>
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
			},
			onToList (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},
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
		.more {
			text-align: right;
			font-size: 28rpx;
			padding: 20rpx 30rpx;
			color: $color-blue;
		}
	}
</style>
