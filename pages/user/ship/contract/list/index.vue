<template>
	<!-- 船员 -->
	<view class="user-my-ship-crew-list-container safe-padding-bottom">
		<list-layout :data="data" empty-text="暂无船员数据">
			<view class="my-ship-crew-list-wrapper">
				<u-card :show-head="false" box-shadow="0px 0px 5px #d7d7d7" v-for="(item, index) in data" :key="index">
					<view class="item" slot="body">
						<view class="title">{{item.employeeName}}</view>
						<view class="text">
							职务：{{getPositionIdLabel(item.employeePosition)}}
						</view>
						<view class="text">
							手机号码：{{item.employeePhone}}
						</view>
						<view class="text">身份证号码：{{item.employeeIdcard}}</view>
						
					</view>
					<view class="" slot="foot">
						<view class="btn-wrapper">
							<u-button size="medium" @click="onToContract(item.contractId)">合同</u-button>
						</view>
					</view>
				</u-card>
			</view>
			<u-loadmore :status="status" bg-color="tranparent"/>
		</list-layout>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import infoMixin from '@/pages/home/recruit/mixins/info.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	export default {
		mixins: [pageMixin, infoMixin],
		components: { listLayout },
		data () {
			return {
				status: 'loadmore',
				data: [],
				shipNo: ''
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
		onLoad (params) {
			this.shipNo = params.shipNo
			this.getList()
		},
		methods: {
			getPositionIdLabel (val) {
				let dict = this.dictMap['tyb_resume_position'] || []
				return this.getDictLabel(val, dict)
			},
			getList () {
				this.$http.get('/tmlms/tybcontract/villagePage', {
					params: {
						size: this.page.size,
						current: this.page.current,
						shipNo: this.shipNo,
						status: 9
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
			onToContract (id) {
				uni.navigateTo({
					url: `/pages/base/web?src=https://m.taoyu58.com/api/tmlms/downLoad/intoContractHtml&contractId=${id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-my-ship-crew-list-container {
		.my-ship-crew-list-wrapper {
			// background-color: #fff;
			border-bottom: 1px solid #f6f6f6;
			.item {
				background-color: #fff;
				// padding: 30rpx;
				// border-bottom: 1px solid #f6f6f6;
				.title {
					font-size: 32rpx;
					color: #333;
				}
				.text {
					font-size: 28rpx;
					color: #999;
					margin-top: 15rpx;
				}
				
			}
			.btn-wrapper {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>
