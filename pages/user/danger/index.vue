<template>
	<view class="danger-container">
		<view v-if="!show">
			<search-ship @getShip="getShip"></search-ship>
		</view>
		<view class="" v-else>
			<view>
				<u-tabs-swiper ref="tabs" :list="list" :is-scroll="true" @change="tabsChange" :current="current"></u-tabs-swiper>
			</view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 800rpx;width: 100%;">
						<page-info></page-info>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import searchShip from './components/searchShip.vue'
	import pageInfo from './components/info.vue'
	export default {
		components: {
			searchShip,
			pageInfo
		},
		data () {
			return {
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
				shipForm: {},
				form: {}
			}
		},
		methods: {
			getShip (data) {
				this.shipForm = data
				this.show = this.shipForm.shipName
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
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
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
		
	}
</style>
