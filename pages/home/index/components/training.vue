<template>
	<view class="class-wrapper">
		<home-container>
			<u-tabs slot="header" font-size="32" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" is-scroll :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view class="" v-show="current === 0"  v-if="data1.length">
					<view class="trainning-item" v-for="(item, index) in data1" :key="index">
						<trainning-item :info="item" btn-text="详情"></trainning-item>
					</view>
					<view class="more" @tap="onToList('/pages/home/info/index')">更多</view>
				</view>
				<view class="" v-show="current === 1" v-if="data2.length">
					<!-- <trainning-item :info="item" btn-text="报名" v-for="(item, index) in data2" :key="index" @tap="onTo(item.userId)">
						<text slot="right">培训天数：{{item.count}}天</text>
					</trainning-item> -->
					<view class="article-wrapper" v-for="(item, index) in data2" :key="item.articleId">
						<training-info-item :info="item"></training-info-item>
					</view>
					<view class="more" @tap="onToList('/pages/home/info/index?index=1')">更多</view>
				</view>
				<!-- <view class="" v-show="current === 2">
					<trainning-item :info="item" btn-text="签到" v-for="(item, index) in data3" :key="index">
						<text slot="right">培训天数：{{item.count}}人</text>
					</trainning-item>
				</view>
				<view class="" v-show="current === 3">
					<trainning-item :info="item" btn-text="查看详情" v-for="(item, index) in data4" :key="index">
						<text slot="right">联系人：{{item.publisher}}</text>
					</trainning-item>
				</view> -->
			</template>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	import trainningItem from './training-item.vue'
	import trainingInfoItem from './training-info-item.vue'
	export default {
		components: {
			homeContainer,
			trainningItem,
			trainingInfoItem
		},
		data () {
			return {
				current: 0,
				list: [
					{ name: '培训机构' },
					{ name: '培训预约' },
					{ name: '证书查询' },
					{ name: '教程订购' }
				],
				data1: [],
				data2: [],
				data3: [],
				data4: []
			}
		},
		onReady () {
			this.init()
		},
		methods: {
			init () {
				this.getList1()
				this.getList2()
			},
			// tabs切换
			tabsChange (index) {
				if (index === 2) {
					uni.navigateTo({
						url: '/pages/home/info/index?index=2'
						// url: `/pages/base/web?src=https://m.taoyu58.com/careerplanning`
					})
				} else if (index === 3) {
					uni.navigateTo({
						url: '/pages/home/info/index?index=3'
					})
				} else{
					this.current = index
				}
			},
			// 培训机构
			getList1 () {
				this.$http.get('/tmlms/dept/pageForAll', {
					params: {
						size: 6
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data1 = data.data.records
					}
				})
			},
			// 培训信息
			getList2 () {
				this.$http.get('/tybhrms/tybarticle/page', {
					params: {
						size: 6,
						type: 8
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data2 = data.data.records
					}
				})
			},
			onTo (id) {
				uni.navigateTo({
					url: `/pages/home/training/detail/index?id=${id}`
				})
			},
			onToList (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},
		}
	}
</script>
<style scoped lang="scss">
	.article-wrapper {
		border-bottom: 1px solid #f6f6f6;
	}
	.trainning-item {
		border-bottom: 1px solid #f6f6f6;
	}
	.more {
		text-align: right;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		color: $color-blue;
	}
</style>

