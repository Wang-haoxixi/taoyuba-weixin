<template>
	<view class="news-detail-wrapper phonex-mb">
		<view class="header-wrapper">
			<view class="title">{{data.title}}</view>
			<view class="desc">
				<text>{{data.source}}</text>
				<text>{{data.createTime}}</text>
			</view>
			
		</view>
		<view class="content-wrapper">
			<u-parse :html="data.articleContent"></u-parse>
		</view>
		<share-group></share-group>
	</view>
</template>

<script>
	import shareGroup from '@/pages/components/share/index.vue'
	export default {
		components: {
			shareGroup
		},
		onShareAppMessage (res) {
			console.log('onShareAppMessage', res)
			return {
				title: `${this.data.title}`,
				path: `/pages/home/training-info/detail/index?id=${this.id}`,
				imageUrl: this.data.image
			}
		},
		onShareTimeline (res) {
			console.log('onShareTimeline', res)
			return {
				title: `${this.data.title}`,
				path: `/pages/home/training-info/detail/index?id=${this.id}`,
				imageUrl: `${this.$IMAGE_URL}/blue-logo.png`
			}
		},
		data () {
			return {
				data: {}
			}
		},
		onLoad (params) {
			if (params.id) {
				this.getList(params.id)
			}
		},
		methods: {
			getList (id) {
				this.$http.get(`/tybhrms/tybarticle/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.news-detail-wrapper {
		margin-bottom: 30rpx;
		padding: 0 30rpx;
		.header-wrapper {
			padding: 30rpx 0;
			border-bottom: 1px solid #f6f6f6;
			.img {
				width: 100%;
			}
			.title {
				padding: 20rpx 0 20rpx;
				font-size: 36rpx;
				color: #666;
			}
			.desc {
				font-size: 28rpx;
				color: #999;
				display: flex;
				justify-content: space-between;
			}
		}
		.content-wrapper {
			margin: 30rpx 0;
			font-size: 28rpx;
			line-height: 1.5;
			color: #666;
		}
	}
</style>
