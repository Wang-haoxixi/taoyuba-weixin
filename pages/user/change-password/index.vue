<template>
	<view class="change-password-container safe-bottom">
		<u-form :model="form" ref="uForm" label-position="top" label-width="100" :label-style="{color: '#999'}">
			<u-form-item label="原密码" prop="oldpwd"><u-input trim v-model="form.oldpwd" type="password" placeholder="请输入原密码"/></u-form-item>
			<u-form-item label="新密码" prop="newpwd"><u-input trim v-model="form.newpwd" type="password" placeholder="输入新的密码"/></u-form-item>
			<u-form-item label="确认新密码" prop="newpwd2"><u-input trim v-model="form.newpwd2" type="password" placeholder="再次输入密码"/></u-form-item>
		</u-form>
		<view class="text">
			密码为6-16位密码、数字或字母
		</view>
		<view class="btn-wrapper">
			<u-button @click="onSubmit" type="default" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle" :loading="loading">提交</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data () {
			return {
				userInfo: this.$cache.get('userInfo'),
				loading: false,
				form: {
					oldpwd: '',
					newpwd: '',
					newpwd2: ''
				},
			}
		},
		methods: {
			onSubmit () {
				if (!this.validatePassword(this.form.oldpwd, '原密码')) {
					return false
				}
				if (!this.validatePassword(this.form.newpwd, '新密码')) {
					return false
				}
				if (!this.validatePassword(this.form.newpwd2, '确认新密码')) {
					return false
				}
				if (this.form.newpwd !== this.form.newpwd2) {
					this.$refs.uToast.show({
						title: `新密码与确认新密码不一致`
					})
					return false
				}
				let form = {
					newpassword1: this.form.newpwd,
					newpassword2: this.form.newpwd2,
					password: this.form.oldpwd,
					username: this.userInfo.username
				}
				this.loading = true
				this.$http.put('/admin/user/edit', form).then(({ data }) => {
					if (data.code === 0 && data.data === true) {
						this.$refs.uToast.show({
							title: '密码修改成功',
							duration: 1000,
							callback: () => {
								this.loading = false
								uni.switchTab({
									url: '/pages/user/index/index'
								})
							}
						})
						
					} else {
						// console.log(1)
						// this.$refs.uToast.show({
						// 	title: data.msg || '密码修改失败'
						// })
						this.loading = false
					}
				}).catch(() => {
					this.loading = false
					this.$refs.uToast.show({
						title: '密码修改失败'
					})
				})
			},
			validatePassword (value, name) {
				if (value === '') {
					this.$refs.uToast.show({
						title: `${name}不能为空`
					})
					return false
				}
				let reg = /^[a-zA-Z0-9]{6,16}$/
				if (!reg.test(value)) {
					this.$refs.uToast.show({
						title: `${name}为6-16位、数字或字母`
					})
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.change-password-container {
		background-color: #fff;
		padding: 20rpx 30rpx 40rpx;
		.text {
			margin-top: 20rpx;
			color: #999;
			font-size: 26rpx;
		}
		.btn-wrapper {
			margin-top: 50rpx;
		}
	}
</style>
