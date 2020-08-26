<template>
	<view class="recruit-detail-wrapper phonex-mb">
		<view class="header-wrapper">
			<view class="title">{{positionIdLabel}}</view>
			<view class="content">
				<text class="price">￥{{data.salary || ''}}</text>
				<text class="time">发布时间：{{data.createTime || ''}}</text>
			</view>
		</view>
		<view class="content-wrapper">
			<content-container title="基本信息">
				<view>
					<view class="text">招聘人数：{{data.recruitNo || 0}}人</view>
					<view class="text">货币种类：{{salaryCurrencyLabel}}</view>
					<view class="text">证书职务：{{certTitleLabel}}</view>
					<view class="text">证书等级：{{certLevelLabel}}</view>
					<view class="text">作业方式：{{workModeLabel}}</view>
					<view class="text">上船地点：{{cityLabel}}</view>
				</view>
			</content-container>
			<content-container title="其他要求">
				<view>
					<view class="text">年龄要求：{{ageRequireLabel}}</view>
					<view class="text">工作经验：{{workExprienceLabel}}</view>
				</view>
			</content-container>
			<content-container title="其他信息">
				<view>
					<view class="text">船长：{{data.hullLength || ''}}</view>
					<view class="text">主机总功率：{{data.totalPower || ''}}</view>
					<view class="text">联系人：{{data.contactName || ''}}</view>
					<view class="text">联系电话：{{data.contactPhone || ''}}</view>
				</view>
			</content-container>
		</view>
	</view>
</template>

<script>
	import contentContainer from '@/pages/home/components/content-container.vue'
	import infoMixin from '../../resume/mixins/info.js'
	export default {
		mixins: [infoMixin],
		components: {
			contentContainer
		},
		data () {
			return {
				data: {},
				cityLabel: ''
			}
		},
		onLoad (params) {
			this.getList(params.id)
		},
		methods: {
			getList (id) {
				this.$http.get(`/tybhrms/tybrecruit/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
						this.getCity(this.data.city)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.recruit-detail-wrapper {
		.header-wrapper {
			padding: 30rpx;
			border-radius: 8rpx;
			background-color: #fff;
			width: 90%;
			margin: 20rpx auto 0;
			.title {
				color: #333;
				font-size: 34rpx;
			}
			.content {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.price {
					font-size: 34rpx;
					color: #409EFF;
				}
				.time {
					font-size: 26rpx;
					color: #999;
				}
			}
		}
		.content-wrapper {
			color: #999;
			.body-wrapper {
				.text {
					padding: 20rpx 0rpx;
				}
			}
		}
	}
</style>
