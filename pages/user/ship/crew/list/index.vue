<template>
	<!-- 船员 -->
	<view class="user-my-ship-crew-list-container safe-bottom">
		<list-layout :data="data" empty-text="暂无船员数据">
			<view class="my-ship-crew-list-wrapper">
				<u-card :show-head="false" box-shadow="0px 0px 5px #d7d7d7" v-for="item in data" :key="item.id">
					<view class="item" slot="body">
						<view class="title">{{item.realName}}</view>
						<view class="text">
							<text>职务：{{getPositionIdLabel(item.positionId)}}</text>
						</view>
						<view class="text">
							<text>手机号码：{{item.phone}}</text>
						</view>
						<view class="text">身份证号码：{{item.idcard}}</view>
						<view class="text">用工状态：{{getWorkStatusLabel(item.workStatus)}}</view>
					</view>
					<view slot="foot">
						<view class="btn-wrapper">
							<u-button size="medium" @click="onTo(item)" style="margin-right: 10rpx;">详情</u-button>
							<u-button size="medium" @click="onToContract(item)">合同</u-button>
						</view>
					</view>
				</u-card>
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
			},
			onTo (row) {
				if (row.idcard) {
					uni.navigateTo({
						url: `/pages/user/ship/crew/detail/index?idcard=${row.idcard}`
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-my-ship-crew-list-container {
		.my-ship-crew-list-wrapper {
			
			border-bottom: 1px solid #f6f6f6;
			.item {
				background-color: #fff;
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
