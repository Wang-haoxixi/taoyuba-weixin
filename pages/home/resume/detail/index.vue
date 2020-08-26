<template>
	<view class="resume-detail-container phonex-mb">
		<view class="header-wrapper">
			<view class="header-top">
				<view class="avatar">
					<image src="https://cdn.uviewui.com/uview/swiper/1.jpg"></image>
				</view>
				<view class="content-wrapper">
					<view class="name">{{data.realName || ''}}</view>
					<!-- <view class="content">状态：在职-考虑机会</view> -->
				</view>
			</view>
			<!-- <view class="header-bottom">
				擅长PS、AI、Axure等设计软件，擅长Web UI、App UI；
				会AE、PR等制作视频，会MG动画制作；
				擅长JS代码，会使用Jquery库，Vue框架等
			</view> -->
		</view>
		<view class="content-wrapper">
			<content-container title="基本信息">
				<view>
					<view class="text">应聘职务：{{newPositionIdLabel}}</view>
					<view class="text">原任职务：{{oldPositionIdLabel}}</view>
					<view class="text">作业方式：{{workRequireLabel}}</view>
					<view class="text">工作经验：{{workExprienceLabel}}</view>
					<view class="text">特殊技能：{{data.speciality || ''}}</view>
					<view class="text">期望月薪：<text class="money">{{data.salary || ''}}</text></view>
				</view>
			</content-container>
			<content-container title="个人资料">
				<view>
					<view class="text">电话：{{data.contactPhone || ''}}</view>
					<view class="text">籍贯：浙江，舟山</view>
					<view class="text">出生日期：{{data.birthday || ''}}</view>
					<view class="text">教育程度：{{eduDegreeLabel}}</view>
					<view class="text">外语水平：{{data.language || ''}}</view>
					<view class="text">身高：{{data.height || ''}}</view>
				</view>
			</content-container>
			<content-container title="补充说明">
				<view class="text">{{data.remark || ''}}</view>
			</content-container>
		</view>
	</view>
</template>

<script>
	import contentContainer from '@/pages/home/components/content-container.vue'
	import infoMixin from '../mixins/info.js'
	export default {
		mixins: [infoMixin],
		components: {
			contentContainer
		},
		data () {
			return {
				data: {}
			}
		},
		onLoad (params) {
			this.getList(params.id)
		},
		methods: {
			getList (id) {
				this.$http.get(`/tmlms/crew/getCrewByidcard`, {
					params: {
						idcard: id
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
						this.getCity(this.data.cityId)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.resume-detail-container {
		.header-wrapper {
			padding: 30rpx;
			border-radius: 8rpx;
			background-color: #fff;
			width: 90%;
			margin: 20rpx auto 0;
			.header-top {
				display: flex;
				justify-content: space-between;
				// padding-bottom: 30rpx;
				// border-bottom: 1px solid #f6f6f6;
				align-items: center;
				.avatar {
					height: 90rpx;
					width: 90rpx;
					overflow: hidden;
					flex: 0 1 90rpx;
					border-radius: 50%;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.content-wrapper {
					color: #333;
					flex: 1 0 auto;
					margin-left: 30rpx;
					font-size: 30rpx;
					.content {
						color: #666;
						font-size: 26rpx;
						margin-top: 10rpx;
					}
				}
			}
			.header-bottom {
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #999;
			}
		}
		.content-wrapper {
			color: #999;
			.body-wrapper {
				.text {
					padding: 20rpx 0rpx;
					.money {
						color: #409EFF;
					}
				}
			}
		}
	}
</style>
 