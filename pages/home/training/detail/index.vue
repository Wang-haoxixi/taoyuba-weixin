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
			<view class="teacher-resources">
				<view class="name-more">
					<text style="color: #303031;font-size: 32rpx;font-weight: 500;">师资库</text>
					<navigator url="/pages/home/training/detail/tsDetail/tsDetail" hover-class="other-navigator-hover">查看更多</navigator>
				</view>
				<view class="items-box">
					<view class="box-resources" v-for="(item, index) in tcList" :key='index'>
						<view class="people" @tap='tsDetail(item)'>
							<view class="sex">
								{{ item.teacherName.substring(0,1) }}
							</view>
							<view class="" style="flex: 1;display: flex;justify-content: space-between;">
								<view class="full-name">
									{{ item.teacherName }}
								</view>
								<view class="position">
									{{ item.title }}
								</view>
							</view>
						</view>
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
				tcList: [],
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
			this.getTeacherList(params.id)
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
						console.log('data...', this.data)
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
					console.log('getListInfo..',data)
					if (data.code === 0) {
						this.list = data.data.records
					}
				})
			},
			getTeacherList(id){
				this.$http.get(`/tmlms/tybTeacherTeam/page`, {
					params: {
						deptId: id,
						size: 4,
					}
				}).then(res=>{
					console.log('getTeacherList..', res)
					this.tcList = res.data.data.records
				})
			},
			tsDetail(item){
				console.log(item)
				uni.navigateTo({
				    url: '/pages/home/training/detail/tsDetail/tsDetail?id=' + item.id
				});
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
			.teacher-resources{
				background-color: #FFFFFF;
				margin: 20rpx 24rpx;
				padding: 32rpx 24rpx;
				border-radius: 16rpx;
				.name-more{
					display: flex;
					justify-content: space-between;
				}
				.items-box{
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
				}
				.box-resources{
					box-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.1);
					border-radius: 80rpx 20rpx 20rpx 80rpx;
					height: 80rpx;
					width: 310rpx;
					line-height: 80rpx;
					margin-top: 30rpx;
					
					.people{
						padding-right: 20rpx;
						display: flex;
						.sex{
							flex-shrink: 0;
							width: 80rpx;
							height: 80rpx;
							border-radius: 100%;
							text-align: center;
							background-color: #E8F1FE;
							color: #333;
							font-weight: 500;
							font-size: 32rpx;
						}
						.full-name{
							color: #333333;
							font-weight: 500;
							font-size: 28rpx;
							margin-left: 20rpx;
							max-width: 84rpx;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
						}
						.position{
							font-size: 28rpx;
							font-weight: 400;
							max-width: 84rpx;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
						}
					}
				}
			}
		}
	}
</style>
