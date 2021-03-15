<template>
	<view class="other-wrapper">
		<!-- 其他情况-->
		<view class="item-wrapper">
			<view class="title">渔捞起重设备</view>
			<view class="item">
				<component-choose :history-data="fishingEquipmentFirstHistoryData" v-model="fishingEquipmentFirstData" :title="constText.fishingEquipmentFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="fishingEquipmentSecondHistoryData" v-model="fishingEquipmentSecondData" :title="constText.fishingEquipmentSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="title">船体结构</view>
			<view class="item">
				<component-choose :history-data="hullFirstHistoryData" v-model="hullFirstData" :title="constText.hullFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="hullSecondHistoryData" v-model="hullSecondData" :title="constText.hullSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="hullThirdHistoryData" v-model="hullThirdData" :title="constText.hullThird" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="title">海底阀</view>
			<component-choose :history-data="submarineValveHistoryData" v-model="submarineValveData" :title="constText.submarineValve" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">渔获物储藏室</view>
			<component-choose :history-data="catchStorageRoomHistoryData" v-model="catchStorageRoomData" :title="constText.catchStorageRoom" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">机舱</view>
			<component-choose :history-data="engineRoomHistoryData" v-model="engineRoomData" :title="constText.engineRoom" @close="onClose" @open="onOpen"></component-choose>
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
					fishingEquipmentFirstResult: '', 
					fishingEquipmentFirstImage: '',
					fishingEquipmentSecondResult: '',
					fishingEquipmentSecondImage: '',
					hullFirstResult: '',
					hullFirstImage: '',
					hullSecondResult: '',
					hullSecondImage: '',
					hullThirdResult: '',
					hullThirdImage: '',
					submarineValveResult: '',
					submarineValveImage: '',
					catchStorageRoomResult: '',
					catchStorageRoomImage: '',
					engineRoomResult: '',
					engineRoomImage: '',
				},
				fishingEquipmentFirstData: { flag: 2, url: [] },
				fishingEquipmentSecondData: { flag: 2, url: [] },
				hullFirstData: { flag: 2, url: [] },
				hullSecondData: { flag: 2, url: [] },
				hullThirdData: { flag: 2, url: [] },
				submarineValveData: { flag: 2, url: [] },
				catchStorageRoomData: { flag: 2, url: [] },
				engineRoomData: { flag: 2, url: [] },
				fishingEquipmentFirstHistoryData: {},
				fishingEquipmentSecondHistoryData: {},
				hullFirstHistoryData: {},
				hullSecondHistoryData: {},
				hullThirdHistoryData: {},
				submarineValveHistoryData: {},
				catchStorageRoomHistoryData: {},
				engineRoomHistoryData: {}
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('fishingEquipmentFirst')
					this.setHistoryData('fishingEquipmentSecond')
					this.setHistoryData('hullFirst')
					this.setHistoryData('hullSecond')
					this.setHistoryData('hullThird')
					this.setHistoryData('submarineValve')
					this.setHistoryData('catchStorageRoom')
					this.setHistoryData('engineRoom')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if (this.validateItem(this.fishingEquipmentFirstData, '渔捞起重设备')
					&& this.validateItem(this.fishingEquipmentSecondData, '渔捞起重设备')
					&& this.validateItem(this.hullFirstData, '船体结构')
					&& this.validateItem(this.hullSecondData, '船体结构')
					&& this.validateItem(this.hullThirdData, '船体结构')
					&& this.validateItem(this.submarineValveData, '海底阀')
					&& this.validateItem(this.catchStorageRoomData, '渔获物储藏室')
					&& this.validateItem(this.engineRoomData, '机舱')) {
						
					this.setForm('fishingEquipmentFirst')
					this.setForm('fishingEquipmentSecond')
					this.setForm('hullFirst')
					this.setForm('hullSecond')
					this.setForm('hullThird')
					this.setForm('submarineValve')
					this.setForm('catchStorageRoom')
					this.setForm('engineRoom')
					return true
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.other-wrapper {
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
