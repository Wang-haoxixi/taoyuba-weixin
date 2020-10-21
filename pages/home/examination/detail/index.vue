<template>
	<view class="examination-detail-container">
		<view class="status_bar"></view>
		<u-navbar :title="timeLabel" :custom-back="onBack"></u-navbar>
		<view class="examination-item">
			<view class="item-header">
				<view class="item-left" v-if="quesTypeLabel">{{quesTypeLabel}}<text class="text">（本题{{info.grade}}分）</text></view>
				<view class="item-right">{{current}}/{{total}}</view>
			</view>
			<view class="item-body">
				<tyb-radio
					:value="value"
					@choose="getResult"
					:disabled="disabled"
					v-if="info.examQuestionVO.type === 'RADIO'"
					:info="info.examQuestionVO">
				</tyb-radio>
				<tyb-checked
					:value="value"
					@choose="getResult"
					:disabled="disabled"
					v-else-if="info.examQuestionVO.type === 'CHECKED'"
					:info="info.examQuestionVO">
				</tyb-checked>
				<tyb-checkbox
					:value="value"
					@choose="getResult"
					:disabled="disabled"
					v-else-if="info.examQuestionVO.type === 'CHECKBOX'"
					:info="info.examQuestionVO">
				</tyb-checkbox>
			</view>
		</view>
		<view class="result-wrapper" v-if="isEnd">
			<view class="text" :class="isError ? 'success' : 'error'">
				{{isError ? '正确' : '错误'}}
			</view>
			<view class="">
				答案:{{info.examQuestionVO.type === 'CHECKED' ? (resultList[current - 1] === 'A' ? '对' : '错') : resultList[current - 1]}}
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
			<u-button @click="onEnd" :loading="endLoading" v-if="!isEnd">交卷</u-button>
			<u-button :disabled="current >= total" @click="onNext" throttle-time="200">下一题</u-button>
		</view>
		<u-popup v-model="show" mode="bottom" safe-area-inset-bottom border-radius="30">
			<tyb-subject
				:disabled="disabled"
				:info="data"
				:resultList="resultList"
				:current="current"
				:answerList="answerList"
				@choose="onChoose">
			</tyb-subject>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
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
				timer: null,
				show: false,
				data: {},
				time: 0,
				total: 0,
				current: 0,
				info: {},
				answerList: [], // 用户解答答案
				resultList: [], // 正确答案
				value: '',
				examId: undefined,
				disabled: false,
				isEnd: false,
				endLoading: false,
				scroe: '',
				isError: false
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
				let result = ''
				if (!this.isEnd) {
					let time = this.getTime(this.time)
					result = `${time.h}:${time.m}:${time.s}`
				} else {
					result = `${this.scroe}分`
				}
				return result
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
		onUnload() {
			this.onSubmit()
		},
		onLoad (params) {
			if (params.id) {
				this.examId = params.id
				this.getList(params.id)
				// this.getResult()
			} else {
				this.$refs.uToast.show({
					title: '找不到考试内容',
					back : true
				})
			}
		},
		methods: {
			openSubject () {
				this.show = true
			},
			getList (id) {
				this.$http.get(`/tmlms/exam_answer/continue_test_pager/${id}`).then(({ data }) => {
					if (data.code === 0) {
						if (data.data.examAnswerVOList.length === 0) {
							this.$refs.uToast.show({
								title: '找不到考试内容',
								back : true
							})
						} else {
							this.data = data.data
							this.setCheckbox()
							this.info = this.data.examAnswerVOList[0]
							let time = this.data.remainingTime.split('-')
							for (let i = 0, len = time.length; i < len; i++) {
								if (i === 0) {
									this.time = (+time[0]) * 60 
								} else if (i === 1) {
									this.time += (+time[1])
								}
							}
							this.total = this.data.examAnswerVOList.length
							this.current = this.info.questionNum
							console.log(this.current, 'current')
							let len = this.data.examAnswerVOList.length
							for (let i = 0; len > i; i++) {
								this.answerList.push('')
							}
							if (this.time === 0) {
								this.getScore()
								return
							}
							this.initSetTime()
						}
					}
				})
				
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
				this.timer = setInterval(() => {
					if (this.time <= 0) {
						clearInterval(this.timer)
						this.onSubmit()
					}
					this.time--
				}, 1000)
			},
			// 上一题
			onPrev () {
				this.onSubmitExam()
				this.current = this.current - 1
				this.info = cloneDeep(this.data.examAnswerVOList[this.current - 1])
				this.value = this.info.examQuestionVO.type === 'CHECKBOX' ? this.answerList[this.current - 1] : ''
				setTimeout(() => {
					this.value = this.answerList[this.current - 1] || 'empty'
					// console.log('prev', this.current, this.value)
				}, 20)
				
				if (this.isEnd) {
					this.isSame()
				}
			},
			// 下一题
			onNext () {
				this.onSubmitExam()
				this.current = this.current + 1
				this.info = cloneDeep(this.data.examAnswerVOList[this.current - 1])
				this.value = this.info.examQuestionVO.type === 'CHECKBOX' ? this.answerList[this.current - 1] : ''
				setTimeout(() => {
					this.value = this.answerList[this.current - 1] || 'empty'
					// console.log('next', this.current, this.value)
				}, 20)
				
				if (this.isEnd) {
					this.isSame()
				}
			},
			onEnd () {
				uni.showModal({
					title: '您确定要交卷吗？',
					showCancel: true,
					success: ({confirm, cancel}) => {
						if (confirm) {
							this.onSubmit()
						}
					}
				})
			},
			onBack () {
				if (this.isEnd) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.onEnd()
				}
			},
			// 选择题目
			onChoose (index) {
				this.current = +index
				this.info = cloneDeep(this.data.examAnswerVOList[this.current - 1])
				this.show = false
				this.value = this.info.examQuestionVO.type === 'CHECKBOX' ? this.answerList[this.current - 1] : ''
				setTimeout(() => {this.value = this.answerList[this.current - 1] || 'empty'}, 20)
				if (this.isEnd) {
					this.isSame()
				}
			},
			// 获取对应选项结果
			getResult (value) {
				// console.log('result', value, this.current)
				// this.answerList[this.current - 1] = value
				this.answerList.splice(this.current - 1, 1, value)
				// console.log(value, this.answerList)
				// this.answerList = cloneDeep(this.answerList)
				// console.log('this.answerList', this.answerList)
			},
			// 提交当前题目答案
			onSubmitExam () {
				let userAnswer = this.answerList[this.current - 1]
				
				if (userAnswer === '') {
					return
				}
				if (Array.isArray(userAnswer) && userAnswer.length === 0) {
					return
				}
				if (Array.isArray(userAnswer)) {
					userAnswer = `[${userAnswer.toString()}]`
				}
				// console.log('userAnswer', userAnswer, this.examId, this.current)
				if (!this.isEnd) {
					this.$http.post('/tmlms/exam_answer/answer_question', {
						examId: this.examId,
						questionNum: this.current,
						userAnswer: userAnswer
					})
				}
			},
			onSubmitApi () {
				this.onSubmitExam()
				this.endLoading = true
				return new Promise((resolve) => {
					this.$http.post('/tmlms/exam_answer/commit_paper', {
						examinationId: this.data.examinationId,
						examId: this.examId,
						answerTime: '00-00',
						remainingTime: '00-00'
					}).then(({ data }) => {
						resolve(data)
					}).catch(() => {
						this.endLoading = false
					})
				})
			},
			// 交卷
			onSubmit () {
				this.onSubmitApi().then((data) => {
					if (data.code === 0) {
						this.$refs.uToast.show({
							title: '考试结束'
						})
					} else {
						this.$refs.uToast.show({
							title: '考试交卷失败',
							back: true
						})
						this.endLoading = false
					}
					this.getScore()
					// if (data.code === 0) {
					// 	this.$refs.uToast.show({
					// 		title: '考试结束',
					// 		back: true
					// 	})
					// } else {
					// 	this.$refs.uToast.show({
					// 		title: '考试交卷失败',
					// 		back: true
					// 	})
					// }
				})
			},
			// 获取交卷后答案和分数
			getScore () {
				this.$http.get(`/tmlms/exam_answer/check_paper/${this.examId}`).then(({ data }) => {
					this.endLoading = false
					if (data.code === 0) {
						this.isEnd = true
						this.data = data.data
						this.current = 1
						this.info = this.data.examAnswerVOList[0]
						this.scroe = this.data.score
						this.total = this.data.examAnswerVOList.length
						this.disabled = true
						this.getRightKey()
						this.isSame()
						this.value = this.answerList[this.current - 1]
					}
				})
			},
			// 获取正确答案,获取用户所答答案
			getRightKey () {
				let data = this.data.examAnswerVOList
				for (let i = 0, len = data.length; i < len; i++) {
					let answerJson = data[i].answerJson
					let userAnswerJson = data[i].userAnswerJson
					if (data[i].examQuestionVO.type === 'CHECKBOX') {
						this.resultList.push(answerJson ? answerJson : [])
						this.$set(this.answerList, i, userAnswerJson ? userAnswerJson : [])
					} else {
						this.resultList.push(answerJson ? answerJson[0] : '')
						this.$set(this.answerList, i, userAnswerJson ? userAnswerJson[0] : '')
					}
				}
				// console.log('resultList', this.resultList)
			},
			// 判断答案和结果是否一致
			isSame () {
				let current = this.current - 1
				let result = this.resultList[current]
				let answer = this.answerList[current]
				if (Array.isArray(result)) {
					let errorStatus = true
					for (let i = 0, len = answer.length; i < len; i++) {
						if (!result.includes(answer[i])) {
							errorStatus = false
							break
						}
					}
					this.isError = errorStatus
				} else {
					this.isError = result === answer
				}
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
			background-color: #fff;
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
		.result-wrapper {
			margin: 30rpx;
			background-color: #f6f6f6;
			padding: 30rpx 20rpx;
			.success {
				color: #3bd588;
			}
			.error {
				color: #f74536;
			}
			.text {
				margin-bottom: 20rpx;
			}
		}
	}
</style>
