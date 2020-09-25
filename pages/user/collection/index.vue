<template>
	<view class="user-collection-container">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" swiperWidth="750" :is-scroll="false"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in 5" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%; min-height: 1500rpx;" @scrolltolower="onreachBottom">
					index:{{index}}
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import listLayout from '@/pages/components/list-layout/index.vue'
	export default {
		components: {
			listLayout
		},
		data () {
			return {
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				list: [
					{ name: '求职', type: 1 },
					{ name: '招聘', type: 2 },
					{ name: '资讯', type: 3 },
					{ name: '培训机构', type: 4 },
					{ name: '培训信息', type: 5 }
				]
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange (index) {
				this.swiperCurrent = index;
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
			// scroll-view到底部加载更多
			onreachBottom () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
