<template>
	<view class="main-container safe-bottom">
		<view class="status_bar"></view>
		<view class="header-wrapper">
			<view class="logo-wrapper">
				<image :src="`${imgUrl}/logo.png`"></image>
			</view>
			<view class="title">淘渔吧</view>
			<view class="form-wrapper">
				<u-form :model="form" ref="uForm">
					<u-form-item left-icon="account" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input trim v-model="form.phone" type="number" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#999', fontSize: '32rpx'}" left-icon="lock" prop="vCode">
						<u-input trim placeholder="请输入验证码" v-model="form.vCode" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode" hover-class="none" :custom-style="{backgroundColor:'#fff',color: '#409EFF', fontSize: '32rpx'}">{{codeTips}}</u-button>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input type="password" trim v-model="form.newPassword" placeholder="请输入密码(6-16位数字或字母)"/>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input type="password" trim v-model="form.rePassword" placeholder="请输入确认密码"/>
					</u-form-item>
				</u-form>
				<view class="btn-wrapper">
					<u-button @click="onSubmit" type="default" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle" :loading="loading">找回密码</u-button>
				</view>
			</view>
		</view>
		<view class="other-wrapper1">
			<text @tap="onTo('/pages/base/login')">返回登录</text>
		</view>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { getForgetCode, forgetForm } from '@/common/utils/login.js'
	export default {
		data () {
			return {
				loading: false,
				imgUrl: this.$IMAGE_URL,
				codeTips: '',
				form: {
					phone: '',
					vCode: '',
					newPassword: '',
					rePassword: ''
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
				if (this.form.phone === '') {
					this.$refs.uToast.show({
						title: '请输入手机号',
						// type: 'error'
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
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					getForgetCode(this.form.phone).then((data) => {
						// console.log('data', data)
						uni.hideLoading()
						this.$refs.uToast.show({
							title: data.msg || '已发送',
							duration: 2000
						})
						if (data.data) {
							this.$refs.uCode.start()
						}
						
					}).catch((msg) => {
						uni.hideLoading()
					})
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
						// type: 'error'
					})
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号',
						// type: 'error'
					})
					return
				}
				
				if (this.form.newPassword === '') {
					this.$refs.uToast.show({
						title: '请输入密码',
						// type: 'error'
					})
					return
				}
				let reg = /^[a-zA-Z0-9]{6,16}$/
				if (!reg.test(this.form.newPassword)) {
					this.$refs.uToast.show({
						title: `密码为6-16位、数字或字母`
					})
					return false
				}
				// let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
				// if (!reg.exec(this.form.newPassword)) {
				// 	this.$refs.uToast.show({
				// 		title: '6-16位密码、数字或字母',
				// 		type: 'error'
				// 	})
				// 	return false
				// } 
				if (this.form.rePassword === '') {
					this.$refs.uToast.show({
						title: '请输入确认密码',
						// type: 'error'
					})
					return
				}
				if (this.form.newPassword !== this.form.rePassword) {
					this.$refs.uToast.show({
						title: '密码和确认密码不一样',
						// type: 'error'
					})
					return
				}
				if (this.form.vCode === '') {
					this.$refs.uToast.show({
						title: '请输入验证码',
						// type: 'error'
					})
					return
				}
				uni.showLoading({
					title: '修改密码中',
					mask: true
				})
				forgetForm(this.form).then((data) => {
					console.log('data', data)
					if (data.data) {
						this.$refs.uToast.show({
							title: data.msg || '修改成功',
						})
						uni.navigateTo({
							url: '/pages/base/login'
						})
					} else {
						this.$refs.uToast.show({
							title: data.msg || '修改失败'
						})
					}
					uni.hideLoading()
				}).catch((e) => {
					uni.hideLoading()
				})
			},
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
				height: 660rpx;
				background-color: #fff;
				top: 450rpx;
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
			margin-top: 550rpx;
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
		.agreement {
			margin-top: 20rpx;
			color: #999;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			color: $color-blue;
		}
	}
	.model-content {
		height: 600rpx;
		// overflow: auto;
		box-sizing: border-box;
		padding: 0 30rpx;
		-webkit-overflow-scrolling: touch;
		.model-text {
			font-size: 28rpx;
			color: #666;
			line-height: 1.5;
			text-indent: 26rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
