<template>
	<view class="search-container">
		<view class="search-wrapper">
			<u-search placeholder="搜索" v-model="content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
		</view>
		<!-- 类型 -->
		<view class="">
			<u-tabs :bold="false" active-color="#ff9999" :bar-style="{background: '#ff9999'}" :list="list" :is-scroll="false" :current="current" @change="onChange"></u-tabs>
		</view>
		<view class="content-wrapper">
			<!-- 历史记录 -->
			<view class="history-wrapper" v-if="historyList.length">
				<view class="title">
					<text>历史搜索</text>
					<u-icon name="trash" size="38" color="#999" @tap="onClear"></u-icon>
				</view>
				<view class="content">
					<u-tag @click="onChooseTag(item)" :text="item" class="item" type="info" mode="plain" v-for="(item, index) in historyList" :key="index"/>
				</view>
			</view>
		</view>
		<!-- 热门搜索 -->
		<!-- <view class="hot-wrapper">
			<view class="title">热门搜索</view>
			<view class="content">
				<u-tag :text="item" @tap="onChooseTag(item)" v-for="(item, index) in hotList" :key="index" bg-color="#f4f4f4" border-color="#f4f4f4" type="info" class="item"/>
			</view>
		</view> -->
		
		<u-modal show-cancel-button :show-title="false" v-model="showHistory" mask-close-able cancel-color="#666" confirm-color="#ff632a" content="确定删除吗" @confirm="onConfirm"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data () {
			return {
				current: 0,
				content: '',
				list: [
					{ name: '资讯', id: 1 },
					{ name: '招聘', id: 2 },
					{ name: '求职', id: 3 },
					{ name: '培训信息', id: 4 },
					{ name: '培训机构', id: 5 }
				],
				historyNews: this.$cache.get('historyNews') || [], // 咨询
				historyRecruit: this.$cache.get('historyRecruit') || [], // 招聘
				historyResume: this.$cache.get('historyResume') || [], // 求职
				historyTraining: this.$cache.get('historyTraining') || [], // 培训机构
				historyTrainingInfo: this.$cache.get('historyTrainingInfo') || [], // 培训信息
				hotList: [],
				historyList: [],
				showHistory: false
			}
		},
		// computed: {
		// 	historyList () {
				// let name = this.findHistoryName()
				// console.log('historyList', this.current, name)
				// return this[name] || []
		// 	}
		// },
		watch: {
			current: {
				handler (newVal) {
					let name = this.findHistoryName()
					this.historyList = this[name]
				},
				deep: true,
				immediate: true
			}
		},
		onLoad (params) {
			if (params.keyword) {
				this.content = params.keyword
			}
			if (params.type) {
				this.current = +params.type
			}
			let historyList = this.$cache.get('historySearchList') 
			if (historyList) {
				this.historyList = historyList
			}
		},
		methods: {
			onChange (index) {
				this.current = index
			},
			// 打开清空弹窗
			onClear () {
				this.showHistory = true
			},
			// 同意删除
			onConfirm () {
				let name = this.findHistoryName()
				if (name) {
					this[name] = []
					this.$cache.set(name, this[name])
					this.historyList = []
				}
			},
			findHistoryName () {
				let current = this.current
				if (current === 0) {
					return 'historyNews'
				} else if (current === 1) {
					return 'historyRecruit'
				} else if (current === 2) {
					return 'historyResume'
				} else if (current === 3) {
					return 'historyTraining'
				} else if (current === 4) {
					return 'historyTrainingInfo'
				}
				return ''
			},
			// 搜索
			onSearch () {
				if (this.content.trim() !== '') {
					let index = this.historyList.findIndex(item => item === this.content)
					let name = this.findHistoryName()
					if (index === -1) {
						this[name].unshift(this.content)
					} else if (index > 0) {
						this[name].splice(index, 1)
						this[name].unshift(this.content)
					}
					this[name] = this[name].slice(0, 10)
					this.$cache.set(name, this[name])
				}
				let path = this.getPath()
				console.log('path', path, this.current)
				if (path) {
					uni.redirectTo({
						url: path
					})
				}
			},
			getPath () {
				if (this.current === 0) {
					return `/pages/home/news/list/index?keyword=${this.content}`
				} else if (this.current === 1) {
					return `/pages/home/recruit/list/index?keyword=${this.content}`
				} else if (this.current === 2) {
					return `/pages/home/resume/list/index?keyword=${this.content}`
				} else if (this.current === 3) {
					return `/pages/home/training-info/list/index?keyword=${this.content}`
				} else if (this.current === 4) {
					return `/pages/home/training/list/index?keyword=${this.content}`
				}
				return ''
			},
			// 选择标签
			onChooseTag (content) {
				this.content = content
				this.onSearch()
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-container {
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		/* #endif */
		.search-wrapper {
			padding: 20rpx;
		}
		.hot-wrapper {
			width: 90%;
			margin: 20rpx auto;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 8rpx;
			.title {
				color: #999999;
				font-size: 24rpx;
				margin-bottom: 20rpx;
			}
			.content {
				.item {
					display: inline-block;
					margin: 0 20rpx 20rpx 0;
				}
			}
		}
		.history-wrapper {
			.title {
				padding: 30rpx 40rpx;
				font-size: 32rpx;
				display: flex;
				color: #999;
				justify-content: space-between;
			}
			.content {
				background-color: #fff;
				color: #999;
				width: 100%;
				overflow: hidden;
				padding: 20rpx 20rpx 5rpx;
				.item {
					margin: 0 15rpx 15rpx 0;
					display: inline-block;
				}
			}
		}
	}
</style>
