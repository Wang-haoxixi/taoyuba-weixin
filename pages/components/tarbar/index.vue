<template>
	<view class="tyb-tarbar-container">
		<view class="tyb-tarbar-item" v-for="(item, index) in menu" :key="index" @tap="onTo(item, index)"  :class="index === currentIndex ? 'tyb-tarbar_active' : ''">
			<template v-if="item.slot">
				<template v-if="index === item.id">
					<view class="tyb-tarbar-item_image_slot" :style="{transform: `rotate(${rotate}deg)`}">
						<image src="../../../static/image/tabbar/release.png"></image>
					</view>
					<view class="tyb-tarbar_sub-menu" :style="{display: show ? 'block' : 'none'}">
						<view class="tyb-tarbar_sub-menu-item" @tap="onSubMenu('/pages/release/resume/edit', 'resume')">简历</view>
						<view class="tyb-tarbar_sub-menu-item" @tap="onSubMenu('/pages/release/recruit/edit', 'recruit')">招聘</view>
						<view class="tyb-tarbar_sub-menu-item" @tap="onSubMenu('/pages/release/register/index', 'register')">登记</view>
						<!-- <view class="tyb-tarbar_sub-menu-item" @tap="onSubMenu('')">中介</view>	 -->
					</view>
					<text class="tyb-tarbar-item_text">{{item.text}}</text>
				</template>
			</template>
			<template>
				<view class="tyb-tarbar-item_image">
					<image :src="index === currentIndex ? item.selectedIconPath : item.iconPath" ></image>
				</view> 
				<text class="tyb-tarbar-item_text">{{item.text}}</text>
			</template>
		</view>
	</view>
</template>

<script>
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		props: {
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				rotate: 0,
				show: false,
				menu: [
					{ id: 0, iconPath: '../../../static/image/tabbar/home.png', selectedIconPath: '../../../static/image/tabbar/home_active.png', text: '主页', pagePath: '/pages/home/index/index' },
					{ id: 1, iconPath: '../../../static/image/tabbar/find.png', selectedIconPath: '../../../static/image/tabbar/find_active.png', text: '发现', pagePath: '/pages/find/index/index' },
					{ id: 2, iconPath: '', selectedIconPath: '', text: '发布', pagePath: '', slot: true },
					{ id: 3, iconPath: '../../../static/image/tabbar/message.png', selectedIconPath: '../../../static/image/tabbar/message_active.png', text: '消息', pagePath: '/pages/message/index/index' },
					{ iconPath: '../../../static/image/tabbar/user.png', selectedIconPath: '../../../static/image/tabbar/user_active.png', text: '我的', pagePath: '/pages/user/index/index' },
				]
			}
		},
		methods: {
			onSubMenu (path, name) {
				if (name === 'register') {
					if (path !== '') {
						uni.navigateTo({
							url: path,
						})
					}
					return
				}
				let userInfo = this.$cache.get('userInfo')
				let roles = this.$cache.get('roles')
				if (userInfo.userId) {
					if (roles[1] === 108) {
						if ( name === 'recruit') {
							if (path !== '') {
								uni.navigateTo({
									url: path,
								})
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '只有船员能填写简历'
							})
						}
					} else if (roles[1] === 105) {
						if (name === 'resume') {
							if (path !== '') {
								uni.navigateTo({
									url: path,
								})
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '只有船东能进行招聘'
							})
						}
					} else if (roles[1] == null) {
						uni.showToast({
							icon: 'none',
							title: '无权限查看'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '您还未登录，请先登录'
						})
						uni.navigateTo({
							url: '/pages/base/login',
						})
					}
					
				} else {
					this.getUserInfoApi().then(({ data }) => {
						if (path !== '') {
							uni.navigateTo({
								url: path,
							})
						}
					}).catch(() => {
						uni.showToast({
							icon: 'none',
							title: '您还未登录，请先登录后再操作'
						})
					})
				}
				
			},
			onTo (item, index) {
				if (item.slot && item.id === index) {
					this.rotate += 45
					if (this.rotate === 0) {
						this.show = true
					} else if (this.rotate % 90 === 45 ){
						this.show = true
					} else {
						this.show = false
					}
					
				} else {
					this.rotate = 0
					this.show = false
					uni.switchTab({
						url: item.pagePath,
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tyb-tarbar-container {
		z-index: 1000;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
		/* #endif */
		// overflow: hidden;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		.tyb-tarbar-item {
			text-align: center;
			width: 20%;
			color: #333;
			position: relative;
			&.tyb-tarbar_active {
				color: $color-blue;
			}
			.tyb-tarbar-item_image {
				width: 44rpx;
				height: 44rpx;
				overflow: hidden;
				margin: 10rpx auto 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.tyb-tarbar-item_text {
				display: block;
				margin-top: 4rpx;
				font-size: 26rpx;
			}
		}
		.tyb-tarbar-item_image_slot {
			position: relative;
			height: 90rpx;
			width: 90rpx;
			padding: 8rpx;
			background-color: #fff;
			border-radius: 50%;
			overflow: none;
			margin: -36rpx auto 0;
			transform: rotate(0deg);
			transition: transform .25s;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.tyb-tarbar_sub-menu {
			position: absolute;
			top: -60rpx;
			.tyb-tarbar_sub-menu-item {
				position: absolute;
				border-radius: 50%;
				background-color: #fff;
				width: 80rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				overflow: hidden;
				box-shadow: 0rpx 0rpx 10rpx $color-blue;
				display: hidden;
				&:nth-child(1) {
					top: -40rpx;
					left: -46rpx;
					color: #e57979;
				}
				&:nth-child(2) {
					top: -100rpx;
					left: 40rpx;
					color: #b2c835;
				}
				&:nth-child(3) {
					top: -40rpx;
					left: 120rpx;
					color: #82d967;
				}
				// &:nth-child(4) {
				// 	top: -40rpx;
				// 	left: 166rpx;
				// 	color: #67aed9;
				// }
			}
			
		}
	}
</style>
