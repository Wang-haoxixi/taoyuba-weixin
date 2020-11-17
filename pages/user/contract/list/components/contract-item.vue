<template>
	<u-card :show-head="false" box-shadow="0px 0px 5px #d7d7d7">
		<view slot="body">
			<view class="contract-item-wrapper">
				<view class="left-item">
					<view class="title">{{info.shipName}}</view>
					<!-- <view class="text">船名：{{info.shipName}}</view> -->
					<view class="text">合同状态：{{statusLabel}}</view>
					<view class="text">
						<text>船舶拥有者：{{info.shipownerName}}</text>
						<text style="margin-left: 20rpx;">雇员：{{info.employeeName}}</text>
					</view>
					<view class="text">创建日期：{{info.createTime}}</view>
				</view>
			</view>
		</view>
		<view slot="foot">
			<view class="btn-wrapper">
				<u-button size="medium" @click="onTo(info.contractId)">查看</u-button>
			</view>
		</view>
	</u-card>
	
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {}
			},
			dictMap: {
				type: Object,
				default: () => {}
			},
		},
		computed: {
			statusLabel () {
				return this.dictMap ? this.getDictLabel(this.dictMap['contractList'] || [], this.info.status) : ''
			}
		},
		methods: {
			getDictLabel (data, value) {
				let result = ''
				for (let i = 0, len = data.length; i < len; i++) {
					if (data[i].value === value) {
						result = data[i].label
						break
					}
				}
				return result
			},
			onTo (id) {
				uni.navigateTo({
					url: `/pages/base/web?src=https://m.taoyu58.com/api/tmlms/downLoad/intoContractHtml&contractId=${id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.contract-item-wrapper {
		background-color: #fff;
		color: #999;
		font-size: 28rpx;
		font-size: 26rpx;
		line-height: 1.7;
		display: flex;
		align-items: center;
		.title {
			font-size: 32rpx;
			color: #666;
		}
		
	}
	.btn-wrapper {
		display: flex;
		justify-content: flex-end;
	}
</style>
