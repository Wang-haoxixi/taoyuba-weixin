<template>
	<view class="firw-control-container">
		<!-- 消防设备 -->
		<view class="item-wrapper">
			<view class="title">水消防</view>
			<view class="item">
				<component-choose :history-data="waterFireFightingFirstHistoryData" v-model="waterFireFightingFirstData" :title="constText.waterFireFightingFirst1" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="waterFireFightingSecondHistoryData" v-model="waterFireFightingSecondData" :title="constText.waterFireFightingSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="title">厨房防火</view>
			<view class="item">
				<component-choose :history-data="kitchenFirstHistoryData" v-model="kitchenFirstData" :title="constText.kitchenFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="kitchenSecondHistoryData" v-model="kitchenSecondData" :title="constText.kitchenSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="kitchenThirdHistoryData" v-model="kitchenThirdData" :title="constText.kitchenThird" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		
		<view class="item-wrapper">
			<view class="title">机舱防火</view>
			<view class="item">
				<component-choose :history-data="engineRoomFirstHistoryData" v-model="engineRoomFirstData" :title="constText.engineRoomFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="engineRoomSecondHistoryData" v-model="engineRoomSecondData" :title="constText.engineRoomSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="engineRoomThirdHistoryData" v-model="engineRoomThirdData" :title="constText.engineRoomThird" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="engineRoomFourthHistoryData" v-model="engineRoomFourthData" :title="constText.engineRoomFourth" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="title">电气设备防火</view>
			<view class="item">
				<component-choose :history-data="electricAccessoryFirstHistoryData" v-model="electricAccessoryFirstData" :title="constText.electricAccessoryFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="electricAccessorySecondHistoryData" v-model="electricAccessorySecondData" :title="constText.electricAccessorySecond" @close="onClose" @open="onOpen"></component-choose>
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
					waterFireFightingFirstResult: '',
					waterFireFightingFirstImage: '',
					waterFireFightingSecondResult: '',
					waterFireFightingSecondImage: '',
					kitchenFirstResult: '',
					kitchenFirstImage: '',
					kitchenSecondResult: '',
					kitchenSecondImage: '',
					kitchenThirdResult: '',
					kitchenThirdImage: '',
					electricAccessoryFirstResult: '',
					electricAccessoryFirstImage: '',
					electricAccessorySecondResult: '',
					electricAccessorySecondImage: '',
					engineRoomFirstResult: '',
					engineRoomFirstImage: '',
					engineRoomSecondResult: '',
					engineRoomSecondImage: '',
					engineRoomThirdResult: '',
					engineRoomThirdImage: '',
					engineRoomFourthResult: '',
					engineRoomFourthImage: '',
				},
				waterFireFightingFirstData: { flag: 2, url: [] },
				waterFireFightingSecondData: { flag: 2, url: [] },
				kitchenFirstData: { flag: 2, url: [] },
				kitchenSecondData: { flag: 2, url: [] },
				kitchenThirdData: { flag: 2, url: [] },
				engineRoomFirstData: { flag: 2, url: [] },
				engineRoomSecondData: { flag: 2, url: [] },
				engineRoomThirdData: { flag: 2, url: [] },
				engineRoomFourthData: { flag: 2, url: [] },
				electricAccessoryFirstData: { flag: 2, url: [] },
				electricAccessorySecondData: { flag: 2, url: [] },
				waterFireFightingFirstHistoryData: {},
				waterFireFightingSecondHistoryData: {},
				kitchenFirstHistoryData: {},
				kitchenSecondHistoryData: {},
				kitchenThirdHistoryData: {},
				engineRoomFirstHistoryData: {},
				engineRoomSecondHistoryData: {},
				engineRoomThirdHistoryData: {},
				engineRoomFourthHistoryData: {},
				electricAccessoryFirstHistoryData: {},
				electricAccessorySecondHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('waterFireFightingFirst')
					this.setHistoryData('waterFireFightingSecond')
					this.setHistoryData('kitchenFirst')
					this.setHistoryData('kitchenSecond')
					this.setHistoryData('kitchenThird')
					this.setHistoryData('engineRoomFirst')
					this.setHistoryData('engineRoomSecond')
					this.setHistoryData('engineRoomThird')
					this.setHistoryData('engineRoomFourth')
					this.setHistoryData('electricAccessoryFirst')
					this.setHistoryData('electricAccessorySecond')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if ( this.validateItem(this.waterFireFightingFirstData, '水消防')
					&& this.validateItem(this.waterFireFightingSecondData, '水消防')
					&& this.validateItem(this.kitchenFirstData, '厨房防火')
					&& this.validateItem(this.kitchenSecondData, '厨房防火')
					&& this.validateItem(this.kitchenThirdData, '厨房防火')
					&& this.validateItem(this.engineRoomFirstData, '机舱防火')
					&& this.validateItem(this.engineRoomSecondData, '机舱防火')
					&& this.validateItem(this.engineRoomThirdData, '机舱防火')
					&& this.validateItem(this.engineRoomFourthData, '机舱防火')
					&& this.validateItem(this.electricAccessoryFirstData, '电气设备防火')
					&& this.validateItem(this.electricAccessorySecondData, '电气设备防火')) {
						
					this.setForm('waterFireFightingFirst')
					this.setForm('waterFireFightingSecond')
					this.setForm('kitchenFirst')
					this.setForm('kitchenSecond')
					this.setForm('kitchenThird')
					this.setForm('engineRoomFirst')
					this.setForm('engineRoomSecond')
					this.setForm('engineRoomThird')
					this.setForm('engineRoomFourth')
					this.setForm('electricAccessoryFirst')
					this.setForm('electricAccessorySecond')
					
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

