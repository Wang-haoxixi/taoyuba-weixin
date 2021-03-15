<template>
	<view class="signal-communication-container">
		<!-- 信号设备 -->
		<view class="item-wrapper">
			<view class="title">通信设备</view>
			<component-choose :history-data="communicationEquipmentHistoryData" v-model="communicationEquipmentData" :title="constText.communicationEquipment" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">导航设备</view>
			<component-choose :history-data="navigationalAidsHistoryData" v-model="navigationalAidsData" :title="constText.navigationalAids" @close="onClose" @open="onOpen"></component-choose>
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
					communicationEquipmentResult: '',
					communicationEquipmentImage: '',
					navigationalAidsResult: '',
					navigationalAidsImage: ''
				},
				communicationEquipmentData: { flag: 2, url: '' },
				navigationalAidsData: { flag: 2, url: '' },
				communicationEquipmentHistoryData: {},
				navigationalAidsHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('communicationEquipment')
					this.setHistoryData('navigationalAids')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if ( this.validateItem(this.communicationEquipmentData, '通信设备', 'communicationEquipment')
					&& this.validateItem(this.navigationalAidsData, '导航设备', 'navigationalAids')) {
					this.setForm('communicationEquipment')
					this.setForm('navigationalAids')
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.signal-communication-container {
		padding-bottom: 250rpx;
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

