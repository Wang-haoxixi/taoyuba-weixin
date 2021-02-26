<template>
	<view class="danger-container">
		<view v-if="!show">
			<search-ship @getShip="getShip"></search-ship>
		</view>
		<view class="content-wrapper" v-else>
			<view v-show="tabsShow">
				<u-tabs-swiper ref="uTabs" :list="list" :is-scroll="true" @change="tabsChange" :current="current"></u-tabs-swiper>
			</view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 100vh">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-info @validate="onValidate" :ship-info="shipData" ref="pageInfo"></page-info>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100vh;width: 100%;">
						<view class="item">
							<page-crew @validate="onValidate" ref="pageCrew" :ship-info="shipData" @hide="hideTabs" @show="showTabs"></page-crew>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<view class="btn-submit" v-show="tabsShow">
				<u-button @click="onSubmit">提交</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import searchShip from './components/searchShip.vue'
	import pageInfo from './components/info.vue'
	import pageCrew from './components/crew.vue'
	export default {
		components: {
			searchShip,
			pageInfo,
			pageCrew
		},
		data () {
			return {
				tabsShow: true,
				show: false,
				current: 0,
				swiperCurrent: 0,
				list: [
					{ name: '基本信息' },
					{ name: '船员配置' },
					{ name: '救生设备' },
					{ name: '消防设备' },
					{ name: '信号设备' },
					{ name: '通道设备' },
					{ name: '其他情况' }
				],
				shipData: {},
				form: {}
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
				console.log('ship', data)
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
			onSubmit () {				
				if (this.$refs.pageInfo.onValidate() && this.$refs.pageCrew.onValidate()) {
					let pageInfoData = this.$refs.pageInfo.form
					let pageCrewData = this.$refs.pageCrew.form
					console.log('pageInfoData', pageInfoData)
					console.log('pageCrewData', pageCrewData)
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
<style scoped lang="scss">
	.danger-container {
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
