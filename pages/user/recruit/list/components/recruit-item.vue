<template>
	<view class="user-recruit-item-wrapper">
		<view class="item-left">
			<view class="positionId">{{positionIdLabel}}</view>
			<view class="content">￥{{salaryLabel}} <text class="text">{{ageRequireLabel}}</text></view>
		</view>
		<view class="item-right">
			{{updateTimeLabel}}
		</view>
	</view>
</template>

<script>
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		mixins: [dictMapMixin],
		props: {
			info: Object
		},
		computed: {
			salaryLabel () {
				return this.getDictLabel(this.dictMap.salaryList1, this.info.salary)
			},
			positionIdLabel () {
				let result = ''
				if (this.info.positionId) {
					let dict = this.dictMap['tyb_resume_position'] || []
					for (let i = 0, len = dict.length; i < len; i++) {
						if (dict[i].value === this.info.positionId) {
							result = dict[i].label
							break
						}
					}
				}
				return result
			},
			updateTimeLabel () {
				let result = ''
				if (this.info.updateTime) {
					let date = +new Date(this.info.updateTime)
					// console.log('date', date)
					result = this.$tools.timestamp(date / 1000)
				}
				return result
			},
			ageRequireLabel () {
				let result = ''
				if (this.info.ageRequire) {
					let dict = this.dictMap['tyb_position_agerequirement'] || []
					for (let i = 0, len = dict.length; i < len; i++) {
						if (dict[i].value === this.info.ageRequire) {
							result = dict[i].label
							break
						}
					}
				}
				return result
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-recruit-item-wrapper {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0rpx;
		background-color: #fff;
		border-bottom: 1px solid #f6f6f6;
		color: #999;
		font-size: 28rpx;
		align-items: center;
		.item-left {
			.positionId {
				font-size: 32rpx;
				color: #666;
				margin-bottom: 20rpx;
			}
			.content {
				color: #ba1b20;
				.text {
					margin-left: 20rpx;
					color: #999;
				}
			}
		}
	}
</style>
