<template>
	<!-- 招聘 -->
	<view class="recruit-list-wrapper safe-bottom safe-padding-bottom">
		<!-- <view class="search-wrapper">
			<static-search :placeholder="form.contactName || '搜索'" :to="`/pages/home/search/index?type=1&keyword=${form.contactName}`"></static-search>
		</view> -->
		<view class="dropdown-wrapper">
			<u-dropdown>
				<u-dropdown-item v-model="form.workExprience" title="经验" :options="options1" @change="(value) => {onChangeDrowdown('workExprience', 'options1', value)}"></u-dropdown-item>
				<!-- <u-dropdown-item v-model="form.workMode" title="作业" :options="options2" @change="(value) => {onChangeDrowdown('workMode', 'options2', value)}"></u-dropdown-item> -->
				<u-dropdown-item v-model="form.positionId" title="职务" :options="options3" @change="(value) => {onChangeDrowdown('positionId', 'options3', value)}"></u-dropdown-item>
				<u-dropdown-item v-model="form.salary" title="薪水" :options="options4" @change="(value) => {onChangeDrowdown('salaryStart', 'options4', value)}"></u-dropdown-item>
				<!-- <u-dropdown-item v-model="form.order" title="排序" :options="options5" @change="(value) => {onChangeDrowdown('order', 'options5', value)}"></u-dropdown-item> -->
			</u-dropdown>
		</view>
		<view class="content-wrapper">
			<view class="item" v-for="(item, index) in data" :key="index">
				<job-item :info="item" btnText="查看" @to="onTo" :dictMap="dictMap"></job-item>
			</view>
		</view>
		<u-loadmore :status="status"/>
	</view>
</template>

<script>
	import jobItem from '@/pages/home/index/components/job-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import staticSearch from '@/pages/home/index/components/search.vue'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		mixins: [pageMixin, dictMapMixin],
		components: {
			jobItem,
			staticSearch
		},
		data () {
			return {
				status: 'loadmore',
				form: {
					contactName: '',
					positionId: '',
					salary: '',
					salaryStart: '',
					salaryEnd: '',
					workExprience: '',
					workMode: '',
					order: ''
				},
				data: [],
				options5: [
					{ label: '正序', value: 1 },
					{ label: '倒叙', value: 2 }
				],
			}
		},
		onLoad (params) {
			if (params.keyword) {
				this.form.contactName = params.keyword
			}
			this.getList()
		},
		// onUnload () {
			// uni.navigateBack({delta: 1})
			// uni.switchTab({
			// 	url: '/pages/home/index/index'
			// })
		// },
		computed: {
			options1 () {
				return cloneDeep(this.dictMap['tyb_work_exprience']) || []
			},
			options3 () {
				return cloneDeep(this.dictMap['tyb_resume_position']) || [] 
			},
			options2 () {
				return cloneDeep(this.dictMap['tyb_resume_worktype']) || []
			},
			options4 () {
				return cloneDeep(this.dictMap['salaryList']) || []
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
			this.resetForm()
			this.getList()
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
				// this.resetForm()
				this.page.current = 1
				if (label === 'salaryStart') {
					let result = this.$tools.getDictItem(value, this[options])
					this.form[label] = result.value
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
			resetForm (ignore = ['contactName']) {
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
	::v-deep .u-dropdown-item__options-scroll {
		max-height: 500rpx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
