<template>
	<view class="id-boss">
		<u-image height="250rpx" :src="imgUrlHeader"></u-image>
		<view class="page-base">
			<u-form :model="form" ref="uForm" :error-type="errorType" label-width="150">
				<u-form-item label="姓名" prop="name"><u-input v-model="form.name" :disabled="true" /></u-form-item>
				<u-form-item label="性别" prop="sex"><u-input v-model="form.sex" :disabled="true" /></u-form-item>
				<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" :disabled="true" /></u-form-item>
				<u-form-item label="联系地址" prop="address"><u-input v-model="form.address" :disabled="true"/></u-form-item>
				<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" /></u-form-item>
				<u-form-item label="民族" prop="nation"><u-input v-model="form.nation" :disabled="true"/></u-form-item>
			</u-form>
			<u-button @click="sumbit" type="primary">保存</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		mixins: [],
		components: {
		},
		data () {
			return {
				orgId: 21, //此处目前写死21
				errorType: ['message','toast'],
				form: {
					name: '',
					idcard: '',
					address: '',
					phone: '',
					sex: '',
					nation: ''
				},
				imgUrlHeader: `${this.$IMAGE_URL}/release-bg.png`,
				rules: {
					name: [
						{ 
							required: true, 
							message: '请输入姓名', 
							trigger: ['change','blur'],
						}
					],
					idcard: [
						{ 
							required: true, 
							message: '请输入身份证', 
							trigger: ['change','blur'],
						}
					],
					sex: [
						{ 
							required: true, 
							message: '请输入性别', 
							trigger: ['change','blur'],
						}
					],
					address: [
						{ 
							required: true, 
							message: '请输入联系地址', 
							trigger: ['change','blur'],
						}
					],
					phone: [
						{ 
							required: true, 
							message: '请输入手机', 
							trigger: ['change','blur'],
						}
					],
					nation: [
						{ 
							required: true, 
							message: '请输入民族', 
							trigger: ['change','blur'],
						}
					],
				}
			}
		},
		onShow () {
			this.$set(this.form,'phone','')
			this.form = uni.getStorageSync('cardInformation')
			console.log('form..', this.form, uni.getStorageSync('phoneSrc'))
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad (option) {
		},
		onReady() {
			// this.form = uni.getStorageSync('cardInformation')
			// console.log('form..', this.form, uni.getStorageSync('phoneSrc'))
			// this.$refs.uForm.setRules(this.rules);
		},
		watch: {
		},
		methods: {
			sumbit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$http.upload('/admin/gather/addUser', {
							filePath: uni.getStorageSync('phoneSrc'),
							name: 'file',
							formData: {
								...this.form,
								realName: this.form.name,
								type: 1, // 此处目前写死 职务类型 船员为1 只有船员才能看视频
								orgId : this.orgId,
								idcardPhoto: this.form.url
							}
						}).then(({data})=>{
							console.log('/admin/gather/addUser...', data)
							if(data.code === 0){
								uni.showToast({
									icon: 'none',
									title: '数据上传成功!'
								})
								setTimeout(()=>{
									uni.navigateTo({
										url: '/pages/user/real/success?content=采集成功'
									})
								},1000)
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.id-boss {
	.page-base {
		::v-deep .u-form{
			margin: 50rpx 0;
		}
		::v-deep .u-btn{
			margin: 50rpx 0;
		}
	}
}
</style>
