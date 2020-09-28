<template>
	<view class="news-detail-wrapper phonex-mb mb150">
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
		<share-group type="1" :info="collectionData" :isCollection="data.collectStatus === 1"></share-group>
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
				path: `/pages/home/news/detail/index?id=${this.id}`,
				imageUrl: this.data.image
			}
		},
		onShareTimeline (res) {
			console.log('onShareTimeline', res)
			return {
				title: `${this.data.title}`,
				path: `/pages/home/news/detail/index?id=${this.id}`,
				imageUrl: this.data.image
			}
		},
		data () {
			return {
				data: {},
				id: undefined
			}
		},
		computed: {
			collectionData () {
				return {
					collectedId: this.data.articleId,
					collectedShowTitle: this.data.title
				}
			}
		},
		onLoad (params) {
			this.id = params.id
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
