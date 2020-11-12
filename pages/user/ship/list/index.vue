<template>
	<view class="user-search-container">
		<view class="search-wrapper">
			<u-search placeholder="渔船名" clear v-model="shipName" @search="onSearch" @custom="onSearch"></u-search>
		</view>
		
		<view class="content-wrapper">
			<list-layout :data="data" empty-text="请搜索查询渔船信息">
				<view class="item" v-for="item in data" :key="item.id">
					<view class="text">渔船名：{{item.shipName}}</view>
					<view class="text">持证人：{{item.shipowner}}</view>
					<view class="text">持证人身份证：{{item.shipownerIdcard}}</view>
					<view class="text">地址：{{item.address}}</view>
					<view class="text">渔船证书：{{item.shipNo}}</view>
					<view class="text">主机总功率(kw)：{{item.engineTotalPower}}</view>
					<view class="text">船长(m)：{{item.hullLength}}</view>
					<view class="text">作业类型：{{getDictLabel(activityTypeList, item.activityType)}}</view>
					<view class="text">合同/人数：{{item.contractCount}}/{{item.crewCount}}</view>
					<view class="btn-wrapper">
						<u-button style="margin-right: 20rpx;" @click="onTo(item)">船员</u-button>
						<u-button @click="onToContract(item)">合同</u-button>
					</view>
				</view>
				<u-loadmore :status="status" />
			</list-layout>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		components: { listLayout },
		mixins: [dictMapMixin, pageMixin],
		data () {
			return {
				status: 'loadmore',
				shipName: '',
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
		mounted () {
			this.shipName = '11'
			this.onSearch()
		},
		computed: {
			activityTypeList () {
				return cloneDeep(this.dictMap)['tyb_resume_worktype'] || []
			}
		},
		methods: {
			getList () {
				this.$http.get('/tybship/tybship/newpage', {
					params: {
						shipName: this.shipName,
						size: this.page.size,
						current: this.page.current,
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
				})
			},
			trim (value) {
				return value.replace(/^\s+/, '').replace(/\s+$/, '');
			},
			onSearch () {
				if (this.trim(this.shipName)) {
					this.getList()
				}
			},
			onToContract (row) {
				if (row.shipNo) {
					uni.navigateTo({
						url: `/pages/user/ship/contract/list/index?shipNo=${row.shipNo}`
					})
				}
			},
			onTo (row) {
				if (row.shipId) {
					uni.navigateTo({
						url: `/pages/user/ship/crew/list/index?id=${row.shipId}`
					})
				}
			}
		}
	}
</script>


<style scoped lang="scss">
	.user-search-container {
		.search-wrapper {
			background-color: #fff;
			padding: 10rpx 20rpx;
		}
		.content-wrapper {
			.item {
				background-color: #fff;
				padding: 20rpx;
				margin-bottom: 20rpx;
				.text {
					font-size: 30rpx;
					margin-bottom: 20rpx;
				}
				.btn-wrapper {
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
</style>
