<template>
	<!-- 船员 -->
	<view class="user-my-ship-crew-list-container phonex-mb">
		<list-layout :data="data" empty-text="暂无船员数据">
			<view class="my-ship-crew-list-wrapper">
				<view class="item" v-for="item in data" :key="item.id">
					<view class="title">{{item.realName}}</view>
					<view class="text">
						<text>职务：{{getPositionIdLabel(item.positionId)}}</text>
						<text>手机号码：{{item.phone}}</text>
					</view>
					<view class="text">身份证号码：{{item.idcard}}</view>
					<view class="text">用工状态：{{getWorkStatusLabel(item.workStatus)}}</view>
					<view class="btn-wrapper">
						<u-button size="medium" @click="onToContract(item)">合同</u-button>
					</view>
				</view>
				
			</view>
		</list-layout>
	</view>
</template>

<script>
	import listLayout from '@/pages/components/list-layout/index.vue'
	import infoMixin from '@/pages/home/recruit/mixins/info.js'
	export default {
		mixins: [infoMixin],
		components: { listLayout },
		data () {
			return {
				data: []
			}
		},
		onLoad (params) {
			this.getList(params.id)
		},
		methods: {
			getWorkStatusLabel (val) {
				let dict = this.dictMap['workStatus'] || []
				return this.getDictLabel(val, dict)
			},
			getPositionIdLabel (val) {
				let dict = this.dictMap['tyb_resume_position'] || []
				return this.getDictLabel(val, dict)
			},
			getList (id) {
				this.$http.get('/tmlms/crew/findByShipId', {
					params: {
						shipId: id,
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = result
					}
				})
			},
			onToContract (row) {
				this.$http.get(`/tmlms/tybcontract/shipcrew/${row.idcard}`).then(({ data }) => {
					if (data.code === 0) {
						uni.navigateTo({
							url: `/pages/base/web?src=https://m.taoyu58.com/api/tmlms/downLoad/intoContractHtml&contractId=${data.data.contractId}`
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-my-ship-crew-list-container {
		.my-ship-crew-list-wrapper {
			background-color: #fff;
			border-bottom: 1px solid #f6f6f6;
			.item {
				padding: 30rpx;
				border-bottom: 1px solid #f6f6f6;
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
				padding: 20rpx;
				padding-bottom: 0;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>
