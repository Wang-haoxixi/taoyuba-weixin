<template>
	<!-- 培训班 -->
	<view class="training-detail-wrapper safe-bottom mb150">
		<view class="header-wrapper">
			<view class="title">{{data.deptName || ''}}</view>
			<view class="content">
				<view class="text">联系人：{{data.contactName || ''}}</view>
				<view class="text">座机号码：{{data.phone || ''}}</view>
				<view class="text">联系地址：{{data.address || ''}}</view>
			</view>
		</view>
		<view class="content-wrapper">
			<content-container title="机构介绍">
				<view class="text">{{data.trainScope}}</view>
			</content-container>
			<content-container title="地图信息" class="map-container">
				<view class="map-wrapper">
					<map :latitude="markers[0].latitude" :longitude="markers[0].longitude" :markers="markers"></map>
				</view>
			</content-container>
			<view class="item" v-if="list.length > 0">
				<view class="title">培训信息</view>
				<view class="info-wrapper">
					<view class="item" v-for="(item, index) in list" :key="item.articleId">
						<training-info-item :info="item"></training-info-item>
					</view>
				</view>
			</view>
		</view>
		<view class="safe-bottom4"></view>
		<share-group type="4" :info="collectionData" :isCollection="data.collectStatus === 1"></share-group>
	</view>
</template>

<script>
	import contentContainer from '@/pages/home/components/content-container.vue'
	import trainingInfoItem from '@/pages/home/index/components/training-info-item.vue'
	import shareGroup from '@/pages/components/share/index.vue'
	export default {
		components: {
			contentContainer,
			shareGroup,
			trainingInfoItem
		},
		data () {
			return {
				markers: [],
				data: {},
				list: [],
				id: undefined
			}
		},
		onShareAppMessage (res) {
			console.log('onShareAppMessage', res)
			return {
				title: `${this.data.deptName}`,
				path: `/pages/home/training/detail/index?id=${this.id}`,
				// imageUrl: this.data.image
			}
		},
		onShareTimeline (res) {
			console.log('onShareTimeline', res)
			return {
				title: `${this.data.deptName}`,
				path: `/pages/home/training/detail/index?id=${this.id}`,
				// imageUrl: `${this.$IMAGE_URL}/blue-logo.png`
			}
		},
		onLoad (params) {
			this.id = params.id
			this.getList(params.id)
			this.getListInfo(params.id)
		},
		computed: {
			collectionData () {
				return {
					collectedId: this.data.userId,
					collectedShowTitle: this.data.deptName
				}
			}
		},
		methods: {
			getList (id) {
				this.$http.get(`/tmlms/dept/detail`, {
					params: {
						userId: id
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
						this.markers = [{id: 1, latitude: this.data.lat, longitude: this.data.lng}]
					}
				})
			},
			getListInfo (id) {
				this.$http.get(`/tybhrms/tybarticle/page`, {
					params: {
						size: 100,
						userId: id
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.list = data.data.records
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.training-detail-wrapper {
		.header-wrapper {
			padding: 30rpx;
			border-radius: 8rpx;
			background-color: #fff;
			width: 90%;
			margin: 20rpx auto 0;
			.title {
				font-size: 36rpx;
				color: #333;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #f6f6f6;
			}
			.content {
				margin-top: 20rpx;
				.text {
					font-size: 30rpx;
					color: #999;
					padding: 10rpx 0rpx;
				}
			}
		}
		.content-wrapper {
			color: #999;
			.title {
				height: 88rpx;
				line-height: 88rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 28rpx;
			}
			.body-wrapper {
				font-size: 26rpx;
				background-color: #fff;
				.text {
					padding: 20rpx 0rpx;
				}
			}
			.map-container {
				// padding: 20rpx;
				.map-wrapper {
					width: 100%;
					height: 460rpx;
					border-radius: 8rpx;
					overflow: hidden;
					map {
						width: 100%;
						height: 100%;
					}
				}
			}
			.info-wrapper {
				padding: 0rpx 30rpx;
				.item {
					padding: 15rpx 5rpx;
					background-color: #fff;
					margin-bottom: 30rpx;
					border-radius: 8rpx;
					overflow: hidden;
					.header {
						display: flex;
						margin-bottom: 30rpx;
						align-items: flex-end;
						.sub-title {
							max-width:350rpx;
							overflow: hidden;
							font-size: 28rpx;
							color: #333;
							text-align: left;
							padding: 0;
							display: block;
						}
						.name {
							font-size: 24rpx;
							color: #999;
							margin-left: 30rpx;
						}
					}
					.time, .day {
						font-size: 24rpx;
						color: #999;
						margin-bottom: 20rpx;
					}
					.day {
						margin-bottom: 0rpx;
					}
				}
			}
		}
	}
</style>
