<template>
	<view class="firw-control-container">
		<!-- 消防设备 -->
		<view class="item-wrapper">
			<view class="title">灭火器</view>
			<view class="item">
				<component-choose :history-data="extinguisherFirstHistoryData" v-model="extinguisherFirstData" :title="constText.extinguisherFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="extinguisherSecondHistoryData" v-model="extinguisherSecondData" :title="constText.extinguisherSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="extinguisherThirdHistoryData" v-model="extinguisherThirdData" :title="constText.extinguisherThird" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="title">水消防</view>
			<component-choose :history-data="waterFireFightingFirstHistoryData" v-model="waterFireFightingFirstData" :title="constText.waterFireFightingFirst" @close="onClose" @open="onOpen"></component-choose>
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
					extinguisherFirstResult: '',
					extinguisherFirstImage: '',
					extinguisherSecondResult: '',
					extinguisherSecondImage: '',
					extinguisherThirdResult: '',
					extinguisherThirdImage: '',
					waterFireFightingFirstResult: '',
					waterFireFightingFirstImage: ''
				},
				extinguisherFirstData: { flag: 2, url: '' },
				extinguisherSecondData: { flag: 2, url: '' },
				extinguisherThirdData: { flag: 2, url: '' },
				waterFireFightingFirstData: { flag: 2, url: '' },
				extinguisherFirstHistoryData: {},
				extinguisherSecondHistoryData: {},
				extinguisherThirdHistoryData: {},
				waterFireFightingFirstHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('extinguisherFirst')
					this.setHistoryData('extinguisherSecond')
					this.setHistoryData('extinguisherThird')
					this.setHistoryData('waterFireFightingFirst')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if ( this.validateItem(this.extinguisherFirstData, '救生圈', 'extinguisherFirst')
					&& this.validateItem(this.extinguisherSecondData, '救生圈', 'extinguisherSecond')
					&& this.validateItem(this.extinguisherThirdData, '救生圈', 'extinguisherThird')
					&& this.validateItem(this.waterFireFightingFirstData, '水消防', 'waterFireFightingFirst')) {
					this.setForm('extinguisherFirst')
					this.setForm('extinguisherSecond')
					this.setForm('extinguisherThird')
					this.setForm('waterFireFightingFirst')
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.firw-control-container {
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

