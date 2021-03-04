<template>
	<view class="machine-wrapper">
		<!-- 四种机器 -->
		<view class="item-wrapper">
			<view class="title">主机、辅机、舵机、锚机</view>
			<component-choose :history-data="machineHistoryData" v-model="machineData" :title="constText.machine" @close="onClose" @open="onOpen"></component-choose>
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
					machineResult: '', // 驾驶职务配置标准
					machineImage: ''
				},
				machineData: { flag: 2, url: [] },
				machineHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('machine')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				// 驾驶职务配置标准
				if (this.validateItem(this.machineData, '主机、辅机、舵机、锚机')) {
					this.setForm('machine')
					return true
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.machine-wrapper {
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
	}
</style>
