<template>
	<view class="crew-wrapper">
		<!-- 船员配置 -->
		<view class="item-wrapper">
			<view class="title">驾驶职务船员最低配员标准</view>
			<component-choose v-model="driveStandardData" :title="driveStandardTitle" @close="onClose" @open="onOpen" :history-data="driveStandardHistoryData"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">轮机职务船员最低配员标准</view>
			<component-choose v-model="turbineStandardData" :title="turbineStandardTitle" @close="onClose" @open="onOpen" :history-data="turbineStandardHistoryData"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">普通船员</view>
			<component-choose v-model="crewData" @close="onClose" @open="onOpen" title="普通船员持有普通船员证书" :history-data="crewHistoryData"></component-choose>
		</view>
		<!-- <view class="btn-next">
			<u-button @click="onNext">上一步</u-button>
			<u-button @click="onNext">下一步</u-button>
		</view> -->
	</view>
</template>

<script>
	const MAPS = {
		driveStandard: {
			'value1': '长度≥45米非远洋渔业船舶配备一级船长、一级船副和助理船副各1名',
			'value2': '36米≤长度<45米船舶配备二级船长、二级船副和助理船副各1名',
			'value3': '24米<长度<36米船舶配备二级船长和二级船副各1名',
			'value4': '12米≤长度<24米船舶配备三级船长和助理船副各1名'
		},
		turbineStandard: {
			'value1': '主机总功率≥3000千瓦渔业船舶一级轮机长和一级管轮各1名，助理管轮2名',
			'value2': '750千瓦≤主机总功率<3000千瓦渔业船舶-级轮机长、一级管轮和助理管轮各1名',
			'value3': '450千瓦≤主机总功率<750千瓦渔业船舶二级轮机长、二级管轮和助理管轮各1名',
			'value4': '250千瓦≤主机总功率<450千瓦渔业船舶配备二级轮机长和二级管轮各1名'
		},
		crew: '普通船员持有普通船员证书'
	}
	import componentChoose from './choose.vue'
	import validateMixin from './validate.js'
	export default {
		mixins: [validateMixin],
		components: {
			componentChoose
		},
		props: {
			shipInfo: {
				type: Object,
				default: () => {}
			},
			value: Object,
			historyData: Object,
		},
		data () {
			return {
				form: {
					driveStandardResult: '', // 驾驶职务配置标准
					driveStandardImage: '',
					turbineStandardResult: '', // 轮机职务配置标准
					turbineStandardImage: '',
					crewResult: '', // 普通船员 
					crewImage: ''
				},
				driveStandardData: { flag: 2, url: '' },
				turbineStandardData: { flag: 2, url: '' },
				crewData: { flag: 2, url: '' },
				driveStandardHistoryData: {},
				turbineStandardHistoryData: {},
				crewHistoryData: {}
			}
		},
		computed: {
			driveStandardTitle () {
				let shipInfo = this.shipInfo
				if (shipInfo.hullLength) {
					let hullLength = shipInfo.hullLength
					let title = ''
					if (hullLength >= 45) {
						title = MAPS.driveStandard.value1
					} else if (hullLength < 45 && hullLength >= 36) {
						title = MAPS.driveStandard.value2
					} else if (hullLength < 36 && hullLength >= 24) {
						title = MAPS.driveStandard.value3
					} else if (hullLength < 24 && hullLength >= 12) {
						title = MAPS.driveStandard.value4
					}
					return title
				}
				return ''
			},
			turbineStandardTitle () {
				let shipInfo = this.shipInfo
				if (shipInfo.dualPower) {
					let dualPower = shipInfo.dualPower
					let title = ''
					if (dualPower >= 3000) {
						title = MAPS.turbineStandard.value1
					} else if (dualPower < 3000 && dualPower >= 750) {
						title = MAPS.turbineStandard.value2
					} else if (dualPower < 750 && dualPower >= 450) {
						title = MAPS.turbineStandard.value3
					} else if (dualPower < 450 && dualPower >= 250) {
						title = MAPS.turbineStandard.value4
					}
					return title
				}
				return ''
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('driveStandard')
					this.setHistoryData('turbineStandard')
					this.setHistoryData('crew')
				},
				deep: true,
			}
		},
		methods: {
			onPrev () {
				this.$emit('prev', 0)
			},
			onNext () {
				this.$emit('next', 2)
			},
			onValidate () {
				// 驾驶职务配置标准
				if (this.validateItem(this.driveStandardData, '驾驶职务船员最低配员标准', 'driveStandard') 
					&& this.validateItem(this.turbineStandardData, '轮机职务船员最低配员标准', 'turbineStandard') 
					&& this.validateItem(this.crewData, '普通船员', 'crew')) {
						
					this.form.driveStandardResult = this.driveStandardData.flag
					this.form.driveStandardImage = this.driveStandardData.url.join(',')
					this.form.turbineStandardResult = this.turbineStandardData.flag
					this.form.turbineStandardImage = this.turbineStandardData.url.join(',')
					this.form.crewResult = this.crewData.flag
					this.form.crewImage = this.crewData.url.join(',')
					return true
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.crew-wrapper {
		padding-bottom: 150rpx;
		.title {
			font-size: 34rpx;
			color: #333;
			font-weight: 700;
		}
		.item-wrapper {
			padding: 30rpx 0;
			&:first-child {
				padding-top: 0;
			}
			border-bottom: 1px solid #f6f6f6;
			&:last-child {
				border-bottom: none;
			}
		}
		.btn-next {
			display: flex;
			justify-content: space-around;
			margin: 50rpx 0 30rpx 0;
		}
	}
</style>
