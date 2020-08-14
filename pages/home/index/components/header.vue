<template>
	<view class="home-header">
		<view class="header-wrapper">
			<view class="address-wrapper">
				<u-icon class="ic-left" name="map-fill" size="38"></u-icon>
				<text class="text">舟山市</text>
				<u-icon class="ic-right" name="arrow-down" size="28"></u-icon>
			</view>
			<view class="search-wrapper">
				<u-icon name="search" size="24" color="#aaa"></u-icon>
				<text class="text">搜索你感兴趣的内容</text>
			</view>
			<view class="img-wrapper">
				<image src="../../../../static/image/home/v.png"></image>
			</view>
		</view>
		<view class="content-wrapper">
			<view class="swiper-wrapper">
				<u-swiper :list="list" mode="dot"></u-swiper>
			</view>
			<view class="menu-wrapper">
				<u-grid :col="5" :border="false">
					<u-grid-item v-for="(item, index) in menu" :key="index" class="grid-item">
						<view class="ic-wrapper" :style="{background: item.color}">
							<u-icon name="photo" size="40" color="#fff"></u-icon>
						</view>
						<view class="text">{{item.label}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				list: [
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				menu: [
					{ path: '', color: '#e9b174', icon: '', label: '考试' },
					{ path: '', color: '#e3797d', icon: '', label: '招聘' },
					{ path: '', color: '#77b4e3', icon: '', label: '简历' },
					{ path: '', color: '#8dc7af', icon: '', label: '禁渔期工作' },
					{ path: '', color: '#bfc78c', icon: '', label: '培训工作' },
					{ path: '', color: '#e9b174', icon: '', label: '培训机构' },
					{ path: '', color: '#e3797d', icon: '', label: '中介' },
					{ path: '', color: '#77b4e3', icon: '', label: '合同' },
					{ path: '', color: '#8dc7af', icon: '', label: '检测' },
					{ path: '', color: '#bfc78c', icon: '', label: '签到' },
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-header {
		margin-bottom: 30rpx;
		padding: 20rpx 20rpx;
		width: 100%;
		min-height: 600rpx;
		background: url(../../../../static/image/home/bg.png) no-repeat;
		background-size: 100%;
		.header-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.address-wrapper {
				color: #fff;
				flex: 1 0 180rpx;
				display: flex;
				font-size: 30rpx;
				.ic-left {
					margin-right: 6rpx;
				}
				.ic-right {
					margin-left: 6rpx;
				}
			}
			.search-wrapper {
				margin: 0 20rpx;
				width: 100%;
				line-height: 58rpx;
				height: 58rpx;
				padding: 0 16rpx;
				background-color: #fff;
				border-radius: 8rpx;
				.text {
					font-size: 26rpx;
					color: #aaa;
					margin-left: 10rpx;
				}
			}
			.img-wrapper {
				width: 78rpx;
				height: 58rpx;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.content-wrapper {
			margin-top: 30rpx;
			width: 100%;
			padding: 30rpx 30rpx 10rpx;
			background-color: #fff;
			border-radius: 10rpx;
			.menu-wrapper {
				margin-top: 50rpx;
				.grid-item {
					margin: 0 0 20rpx 0;
					/deep/.u-grid-item-box {
						padding: 0;
					}
				}
				.ic-wrapper {
					height: 90rpx;
					width: 90rpx;
					overflow: hidden;
					border-radius: 50%;
					text-align: center;
					line-height: 90rpx;
				}
				.text {
					display: block;
					margin-top: 18rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
