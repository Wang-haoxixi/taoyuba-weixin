<template>
	<!-- 简历 -->
	<view class="release-resume-edit-container phonex-mb">
		<view class="image-wrapper">
			<image :src="`${imgURL}/release-bg.png`"></image>
		</view>
		<view class="edit-form-wrapper">
			<u-form :model="form" ref="uForm" :rules="rules" label-width="150" :label-style="{color: '#999'}">
				<view class="content-container">
					<view class="title">基本信息</view>
					<view class="body-wrapper">
						<u-form-item label="应聘职务" prop="positionId" required>
							<u-input type="select" :select-open="positionIdShow" v-model="form.positionIdLabel" placeholder="请选择应聘职务" @click="positionIdShow = true"></u-input>
						</u-form-item>
						<u-form-item label="婚姻状态">
							<u-input type="select" :select-open="maritalStatusShow" v-model="form.maritalStatusLabel" placeholder="请选择应聘职务" @click="maritalStatusShow = true"></u-input>
						</u-form-item>
						<u-form-item label="作业方式">
							<u-input type="select" :select-open="workRequireShow" v-model="form.workRequireLabel" placeholder="请选择作业方式" @click="workRequireShow = true"></u-input>
						</u-form-item>
						<u-form-item label="工作经验">
							<u-input type="select" :select-open="workExprienceShow" v-model="form.workExprienceLabel" placeholder="请选择工作经验" @click="workExprienceShow = true"></u-input>
						</u-form-item>
						<u-form-item label="文化程度">
							<u-input type="select" :select-open="eduDegreeShow" v-model="form.eduDegreeLabel" placeholder="请选择教育程度" @click="eduDegreeShow = true"></u-input>
						</u-form-item>
						<u-form-item label="期望月薪">
							<u-input v-model="form.salary" trim placeholder="请输入期望月薪" type="number"/>
						</u-form-item>
						<u-form-item label="现住地址" >
							<u-input v-model="form.preAddress" trim placeholder="请输入现住地址"/>
						</u-form-item>
						<u-form-item label="特长">
							<u-input v-model="form.speciality" trim placeholder="请输入特长"/>
						</u-form-item>
					</view>
				</view>
				<view class="content-container">
					<view class="title">个人资料</view>
					<view class="body-wrapper">
						<u-form-item label="姓名" prop="realName" required>
							<u-input v-model="form.realName" trim placeholder="请输入姓名"/>
						</u-form-item>
						<u-form-item label="身份证号" prop="idcard" required>
							<u-input v-model="form.idcard" trim placeholder="请输入身份证号"/>
						</u-form-item>
						<u-form-item label="性别" prop="genderLabel" required>
							<u-input type="select" :select-open="genderShow" v-model="form.genderLabel" placeholder="请输入性别" @click="genderShow = true"/>
						</u-form-item>
						<u-form-item label="籍贯地区" prop="districtIdLabel" required>
							<u-input type="select" :select-open="districtIdShow" v-model="form.districtIdLabel" placeholder="请选择籍贯" @click="openDistrictId"></u-input>
						</u-form-item>
						<u-form-item label="国籍" prop="nationality" required>
							<u-input v-model="form.nationality" trim placeholder="请输入国籍"/>
						</u-form-item>
						<u-form-item label="出生日期" prop="birthday" required>
							<u-input type="select" :select-open="birthdayShow" v-model="form.birthday" placeholder="请选择出生日期" @click="birthdayShow = true"></u-input>
						</u-form-item>
						<u-form-item label="民族" prop="nation" required>
							<u-input type="select" :select-open="nationShow" v-model="form.nation" placeholder="请选择民族" @click="nationShow = true"></u-input>
						</u-form-item>
						<u-form-item label="家庭地址">
							<u-input placeholder="请输入家庭地址" trim v-model="form.address"></u-input>
						</u-form-item>
						<u-form-item label="联系电话" prop="phone" required>
							<u-input placeholder="请输入联系电话" trim :disabled="form.phone" v-model="form.phone" type="number"></u-input>
						</u-form-item>
						<u-form-item label="家庭联系人" prop="contactPhone" required>
							<u-input placeholder="请输入家庭联系人" v-model="form.contactName"></u-input>
						</u-form-item>
						<u-form-item label="家庭联系电话" prop="contactName" required label-width="160">
							<u-input placeholder="请输入家庭联系电话" trim v-model="form.contactPhone"></u-input>
						</u-form-item>
						<u-form-item label="身份证正面照片" required prop="photoFront" label-position="top">
							<u-upload :show-progress="false" @on-success="onSuccessPhotoFront" @on-remove="onRemovePhotoFront" ref="uUpload1" :file-list="photoFrontList" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/idcard`"></u-upload>
						</u-form-item>
						<u-form-item label="身份证反面照片" required prop="photoReverse" label-position="top">
							<u-upload :show-progress="false" @on-remove="onRemovePhotoReverse" ref="uUpload2" :file-list="photoReverseList" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/avatar`"></u-upload>
						</u-form-item>
						<u-form-item label="船员证书" required prop="certPhoto" label-position="top">
							<u-upload :show-progress="false" @on-remove="onRemoveCertPhotoList" ref="uUpload3" :file-list="certPhotoList" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/avatar`"></u-upload>
						</u-form-item>
					</view>
				</view>
				<view class="agreement">
					<u-checkbox v-model="agreement" @change="checkboxChange"></u-checkbox>
					<view class="agreement-text">
						同意船东查看您的详细信息，包括姓名和手机号等
					</view>
				</view>
				<view class="btn-wrapper">
					<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">发布简历</u-button>
				</view>
			</u-form>
		</view>
		<!-- 婚姻状态 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="maritalStatusList" v-model="maritalStatusShow" @confirm="(e) => onConfirm(e, 'maritalStatus')"></u-select>
		<!-- 民族 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="nationList" v-model="nationShow" @confirm="onConfirmNation"></u-select>
		<!-- 性别 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="genderList" v-model="genderShow" @confirm="(e) => onConfirm(e, 'gender')"></u-select>
		<!-- 应聘职务 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="positionIdList" v-model="positionIdShow" @confirm="(e) => onConfirm(e, 'positionId')"></u-select>
		<!-- 作业方式 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="workRequireList" v-model="workRequireShow" @confirm="(e) => onConfirm(e, 'workRequire')"></u-select>
		<!-- 期望月薪 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="workExprienceList" v-model="workExprienceShow" @confirm="(e) => onConfirm(e, 'workExprience')"></u-select>
		<!-- 籍贯 -->
		<u-picker safe-area-inset-bottom mode="multiSelector" :default-selector="districtIdDefaultSelector" @confirm="onConfirmDistrictId" v-model="districtIdShow" range-key="shortName" @columnchange="onColumnChangeNationality" :range="cityAddressList"></u-picker>
		<!-- 出生日期 -->
		<u-picker safe-area-inset-bottom mode="time" v-model="birthdayShow" @confirm="birthdayConfirm" :params="{year: true, month: true, day: true, hour: false, minute: false, second: false}"></u-picker>
		<!-- 教育程度 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="eduDegreeList" v-model="eduDegreeShow" @confirm="(e) => onConfirm(e, 'eduDegree')"></u-select>
		<!-- 外语水平 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="languageList" v-model="languageShow" @confirm="(e) => onConfirm(e, 'language')"></u-select>
		<!-- 是否公开 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="isOpenList" v-model="isOpenShow" @confirm="(e) => onConfirm(e, 'isOpen')"></u-select>
	</view>
</template>

<script>
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import cityMixin from '@/pages/mixins/city.js'
	import { TOKEN } from '@/common/config/index.js'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		mixins: [dictMapMixin, cityMixin],
		data () {
			return {
				apiUrl: this.$API_URL,
				editType: '',
				photoFrontList: [],
				photoReverseList: [],
				certPhotoList: [],
				header: {
					'Authorization': 'Bearer ' + uni.getStorageSync(TOKEN)
				},
				loading: false,
				districtIdShow: false,
				positionIdShow: false,
				maritalStatusShow: false,
				oldPositionIdShow: false,
				workRequireShow: false,
				eduDegreeShow: false,
				workExprienceShow: false,
				nationalityShow: false,
				nationShow: false,
				birthdayShow: false,
				languageShow: false,
				isOpenShow: false,
				genderShow: false,
				imgURL: this.$IMAGE_URL,
				agreement: true,
				currentInfo: {},
				btnStyle: {
					backgroundColor: 'rgba(232, 103, 73, 1)',
					color: '#fff',
					fontSize: '32rpx',
					lineHeight: '100rpx'
				},
				languageList: [
					{ value: '1', label: '精通' },
					{ value: '2', label: '不精通' }
				],
				isOpenList: [
					{ value: '1', label: '是' },
					{ value: '0', label: '否' }
				],
				districtIdDefaultSelector: [0, 0, 0],
				form: {
					isAgree: '', // 同意勾选
					userId: '', 
					photoFront: '', // 身份证正面照片
					photoReverse: '', // 身份证反面照片
					certPhoto: '', // 船员证书
					maritalStatus: '', // 婚姻状态
					preAddress: '', // 现住地址
					idcard: '', // 身份证号
					gender: '', // 性别
					nation: '',  // 民族
					address: '', // 家庭地址
					contactName: '', // 家庭联系人
					contactPhone: '', // 家庭联系电话
					positionId: '', // 职务
					// newPositionId: '', //应聘职务
					// oldPositionId: '', // 原有职务
					workRequire: '', // 作业方式 
					workExprience: '', // 工作经验 
					salary: '', // 期望月薪
					speciality: '', // 特殊技能
					realName: '', // 姓名
					phone: '', // 电话
					nationality: '', // 籍贯
					provinceId: '', // 省
					cityId: '', // 市
					districtId: '', // 县
					birthday: '', // 出生日期
					eduDegree: '', // 教育程度
					language: '', // 外语水平
					height: '', // 身高
					isOpen: '', // 是否公开 
					remark: '', // 补充说明
				},
				rules: {
					idcard: [
						{ required: true, message: '请选择职务', trigger: ['change', 'blur'] },
						{
							pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
							transform(value) {
								return String(value);
							},
							message: '身份证号码不正确'
						},
					],
					genderLabel: [
						{ required: true, message: '请选择性别', trigger: ['change', 'blur'] }
					],
					positionId: [
						{ required: true, message: '请选择职务', trigger: ['change', 'blur'] }
					],
					workRequire: [
						{ required: true, message: '请选择作业方式', trigger: 'change' }
					],
					workExprience: [
						{ required: true, message: '请选择工作经验', trigger: 'change' }
					],
					salary: [
						{ required: true, message: '请输入期望月薪', trigger: 'change' }
					],
					realName: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入电话', trigger: 'blur' }
					],
					districtIdLabel:  [
						{ required: true, message: '请选择籍贯地区', trigger: 'change' }
					],
					nationality: [
						{ required: true, message: '请填写籍贯', trigger: 'blur' }
					],
					nationLabel:  [
						{ required: true, message: '请选择民族', trigger: 'change' }
					],
					contactName: [
						{ required: true, message: '请填写家庭联系人', trigger: 'blur' }
					],
					contactPhone: [
						{ required: true, message: '请填写家庭联系电话', trigger: 'blur' }
					],
					birthday: [
						{ required: true, message: '请选择出生日期', trigger: 'change' }
					],
					maritalStatus: [
						{ required: true, message: '请选择婚姻状态', trigger: 'change' }
					],
					photoFront: [
						{ required: true, message: '请上传身份证正面照片', trigger: 'change, blur' }
					],
					photoReverse: [
						{ required: true, message: '请上传身份证反面照片', trigger: 'change' }
					],
					certPhoto: [
						{ required: true, message: '请上传船员证书', trigger: 'change' }
					]
					// eduDegree: [
					// 	{ required: true, message: '请选择教育程度', trigger: 'change' }
					// ],
					// isOpen: [
					// 	{ required: true, message: '请选择是否公开', trigger: 'change' }
					// ],
				}
			}
		},
		computed: {
			maritalStatusList () {
				return cloneDeep(this.dictMap)['marital'] || []
			},
			nationList () {
				return cloneDeep(this.dictMap)['nationals'] || []
			},
			genderList () {
				return cloneDeep(this.dictMap)['sex'] || []
			},
			positionIdList () {
				return cloneDeep(this.dictMap)['tyb_resume_position'] || [] 
			},
			workRequireList () {
				return cloneDeep(this.dictMap)['tyb_resume_worktype'] || [] 
			},
			workExprienceList () {
				return cloneDeep(this.dictMap)['tyb_work_exprience'] || []
			},
			eduDegreeList () {
				return cloneDeep(this.dictMap)['tyb_education_degree'] || []
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
			this.photoFrontList = this.$refs.uUpload1.lists
			this.photoReverseList = this.$refs.uUpload2.lists
			this.certPhotoList = this.$refs.uUpload3.lists
		},
		onLoad (params) {
			this.editType = params.type
			this.getCurrentInfo()
		},
		methods: {
			initForm () {
				this.getDictLabel('maritalStatus', this.form.maritalStatus, this.maritalStatusList)
				this.getDictLabel('gender', this.form.gender, this.genderList)
				this.getDictLabel('positionId', this.form.positionId, this.positionIdList)
				this.getDictLabel('nation', this.form.nation, this.nationList)
				this.getDictLabel('workRequire', this.form.workRequire, this.workRequireList)
				this.getDictLabel('workExprience', this.form.workExprience, this.workExprienceList)
				this.getDictLabel('eduDegree', this.form.eduDegree, this.eduDegreeList)
			},
			getDictLabel (prop, value, data) {
				for (let i = 0, len = data.length; i < len; i++) {
					if (data[i].value === value) {
						this.form[`${prop}Label`] = data[i].label
						break
					}
				}
			},
			// 获取部门中文名
			initCityLabel (id) {
				this.$http.get(`/admin/region/wholeInfo?areaCode=${id}`).then(({ data }) => {
					if (data.code === 0) {
						let result = []
						this.recursionCityLabel(result, data.data)
						this.$set(this.form, 'districtIdLabel', result.join('-'))
						this.form.districtIdLabel = result.join('-')
					}
				})
			},
			recursionCityLabel (result, data) {
				for (let key in data) {
					if (key === 'name') {
						result.push(data[key])
						let child = data.child
						if (child && Object.keys(child).length > 0) {
							this.recursionCityLabel(result, child)
						}
					}
				}
			},
			// 获取当前用户信息
			getCurrentInfo () {
				this.$http.get('/tmlms/crew/myInfo').then(({ data }) => {
					if (data.code === 0) {
						if (Object.keys(data.data).length === 0) {
							return
						}
						this.form = data.data
						if (this.form.districtId) {
							this.initCityLabel(this.form.districtId)
						}
						this.getDicMap().then(() => {
							this.initForm()
						})
						this.form.salary = this.form.salary + ''
						if (this.form.photoFront) {
							this.photoFrontList = [{url: this.form.photoFront}]
						}
						if (this.form.photoReverse) {
							this.photoReverseList = [{url: this.form.photoReverse}]
						}
						if (this.form.certPhoto) {
							this.certPhotoList = [{url: this.form.certPhoto}]
						}
					}
				})
			},
			onColumnChangeNationality ({column, index}) {
				if (column === 0) {
					let areaCode = this.cityAddressList[column][index].areaCode
					this.getCityAddressSecond(areaCode)
				} else if (column === 1) {
					let areaCode = this.cityAddressList[column][index].areaCode
					this.getCityAddressThird(areaCode)
				}
			},
			// 籍贯
			onConfirmDistrictId (val) {
				this.districtIdDefaultSelector = val
				let third = this.cityAddressList[2]
				if (third && third.length > 0) {
					let nationality = third[val[2]].areaCode
					let nationalityLabel = `${this.cityAddressList[0][val[0]].shortName}-${this.cityAddressList[1][val[1]].shortName}-${this.cityAddressList[2][val[2]].shortName}`
					this.$set(this.form, 'nationalityLabel', nationalityLabel)
					this.$set(this.form, 'nationality', nationality)
					return
				} 
				let second = this.cityAddressList[1]
				if (second && second.length > 0) {
					let nationality = second[val[1]].areaCode
					let nationalityLabel = `${this.cityAddressList[0][val[0]].shortName}-${this.cityAddressList[1][val[1]].shortName}`
					this.$set(this.form, 'nationalityLabel', nationalityLabel)
					this.$set(this.form, 'nationality', nationality)
					return
				} 
				let first = this.cityAddressList[0]
				if (first && first.length > 0) {
					let nationality = first[val[0]].areaCode
					let nationalityLabel = `${this.cityAddressList[0][val[0]].shortName}`
					this.$set(this.form, 'nationalityLabel', nationalityLabel)
					this.$set(this.form, 'nationality', nationality)
				} 
			},
			openDistrictId () {
				if (!(this.cityAddressList.length > 0 && this.cityAddressList[0].length > 0)) {
					this.getCityAddressFirst('0')
				}
				this.districtIdShow = true
			},
			// 出生日期
			birthdayConfirm (e) {
				this.form.birthday = `${e.year}-${e.month}-${e.day}`
			},
			onConfirm (e, prop) {
				this.form[prop] = e[0].value
				this.form[`${prop}Label`] = e[0].label
			},
			updateApi () {
				this.$http.post('/tmlms/crew/edit?type=2', this.form).then(({ data }) => {
					if (data.code === 0 && data.data === true) {
					 	uni.showToast({
					 		icon: 'none',
					 		title: '修改成功'
					 	})
						uni.switchTab({
							url: '/pages/user/index/index'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '修改失败'
						})
					}
					this.loading = false
				}).catch(() => {
					uni.showToast({
						icon: 'none',
						title: '修改失败'
					})
					this.loading = false
				})
			},
			createApi () {
				this.$http.post('/tmlms/crew/create?type=2', this.form).then(({ data }) => {
					if (data.code === 0 && data.data === true) {
					 	uni.showToast({
					 		icon: 'none',
					 		title: '新增成功'
					 	})
						uni.switchTab({
							url: '/pages/user/index/index'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '新增失败'
						})
					}
					this.loading = false
				}).catch(() => {
					uni.showToast({
						icon: 'none',
						title: '新增失败'
					})
					this.loading = false
				})
			},
			// 发布简历
			onSubmit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (!this.agreement) {
							uni.showToast({
								icon: 'none',
								title: '您还未勾选同意船东查看您信息'
							});
							return
						}
						this.loading = true
						if (this.editType === 'add') {
							this.createApi()
						} else {
							this.updateApi()
						}
					} else {
						console.log('验证失败')
					}
				})
			},
			onRemovePhotoFront (index, lists, name) {
				this.form.photoFront = ''
				this.photoFrontList = lists
			},
			onSuccessPhotoFront (data, index, lists, name) {
				if (data.data.imageState === 'normal') {
					let result = data.data
					this.form.photoFront = result.url
				} else {
					uni.showToast({
						icon: 'none',
						title: data.data.nonIdcard || '无法识别'
					});
					this.form.photoFront = ''
					this.photoFrontList.splice(0, 1)
				}
			},
			onRemovePhotoReverse (index, lists, name) {
				this.photoReverseList = lists
			},
			onRemoveCertPhoto (index, lists, name) {
				this.CertPhotoList = lists
			},
			onConfirmNation (e) {
				this.form['nation'] = e[0].label
			},
			checkboxChange(e) {
				this.agreement = e.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.release-resume-edit-container {
		.image-wrapper {
			height: 400rpx;
			width: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.content-container {
			.title {
				height: 88rpx;
				line-height: 88rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 28rpx;
			}
			.body-wrapper {
				font-size: 26rpx;
				background-color: #fff;
				padding: 0 30rpx;
			}
		}
		.btn-wrapper {
			margin: 30rpx;
		}
		.agreement {
			display: flex;
			align-items: center;
			margin: 40rpx 10rpx;
			font-size: 28rpx;
			.agreement-text {
				padding-left: 8rpx;
				color: #999;
			}
		}
	}
</style>
