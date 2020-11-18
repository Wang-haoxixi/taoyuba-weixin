<template>
	<view class="release-register-container safe-bottom">
		<view class="title">请上传本人身份证正面照片(边缘完整)</view>
		<view class="form-wrapper">
			<u-form :model="form" ref="uForm" :rules="rules" label-width="150" :label-style="{color: '#999'}">
				<u-form-item prop="photoFront" label-position="top">
					<u-upload custom-btn width="500" :show-progress="false" @on-success="onSuccessPhotoFront" @on-remove="onRemovePhotoFront" ref="uUpload1" :file-list="photoFrontList" max-count="1" :action="`${apiUrl}/admin/file/upload/idcard`">
						<view class="img-wrapper" slot="addBtn">
							<image :src="`${imgUrl}/homo-face.png`" mode="aspectFit"></image>
						</view>
					</u-upload>
				</u-form-item>
				<u-form-item label="本人手机" required prop="phone">
					<u-input v-model="form.phone" border type="number" trim placeholder="请输入本人手机"/>
				</u-form-item>
				<u-form-item label="家属" required prop="contactName">
					<u-input type="select" border :select-open="contactNameShow" v-model="form.contactName" placeholder="请选择家属" @click="contactNameShow = true"></u-input>
				</u-form-item>
				<u-form-item label="家属手机" required prop="contactPhone">
					<u-input v-model="form.contactPhone" border type="number" trim placeholder="请输入家属手机"/>
				</u-form-item>
			</u-form>
		</view>
		<view class="tip-wrapper">
			<view class="tip">
				为及时便捷提供渔船求职服务，你的姓名、手机号码、籍贯（非详细地址）、民族、年龄向渔船船东、船长开放。其他个人信息由政府部门存档备案，不对外公布。
			</view>
			<view class="tip">咨询电话：0580-4790160（衢山镇渔业船员服务中心）。</view>
		</view>
		<view class="btn-wrapper">
			<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">申请</u-button>
		</view>
		<u-select safe-area-inset-bottom mode="single-column" :list="contactNameList" v-model="contactNameShow" @confirm="onConfirm"></u-select>
	</view>
</template>

<script>
	import { TOKEN } from '@/common/config/index.js'
	export default {
		data () {
			return {
				photoFrontList: [],
				contactNameShow: false,
				// header: {
				// 	'Authorization': 'Bearer ' + uni.getStorageSync(TOKEN)
				// },
				imgUrl: this.$IMAGE_URL,
				apiUrl: this.$API_URL, 
				loading: false,
				btnStyle: {
					backgroundColor: 'rgba(232, 103, 73, 1)',
					color: '#fff',
					fontSize: '32rpx',
					lineHeight: '100rpx'
				},
				form: {
					idcard: '',
					address: '',
					realName: '',
					sex: '',
					birthday: '',
					gender: '',
					nation: '',
					nationality: '中国',
					provinceId: '',
					cityId: '',
					districtId: '',
					photoFront: '',
					phone: '', // 本人手机
					contactName: '', // 家属
					contactPhone: '', // 家属手机
				},
				contactNameList: [
					{ value: '妻子', label: '妻子' },
					{ value: '父母', label: '父母' },
					{ value: '子女', label: '子女' },
					{ value: '兄弟', label: '兄弟' },
					{ value: '姐妹', label: '姐妹' },
				],
				rules: {
					photoFront: [{ required: true, message: '请上传你的身份证', trigger: ['change', 'blur'] }],
					phone: [
						{ required: true, message: '请输入本人手机', trigger: ['blur'] },
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
					contactName: [{ required: true, message: '请选择家属', trigger: ['change'] }],
					contactPhone: [
						{ required: true, message: '请输入家属手机', trigger: ['blur'] },
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					]
				}
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
			this.photoFrontList = this.$refs.uUpload1.lists
		},
		methods: {
			onSuccessPhotoFront (data, index, lists, name) {
				if (data.data.imageState === 'normal') {
					let result = data.data
					this.form.idcard= result.idcard
					this.form.realname = result.name
					this.form.photoFront = result.url
					this.form.address = result.address
					this.form.nation = result.nation
					let birth = result.birth
					this.form.birthday = birth.substring(0, 4) + '-' + birth.substring(4, 6) + '-' + birth.substring(6, 8)
					let idcard = this.form.idcard
					this.form.provinceId = parseInt(idcard.substring(0, 2)+'0000000000')
					this.form.cityId = parseInt(idcard.substring(0, 4)+'00000000')
					this.form.districtId = parseInt(idcard.substring(0, 6)+'000000')
					this.form.photoFront = result.url
					if(result.sex=='男'){
						this.form.gender = 1
					} else {
						this.form.gender = 2
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: data.data.nonIdcard || '无法识别'
					});
					this.form.photoFront = ''
					this.photoFrontList.splice(0, 1)
				}
			},
			onRemovePhotoFront (index, lists, name) {
				this.photoFrontList = lists
				this.form.photoFront = ''
				this.form.idcard= ''
				this.form.realname = ''
				this.form.photoFront = ''
				this.form.address = ''
				this.form.nation = ''
				this.form.birthday = ''
				this.form.provinceId = ''
				this.form.cityId = ''
				this.form.districtId = ''
			},
			onConfirm (e) {
				this.form.contactName = e[0].label
			},
			// 保存信息判断信息
			save () {
				this.loading = true
				this.$http.get('/tmlms/crew/idcardcheck', {
					params: {
						idcard: this.form.idcard
					}
				}).then(({ data }) => {
					this.loading = false
					if(data.msg=="船员信息已存在") {
						if (data.data.workStatus === 1) {
							uni.showToast({
								icon: 'none',
								title: '你已签订过合同，若要解除合同请与当地渔业合作社联系'
							})
							uni.navigateTo({
								url: `/pages/release/register/success?text=你已签订过合同，若要解除合同请与当地渔业合作社联系`
							})
						} else {
							this.loading = true
							this.$http.post('/tmlms/crew/editByWx?type=2', this.form).then(({ data }) => {
								this.loading = false
								uni.showToast({
									icon: 'none',
									title: '你的船员信息已登记成功！'
								})
							})
							uni.navigateTo({
								url: `/pages/release/register/success?text=你的船员信息已登记成功`
							})
						}
					} else {
						this.loading = true
						this.$http.post('/tmlms/crew/createByWx', this.form).then(({ data }) => {
							this.loading = false
							uni.showToast({
								icon: 'none',
								title: '你的船员信息已登记成功！'
							})
							uni.navigateTo({
								url: `/pages/release/register/success?text=你的船员信息已登记成功`
							})
						})
					}
					
					
					if(data.data){
						
						uni.switchTab({
							url: '/pages/user/index/index'
						})
					}
				}).catch(() => {
					this.loading = false
				})
			},
			onSubmit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.save()
					} else {
						console.log('验证失败')
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.release-register-container {
		padding: 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		.title {
			font-size: 34rpx;
			// margin-bottom: 20rpx;
			color: #c7535a;
		}
		.img-wrapper {
			.img-wrapper {
				width: 600rpx;
				height: 400rpx;
				image {
					width: 600rpx;
					height: 100%;
				}
			}
		}
		.tip-wrapper {
			margin-top: 20rpx;
		}
		.tip {
			font-size: 30rpx;
			color: #999;
		}
		.btn-wrapper {
			margin: 30rpx;
		}
	}
</style>
