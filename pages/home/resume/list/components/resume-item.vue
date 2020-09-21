<template>
	<view class="list-item-wrapper" @tap="onTo">
		<view class="list-item_left">
			<view class="title">
				<text class="name ellipsis">{{getName(info.realName)}}</text>
			</view>
			<view class="content">
				<text v-if="info.salary">薪资：{{info.salary}}</text>
				<text class="price-type">职务：{{positionIdLabel || ''}}</text>
			</view>
			<view class="time">
				作业方式：{{workRequireLabel || ''}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {}
			},
			btnText: {
				type: String,
				default: '详情'
			},
			hideBtn: {
				type: Boolean,
				default: false
			},
			dictMap: Object
		},
		computed: {
			// 职务
			positionIdLabel () {
				let dict = this.dictMap['tyb_resume_position'] || []
				return this.getDictLabel(this.info.positionId, dict)
			},
			// 作业方式
			workRequireLabel () {
				let dict = this.dictMap['tyb_resume_worktype'] || []
				return this.getDictLabel(this.info.workRequire, dict)
			},
		},
		methods: {
			getName (name) {
				return this.$tools.textEncryption(name, 1, 100)
			},
			onTo () {
				this.$emit('to', this.info)
			},
			getDictLabel (val, data) {
				if (val === '' || val == null) {
					return
				}
				let result = ''
				for (let i = 0, len = data.length; i < len; i++) {
					if (data[i].value === val) {
						result = data[i].label
					}
				}
				return result
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list-item-wrapper {
		padding: 15px;
		line-height: 2;
		border-bottom: 1px solid #f6f6f6;
		.list-item_left {
			width: 100%;
			overflow: hidden;
			.title {
				font-size: 30rpx;
				color: #666;
				display: flex;
				margin-bottom: 10rpx;
				font-weight: 700;
				.name {
					max-width: 280rpx;
					line-height: 1.2;
					display: inline-block;
				}
				.address {
					margin-left: 15rpx;
					color: #999;
					font-size: 28rpx;
				}
			}
			.content {
				font-size: 28rpx;
				color: #409EFF;
				.price-type {
					color: #999;
				}
				text {
					margin-right: 20rpx;
				}
			}
			.time {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
</style>
