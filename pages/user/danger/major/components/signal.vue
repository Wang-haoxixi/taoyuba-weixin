<template>
	<view class="signal-container">
		<!-- 信号设备 -->
		<view class="item-wrapper">
			<view class="title">航行基本灯</view>
			<component-choose :history-data="signalLampHistoryData" v-model="signalLampData" :title="constText.signalLamp1" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">号型</view>
			<component-choose :history-data="signalLampTypeHistoryData" v-model="signalLampTypeData" :title="constText.signalLampType2" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">号笛、号钟</view>
			<component-choose :history-data="signalLampStatusHistoryData" v-model="signalLampStatusData" :title="constText.signalLampStatus3" @close="onClose" @open="onOpen"></component-choose>
		</view>
	</view>
</template>

<script>
	import componentChoose from '../../common/components/choose.vue'
	import validateMixin from '../../common/components/validate.js'
	import constText from '../../common/components/text.js'
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
					signalLampResult: '',
					signalLampImage: '',
					signalLampTypeResult: '',
					signalLampTypeImage: '',
					signalLampStatusResult: '',
					signalLampStatusImage: '',
				},
				signalLampData: { flag: 2, url: [] },
				signalLampTypeData: { flag: 2, url: [] },
				signalLampStatusData: { flag: 2, url: [] },
				signalLampHistoryData: {},
				signalLampTypeHistoryData: {},
				signalLampStatusHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('signalLamp')
					this.setHistoryData('signalLampType')
					this.setHistoryData('signalLampStatus')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if ( this.validateItem(this.signalLampData, '航行基本灯')
					&& this.validateItem(this.signalLampTypeData, '号型')
					&& this.validateItem(this.signalLampStatusData, '号笛、号钟')) {
					this.setForm('signalLamp')
					this.setForm('signalLampType')
					this.setForm('signalLampStatus')
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.signal-container {
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

