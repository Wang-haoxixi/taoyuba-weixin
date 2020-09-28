<template>
	<view class="user-collection-container">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" swiperWidth="750" :is-scroll="false"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<!-- 求职 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom(1)">
					<list-layout :data="data1" empty-text="暂无收藏">
						<view class="view" @tap="onTo(item, 1)" v-for="item in data1" :key="item.id">
							<view class="title u-line-1">{{item.collectedShowTitle}}</view>
						</view>
					</list-layout>
				</scroll-view>
			</swiper-item>
			<!-- 招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom(2)">
					<list-layout :data="data2" empty-text="暂无收藏">
						<view class="view" @tap="onTo(item, 2)" v-for="item in data2" :key="item.id">
							<view class="title u-line-1">{{item.collectedShowTitle}}</view>
						</view>
					</list-layout>
				</scroll-view>
			</swiper-item>
			<!-- 资讯 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom(3)">
					<list-layout :data="data3" empty-text="暂无收藏">
						<view class="view" @tap="onTo(item, 3)" v-for="item in data3" :key="item.id">
							<view class="title u-line-1">{{item.collectedShowTitle}}</view>
						</view>
					</list-layout>
				</scroll-view>
			</swiper-item>
			<!-- 培训机构 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom(4)">
					<list-layout :data="data4" empty-text="暂无收藏">
						<view class="view" @tap="onTo(item, 4)" v-for="item in data4" :key="item.id">
							<view class="title u-line-1">{{item.collectedShowTitle}}</view>
						</view>
					</list-layout>
				</scroll-view>
			</swiper-item>
			<!-- 培训信息 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%; min-height: 1500rpx;" @scrolltolower="onreachBottom(5)">
					<list-layout :data="data5" empty-text="暂无收藏">
						<view class="view" @tap="onTo(item, 5)" v-for="item in data5" :key="item.id">
							<view class="title u-line-1">{{item.collectedShowTitle}}</view>
						</view>
					</list-layout>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import listLayout from '@/pages/components/list-layout/index.vue'
	import pageMixin from '@/pages/mixins/page.js'
	export default {
		mixins: [pageMixin],
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
				],
				status1: 'loadmore',
				status2: 'loadmore',
				status3: 'loadmore',
				status4: 'loadmore',
				status5: 'loadmore',
				data1: [],
				data2: [],
				data3: [],
				data4: [],
				data5: [],
				once: {
					one: true,
					two: false,
					three: false,
					four: false,
					five: false
				},
				page1: { total: 0, current: 1, size: 20 },
				page2: { total: 0, current: 1, size: 20 },
				page3: { total: 0, current: 1, size: 20 },
				page4: { total: 0, current: 1, size: 20 },
				page5: { total: 0, current: 1, size: 20 },
			}
		},
		onShow () {
			let current = this.current +  1
			this[`data${current}`] = []
			this[`page${current}`].current = 1
			this.getList(current)
		},
		watch: {
			current (newVal) {
				if (newVal === 0 && !this.once.one) {
					this.once.one = true
					this.getList(1)
				} else if (newVal === 1 && !this.once.two) {
					this.once.two = true
					this.getList(2)
				} else if (newVal === 2 && !this.once.three) {
					this.once.three = true
					this.getList(3)
				} else if (newVal === 3 && !this.once.four) {
					this.once.four = true
					this.getList(4)
				} else if (newVal === 4 && !this.once.five) {
					this.once.five = true
					this.getList(5)
				}
			}
		},
		methods: {
			getList (index) {
				this.$http.get('/tmlms/crewCollect/getPage', {
					params: {
						size: this[`page${index}`].size,
						current: this[`page${index}`].current,
						collectType: index
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this[`data${index}`] = this[`data${index}`].concat(result.records)
						this[`page${index}`].total = result.total
					}
				})
			},
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
			onreachBottom (index) {
				console.log('onreachBottom 到底部加载更多')
				let current = this.current +  1
				if (this[`page${current}`].total > this[`page${current}`].current * this[`page${current}`].size) {
					this[`status${current}`] = 'loading'
					this[`page${current}`].current++
					this.getList(current)
				}
			},
			onTo(row, index) {
				let path = ''
				// 求职 1，招聘 2，资讯 3，培训机构 4，培训信息 5 
				if (index === 1) {
					path = `/pages/home/resume/detail/index?id=${row.collectedId}`
				} else if (index === 2) {
					path = `/pages/home/recruit/detail/index?id=${row.collectedId}`
				} else if (index === 3) {
					path = `/pages/home/news/detail/index?id=${row.collectedId}`
				} else if (index === 4) {
					path = `/pages/home/training/detail/index?id=${row.collectedId}`
				} else if (index === 5) {
					path = `/pages/home/training-info/detail/index?id=${row.collectedId}`
				}
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-collection-container {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.view {
		padding: 30rpx;
		background-color: #fff;
		font-size: 32rpx;
		color: #333;
		border-bottom: 1px solid #f6f6f6;
	}
	.swiper-item {
		height: 100%;
	}
</style>
