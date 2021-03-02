<template>
	<view class="lifesaving-wrapper">
		<!-- 救生设备 -->
		<view class="item-wrapper">
			<view class="title">救生筏</view>
			<component-choose :history-data="lifeRaftHistoryData" v-model="lifeRaftData" :title="constText.lifeRaft" @close="onClose" @open="onOpen"></component-choose>
		</view>
		<view class="item-wrapper">
			<view class="title">救生圈</view>
			<view class="item">
				<component-choose :history-data="ringBuoyFirstHistoryData" v-model="ringBuoyFirstData" :title="constText.ringBuoyFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="ringBuoySecondHistoryData" v-model="ringBuoySecondData" :title="constText.ringBuoySecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="ringBuoyThirdHistoryData" v-model="ringBuoyThirdData" :title="constText.ringBuoyThird" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="ringBuoyFourthHistoryData" v-model="ringBuoyFourthData" :title="constText.ringBuoyFourth" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="ringBuoyFifthHistoryData" v-model="ringBuoyFifthData" :title="constText.ringBuoyFifth" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="title">救生衣</view>
			<view class="item">
				<component-choose :history-data="lifeJackFirstHistoryData" v-model="lifeJackFirstData" :title="constText.lifeJackFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="lifeJackSecondHistoryData" v-model="lifeJackSecondData" :title="constText.lifeJackSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="lifeJackThirdHistoryData" v-model="lifeJackThirdData" :title="constText.lifeJackThird" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="lifeJackFourthHistoryData" v-model="lifeJackFourthData" :title="constText.lifeJackFourth" @close="onClose" @open="onOpen"></component-choose>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="title">其他救生设备</view>
			<view class="item">
				<component-choose :history-data="otherPreserverFirstHistoryData" v-model="otherPreserverFirstData" :title="constText.otherPreserverFirst" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="otherPreserverSecondHistoryData" v-model="otherPreserverSecondData" :title="constText.otherPreserverSecond" @close="onClose" @open="onOpen"></component-choose>
			</view>
			<view class="item">
				<component-choose :history-data="otherPreserverThirdHistoryData" v-model="otherPreserverThirdData" :title="constText.otherPreserverThird" @close="onClose" @open="onOpen"></component-choose>
			</view>
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
					lifeRaftResult: '', // 救生筏
					lifeRaftImage: '',
					ringBuoyFirstResult: '', // 救生圈排查重点1
					ringBuoyFirstImage: '',
					ringBuoySecondResult: '', // 救生圈排查重点2
					ringBuoySecondImage: '',
					ringBuoyThirdResult: '', // 救生圈排查重点3
					ringBuoyThirdImage: '',
					ringBuoyFourthResult: '', // 救生圈排查重点4
					ringBuoyFourthImage: '',
					ringBuoyFifthResult: '', // 救生圈排查重点5
					ringBuoyFifthImage: '',
					lifeJackFirstResult: '', // 救生衣排查重点1
					lifeJackFirstImage: '',
					lifeJackSecondResult: '', // 救生衣排查重点2
					lifeJackSecondImage: '',
					lifeJackThirdResult: '', // 救生衣排查重点3
					lifeJackThirdImage: '',
					lifeJackFourthResult: '', // 救生衣排查重点4
					lifeJackFourthImage: '',
					otherPreserverFirstResult: '', // 其他救生设备排查重点1
					otherPreserverFirstImage: '',
					otherPreserverSecondResult: '', // 其他救生设备排查重点2
					otherPreserverSecondImage: '', 
					otherPreserverThirdResult: '', // 其他救生设备排查重点3
					otherPreserverThirdImage: '', 
				},
				lifeRaftData: { flag: 2, url: '' },
				ringBuoyFirstData: { flag: 2, url: '' },
				ringBuoySecondData: { flag: 2, url: '' },
				ringBuoyThirdData: { flag: 2, url: '' },
				ringBuoyFourthData: { flag: 2, url: '' },
				ringBuoyFifthData: { flag: 2, url: '' },
				lifeJackFirstData: { flag: 2, url: '' },
				lifeJackSecondData: { flag: 2, url: '' },
				lifeJackThirdData: { flag: 2, url: '' },
				lifeJackFourthData: { flag: 2, url: '' },
				otherPreserverFirstData: { flag: 2, url: '' },
				otherPreserverSecondData: { flag: 2, url: '' },
				otherPreserverThirdData: { flag: 2, url: '' },
				lifeRaftHistoryData: {},
				ringBuoyFirstHistoryData: {},
				ringBuoySecondHistoryData: {},
				ringBuoyThirdHistoryData: {},
				ringBuoyFourthHistoryData: {},
				ringBuoyFifthHistoryData: {},
				lifeJackFirstHistoryData: {},
				lifeJackSecondHistoryData: {},
				lifeJackThirdHistoryData: {},
				lifeJackFourthHistoryData: {},
				otherPreserverFirstHistoryData: {},
				otherPreserverSecondHistoryData: {},
				otherPreserverThirdHistoryData: {},
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					this.setHistoryData('lifeRaft')
					this.setHistoryData('ringBuoyFirst')
					this.setHistoryData('ringBuoySecond')
					this.setHistoryData('ringBuoyThird')
					this.setHistoryData('ringBuoyFourth')
					this.setHistoryData('ringBuoyFifth')
					this.setHistoryData('lifeJackFirst')
					this.setHistoryData('lifeJackSecond')
					this.setHistoryData('lifeJackThird')
					this.setHistoryData('lifeJackFourth')
					this.setHistoryData('otherPreserverFirst')
					this.setHistoryData('otherPreserverSecond')
					this.setHistoryData('otherPreserverThird')
				},
				deep: true,
			}
		},
		methods: {
			onValidate () {
				if (this.validateItem(this.lifeRaftData, '救生筏', 'lifeRaft') 
					&& this.validateItem(this.ringBuoyFirstData, '救生圈', 'ringBuoyFirst') 
					&& this.validateItem(this.ringBuoySecondData, '救生圈', 'ringBuoySecond')
					&& this.validateItem(this.ringBuoyThirdData, '救生圈', 'ringBuoyThird')
					&& this.validateItem(this.ringBuoyFourthData, '救生圈', 'ringBuoyFourth')
					&& this.validateItem(this.ringBuoyFifthData, '救生圈', 'ringBuoyFifth')
					&& this.validateItem(this.lifeJackFirstData, '救生衣', 'lifeJackFirst')
					&& this.validateItem(this.lifeJackSecondData, '救生衣', 'lifeJackSecond')
					&& this.validateItem(this.lifeJackThirdData, '救生衣', 'lifeJackThird')
					&& this.validateItem(this.lifeJackFourthData, '救生衣', 'lifeJackFourth')
					&& this.validateItem(this.otherPreserverFirstData, '其他救生设备', 'otherPreserverFirst')
					&& this.validateItem(this.otherPreserverSecondData, '其他救生设备', 'otherPreserverSecond')
					&& this.validateItem(this.otherPreserverThirdData, '其他救生设备', 'otherPreserverThird')) {
					
					this.setForm('lifeRaft')
					this.setForm('ringBuoyFirst')
					this.setForm('ringBuoySecond')
					this.setForm('ringBuoyThird')
					this.setForm('ringBuoyFourth')
					this.setForm('ringBuoyFifth')
					this.setForm('lifeJackFirst')
					this.setForm('lifeJackSecond')
					this.setForm('lifeJackThird')
					this.setForm('lifeJackFourth')
					this.setForm('otherPreserverFirst')
					this.setForm('otherPreserverSecond')
					this.setForm('otherPreserverThird')
					
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lifesaving-wrapper {
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
