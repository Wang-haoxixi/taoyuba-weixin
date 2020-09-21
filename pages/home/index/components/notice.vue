<template>
	<view class="content-wrapper">
		<home-container>
			<u-tabs slot="header" font-size="32" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view v-if="data1.length" class="notice-content" v-show="current === 0" :class="data1.length !== 0 ? 'pt30' : ''">
					<view v-for="(item, index) in data1" :key="index" @tap="onTo(item)">
						<news-item :info="item"></news-item>
					</view>
					<view class="more" @tap="onToList('/pages/home/news/list/index?type=1')">更多</view>
				</view>
				<view  v-if="data2.length" class="notice-content" v-show="current === 1" :class="data2.length !== 0 ? 'pt30' : ''">
					<view v-for="(item, index) in data2" :key="index" @tap="onTo(item)">
						<news-item :info="item"></news-item>
					</view>
					<view class="more" @tap="onToList('/pages/home/news/list/index?type=2')">更多</view>
					<!-- <notice-item v-for="(item, index) in data2" :key="index" :info="item" @tap="onTo(item)"></notice-item> -->
				</view>
				<!-- <view class="notice-content" v-show="current === 2" :class="data3.length !== 0 ? 'pt30' : ''">
					<notice-item v-for="(item, index) in data3" :key="index" :info="item" @tap="onTo(item)"></notice-item>
				</view> -->
			</template>
		</home-container>
	</view>
</template>

<script>
	import noticeItem from './notice-item.vue'
	import homeContainer from './container.vue'
	import newsItem from './news-item.vue'
	export default {
		components: {
			noticeItem,
			homeContainer,
			newsItem
		},
		data () {
			return {
				current: 0,
				swiperCurrent: 0,
				list: [
					{ name: '渔业资讯' },
					{ name: '政策法规' },
					// { name: '平台公告' },
				],
				data1: [],
				data2: [],
				data3: []
			}
		},
		onReady () {
			this.init()
		},
		methods: {
			init () {
				this.getList1()
				this.getList2()
				this.getList3()
			},
			// 渔业资讯
			getList1 () {
				this.$http.get('/tybhrms/tybarticle/page', {
					params: {
						size: 6,
						type: 1
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data1 = data.data.records
					}
				})
			},
			// 政策法规
			getList2 () {
				this.$http.get('/tybhrms/tybarticle/page', {
					params: {
						size: 6,
						type: 2
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let arr = []
						this.data2 = arr.concat(data.data.records)
					}
				})
			},
			// 政策法规
			getList3 () {
				this.$http.get('/tybhrms/tybarticle/page', {
					params: {
						size: 6,
						type: 7
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data3 = data.data.records
					}
				})
			},
			// tabs切换
			tabsChange (index) {
				this.current = index
			},
			onToList (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},
			onTo (row) {
				if (row.isDispatch) {
					if (row.httpSrc) {
						uni.navigateTo({
							url: `/pages/base/web?src=${row.httpSrc}`
						})
					}
				} else {
					uni.navigateTo({
						url: `/pages/home/news/detail/index?id=${row.articleId}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-wrapper {
		.notice-content {
			&.pt30 {
				padding-top: 30rpx;
			}
			.more {
				text-align: right;
				font-size: 28rpx;
				padding: 20rpx 30rpx;
				color: $color-blue;
			}
		}
	}
</style>
