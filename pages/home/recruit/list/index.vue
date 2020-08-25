<template>
	<!-- 招聘 -->
	<view class="recruit-list-wrapper phonex-mb">
		<view style="position: fixed;top: 0;left: 0;right: 0;background-color: #f6f6f6;z-index: 20;">
			<view class="search-wrapper">
				<u-search placeholder="搜索" v-model="form.content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
			</view>
			<!-- <view class="dropdown-wrapper">
				<u-dropdown>
					<u-dropdown-item v-model="form.value1" title="职务" :options="options1" @change="(value) => {onChangeDrowdown('value1', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.value2" title="薪水" :options="options2" @change="(value) => {onChangeDrowdown('value2', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.value3" title="作业" :options="options3" @change="(value) => {onChangeDrowdown('value3', value)}"></u-dropdown-item>
					<u-dropdown-item v-model="form.value4" title="排序" :options="options4" @change="(value) => {onChangeDrowdown('value4', value)}"></u-dropdown-item>
				</u-dropdown>
			</view> -->
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
	export default {
		mixins: [dictMapMixin, pageMixin],
		components: {
			jobItem,
		},
		data () {
			return {
				status: 'loadmore',
				options1: [
					{ label: '职务1', value: 1 },
					{ label: '职务2', value: 2 },
					{ label: '职务3', value: 3 }
				],
				options2: [
					{ label: '薪水1', value: 1 },
					{ label: '薪水2', value: 2 },
					{ label: '薪水3', value: 3 }
				],
				options3: [
					{ label: '作业1', value: 1 },
					{ label: '作业2', value: 2 },
					{ label: '作业3', value: 3 }
				],
				options4: [
					{ label: '正序', value: 1 },
					{ label: '倒叙', value: 2 }
				],
				form: {
					content: '',
					value1: 1,
					value2: 1,
					value3: 1,
					value4: 1
				},
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
		methods: {
			onSearch () {},
			getList () {
				this.$http.get('/tybhrms/tybrecruit/page', {
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
			onChangeDrowdown (label, value) {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			onTo (row) {
				if (row.recruitId) {
					uni.navigateTo({
						url: `/pages/home/recruit/detail/index?id=${row.recruitId}`
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
		.dropdown-wrapper {
			background-color: #fff;
			height: 80rpx;
			.dropdown-ref {
				background-color: #fff;
				top: 0;
				left: 0;
				right: 0;
				z-index: 10;
				::v-deep.__content {
					height: 100vh;
				}
			}
		}
		.content-wrapper {
			// margin-top: 0rpx;
			margin-top: 184rpx;
			background-color: #fff;
			.item {
				border-bottom: 1px solid #f6f6f6;
			}
		}
	}
</style>
