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
					<u-form-item left-icon="account" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input trim v-model="form.phone" type="number" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input type="password" trim v-model="form.password" placeholder="请输入密码"/>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#999', fontSize: '32rpx'}">
						<u-input type="password" trim v-model="form.apassword" placeholder="请输入确认密码"/>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#999', fontSize: '32rpx'}" left-icon="lock" prop="code">
						<u-input trim placeholder="请输入验证码" v-model="form.code" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode" hover-class="none" :custom-style="{backgroundColor:'#fff',color: '#409EFF', fontSize: '32rpx'}">{{codeTips}}</u-button>
					</u-form-item>
					
					<!-- <u-form-item  left-icon="account" :leftIconStyle="{color: '#999', fontSize: '32rpx'}"><u-input trim v-model="form.phone" type="number" placeholder="请输入手机号"/></u-form-item>
					<u-form-item :leftIconStyle="{color: '#999', fontSize: '32rpx'}" left-icon="lock" prop="code">
						<u-input trim placeholder="请输入验证码" v-model="form.code" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode" hover-class="none" :custom-style="{backgroundColor:'#fff',color: '#409EFF', fontSize: '32rpx'}">{{codeTips}}</u-button>
					</u-form-item> -->
					
				</u-form>
				<view class="agreement">
					<u-checkbox v-model="keep" active-color="#409EFF"></u-checkbox>
					<text class="agreement-text" @tap="openAgreement">同意并遵守《免责声明》</text>
				</view>
				<view class="btn-wrapper">
					<u-button @click="onSubmit" type="default" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle" :loading="loading">一键注册</u-button>
				</view>
			</view>
		</view>
		<view class="other-wrapper1">
			<text @tap="onTo('/pages/base/login')">返回登录</text>
		</view>
		<!-- <view class="other-wrapper">
			<u-divider bg-color="transparent">其他方式登录</u-divider>
			<view class="ic-wrapper">
				<u-button open-type="getUserInfo" @getuserinfo="onWechat" hover-class="none" :custom-style="{backgroundColor: 'transparent', borderColor: '#f8f8f8'}" size="medium " :hair-line="false">
					<u-icon name="weixin-circle-fill" size="80rpx" color="#4cbf00"></u-icon>
				</u-button>
			</view>
		</view> -->
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		<u-toast ref="uToast" />
		<u-modal v-model="show" title="免责声明" width="90%" show-cancel-button @confirm="onConfirmAgreement">
			<scroll-view class="model-content" scroll-y>
				<view class="model-text">
					“淘渔吧”平台是由浙江省海洋渔业船舶交易服务中心运营的网络服务平台。任何使用“淘渔吧”平台的用户均应仔细阅读本声明，用户可选择不使用“淘渔吧”平台，用户使用“淘渔吧”平台的行为将被视为对本声明全部内容的认可，并遵守有关互联网法律、法规、部门规章及本平台的相关规定与规则。
				</view>
				<view class="model-text">
					一、在法律法规允许的范围内，“淘渔吧”平台在此声明, 用户在“淘渔吧”平台发布的所有信息，并不意味“淘渔吧”平台认同或证实其信息内容的准确性、完整性或真实性，亦不提供任何明示或暗示的担保。“淘渔吧”平台不承担用户或任何人就使用或未能使用本平台所提供的信息或任何链接或项目所引致的任何直接、间接、附带、从属、特殊性的损害赔偿（包括但不限于收益、预期利润的损失）。
				</view>
				<view class="model-text">
					二、“淘渔吧”平台上关于用户或其发布的相关信息由用户自行提供的，用户依法应对其提供的任何信息承担全部责任。任何单位或者个人通过上述信息而进行任何交易或者进行其他行为，须得知网络交易、网上行为的风险性，进行交易或行为的事前辨别和采取谨慎的预防措施，并自行承担一切交易的风险和后果。
				</view>
				<view class="model-text">
					三、 “淘渔吧”平台上用户可以自行上传图片或文字，“淘渔吧”平台无法查证所上传图片或文字的知识版权权属。任何单位或个人认为“淘渔吧”平台所提供的内容侵犯其合法权益的，请及时向提出书面权利通知，并提供身份证明、权属证明及详细侵权情况说明，“淘渔吧”平台将在核实后尽快删除相关涉嫌侵权的内容。
				</view>
			</scroll-view>
		</u-modal>
	</view>
</template>

<script>
	import getUser from '@/common/utils/user'
	import { getMobileCode, onRegister } from '@/common/utils/login.js'
	export default {
		data () {
			return {
				show: false,
				loading: false,
				keep: false,
				imgUrl: this.$IMAGE_URL,
				codeTips: '',
				form: {
					phone: '',
					code: '',
					password: '',
					apassword: ''
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
						type: 'error'
					})
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
					// console.log('this.form.phone',111)
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
					console.log(this.form.phone)
					getMobileCode(this.form.phone).then((data) => {
						uni.hideLoading()
						this.$refs.uToast.show({
							title: data.msg || '手机号已注册',
							duration: 2000
						})
						if (data.data) {
							this.$refs.uCode.start()
						}
						// this.$u.toast(msg || '验证码已发送')
					}).catch((data) => {
						uni.hideLoading()
						this.$refs.uToast.show({
							title: data.msg || '手机号已注册',
							duration: 2000
						})
						// this.$u.toast(msg || '')
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
						title: '请输入手机号'
					})
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号'
					})
					return
				}
				if (this.form.password === '') {
					this.$refs.uToast.show({
						title: '请输入密码'
					})
					return
				}
				if (this.form.apassword === '') {
					this.$refs.uToast.show({
						title: '请输入确认密码'
					})
					return
				}
				if (this.form.apassword !== this.form.password) {
					this.$refs.uToast.show({
						title: '密码和确认密码不一样'
					})
					return
				}
				if (this.form.code === '') {
					this.$refs.uToast.show({
						title: '请输入验证码'
					})
					return
				}
				if (this.keep === false) {
					uni.showToast({
						icon: 'none',
						title: '您未同意并遵守《免责声明》'
					})
					return
				}
				// console.log('this.form', this.form)
				// return
				uni.showLoading({
					title: '注册中',
					mask: true
				})
				onRegister(this.form).then((data) => {
					uni.hideLoading()
					if (data.data === true) {
						this.$refs.uToast.show({
							title: '注册成功'
						})
						uni.navigateTo({
							url: '/pages/base/login'
						})
					} else {
						this.$refs.uToast.show({
							title: data.msg || '注册失败',
							duration: 2000
						})
					}
					
				}).catch(() => {
					uni.hideLoading()
				})
			},
			openAgreement () {
				this.show = true
			},
			onConfirmAgreement () {
				this.keep = true
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
				height: 710rpx;
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
			margin-top: 600rpx;
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
