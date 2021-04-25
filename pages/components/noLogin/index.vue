<template>
	<view class="no-login-container">
		<view class="header-wrapper">
			<view class="">
				<view class="avatar-wrapper">
					<image :src="`${imageUrl}/avatar.jpg`" mode="scaleToFill"></image>
				</view>
				<view class="text">未登录</view>
			</view>
		</view>
		<view class="body-wrapper">
			<view class="">
				<view class="text">登录淘渔吧，查看更多内容</view>
				<u-button size="default" @click="onTo('/pages/base/login')">登录</u-button>
				<!-- <u-button size="default" @click="onTo('/pages/user/real/signIn/index?type=1&id=13&orgId=1')">登录</u-button> -->
				<!-- <u-button size="default" @click="onTo('/pages/user/real/faceCollection/index?openid=oH8fr0ooJPJFxVzSe8jxSyzfhmZw&unionid=oauDHww-UekpDehgCtyMhWr3Fmb8&id=11&orgId=1')">登录</u-button> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				imageUrl: this.$IMAGE_URL,
			}
		},
		methods: {
			onTo (path) {
				if (path) {
					uni.navigateTo({
						url: path
					});
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.no-login-container {
		.header-wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 300rpx;
			width: 100%;
			position: relative;
			background: url('#{$img-url}/user-bg.png') no-repeat;
			background-size: cover;
			.avatar-wrapper {
				height: 150rpx;
				width: 150rpx;
				border: 4rpx solid #fff;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.text {
				margin-top:20rpx;
				font-size: 32rpx;
				color: #999;
				text-align: center;
			}
		}
		.body-wrapper {
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			height: calc(100vh - 500rpx);
			.text {
				color: #999;
				font-size: 28rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
