<template>
	<view class="search-container">
		<view class="search-wrapper">
			<u-search placeholder="搜索" v-model="content" clearabled shape="square" bg-color="#fff" @custom="onSearch" @search="onSearch"></u-search>
		</view>
		<!-- 类型 -->
		<view class="">
			<u-tabs :bold="false" active-color="#ff9999" :bar-style="{background: '#ff9999'}" :list="list" :is-scroll="false" :current="current" @change="onChange"></u-tabs>
		</view>
		<!-- 热门搜索 -->
		<!-- <view class="hot-wrapper">
			<view class="title">热门搜索</view>
			<view class="content">
				<u-tag :text="item" @tap="onChooseTag(item)" v-for="(item, index) in hotList" :key="index" bg-color="#f4f4f4" border-color="#f4f4f4" type="info" class="item"/>
			</view>
		</view> -->
		<!-- 历史记录 -->
		<view class="history-wrapper" v-if="historyList.length">
			<view class="title">
				<text>历史搜索</text>
				<u-icon name="trash" size="38" color="#999" @tap="onClear"></u-icon>
			</view>
			<view class="content">
				<view class="item" v-for="(item, index) in historyList" :key="index">
					<text class="text u-line-1">{{item}}</text>
					<u-icon name="close" class="close" @click="onClose(index)"></u-icon>
				</view>
			</view>
		</view>
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
					{ name: '咨询', id: 0 },
					{ name: '招聘', id: 1 },
					{ name: '求职', id: 2 },
					{ name: '培训信息', id: 3 },
					{ name: '培训机构', id: 4 }
				],
				hotList: [],
				historyList: [],
				showHistory: false
			}
		},
		onLoad (params) {
			if (params.keyword) {
				this.content = params.keyword
			}
			if (params.type) {
				this.current = params.type
			}
			let historyList = this.$cache.get('historySearchList') 
			if (historyList) {
				this.historyList = historyList
			}
			console.log('this.historyList', this.historyList)
		},
		methods: {
			onChange (index) {
				this.current = index
			},
			// 打开清空弹窗
			onClear () {
				this.showHistory = true
			},
			onConfirm () {
				this.historyList = []
				this.$cache.set('historySearchList', this.historyList)
			},
			// 搜索
			onSearch () {
				if (this.content.trim() !== '') {
					let index = this.historyList.findIndex(item => item === this.content)
					if (index === -1) {
						this.historyList.unshift(this.content)
					} else if (index > 0) {
						this.historyList.splice(index, 1)
						this.historyList.unshift(this.content)
					}
					this.historyList = this.historyList.slice(0, 10)
					this.$cache.set('historySearchList', this.historyList)
				}
				let path = this.getPath(this.current)
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},
			getPath (type) {
				switch (type) {
					case 0:
						return `/pages/home/news/list/index?keyword=${this.content}`
					case 1:
						return `/pages/home/recruit/list/index?keyword=${this.content}`
					case 2:
						return `/pages/home/resume/list/index?keyword=${this.content}`
					case 3:
						return ``
					case 4:
						return `/pages/home/training/list/index?keyword=${this.content}`
				}
			},
			// 选择标签
			onChooseTag (content) {
				this.content = content
				this.onSearch()
			},
			onClose (index) {
				this.historyList.splice(index, 1)
				this.$cache.set('historySearchList', this.historyList)
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
				.item {
					width: 100%;
					overflow: hidden;
					display: flex;
					padding: 30rpx 30rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					justify-content: space-between;
					border-bottom: 1px solid #f6f6f6;
					.text {
						// width: 100%;
						display: block;
						flex: 1 1 auto;
					}
					.close {
						text-align: center;
						flex: 0 0 40rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
