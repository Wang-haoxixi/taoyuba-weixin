<template>
	<view class="examination-detail-container">
		<view class="header">
			<view class="time">考试时间：{{timeLabel}}</view>
			<view class="list"><u-icon name="more-circle" size="40"></u-icon></view>
		</view>
		<view class="examination-item">
			<view class="item-header">
				<view class="item-left">{{quesTypeLabel}}<text class="text">（本题{{info.grade}}分）</text></view>
				<view class="item-right">{{current}}/{{total}}</view>
			</view>
			<view class="item-body">
				<tyb-radio
					@next="onNext(key)"
					v-if="info.examQuestionVO.type === 'RADIO'"
					:info="info.examQuestionVO">
				</tyb-radio>
				<tyb-radio
					@next="onNext(key)"
					v-else-if="info.examQuestionVO.type === 'CHECKED'"
					:info="info.examQuestionVO">
				</tyb-radio>
				<tyb-checkbox
					@next="onNext(key)"
					v-else-if="info.examQuestionVO.type === 'CHECKBOX'"
					:info="info.examQuestionVO">
				</tyb-checkbox>
			</view>
		</view>
		<view class="exam-bottom">
			<u-button :disabled="current <= 1" @click="onPrev" throttle-time="200">上一题</u-button>
			<u-button @click="onEnd">结束</u-button>
			<u-button :disabled="current >= total" @click="onNext" throttle-time="200">下一题</u-button>
		</view>
	</view>
</template>

<script>
	import data from './data.js'
	import tybRadio from './components/radio.vue'
	import tybChecked from './components/checked.vue'
	import tybCheckbox from './components/checkbox.vue'
	export default {
		components: {
			tybRadio,
			tybChecked,
			tybCheckbox
		},
		data () {
			return {
				data: [],
				time: 0,
				total: 0,
				current: 0,
				info: {}
			}
		},
		computed: {
			quesType () {
				let result = this.data.quesType || []
				result.forEach(item => {
					item.number = item.end - item.start + 1
				})
				return result
			},
			timeLabel () {
				let time = this.getTime(this.time)
				return `${time.h}:${time.m}:${time.s}`
			},
			quesTypeLabel () {
				let result = ''
				let quesType = this.quesType
				for (let i = 0, len = quesType.length; i < len; i++) {
					if (quesType[i].value === this.info.examQuestionVO.type) {
						result = quesType[i].label
						break
					}
				}
				return result
			}
		},
		onReady () {
			this.getList()
		},
		methods: {
			getList () {
				this.data = data
				this.setCheckbox()
				this.info = this.data.examAnswerVOList[0]
				this.time = +this.data.answerTime * 60
				this.total = this.data.examAnswerVOList.length
				console.log('this.data', this.data)
				this.current = 1
				this.initSetTime()
			},
			setCheckbox () {
				let result = this.data.examAnswerVOList
				for (let i = 0, len = result.length; i < len; i++) {
					if (result[i].examQuestionVO.type === 'CHECKBOX') {
						result[i].examQuestionVO.optionsJson.forEach(item => {
							item.checked = (result[i].userAnswerJson || []).includes(item.key)
						})
					}
				}
			},
			getTime (t) {
				let format = {
					h: '00',
					m: '00',
					s: '00',
				}
				if (t > 0) {
					let h = Math.floor((t / 3600))
					let m = Math.floor((t / 60) % 60)
					let s = Math.floor(t % 60)
					format.h = h < 10 ? '0' + h : h
					format.m = m < 10 ? '0' + m : m
					format.s = s < 10 ? '0' + s : s
				}
				return format
			},
			initSetTime () {
				let timer = setInterval(() => {
					if (this.time <= 0) {
						clearInterval(timer)
					}
					this.time--
				}, 1000)
			},
			// 上一题
			onPrev () {
				this.current = this.current - 1
				this.info = this.data.examAnswerVOList[this.current - 1]
				console.log('prev', this.info)
			},
			// 下一题
			onNext () {
				this.current = this.current + 1
				this.info = this.data.examAnswerVOList[this.current - 1]
				console.log('next', this.info)
			},
			onEnd () {
				
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.examination-detail-container {
		margin-bottom: 200rpx;
		.header {
			display: flex;
			padding: 10rpx 30rpx;
			border-bottom: 1px solid #f6f6f6;
			justify-content: space-between;
			.list {
				text-align: right;
			}
		}
		.exam-bottom {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
		.examination-item {
			padding: 30rpx;
			.item-header {
				padding: 10rpx 0;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
