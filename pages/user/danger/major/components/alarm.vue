<template>
	<view class="alarm-wrapper">
		<!-- 警报设备 -->
		<view class="item-wrapper">
			<view class="title">氮泄漏监控报警系统</view>
			<component-choose v-model="alarmFirstData" :title="constText.alarmFirst" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">弃船警报设备</view>
			<component-choose v-model="alarmSecondData" :title="constText.alarmSecond" @close="onClose" @open="onOpen"></component-choose>
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
					alarmFirstResult: '', 
					alarmFirstImage: '',
					alarmSecondResult: '',
					alarmSecondImage: '',
				},
				alarmFirstData: { flag: 2, url: [] },
				alarmSecondData: { flag: 2, url: [] },
			}
		},
		methods: {
			onValidate () {
				if (this.validateItem(this.alarmFirstData, '氮泄漏监控报警系统')
					&& this.validateItem(this.alarmSecondData, '弃船警报设备')) {
					this.setForm('alarmFirst')
					this.setForm('alarmSecond')
					return true
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.alarm-wrapper {
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
