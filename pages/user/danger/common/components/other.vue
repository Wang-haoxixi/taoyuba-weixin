<template>
	<view class="other-container">
		<!-- 信号设备 -->
		<view class="item-wrapper">
			<view class="title">逃生通道</view>
			<component-choose :history-data="escapeTrunkHistoryData" v-model="escapeTrunkData" :title="constText.escapeTrunk" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">鱼舱</view>
			<component-choose :history-data="fishHoldHistoryData" v-model="fishHoldData" :title="constText.fishHold" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">电线线路</view>
			<component-choose :history-data="wireHistoryData" v-model="wireData" :title="constText.wire" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">液化气瓶</view>
			<component-choose :history-data="liquefiedBottleHistoryData" v-model="liquefiedBottleData" :title="constText.liquefiedBottle" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">“五超”行为</view>
			<component-choose :history-data="behaviorHistoryData" v-model="behaviorData" :title="constText.behavior" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">规章锢度</view>
			<component-choose :history-data="regulationHistoryData" v-model="regulationData" :title="constText.regulation" @close="onClose" @open="onOpen"></component-choose>
		</view>
	</view>
</template>

<script>
	import componentChoose from './choose.vue'
	import validateMixin from './validate.js'
	import constText from './text.js'
	export default {
		mixins: [validateMixin],
		components: {
			componentChoose
		},
		props: {
			historyData: Object,
		},
		data () {
			return {
				constText,
				form: {
					escapeTrunkResult: '',
					escapeTrunkImage: '',
					fishHoldResult: '',
					fishHoldImage: '',
					wireResult: '',
					wireImage: '',
					liquefiedBottleResult: '',
					liquefiedBottleImage: '',
					behaviorResult: '',
					behaviorImage: '',
					regulationResult: '',
					regulationImage: ''
				},
				escapeTrunkData: { flag: 2, url: '' },
				fishHoldData: { flag: 2, url: '' },
				wireData: { flag: 2, url: '' },
				liquefiedBottleData: { flag: 2, url: '' },
				behaviorData: { flag: 2, url: '' },
				regulationData: { flag: 2, url: '' },
				escapeTrunkHistoryData: {},
				fishHoldHistoryData: {},
				wireHistoryData: {},
				liquefiedBottleHistoryData: {},
				behaviorHistoryData: {},
				regulationHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler () {
					this.setHistoryData('escapeTrunk')
					this.setHistoryData('fishHold')
					this.setHistoryData('wire')
					this.setHistoryData('liquefiedBottle')
					this.setHistoryData('behavior')
					this.setHistoryData('regulation')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if ( this.validateItem(this.escapeTrunkData, '逃生通道', 'escapeTrunk')
					&& this.validateItem(this.fishHoldData, '鱼舱', 'fishHold')
					&& this.validateItem(this.wireData, '电线线路', 'wire')
					&& this.validateItem(this.liquefiedBottleData, '液化气瓶', 'liquefiedBottle')
					&& this.validateItem(this.behaviorData, '“五超”行为', 'behavior')
					&& this.validateItem(this.regulationData, '规章制度', 'regulation')) {
					this.setForm('escapeTrunk')
					this.setForm('fishHold')
					this.setForm('wire')
					this.setForm('liquefiedBottle')
					this.setForm('behavior')
					this.setForm('regulation')
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.other-container {
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
			.item {
				padding: 20rpx 0;
				&:last-child {
					padding-bottom: 0;
				}
			}
		}
	}
	
</style>

