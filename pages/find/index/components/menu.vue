<template>
	<view class="menu-container">
		<view class="menu-wrapper">
			<u-grid :col="4" :border="false">
				<u-grid-item bg-color="rgba(255, 255, 255, .5)" v-for="(item, index) in menu" :key="index" class="grid-item" @click="onTo(item)">
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
	import userInfoMixin from '@/pages/mixins/user-info.js'
	import menuMixin from '@/pages/mixins/menu.js'
	export default {
		mixins: [userInfoMixin, menuMixin],
		data () {
			return {
			}
		},
		methods: {
			onTo (row) {
				if (row.path1 && row.path2) {
					// console.log(this.roles, this.roles.length > 0, this.roles[1])
					this.getUserInfoApi().then(() => {
						if (this.roles && this.roles.length > 0) {
							if (this.roles[1] === 105) {
								uni.navigateTo({
									url: '/pages/user/contract/list/index'
								})
							} else if (this.roles[1] === 108) {
								uni.navigateTo({
									url: '/pages/user/myship/ship/index'
								})
							} else {
								uni.navigateTo({
									url: '/pages/home/contract/list/index'
								})
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '您还未登录，请先登录后查看'
							})
							this.$cache.clear()
							uni.navigateTo({
								url: '/pages/base/login'
							})
						}
						return
					})
				}
				if (row.path === '') {
					return
				}
				uni.navigateTo({
					url: row.path
				})
			},
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
