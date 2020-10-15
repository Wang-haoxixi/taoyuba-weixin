<template>
	<view class="subject-wrapper">
		<view class="title-header">
			答题卡
		</view>
		<scroll-view class="content" scroll-y>
			<view class="subject-item" v-for="(item, index) in (info.quesType || [])" :key="index">
				<view class="title">{{item.label}}</view>
				<view class="content">
					<template v-for="n in item.end">
						<template v-if="!disabled">
							<view class="circle" @tap="onChoose(n + 1)" :key="n" v-if="(n+1) >= item.start" :class="current === (n + 1) ? 'current' : (answerList[n] ? 'used' : '')">
								<view class="item">{{n+1}}</view>
							</view>
						</template>
						<template v-else>
							<view class="circle" @tap="onChoose(n + 1)" :key="n" v-if="(n+1) >= item.start" :class="isSame(n) ? 'used' : 'current'">
								<view class="item">{{n+1}}</view>
							</view>
						</template>
					</template>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object,
			current: {
				type: Number,
				default: 0
			},
			disabled: Boolean,
			answerList: Array,
			resultList: Array
		},
		data () {
			return {
				isError: false
			}
		},
		methods: {
			getClassName (n) {
				if (this.disabled) {
					return this.isSame()
				} else {
					return this.current === (n + 1) ? 'current' : (this.answerList[n] ? 'used' : '')
				}
			},
			getQuestionTypeLabel (type) {
				let label = ''
				let quesType = this.info.quesType
				if (quesType) {
					quesType.forEach(item => {
						if (item.value === type) {
							label = item.label
							return false
						}
					})
				}
				return label
			},
			onChoose (index) {
				this.$emit('choose', index)
			},
			// 判断答案和结果是否一致
			isSame (n) {
				let current = n
				let result = this.resultList[current]
				let answer = this.answerList[current]
				if (Array.isArray(result)) {
					let errorStatus = true
					if (result.length) {
						for (let i = 0, len = answer.length; i < len; i++) {
							if (!result.includes(answer[i])) {
								errorStatus = false
								break
							}
						}
					} else {
						errorStatus = false
					}
					return errorStatus
				} else {
					return result === answer
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.subject-wrapper {
		min-height: 300rpx;
		padding: 20rpx 30rpx 20rpx;
		.title-header {
			text-align: center;
			font-size: 34rpx;
			font-weight: 700;
			margin-bottom: 30rpx;
			color: #333;
		}
		.content {
			max-height: 900rpx;
			overflow-y: auto;
			overflow-x: hidden;
		}
		.subject-item {
			margin-bottom: 30rpx;
			.title {
				font-size: 28rpx;
				font-weight: 700;
				color: #333;
				margin-bottom: 20rpx;
			}
			.content {
				display: flex;
				flex-wrap: wrap;
				.circle {
					width: 16.66%;
					margin: 20rpx 0;
					font-size: 28rpx;
					.item {
						height: 70rpx;
						width: 70rpx;
						line-height: 70rpx;
						color: #999;
						background-color: #fff;
						border-radius: 50%;
						overflow: hidden;
						text-align: center;
						border: 2rpx solid #d7d7d7;
						margin: 0 auto;
					}
					&.current {
						.item {
							background-color: #f74536;
							color: #fff;
							border-color: #f74536;
						}
					}
					&.used {
						.item {
							background-color: #3bd588;
							color: #fff;
							border-color: #3bd588;
						}
					}
				}
			}
		}
	}
</style>
