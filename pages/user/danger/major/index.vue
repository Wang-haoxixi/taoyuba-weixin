<template>
	<view class="major-container">
		<view v-if="!show">
			<search-ship @getShip="getShip"></search-ship>
		</view>
		<view class="content-wrapper" v-else>
			<view v-show="tabsShow">
				<u-tabs-swiper :show-bar="false" active-color="#ff9999" :bar-style="{background: '#ff9999'}" ref="uTabs" :list="list" :is-scroll="true" @change="tabsChange" :current="current"></u-tabs-swiper>
			</view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 100vh">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-info :historyData="historyData" @validate="onValidate" :ship-info="shipData" ref="pageInfo"></page-info>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-machine :historyData="historyData" @validate="onValidate" ref="pageMachine" @hide="hideTabs" @show="showTabs"></page-machine>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-saving :historyData="historyData" @validate="onValidate" ref="pageSaving" @hide="hideTabs" @show="showTabs"></page-saving>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-alarm :historyData="historyData" @validate="onValidate" ref="pageAlarm" @hide="hideTabs" @show="showTabs"></page-alarm>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-signal :historyData="historyData" @validate="onValidate" ref="pageSignal" @hide="hideTabs" @show="showTabs"></page-signal>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-fire-control :historyData="historyData" @validate="onValidate" ref="pageFireControl" @hide="hideTabs" @show="showTabs"></page-fire-control>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-other :historyData="historyData" @validate="onValidate" ref="pageOther" @hide="hideTabs" @show="showTabs"></page-other>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<view class="btn-submit" v-show="tabsShow">
				<u-button @click="onSubmit" :loading="loading">提交</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import searchShip from '../common/components/searchShip.vue'
	import pageInfo from '../common/components/info.vue'
	import pageMachine from './components/machine.vue'
	import pageSaving from './components/saving.vue'
	import pageAlarm from './components/alarm.vue'
	import pageFireControl from './components/fireControl.vue'
	import pageSignal from './components/signal.vue'
	import pageOther from './components/other.vue'
	export default {
		components: {
			searchShip,
			pageInfo,
			pageMachine,
			pageSaving,
			pageAlarm,
			pageFireControl,
			pageOther,
			pageSignal
		},
		data () {
			return {
				tabsShow: true,
				show: false,
				current: 0,
				swiperCurrent: 0,
				loading: false,
				list: [
					{ name: '基本信息' },
					{ name: '四种机器' },
					{ name: '救生设备' },
					{ name: '警报设备' },
					{ name: '信号设备' },
					{ name: '消防、防火情况' },
					{ name: '其他情况' }
				],
				shipData: {},
				form: {},
				historyData: {}
			}
		},
		methods: {
			showTabs () {
				this.tabsShow = true
			},
			hideTabs () {
				this.tabsShow = false
			},
			getShip (data) {
				this.shipData = data
				this.show = this.shipData.shipName
				this.getList()
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index
				this.current = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			onValidate (text) {
				this.$refs.uToast.show({
					title: text,
					duration: 4000
				})
			},
			getList () {
				if (this.shipData.shipNo) {
					this.$http.get('/tmlms/tybTroubleshootReport/pageByShipNo', {
						params: {
							shipNo: this.shipData.shipNo,
							shipName: this.shipData.shipName,
							reportType: 1
						}
					}).then(({ data }) => {
						if (data.code === 0) {
							let val = data.data.records
							if (val.length !== 0) {
								this.historyData = val[0]
							}
						}
					})
				}
			},
			onSubmit () {
				if (this.$refs.pageInfo.onValidate()
					&& this.$refs.pageMachine.onValidate()
					&& this.$refs.pageSaving.onValidate()
					&& this.$refs.pageSignal.onValidate()
					&& this.$refs.pageAlarm.onValidate()
					&& this.$refs.pageFireControl.onValidate()
					&& this.$refs.pageOther.onValidate()) {
					
					let pageInfoData = this.$refs.pageInfo.form
					let pageMachineData = this.$refs.pageMachine.form
					let pageSavingData = this.$refs.pageSaving.form
					let pageSignalData = this.$refs.pageSignal.form
					let pageAlarmData = this.$refs.pageAlarm.form
					let pageFireControlData = this.$refs.pageFireControl.form
					let pageOtherData = this.$refs.pageOther.form
					
					// console.log('pageInfoData', pageInfoData)
					// console.log('pageMachineData', pageMachineData)
					// console.log('pageSavingData', pageSavingData)
					// console.log('pageSignalData', pageSignalData)
					// console.log('pageAlarmData', pageAlarmData)
					// console.log('pageFireControlData', pageFireControlData)
					// console.log('pageOtherData', pageOtherData)
					let form = Object.assign({}, pageInfoData, pageMachineData, pageSavingData, pageSignalData, pageAlarmData, pageFireControlData, pageOtherData)
					if (Object.keys(this.historyData).length > 0 && this.historyData.id) {
						form.lastId = this.historyData.id
					} else {
						form.lastId = 0
					}
					form.reportType = 1
					// return
					this.loading = true
					this.$http.post('/tmlms/tybTroubleshootReport/save', form).then(({ data }) => {
						this.loading = false
						if (data.code === 0) {
							this.$refs.uToast.show({
								title: '提交成功',
								isTab: true,
								url: '/pages/user/index/index'
							})
						}
					}).catch(() => {
						this.loading = false
					})
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.major-container {
		.item {
			padding: 20rpx 20px;
		}
		.btn-submit {
			background-color: #fff;
			padding: 30rpx 20rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			border-top: 1px solid #f6f6f6;
		}
	}
</style>
