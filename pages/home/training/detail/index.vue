<template>
	<!-- 培训班 -->
	<view class="training-detail-wrapper phonex-mb">
		<view class="header-wrapper">
			<view class="title">东方培训机构</view>
			<view class="content">
				<view class="text">联系人：黄旭东</view>
				<view class="text">联系电话：18800008888</view>
				<view class="text">联系地址：舟山市定海临城海洋科学城A11幢11楼1102室</view>
			</view>
		</view>
		<view class="content-wrapper">
			<content-container title="机构介绍">
				<view class="text">机构介绍</view>
			</content-container>
			<content-container title="地图信息" class="map-container">
				<view class="map-wrapper">
					<map :latitude="markers[0].latitude" :longitude="markers[0].longitude" :markers="markers"></map>
				</view>
			</content-container>
			<view class="item">
				<view class="title">培训信息</view>
				<view class="info-wrapper">
					<view class="item" v-for="(item, index) in data" :key="index">
						<curriculum-item :info="item" hide-btn></curriculum-item>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import curriculumItem from '@/pages/home/curriculum/list/components/curriculum-item.vue'
	import contentContainer from '@/pages/home/components/content-container.vue'
	export default {
		components: {
			curriculumItem,
			contentContainer
		},
		data () {
			return {
				markers: [{id: 1, latitude: 29.987586723756884, longitude: 122.1850346467285}],
				data: [
					{ id: 1, title: '[舟山] 钳工进阶班钳工进阶班钳工进阶班钳工进阶班钳工进阶班', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: '30' },
					{ id: 2, title: '[舟山] 钳工进阶班', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: '30' },
					{ id: 3, title: '[舟山] 钳工进阶班', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: '30' },
					{ id: 4, title: '[舟山] 钳工进阶班', time: '2019.10.01 - 2019.11.01', name: '东方培训机构', day: '30' },
				]
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
				font-size: 34rpx;
				color: #333;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #f6f6f6;
			}
			.content {
				margin-top: 20rpx;
				.text {
					font-size: 26rpx;
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
