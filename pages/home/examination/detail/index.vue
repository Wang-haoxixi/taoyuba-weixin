<template>
	<view class="examination-detail-container">
		<view class="status_bar"></view>
		<u-navbar :title="timeLabel" :custom-back="onEnd"></u-navbar>
		<view class="examination-item">
			<view class="item-header">
				<view class="item-left">{{quesTypeLabel}}<text class="text">（本题{{info.grade}}分）</text></view>
				<view class="item-right">{{current}}/{{total}}</view>
			</view>
			<view class="item-body">
				<tyb-radio
					:value="value"
					@choose="getResult"
					v-if="info.examQuestionVO.type === 'RADIO'"
					:info="info.examQuestionVO">
				</tyb-radio>
				<tyb-checked
					:value="value"
					@choose="getResult"
					v-else-if="info.examQuestionVO.type === 'CHECKED'"
					:info="info.examQuestionVO">
				</tyb-checked>
				<tyb-checkbox
					:value="value"
					@choose="getResult"
					v-else-if="info.examQuestionVO.type === 'CHECKBOX'"
					:info="info.examQuestionVO">
				</tyb-checkbox>
			</view>
		</view>
		<view class="exam-bottom">
			<view class="order" @tap="show = true">
				<view class="list"><u-icon name="order" size="50"></u-icon></view>
				<view class="text">
					答题卡
				</view>
			</view>
			<u-button :disabled="current <= 1" @click="onPrev" throttle-time="200">上一题</u-button>
			<u-button @click="onEnd">交卷</u-button>
			<u-button :disabled="current >= total" @click="onNext" throttle-time="200">下一题</u-button>
		</view>
		<u-popup v-model="show" mode="bottom" safe-area-inset-bottom border-radius="30">
			<tyb-subject :info="data" :current="current" :answerList="answerList" @choose="onChoose"></tyb-subject>
		</u-popup>
	</view>
</template>

<script>
	import data from './data.js'
	import tybRadio from './components/radio.vue'
	import tybChecked from './components/checked.vue'
	import tybCheckbox from './components/checkbox.vue'
	import tybSubject from './components/subject.vue'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: {
			tybRadio,
			tybChecked,
			tybCheckbox,
			tybSubject
		},
		data () {
			return {
				show: false,
				data: {},
				time: 0,
				total: 0,
				current: 0,
				info: {},
				answerList: [],
				value: ''
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
			openSubject () {
				this.show = true
			},
			getList () {
				this.data = data
				this.setCheckbox()
				this.info = this.data.examAnswerVOList[0]
				this.time = +this.data.answerTime * 60
				this.total = this.data.examAnswerVOList.length
				this.current = 1
				
				let len = this.data.examAnswerVOList.length
				for (let i = 0; len > i; i++) {
					this.answerList.push('')
				}
				
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
				this.info = cloneDeep(this.data.examAnswerVOList[this.current - 1])
				this.value = this.info.examQuestionVO.type === 'CHECKBOX' ? this.answerList[this.current - 1] : ''
				setTimeout(() => {
					this.value = this.answerList[this.current - 1] || 'empty'
					// console.log('prev', this.current, this.value)
				}, 20)
				
			},
			// 下一题
			onNext () {
				this.current = this.current + 1
				this.info = cloneDeep(this.data.examAnswerVOList[this.current - 1])
				this.value = this.info.examQuestionVO.type === 'CHECKBOX' ? this.answerList[this.current - 1] : ''
				setTimeout(() => {
					this.value = this.answerList[this.current - 1] || 'empty'
					// console.log('next', this.current, this.value)
				}, 20)
				
			},
			onEnd () {
				uni.showModal({
					title: '您确定要交卷吗？',
					showCancel: true,
					success: ({confirm, cancel}) => {
						if (confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			},
			// 选择题目
			onChoose (index) {
				this.current = +index
				this.info = cloneDeep(this.data.examAnswerVOList[this.current - 1])
				this.show = false
				this.value = this.info.examQuestionVO.type === 'CHECKBOX' ? this.answerList[this.current - 1] : ''
				setTimeout(() => {this.value = this.answerList[this.current - 1] || 'empty'}, 20)
			},
			// 获取对应选项结果
			getResult (value) {
				// console.log('result', value, this.current)
				// this.answerList[this.current - 1] = value
				this.answerList.splice(this.current - 1, 1, value)
				// console.log(value, this.answerList)
				// this.answerList = cloneDeep(this.answerList)
				// console.log('this.answerList', this.answerList)
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
		.status_bar {
			height: var(--status-bar-height);
			line-height: var(--status-bar-height);
			width: 100%;
		}
		margin-bottom: 200rpx;
		
		.header {
			// display: flex;
			padding: 10rpx 30rpx;
			// justify-content: space-between;
			.time {
				text-align: center;
				font-size: 32rpx;
			}
			// .list {
			// 	text-align: right;
			// }
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
		.order {
			text-align: center;
			.list {
				margin: 0 auto;
				color: #999;
			}
			.text {
				color: #666;
				font-size: 26rpx;
			}
		}
	}
</style>
