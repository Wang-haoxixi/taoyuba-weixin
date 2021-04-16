<template>
	<view class="id-boss">
		<u-image height="250rpx" :src="imgUrlHeader"></u-image>
		<view class="page-base">
			<u-form :model="form" ref="uForm" :error-type="errorType" label-width="150">
				<u-form-item label="姓名" prop="name"><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="性别" prop="sex"><u-input v-model="form.sex" /></u-form-item>
				<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" /></u-form-item>
				<u-form-item label="联系地址" prop="address"><u-input v-model="form.address" /></u-form-item>
				<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" /></u-form-item>
				<u-form-item label="民族" prop="nation"><u-input v-model="form.nation" /></u-form-item>
			</u-form>
			<u-button @click="sumbitOne" type="primary">保存</u-button>
		</view>
		<u-modal v-model="show" @confirm="sumbit" :show-cancel-button="true" :show-title="false" >
			<view class="slot-content">
				<view class="page-base page-base-nomargin">
					<u-image :src="phoneSrc" height="250rpx" width="250rpx" shape="circle"></u-image>
					<u-form :model="form" ref="uForm" :error-type="errorType" label-width="150">
						<u-form-item label="姓名" prop="name"><u-input v-model="form.name" :disabled="true"/></u-form-item>
						<u-form-item label="性别" prop="sex"><u-input v-model="form.sex" :disabled="true"/></u-form-item>
						<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" :disabled="true"/></u-form-item>
						<u-form-item label="联系地址" prop="address"><u-input v-model="form.address" :disabled="true"/></u-form-item>
						<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" :disabled="true"/></u-form-item>
						<u-form-item label="民族" prop="nation"><u-input v-model="form.nation" :disabled="true"/></u-form-item>
					</u-form>
					<view style="padding: 20rpx"> 注：{{ ispeo ? '此信息为本人信息' : '此信息为非本人信息' }} </view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		mixins: [],
		components: {
		},
		data () {
			return {
				ispeo: false,
				errorType: ['message','toast'],
				phoneSrc: '',
				show: false,
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
		},
		onLoad (option) {
		},
		onReady() {
			this.form = uni.getStorageSync('cardInformation')
			this.phoneSrc = uni.getStorageSync('phoneSrc')
			this.ispeo = uni.getStorageSync('openIdObj').realWxOpenid
			this.$set(this.form,'phone','')
			this.$refs.uForm.setRules(this.rules);
		},
		watch: {
		},
		methods: {
			sumbitOne () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.show = true
					} else {
						console.log('验证失败');
					}
				});
			},
			// 提交信息
			sumbit () {
				// 后端个老禽兽  给我19971106要我给1997-11-06 名字也不对应 我只能一个一个赋值 name-realName sex-gender birth-birthday
				function insertStr(soure, start, newStr){   
				   return soure.slice(0, start) + newStr + soure.slice(start);
				}
				let openIdObj = uni.getStorageSync('openIdObj')
				this.form = { ...this.form,...openIdObj,realName: this.form.name,gender: this.form.sex === '男' ? 1 : 2,birthday: insertStr(insertStr(this.form.birth,4,'-'),7,'-') }
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$http.upload('/admin/gather/addUser', {
							filePath: uni.getStorageSync('phoneSrc'),
							name: 'file',
							formData: {
								type: uni.getStorageSync('openIdObj').realWxOpenid ? 1 : 2,
								...this.form
							}
						}).then(({ data })=>{
							this.$getCode(data).then(res=>{
								uni.showToast({
									icon: 'none',
									title: '数据上传成功!'
								})
								setTimeout(()=>{
									uni.switchTab({
										url: '/pages/user/index/index'
									})
								},1000)
							})
						}).catch(({ data })=>{
							uni.showToast({
								icon: 'none',
								title: data.msg
							})
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
	.page-base-nomargin {
		::v-deep .u-form{
			margin: 0;
		}
		::v-deep .u-btn{
			margin: 0;
		}
		::v-deep .u-form-item {
			padding: 0;
		}
		::v-deep .u-image{
			margin: 20rpx auto;
		}
	}
}
</style>
