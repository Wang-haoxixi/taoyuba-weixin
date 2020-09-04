<template>
	<view class="shipowner-resume-container phonex-mb">
		<view class="image-wrapper">
			<image :src="`${imgURL}/release-bg.png`"></image>
		</view>
		<view class="edit-form-wrapper">
			<u-form :model="form" ref="uForm" :rules="rules" label-width="140" :label-style="{color: '#999'}">
				<u-form-item label="姓名" required prop="realName">
					<u-input v-model="form.realName" trim placeholder="请输入姓名" :disabled="form.realName"/>
				</u-form-item>
				<u-form-item label="身份证" required prop="idCard">
					<u-input v-model="form.idCard" trim placeholder="请输入身份证" :disabled="form.idCard"/>
				</u-form-item>
				<u-form-item label="联系地址" required prop="address">
					<u-input v-model="form.address" trim placeholder="请输入联系地址"/>
				</u-form-item>
				<u-form-item label="手机号码" required prop="phone">
					<u-input v-model="form.phone" trim placeholder="请输入手机号码" type="number" :disabled="form.phone"/>
				</u-form-item>
				<u-form-item label="渔船所有权登记证书" required prop="licensesOwnerPhoto" label-position="top">
					<u-upload :show-progress="false" ref="uUpload1" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/avatar`"></u-upload>
				</u-form-item>
				<u-form-item label="捕捞许可证编号" required prop="licensesFishingPhoto" label-position="top">
					<u-upload :show-progress="false" ref="uUpload2" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/avatar`"></u-upload>
				</u-form-item>
				<u-form-item label="国籍证书编号" required prop="licensesNationalPhoto" label-position="top">
					<u-upload :show-progress="false" ref="uUpload3" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/avatar`"></u-upload>
				</u-form-item>
				<u-form-item :header="header" label="船舶检验证书编号" required prop="licensesInspectionPhoto" label-position="top">
					<u-upload :show-progress="false" ref="uUpload4" max-count="1" :action="`${apiUrl}/admin/file/upload/avatar`"></u-upload>
				</u-form-item>
			</u-form>
			<view class="btn-wrapper">
				<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">保存</u-button>
			</view>
		</view>	
	</view>
</template>

<script>
	import { TOKEN } from '@/common/config/index.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		data () {
			return {
				imgURL: this.$IMAGE_URL,
				apiUrl: this.$API_URL, 
				loading: false,
				header: {
					'Authorization': 'Bearer ' + uni.getStorageSync(TOKEN)
				},
				btnStyle: {
					backgroundColor: 'rgba(232, 103, 73, 1)',
					color: '#fff',
					fontSize: '32rpx',
					lineHeight: '100rpx'
				},
				licensesOwnerPhotoList: [],
				licensesFishingPhotoList: [],
				licensesNationalPhotoList: [],
				licensesInspectionPhotoList: [],
				form: {
					realName: '',
					idCard: '',
					address: '',
					phone: '',
					licensesOwnerPhoto: '', // 渔船所有权登记证书
					licensesFishingPhoto: '', // 捕捞许可证编号 
					licensesNationalPhoto: '',  // 国籍证书编号
					licensesInspectionPhoto: '', // 船舶检验证书编号
				},
				rules: {
					realName: [ { required: true, message: '请输入姓名', trigger: ['change', 'blur'] } ],
					idCard: [ { required: true, message: '请输入身份证', trigger: ['change', 'blur'] } ],
					address: [ { required: true, message: '请输入联系地址', trigger: ['change', 'blur'] } ],
					phone: [ { required: true, message: '请输入手机号码', trigger: ['change', 'blur'] } ]
				}
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
			this.licensesOwnerPhotoList = this.$refs.uUpload1.lists
			this.licensesFishingPhotoList = this.$refs.uUpload2.lists
			this.licensesNationalPhotoList = this.$refs.uUpload3.lists
			this.licensesInspectionPhotoList = this.$refs.uUpload4.lists
		},
		onReady () {
			this.init()
		},
		methods: {
			init () {
				this.getUserInfoApi().then((data) => {
					this.form = Object.assign(this.form, data.data.sysUser)
				})
			},
			createApi () {
				this.loading = true
				this.$http.post('/tmlms/ship_owner/create?type=2').then(({ data }) => {
					if (data.code === 0 && data.data === true) {
						uni.showToast({
							icon: 'none',
							title: '新增成功'
						})
						uni.navigateTo({
							url: '/pages/user/index/index'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: data.msg || '新增失败'
						})
					}
					this.loading = false
				}).catch(e => {
					uni.showToast({
						icon: 'none',
						title: data.msg || '新增失败'
					})
					this.loading = false
				})
			},
			updateApi () {
				this.$http.post('/tmlms/ship_owner/edit?type=2').then(({ data }) => {
					if (data.code === 0 && data.data === true) {
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						})
						uni.navigateTo({
							url: '/pages/user/index/index'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: data.msg || '修改失败'
						})
					}
					this.loading = false
				}).catch(e => {
					uni.showToast({
						icon: 'none',
						title: data.msg || '修改失败'
					})
					this.loading = false
				})
			},
			onSubmit () {
				// console.log('this.licensesOwnerPhotoList', this.licensesOwnerPhotoList)
				this.form.licensesOwnerPhoto = this.licensesOwnerPhotoList[0] ? this.licensesOwnerPhotoList[0].url : ''
				this.form.licensesFishingPhoto = this.licensesFishingPhotoList[0] ? this.licensesFishingPhotoList[0].url : ''
				this.form.licensesNationalPhoto = this.licensesNationalPhotoList[0] ? this.licensesNationalPhotoList[0].url : ''
				this.form.licensesInspectionPhoto = this.licensesInspectionPhotoList[0] ? this.licensesInspectionPhotoList[0].url : ''
				// return
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证成功', this.form)
						// this.loading = true
						// this.$http.post().then(({ data }) => {
							
						// })
					} else {
						console.log('验证失败')
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.shipowner-resume-container {
		.image-wrapper {
			height: 400rpx;
			width: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.edit-form-wrapper {
			font-size: 26rpx;
			background-color: #fff;
			padding: 0 30rpx 30rpx;
		}
		.btn-wrapper {
			margin: 30rpx;
		}
	}
</style>
