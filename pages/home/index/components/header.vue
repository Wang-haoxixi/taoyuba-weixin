<template>
	<view class="home-header">
		<view class="header-wrapper">
			<!-- <view class="address-wrapper">
				<u-icon class="ic-left" name="map-fill" size="38"></u-icon>
				<text class="text">舟山市</text>
				<u-icon class="ic-right" name="arrow-down" size="28"></u-icon>
			</view> -->
			<view class="static-search-wrapper">
				<static-search to="/pages/home/search/index" placeholder="搜索你感兴趣的内容"></static-search>
			</view>
			
			<view class="img-wrapper">
				<image :src="`${imgUrl}/v.png`" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="content-wrapper">
			<view class="swiper-wrapper">
				<u-swiper :list="list" mode="dot" height="300"></u-swiper>
			</view>
			<view class="menu-wrapper">
				<u-grid :col="4" :border="false">
					<u-grid-item v-for="(item, index) in menu" :key="index" class="" @click="onTo(item.path)">
						<view class="ic-wrapper" :style="{background: item.color}">
							<u-icon :name="item.icon" size="45" color="#fff"></u-icon>
						</view>
						<view class="text">{{item.label}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import staticSearch from './search.vue'
	export default {
		components: {
			staticSearch
		},
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
				imgUrl: this.$IMAGE_URL,
				menu: [
					{ path: '/pages/home/recruit/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-zhaopin.png`, label: '招聘' },
					{ path: '/pages/home/resume/list/index', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-jianli.png`, label: '求职' },
					{ path: '/pages/release/register/index', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '船员登记' },
					{ path: '', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-hetong.png`, label: '合同' },
					{ path: '/pages/home/training/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-peixunjigou.png`, label: '培训机构' },
					{ path: '', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, label: '在线测试' },
					{ path: '/pages/base/web?src=https://www.baidu.com', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-jinyuqi.png`, label: '进出港报告' },
					{ path: '/pages/home/video/list/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '渔民学院' },
				]
			}
		},
		methods: {
			onTo (path) {
				if (path === '') {
					return false
				}
				uni.navigateTo({
					url: path
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.home-header {
		margin-bottom: 30rpx;
		padding: 20rpx 20rpx;
		width: 100%;
		min-height: 600rpx;
		background: url('#{$img-url}/home-bg.png') no-repeat;
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
			.static-search-wrapper {
				width: 100%;
				margin-right: 30rpx;
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
				/* #ifdef MP-WEIXIN */
				margin-top: 10rpx;
				/* #endif */
				margin-left: -20rpx;
				margin-right: -20rpx;
				.grid-item {
					overflow: hidden;
					margin: -15rpx 0;
				}
				.ic-wrapper {
					height: 90rpx;
					width: 90rpx;
					overflow: hidden;
					border-radius: 50%;
					text-align: center;
					line-height: 90rpx;
					justify-content: center;
					display: flex;
					align-items: center;
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
