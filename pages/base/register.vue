<template>
	<view class="main-container phonex-mb">
		<view class="status_bar"></view>
		<view class="header-wrapper">
			<view class="logo-wrapper">
				<image :src="`${imgUrl}/logo.png`"></image>
			</view>
			<view class="title">淘渔吧</view>
			<view class="form-wrapper">
				<u-form :model="form" ref="uForm">
					<u-form-item  left-icon="account" :leftIconStyle="{color: '#999', fontSize: '32rpx'}"><u-input trim v-model="form.phone" type="number" placeholder="请输入手机号"/></u-form-item>
					<u-form-item :leftIconStyle="{color: '#999', fontSize: '32rpx'}" left-icon="lock" prop="code">
						<u-input trim placeholder="请输入验证码" v-model="form.code" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode" hover-class="none" :custom-style="{backgroundColor:'#fff',color: '#409EFF', fontSize: '32rpx'}">{{codeTips}}</u-button>
					</u-form-item>
					<view class="btn-wrapper">
						<u-button @click="onSubmit" type="default" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle" :loading="loading">一键注册</u-button>
					</view>
				</u-form>
			</view>
		</view>
		<view class="other-wrapper1">
			<text @tap="onTo('/pages/base/login')">返回登录</text>
		</view>
		<view class="other-wrapper">
			<u-divider bg-color="transparent">其他方式登录</u-divider>
			<view class="ic-wrapper">
				<u-button open-type="getUserInfo" @getuserinfo="onWechat" hover-class="none" :custom-style="{backgroundColor: 'transparent', borderColor: '#f8f8f8'}" size="medium " :hair-line="false">
					<u-icon name="weixin-circle-fill" size="80rpx" color="#4cbf00"></u-icon>
				</u-button>
			</view>
		</view>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import getUser from '@/common/utils/user'
	export default {
		data () {
			return {
				loading: false,
				imgUrl: this.$IMAGE_URL,
				codeTips: '',
				form: {
					phone: '',
					code: ''
				}
			}
		},
		methods: {
			onTo (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading()
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送')
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start()
					}, 2000)
				} else {
					this.$u.toast('倒计时结束后再发送')
				}
			},
			codeChange(text) {
				this.codeTips = text
			},
			onSubmit () {
				if (this.form.phone === '') {
					this.$refs.uToast.show({
						title: '请输入手机号',
						type: 'error'
					})
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号',
						type: 'error'
					})
					return
				}
				if (this.form.code === '') {
					this.$refs.uToast.show({
						title: '请输入验证码',
						type: 'error'
					})
					return
				}
				uni.showLoading({
					title: '注册中',
					mask: true
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 2000)
			},
			onWechat () {
				getUser.onLogin().then((res) => {
					console.log('success', res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-container {
		.status_bar {
			height: var(--status-bar-height);
			background-color: #409eff;
			width: 100%;
		}
		.header-wrapper {
			width: 100%;
			height: 600rpx;
			padding-top: 100rpx;
			background-color: #409eff;
			position: relative;
			.logo-wrapper {
				margin: 0rpx auto;
				width: 200rpx;
				height: 186rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title {
				font-size: 50rpx;
				color: #fff;
				margin-top: 50rpx;
				text-align: center;
			}
			.form-wrapper {
				position: absolute;
				width: 95%;
				box-sizing: border-box;
				padding: 60rpx 40rpx;
				height: 460rpx;
				background-color: #fff;
				top: 500rpx;
				left: 2.5%;
				right: 2.5%;
				overflow: hidden;
				border-radius: 10rpx;
				box-shadow: 0rpx 0rpx 5rpx rgba(0, 0, 0, .5);
				.btn-wrapper {
					margin-top: 40rpx;
				}
			}
		}
		.other-wrapper1 {
			margin-top: 400rpx;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			color: #409EFF;
		}
		.other-wrapper {
			margin-top: 80rpx;
			text-align: center;
			.ic-wrapper {
				margin-top: 20rpx;
			}
			
		}
	}
	// v::deep button::after {
	// 	border: none;
	// }
</style>
