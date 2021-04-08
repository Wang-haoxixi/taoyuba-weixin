<template>
	<view class="sales-boss">
		<view class="sales-button">
			<u-search :clearabled="true" @search="search" :show-action="false"></u-search>
		</view>
		<view class="sales-list">
			<view class="content-wrapper" id="contentWrapper">
				<view class="item" v-for="(item, index) in data" :key="index">
					<view class="sales-list-content">
						<view>渔船名：  {{ item.shipName }}</view>
						<view>渔船编号：  {{ item.shipNo }}</view>
						<view>持证人：  {{ item.certificateHolderName }}</view>
						<view>持证人身份证：  {{ item.certificateHolderIdCard }}</view>
						<view>渔船状态：  <text :style="item.auditState === '3' ? 'color: green' : item.auditState === '4' ? 'color: red' : '' ">{{ getDictLabel(dictMap['audit_state'],item.auditState) }}</text></view>
						<view v-if="item.auditState === '4'">驳回理由：{{ item.rejectReason }}</view>
						<view class="sales-operation">
							<u-button size="mini" @click="confirmProgress(item.id)">生成二维码</u-button>
						</view>
					</view>
				</view>
			</view>
			<view class="loadmore">
				<u-loadmore :status="status"/>
			</view>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import dictMap from '@/pages/mixins/dictMap.js'
	export default {
		components: {
		},
		mixins: [pageMixin,dictMap],
		data () {
			return {
				show: false,
				selectorObj: [],
				status: 'loadmore',
				data: [],
				active: 0,
				showModel: false,
				shipName: ''
			}
		},
		props:{
			type: {
				type: Number,
				default: 1
			},
		},
		mounted () {
			this.data = []
			this.getList()
		},
		onPullDownRefresh () {
			if (this.current === 0) {
				this.data = []
				this.page.current = 1
				this.getList()
			}
		},
		onReachBottom() {
			if (this.current === 0) {
				if (this.page.total > this.page.current * this.page.size) {
					this.status = 'loading'
					this.page.current++
					this.getList()
				} else{
					this.status = 'nomore'
				}
			}
		},
		methods: {
			// 获取列表
			getList () {
				this.$http.get('/tmlms/tyb_order/page_order', {
					params: Object.assign({
						size: this.page.size,
						current: this.page.current,
						shipName: this.shipName
					})
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
			owners (id) {
				uni.navigateTo({
					url: `/pages/user/myship/ship/saleCode?id=${id}`
				})
			},
			search (value) {
				this.page.current = 1
				this.data = []
				this.shipName = value
				this.getList()
			},
			confirmProgress (id) {
				uni.navigateTo({
					url: `/pages/user/myship/ship/confirmShipDetail?id=${id}&isBuy=true`
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.sales-boss {
		padding: 20rpx 30rpx;
		background: white;
		min-height: 100vh;
		.sales-button {
			// width: 150rpx;
		}
		.sales-list {
			width: 100%;
			margin-top: 30rpx;
			.item {
				margin-top: 30rpx;
			}
			.sales-operation {
				display: flex;
				justify-content: space-around;
			}
		}
		.sales-list-content {
			background-color: #f6f6f6;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			color: #a4a7a8;
			view {
				font-size: 28rpx;
				margin: 25rpx 0px;
			}
		}
	}
</style>
