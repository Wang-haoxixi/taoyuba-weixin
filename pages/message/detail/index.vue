<template>
	<view class="message-detail-container phonex-mb">
		<view class="header-wrapper">
			<view class="title">{{data.name}}</view>
			<view class="time">{{data.time}}</view>
		</view>
		<view class="content-wrapper">
			{{data.content}}
			<view class="more" @click="onTo" v-if="data.type === '2'">详情</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: {}
			}
		},
		onLoad (params) {
			console.log('params', params)
			if (params.id) {
				this.getList(params.id)
			}
		},
		methods: {
			getList (id) {
				this.$http.get(`/tmlms/sysMsg/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			},
			onTo () {
				// 等于合同时跳转至合同页面,其他的跳转至例外页面
				if (this.data.type === '2') {
					uni.navigateTo({
						url: `/pages/base/web?src=https://m.taoyu58.com/api/tmlms/downLoad/intoContractHtml&contractId=${this.data.dataId}`
					})
				} else {
					// uni.navigateTo({
					// 	url: '/pages/message/detail1/index'
					// })
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.message-detail-container {
		padding: 0 30rpx;
		.header-wrapper {
			padding: 30rpx 0;
			border-bottom: 1px solid #f6f6f6;
			.title {
				font-size: 36rpx;
				color: #333;
				margin-bottom: 20rpx;
			}
			.time {
				color: #999;
				text-align: right;
				font-size: 28rpx;
			}
		}
		.content-wrapper {
			padding: 20rpx 0;
			color: #999;
			font-size: 28rpx;
			line-height: 1.6;
		}
		.more {
			margin-top: 20rpx;
			color: $color-blue;
			text-align: right;
		}
	}
</style>
