<template>
	<view class="book-list-container safe-padding-bottom">
		<view class="tip-wrapper">
			<view class="title">浙江省海洋渔业船舶交易服务中心专营</view>
			<view class="text">订购电话：0571-89916991</view>
			<view class="text">
				<text class="name">联系人：申屠老师</text>
				<text>周一至周五 9：00~17：00</text>
			</view>
		</view>
		<view class="book-content">
			<template v-for="item in data">
				<book-item :key="item.id" :title="item.title" :info="item.info" :price="item.price" :imgUrl="item.bookImg"></book-item>
			</template>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import bookItem from './components/book-item.vue'
	export default {
		components: {
			bookItem
		},
		mixins: [pageMixin],
		data () {
			return {
				data: []
			}
		},
		onPullDownRefresh () {
			this.data = []
			this.page.current = 1
			this.getList()
		},
		onLoad () {
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tybhrms/tybbook/page', {
					params: {
						size: this.page.size,
						current: this.page.current
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
					}
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tip-wrapper {
		padding: 30rpx;
		background-color: #fff;
		margin-bottom: 10rpx;
		.title {
			font-size: 32rpx;
			color: #333;
			margin-bottom: 10rpx;
		}
		.text {
			font-size: 28rpx;
			color: #999;
			margin-bottom: 10rpx;
			.name {
				margin-right: 20rpx;
			}
		}
	}
</style>
