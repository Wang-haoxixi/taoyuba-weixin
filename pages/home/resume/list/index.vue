<template>
	<!-- 求职 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view class="search-wrapper">
			<u-search placeholder="搜索" v-model="content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<job-item :info="item" btnText="查看简历" @to="onTo">
					<text slot="right">发布人：{{item.contactName}}</text>
				</job-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import jobItem from '@/pages/home/index/components/job-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		mixins: [pageMixin, dictMapMixin],
		components: {
			jobItem
		},
		data () {
			return {
				status: 'loadmore',
				content: '',
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
		onLoad () {
			this.getList()
		},
		methods: {
			onSearch () {},
			getList () {
				this.$http.get('/tmlms/crew/xsPage', {
					params: {
						size: this.page.size,
						current: this.page.current
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(this.setList(result.records))
						this.page.total = result.total
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
				if (row.idcard) {
					uni.navigateTo({
						url: `/pages/home/resume/detail/index?id=${row.idcard}`
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recruit-list-wrapper {
		.search-wrapper {
			padding: 20rpx;
		}
		.content-wrapper {
			margin-top: 0rpx;
			background-color: #fff;
			margin-bottom: 30rpx;
			.item {
				border-bottom: 1px solid #f6f6f6;
			}
		}
	}
</style>
