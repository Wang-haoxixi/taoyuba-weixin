<template>
	<view class="main-container safe-bottom">
		<view class="status_bar"></view>
		<view class="header-wrapper">
			<view class="logo-wrapper">
				<image :src="`${imgUrl}/logo.png`"></image>
			</view>
			<view class="title">淘渔吧</view>
			<view class="form-wrapper" v-if="show">
				<u-form :model="form" ref="uForm">
					<u-form-item left-icon="account" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input trim v-model="form.username" placeholder="请输入用户名"/>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input type="password" trim v-model="form.password" placeholder="请输入密码"/>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#999', fontSize: '32rpx'}" left-icon="tags" prop="code">
						<u-input trim placeholder="请输入验证码" v-model="form.code" type="text"></u-input>
						<view slot="right" @tap="refreshCode" style="height: 60rpx;width: 160rpx;"><image style="width: 100%;height: 100%;" :src="code.src" mode="scaleToFill"></image></view>
					</u-form-item>
					<!-- <u-form-item left-icon="account" :leftIconStyle="{color: '#999', fontSize: '32rpx'}"><u-input trim v-model="form.phone" type="number" placeholder="请输入手机号"/></u-form-item>
					<u-form-item :leftIconStyle="{color: '#999', fontSize: '32rpx'}" left-icon="lock" prop="code">
						<u-input trim placeholder="请输入验证码" v-model="form.code" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode" hover-class="none" :custom-style="{backgroundColor:'#fff',color: '#409EFF', fontSize: '32rpx'}">{{codeTips}}</u-button>
					</u-form-item> -->
					<view class="btn-wrapper two-btn-wrapper">
						<div style="width: 100%;">
							<u-button @click="onSubmit" type="default" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle" :loading="loading">登录</u-button>
						</div>
						<div style="padding-left: 20rpx;">
							<!-- <button style="background-color: #eaeaea;color: #333; font-size: 30rpx;" @click="onToHome('/pages/home/index/index')">取消</button> -->
							<u-button @click="show = false" type="default" :custom-style="{backgroundColor: '#eaeaea', color: '#888'}" hover-class="none" shape="circle" :loading="loading">取消</u-button>
						</div>
					</view>
				</u-form>
			</view>
			<view v-if="!show" class="form-wrapper form-wrapper-latter">
				<view class="latter-title">登录后更精彩</view>
				<view class="latter-name">
					<u-button open-type="getUserInfo" @getuserinfo="onWechat" hover-class="none" :custom-style="{backgroundColor: '#4cbf00',width: '100%'}" size="medium " :hair-line="false">
						<u-icon name="weixin-fill" size="50rpx" color="white"></u-icon><text style="color: white">微信登录</text>
					</u-button>
				</view>
				<view class="latter-name" @click="show = true" style="color: #959aba">
					账号登陆
				</view>
			</view>
		</view>
		<view @click="onToHome('/pages/home/index/index')" class="back-home" v-if="!show">返回首页</view>
		<view class="other-wrapper1" v-if="show">
			<text @tap="onTo('/pages/base/register')">没有账号？立即注册</text>
			<text @tap="onTo('/pages/base/forget-password')">找回密码</text>
		</view>
		<view class="other-wrapper" v-if="show">
			<u-divider bg-color="transparent">其他方式登录</u-divider>
			<view class="ic-wrapper">
				<u-button open-type="getUserInfo" @getuserinfo="onWechat" hover-class="none" :custom-style="{backgroundColor: 'transparent', borderColor: '#f8f8f8'}" size="medium " :hair-line="false">
					<u-icon name="weixin-circle-fill" size="80rpx" color="#4cbf00"></u-icon>
				</u-button>
			</view>
		</view>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		<u-toast ref="uToast" />
		<u-popup
			v-model="showPhone"
			mode="bottom"
			safe-area-inset-bottom
			:border-radius="20"
			closeable
			@close="onClosePhone"
			:mask-close-able="false">
			<view class="wechat-phone-wrapper">
				<!-- <u-form :model="formPhone" ref="formPhone">
					<u-form-item left-icon="phone" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input trim v-model="formPhone.phone" type="number" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#999', fontSize: '32rpx'}" left-icon="edit-pen" prop="vCode">
						<u-input trim placeholder="请输入验证码" v-model="formPhone.vCode" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode" hover-class="none" :custom-style="{backgroundColor:'#fff',color: '#409EFF', fontSize: '32rpx'}">{{codeTips}}</u-button>
					</u-form-item>
				</u-form> -->
				<view class="btn-wrapper">
					<u-button type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle">手机号绑定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import getUser from '@/common/utils/user'
	import { signin, getForgetCode } from '@/common/utils/login.js'
	import { TOKEN } from '@/common/config/index.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		mixins: [userInfoMixin, dictMapMixin],
		data () {
			return {
				loading: false,
				imgUrl: this.$IMAGE_URL,
				codeTips: '',
				showPhone: false,
				formPhone: {
					phone: '',
					code: '',
				},
				form: {
					username: '',
					password: '',
					phone: '',
					code: '',
					randomStr: ''
				},
				code: {
					src: '',
					value: '',
					len: 4,
					type: 'image'
				 },
				 id: 0,
				 show: false,
			}
		},
		onLoad (option) {
			if( option.id ){
				this.id = option.id
			}
			this.refreshCode()
			uni.removeStorageSync('refresh_token')
			uni.removeStorageSync('taoyuba-token')
		},
		methods: {
			onToHome (path) {
				if (path) {
					uni.switchTab({
						url: path
					})
				}
			},
			onTo (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},
			onClosePhone () {
				console.log('close')
				this.formPhone = {
					phone: '',
					code: '',
				}
				this.showPhone = false
			},
			getCode() {
				if (this.formPhone.phone === '') {
					this.$refs.uToast.show({
						title: '请输入手机号',
					})
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.formPhone.phone))) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号'
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
						
					}).catch(() => {
						uni.hideLoading()
					})
				} else {
					this.$u.toast('倒计时结束后再发送')
				}
			},
			onSubmitPhone () {
				if (this.formPhone.phone === '') {
					this.$refs.uToast.show({
						title: '请输入手机号',
					})
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.formPhone.phone))) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号'
					})
					return
				}
				if (this.formPhone.code === '') {
					this.$refs.uToast.show({
						title: '请输入验证码',
					})
					return
				}
			},
			codeChange(text) {
				this.codeTips = text
			},
			onSubmit () {
				console.log('submit')
				// if (this.form.phone === '') {
				// 	this.$refs.uToast.show({
				// 		title: '请输入手机号',
				// 		type: 'error'
				// 	})
				// 	return
				// }
				// if(!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
				// 	this.$refs.uToast.show({
				// 		title: '请输入正确的手机号',
				// 		type: 'error'
				// 	})
				// 	return
				// }
				console.log('this.form', this.form)
				if (this.form.username === '') {
					this.$refs.uToast.show({
						title: '请输入用户名',
						type: 'error'
					})
					return
				}
				if (this.form.password === '') {
					this.$refs.uToast.show({
						title: '请输入密码',
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
					title: '登录中',
					mask: true
				})
				signin(this.form).then((data) => {
					this.refreshCode()
					if (data.code === 1) {
						this.$refs.uToast.show({
							title: data.msg || '登录失败',
							type: 'error'
						})
						uni.hideLoading()
						return
					}
					this.getDicMap()
					this.$cache.set(TOKEN, data['access_token'])
					this.$cache.set('refresh_token', data['refresh_token'])
					if( this.id ){
						uni.navigateTo({
							url: `/pages/user/myship/ship/confirmShipDetail?id=${this.id}`
						})
					}else{
						uni.switchTab({
							url: '/pages/home/index/index',
							success: () => {
								this.getUserInfoApi()
							}
						})
					}
					uni.hideLoading()
				}).catch(() => {
					this.refreshCode()
				})
			},
			onWechat () {
				getUser.onLogin().then((res) => {
					if (res) {
						if( this.id ){
							uni.reLaunch({
								url: `/pages/user/myship/ship/confirmShipDetail?id=${this.id}`
							})
						}else{
							uni.switchTab({
								url: '/pages/home/index/index',
								success: () => {
									this.getUserInfoApi()
								}
							})
						}
					} else {
						this.showPhone = true
					}
				})
			},
			getPhoneNumber (e) {
				if (e.detail.iv) {
					getUser.getPhoneNumber(e).then(() => {
						this.showPhone = false
						uni.switchTab({
							url: '/pages/home/index/index',
							success: () => {
								this.getUserInfoApi()
							}
						})
					})
				}
			},
			refreshCode () {
				this.form.code = ''
				this.form.randomStr = this.randomLenNum(this.code.len, true)
				this.code.type === 'text'
					? (this.code.value = this.randomLenNum(this.code.len))
					: (this.code.src = `${this.$API_URL}/code?randomStr=${this.form.randomStr}`)
			},
			randomLenNum (len, date) {
			  let random = ''
			  random = Math.ceil(Math.random() * 100000000000000)
			    .toString()
			    .substr(0, len || 4)
			  if (date) random = random + Date.now()
			  return random
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-container {
		::v-deep .u-size-medium {
			height: 80rpx;
			line-height: 80rpx;
		}
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
				height: 570rpx;
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
			.form-wrapper-latter {
					position: absolute;
				    width: 80%;
				    box-sizing: border-box;
				    padding: 60rpx 40rpx;
				    height: 490rpx;
				    background-color: #fff;
				    top: 450rpx;
				    left: 10%;
				    right: 10%;
				    overflow: hidden;
				    border-radius: 10rpx;
				    box-shadow: 0rpx 0rpx 5rpx rgba(0, 0, 0, 0.5);
					.latter-title {
						text-align: center;
						color: #7e7a7b;
					}
					.latter-name {
						text-align: center;
						margin-top: 90rpx;
					}
			}
		}
		.other-wrapper1 {
			margin-top: 450rpx;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			color: #409EFF;
		}
		.other-wrapper {
			margin-top: 20rpx;
			text-align: center;
			.ic-wrapper {
				margin-top: 20rpx;
			}
			
		}
	}
	.wechat-phone-wrapper {
		padding: 100rpx 20rpx 50rpx 20rpx;
	}
	.two-btn-wrapper {
		display: flex;
		justify-content: space-between;
	}
	.back-home {
		text-align: center;
		color: #ccc;
		margin-top: 450rpx;
	}
</style>
