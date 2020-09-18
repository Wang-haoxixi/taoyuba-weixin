<template>
	<view class="menu-container">
		<view class="menu-wrapper">
			<u-grid :col="4" :border="false">
				<u-grid-item bg-color="rgba(255, 255, 255, .5)" v-for="(item, index) in menu" :key="index" class="grid-item" @click="onTo(item.path)">
					<view class="ic-wrapper" :style="{background: item.color}">
						<u-icon :name="item.icon" size="40" color="#fff"></u-icon>
					</view>
					<view class="text">{{item.label}}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				menu: [
					{ path: '/pages/home/recruit/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-zhaopin.png`, label: '招聘' },
					{ path: '/pages/home/resume/list/index', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-jianli.png`, label: '求职' },
					{ path: '/pages/release/register/index', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '船员登记' },
					{ path: '/pages/user/contract/list/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-hetong.png`, label: '合同' },
					{ path: '/pages/home/training/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-peixunjigou.png`, label: '培训机构' },
					{ path: '', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, label: '在线测试' },
					{ path: '/pages/base/web?src=https://www.baidu.com', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-jinyuqi.png`, label: '进出港报告' },
					{ path: '/pages/home/video/list/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '渔民学院' },
				]
			}
		},
		methods: {
			onTo (path) {
				if (path === '' || path == null) {
					return
				}
				uni.navigateTo({
					url: path
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.menu-container {
		padding: 30rpx 50rpx;
		width: 100%;
		background: url('#{$img-url}/find-bg.png') no-repeat;
		background-size: 100%;
		.menu-wrapper {
			background-color: rgba(255, 255, 255, .6);
			margin-top: 50rpx;
			/* #ifdef MP-WEIXIN */
			margin-top: 10rpx;
			/* #endif */
			margin-left: -20rpx;
			margin-right: -20rpx;
			overflow: hidden;
			border-radius: 8rpx;
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
				justify-content: center;
				display: flex;
				align-items: center;
			}
			.text {
				display: block;
				margin-top: 18rpx;
				font-size: 26rpx;
				color: #999;
			}
		}
	}
</style>
