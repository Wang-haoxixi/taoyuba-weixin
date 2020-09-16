<template>
	<!-- 招聘 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view>
			<view class="search-wrapper">
				<static-search :placeholder="form.content || '搜索'" :to="`/pages/home/search/index?type=1&keyword=${form.content}`"></static-search>
			</view>
			<view class="dropdown-wrapper">
				<u-dropdown>
					<u-dropdown-item v-model="form.positionId" title="职务" :options="options1" @change="(value) => {onChangeDrowdown('positionId', 'options1', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.salaryStart" title="薪水" :options="options2" @change="(value) => {onChangeDrowdown('salaryStart', 'options2', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.workMode" title="作业" :options="options3" @change="(value) => {onChangeDrowdown('workMode', 'options3', value)}"></u-dropdown-item>
					<!-- <u-dropdown-item v-model="form.order" title="排序" :options="options4" @change="(value) => {onChangeDrowdown('order', 'options4', value)}"></u-dropdown-item> -->
				</u-dropdown>
			</view>
		</view>
		
		<view class="content-wrapper" id="contentWrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<job-item :info="item" @to="onTo"></job-item>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import jobItem from '@/pages/home/index/components/job-item.vue'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import pageMixin from '@/pages/mixins/page.js'
	import staticSearch from '@/pages/home/index/components/search.vue'
	export default {
		mixins: [dictMapMixin, pageMixin],
		components: {
			jobItem,
			staticSearch
		},
		data () {
			return {
				status: 'loadmore',
				options4: [
					{ label: '正序', value: 1 },
					{ label: '倒叙', value: 2 }
				],
				form: {
					content: '',
					positionId: '',
					salaryStart: '',
					salaryEnd: '',
					workMode: '',
					order: ''
				},
				data: []
			}
		},
		onLoad (params) {
			this.getList()
			if (params.keyword) {
				this.form.content = params.keyword
			}
		},
		computed: {
			options1 () {
				return this.dictMap ? this.dictMap['tyb_resume_position'] : [] 
			},
			options3 () {
				return this.dictMap ? this.dictMap['tyb_resume_worktype'] : []
			},
			options2 () {
				return this.dictMap['salaryList']
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
			onSearch () {},
			getList () {
				let form = {}
				for (let key in this.form) {
					if (this.form[key] !== '' && this.form[key] != null) {
						form[key] = this.form[key]
					}
				}
				this.$http.get('/tybhrms/tybrecruit/page', {
					params: Object.assign({
						size: this.page.size,
						current: this.page.current
					}, form)
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(this.setList(result.records))
						this.page.total = result.total
						if (this.page.total === 0) {
							this.status = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
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
			onChangeDrowdown (label, options, value) {
				this.resetForm()
				this.page.current = 1
				if (label === 'salaryStart') {
					let result = this.$tools.getDictItem(value, this[options])
					this.form.salaryStart = result.salaryStart
					this.form.salaryEnd = result.salaryEnd
				} else {
					let result = this.$tools.getDictItem(value, this[options])
					this.form[label] = result.value
				}
				this.data = []
				this.getList()
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			resetForm (ignore = ['content']) {
				let form = this.form
				for (let key in form) {
					if (ignore.findIndex(item => item === key) === -1) {
						form[key] = ''
					}
				}
			},
			onTo (row) {
				if (row.recruitId) {
					uni.navigateTo({
						url: `/pages/home/recruit/detail/index?id=${row.recruitId}`
					})
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
		.dropdown-wrapper {
			background-color: #fff;
			height: 80rpx;
			// .dropdown-ref {
			// 	background-color: #fff;
			// 	top: 0;
			// 	left: 0;
			// 	right: 0;
			// 	z-index: 10;
			// 	::v-deep.__content {
			// 		height: 100vh;
			// 	}
			// }
		}
		.content-wrapper {
			// margin-top: 0rpx;
			// margin-top: 184rpx;
			background-color: #fff;
			.item {
				border-bottom: 1px solid #f6f6f6;
			}
		}
	}
	::v-deep .u-dropdown-item__options-scroll {
		max-height: 500rpx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
