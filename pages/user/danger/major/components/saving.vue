<template>
	<view class="saving-wrapper">
		<!-- 救生设备 -->
		<view class="item-wrapper">
			<view class="title">救生筏</view>
			<component-choose :history-data="lifeRaftHistoryData" v-model="lifeRaftData" :title="constText.lifeRaft1" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">其他救生设备</view>
			<view class="item">
				<component-choose :history-data="otherPreserverFirstHistoryData" v-model="otherPreserverFirstData" :title="constText.otherPreserverFirst1" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="otherPreserverSecondHistoryData" v-model="otherPreserverSecondData" :title="constText.otherPreserverSecond1" @close="onClose" @open="onOpen"></component-choose>
			</view>
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
					lifeRaftResult: '', 
					lifeRaftImage: '',
					otherPreserverFirstResult: '',
					otherPreserverFirstImage: '',
					otherPreserverSecondResult: '',
					otherPreserverSecondImage: '',
				},
				lifeRaftData: { flag: 2, url: [] },
				otherPreserverFirstData: { flag: 2, url: [] },
				otherPreserverSecondData: { flag: 2, url: [] },
				lifeRaftHistoryData: {},
				otherPreserverFirstHistoryData: {},
				otherPreserverSecondHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('lifeRaft')
					this.setHistoryData('otherPreserverFirst')
					this.setHistoryData('otherPreserverSecond')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if (this.validateItem(this.lifeRaftData, '救生筏')
					&& this.validateItem(this.otherPreserverFirstData, '其他救生设备')
					&& this.validateItem(this.otherPreserverSecondData, '其他救生设备')) {
					this.setForm('lifeRaft')
					this.setForm('otherPreserverFirst')
					this.setForm('otherPreserverSecond')
					return true
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.saving-wrapper {
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
