<template>
	<view class="recruit-detail-wrapper">
		<view class="header-wrapper">
			<view class="title">一级船长</view>
			<view class="content">
				<text class="price">5K - 8K</text>
				<text class="time">发布时间：2019.10.20</text>
			</view>
		</view>
		<view class="content-wrapper">
			<content-container title="基本信息">
				<view>
					<view class="text">招聘人数：4人</view>
					<view class="text">货币种类：人民币</view>
					<view class="text">证书职务：船长</view>
					<view class="text">证书等级：</view>
					<view class="text">作业方式：张网类</view>
					<view class="text">上船地点：舟山市定海区鸭蛋山码头</view>
				</view>
			</content-container>
			<content-container title="其他要求">
				<view>
					<view class="text">年龄要求：年龄不限</view>
					<view class="text">工作经验：不限</view>
				</view>
			</content-container>
			<content-container title="其他信息">
				<view>
					<view class="text">船长：65.2m</view>
					<view class="text">主机总功率：135568.5kw</view>
					<view class="text">联系人：黄旭东</view>
					<view class="text">联系电话：18800009999</view>
				</view>
			</content-container>
		</view>
	</view>
</template>

<script>
	import contentContainer from '@/pages/home/components/content-container.vue'
	export default {
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
			getList (id) {}
		}
	}
</script>

<style lang="scss" scoped>
	.recruit-detail-wrapper {
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		/* #endif */
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
