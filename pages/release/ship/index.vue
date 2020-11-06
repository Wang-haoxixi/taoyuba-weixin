<template>
	<view class="ship-release-container">
		<u-form :model="form" ref="uForm" :rules="rules" label-width="150" :label-style="{color: '#999'}">
			<u-form-item label="渔船名称" prop="shipName" required>
				<u-input v-model="form.shipName" trim placeholder="请输入渔船名称"/>
			</u-form-item>
			<u-form-item label="持证人姓名" prop="shipOwner" required>
				<u-input v-model="form.shipOwner" trim placeholder="请输入持证人姓名"/>
			</u-form-item>
		</u-form>
		<view class="btn-wrapper">
			<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				loading: false,
				btnStyle: {
					backgroundColor: 'rgba(232, 103, 73, 1)',
					color: '#fff',
					fontSize: '32rpx',
					lineHeight: '100rpx'
				},
				form: {
					shipName: '', // 渔船名称
					shipOwner: '' // 持证人姓名
				},
				rules: {
					shipName: [{ required: true, message: '请输入渔船名称', trigger: 'blur' }],
					shipOwner: [{ required: true, message: '请输入持证人姓名', trigger: 'blur' }]
				},
				type: ''
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad (params) {
			console.log(params)
			if (params.type) {
				this.type = params.type
			}
		},
		methods: {
			onSubmit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.loading = true
						this.$http.get('/tmlms/ship_owner/searchShip', {
							params: this.form
						}).then(({ data }) => {
							this.loading = false
							if (data.data) {
								let userInfo = this.$cache.get('userInfo')
								let userId = userInfo.userId
								
								uni.navigateTo({
									url: `/pages/release/identity/index?shipId=${data.data.shipId}&userId=${userId}${this.type ? '&type='+this.type : ''}`
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: data.msg || '渔船或者持证人信息有误'
								})
							}
						}).catch(() => {
							this.loading = false
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ship-release-container {
		padding: 0 30rpx 30rpx;
		background-color: #fff;
		.btn-wrapper {
			margin: 30rpx;
		}
	}
</style>
