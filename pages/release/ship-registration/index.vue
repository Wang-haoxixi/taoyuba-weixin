<template>
	<view class="release-register-container safe-bottom">
		<view class="title">请上传本人身份证正面照片(边缘完整)</view>
		<view class="form-wrapper">
			<u-form :model="form" ref="uForm" :rules="rules" label-width="150" :label-style="{color: '#999'}">
				<u-form-item prop="photoFront" label-position="top">
					<!-- :header="header" -->
					<u-upload custom-btn width="500" :show-progress="false" @on-success="onSuccessPhotoFront" @on-remove="onRemovePhotoFront" ref="uUpload1" :file-list="photoFrontList" max-count="1" :action="`${apiUrl}/admin/file/upload/idcard`">
						<view class="img-wrapper" slot="addBtn">
							<image :src="`${imgUrl}/homo-face.png`" mode="aspectFit"></image>
						</view>
					</u-upload>
				</u-form-item>
				<u-form-item label="区域" required prop="orgId">
					<u-input type="select" border :select-open="orgIdShow" v-model="form.orgIdName" placeholder="请选择区域" @click="orgIdOpen"></u-input>
				</u-form-item>
				<u-form-item label="类型" required prop="shipName">
					<u-input type="select" border :select-open="shipNameShow" v-model="form.shipName" placeholder="请选择类型" @click="openShipName"></u-input>
				</u-form-item>
				<u-form-item label="船名号" required prop="shipNum">
					<u-input v-model="form.shipNum" border type="number" trim placeholder="请输入船名号"/>
				</u-form-item>
				<u-form-item label="手机号" required prop="phone">
					<u-input v-model="form.phone" border type="number" trim placeholder="请输入手机号"/>
				</u-form-item>
			</u-form>
		</view>
		<view class="btn-wrapper">
			<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">申请</u-button>
		</view>
		<u-select safe-area-inset-bottom mode="single-column" :list="shipNameList" v-model="shipNameShow" @confirm="onConfirm"></u-select>
		<!-- 区域 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="organizationList" v-model="orgIdShow" @confirm="onOrgIdConfirm"></u-select>
	</view>
</template>

<script>
	import { TOKEN } from '@/common/config/index.js'
	import cloneDeep from 'lodash/cloneDeep'
	import orgMixin from '@/pages/mixins/org'
	export default {
		mixins: [orgMixin],
		data () {
			return {
				orgIdDisabled: false,
				shipNameShow: false,
				orgIdShow: false,
				header: {
					'Authorization': 'Bearer ' + uni.getStorageSync(TOKEN)
				},
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
					orgId: '', // 衢山
					flag: 2,
					birthday: '',
					gender: '',
					nation: '',
					nationality: '中国',
					provinceId: '',
					cityId: '',
					districtId: '',
					photoFront: '',
					phone: '', // 手机
					shipName: '', // 类型
					shipNum: '', // 船名号
				},
				rules: {
					orgId: [{ required: true, message: '请选择区域', trigger: ['change'] }],
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
					shipName: [{ required: true, message: '请选择类型', trigger: ['change'] }],
					shipNum: [
						{ required: true, message: '请输入船名号', trigger: ['blur'] },
						{
							validator: (rule, value, callback) => {
								let reg = /\d{5}/
								return reg.test(value);
							},
							message: '请输入5位数字船名号',
							trigger: ['change','blur'],
						}
					],
				}
			}
		},
		computed: {
			shipNameList () {
				let name = this.form.orgId ? this.organizationTypeList[this.form.orgId] : ''
				return [
					{ value: `${name}渔`, label: `${name}渔` },
					{ value: `${name}渔运`, label: `${name}渔运` },
					{ value: `${name}渔冷`, label: `${name}渔冷` },
					{ value: `${name}渔休`, label: `${name}渔休` }
				]
			}
		},
		onLoad (params) {
			if (params.orgId) {
				this.form.orgId = params.orgId
				this.orgIdDisabled = true
				console.log('this.form.orgId', this.form.orgId)
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
			this.photoFrontList = this.$refs.uUpload1.lists
		},
		watch: {
			'form.orgId': {
				handler (newVal) {
					if (newVal) {
						this.form.shipName = ''
					}
				}
			},
			organizationList: {
				handler (newVal) {
					let orgId = this.form.orgId
					if (newVal && orgId) {
						this.form.orgId = orgId
						newVal.forEach((item) => {
							if (item.value === orgId) {
								this.form.orgIdName = item.label
								return false
							}
						})
						this.orgIdDisabled = true
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			orgIdOpen () {
				if (!this.orgIdDisabled) {
					this.orgIdShow = true
				}
			},
			openShipName () {
				if (this.form.orgId) {
					this.shipNameShow = true
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先选择区域'
					})
				}
			},
			onOrgIdConfirm (e) {
				this.form.orgIdName = e[0].label
				this.form.orgId = e[0].value
			},
			onSuccessPhotoFront (data, index, lists, name) {
				if (data.data.imageState === 'normal') {
					let result = data.data
					this.form.idcard= result.idcard
					this.form.realName = result.name
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
				this.form.realName = ''
				this.form.photoFront = ''
				this.form.address = ''
				this.form.nation = ''
				this.form.birthday = ''
				this.form.provinceId = ''
				this.form.cityId = ''
				this.form.districtId = ''
			},
			onConfirm (e) {
				this.form.shipName = e[0].label
			},
			onSubmit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// 判断渔船存在否
						let form = cloneDeep(this.form)
						form.contactName = form.shipName
						form.shipName = form.shipName + form.shipNum
						this.$http.get(`/tybship/tybship/findmyshipWx/${this.form.shipName}${this.form.shipNum}`).then(({ data }) => {
							if (data.data) {
								this.$http.post('/tmlms/crew/checkMoreRelations', [form]).then(({ data }) => {
									if (data.data) {
										this.form.sourceType = 3
										this.$http.post(`/tmlms/crew/batchCreate?type=1`, [form]).then(({ data }) => {
											if (data.code === 0) {
												uni.showToast({
													icon: 'none',
													title: '船员登记添加成功'
												})
												uni.navigateTo({
													url: '/pages/release/register/success?text=上船登记添加成功'
												})
											} else {
												uni.showToast({
													icon: 'none',
													title: data.msg || '上船登记添加失败'
												})
											}
											
										})
									} else {
										uni.showToast({
											icon: 'none',
											title: data.msg
										})
									}
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: data.msg || '无此渔船信息'
								})
							}
						})
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
