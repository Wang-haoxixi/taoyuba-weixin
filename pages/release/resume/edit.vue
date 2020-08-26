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
						<u-form-item label="应聘职务" prop="newPositionId" required>
							<u-input type="select" :select-open="newPositionIdShow" v-model="form.newPositionIdLabel" placeholder="请选择应聘职务" @click="newPositionIdShow = true"></u-input>
						</u-form-item>
						<u-form-item label="原有职务" prop="oldPositionId" required>
							<u-input type="select" :select-open="oldPositionIdShow" v-model="form.oldPositionIdLabel" placeholder="请选择原有职务" @click="oldPositionIdShow = true"></u-input>
						</u-form-item>
						<u-form-item label="作业方式" prop="workRequire" required>
							<u-input type="select" :select-open="workRequireShow" v-model="form.workRequireLabel" placeholder="请选择作业方式" @click="workRequireShow = true"></u-input>
						</u-form-item>
						<u-form-item label="工作经验" prop="workExprience" required>
							<u-input type="select" :select-open="workExprienceShow" v-model="form.workExprienceLabel" placeholder="请选择工作经验" @click="workExprienceShow = true"></u-input>
						</u-form-item>
						<u-form-item label="期望月薪" prop="salary" required>
							<u-input v-model="form.salary" trim placeholder="请输入期望月薪" type="number"/>
						</u-form-item>
						<u-form-item label="特殊技能">
							<u-input v-model="form.speciality" placeholder="请输入特殊技能"/>
						</u-form-item>
					</view>
				</view>
				<view class="content-container">
					<view class="title">个人资料</view>
					<view class="body-wrapper">
						<u-form-item label="姓名" prop="realName" required>
							<u-input v-model="form.realName" trim placeholder="请输入姓名"/>
						</u-form-item>
						<u-form-item label="电话" prop="phone" required>
							<u-input placeholder="请输入电话" trim v-model="form.phone" type="number"></u-input>
						</u-form-item>
						<u-form-item label="籍贯" prop="nationalityLabel" required>
							<u-input type="select" :select-open="nationalityShow" v-model="form.nationalityLabel" placeholder="请选择籍贯" @click="openNationality"></u-input>
						</u-form-item>
						<u-form-item label="出生日期" prop="birthday" required>
							<u-input type="select" :select-open="birthdayShow" v-model="form.birthday" placeholder="请选择出生日期" @click="birthdayShow = true"></u-input>
						</u-form-item>
						<u-form-item label="教育程度" prop="eduDegree" required>
							<u-input type="select" :select-open="eduDegreeShow" v-model="form.eduDegreeLabel" placeholder="请选择教育程度" @click="eduDegreeShow = true"></u-input>
						</u-form-item>
						<u-form-item label="外语水平" prop="language" required>
							<u-input type="select" :select-open="languageShow" v-model="form.languageLabel" placeholder="请选择外语水平" @click="languageShow = true"></u-input>
						</u-form-item>
						<u-form-item label="身高">
							<u-input v-model="form.height" trim placeholder="请输入身高"/>
						</u-form-item>
						<u-form-item label="是否公开" prop="isOpen" required>
							<u-input type="select" :select-open="isOpenShow" v-model="form.isOpenLabel" placeholder="请选择是否公开" @click="isOpenShow = true"></u-input>
						</u-form-item>
					</view>
				</view>
				<view class="content-container">
					<view class="title">补充说明</view>
					<view class="body-wrapper">
						<u-form-item>
							<u-input v-model="form.remark" trim type="textarea" :border="false" height="100" auto-height placeholder="补充说明" />
						</u-form-item>
					</view>
				</view>
				<view class="btn-wrapper">
					<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">发布简历</u-button>
				</view>
			</u-form>
		</view>
		<!-- 应聘职务 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="newPositionIdList" v-model="newPositionIdShow" @confirm="(e) => onConfirm(e, 'newPositionId')"></u-select>
		<!-- 原有职务 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="oldPositionIdList" v-model="oldPositionIdShow" @confirm="(e) => onConfirm(e, 'oldPositionId')"></u-select>
		<!-- 作业方式 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="workRequireList" v-model="workRequireShow" @confirm="(e) => onConfirm(e, 'workRequire')"></u-select>
		<!-- 期望月薪 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="workExprienceList" v-model="workExprienceShow" @confirm="(e) => onConfirm(e, 'workExprience')"></u-select>
		<!-- 籍贯 -->
		<u-picker safe-area-inset-bottom mode="multiSelector" :default-selector="nationalityDefaultSelector" @confirm="onConfirmNationality" v-model="nationalityShow" range-key="shortName" @columnchange="onColumnChangeNationality" :range="cityAddressList"></u-picker>
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
	export default {
		mixins: [dictMapMixin, cityMixin],
		data () {
			return {
				loading: false,
				newPositionIdShow: false,
				oldPositionIdShow: false,
				workRequireShow: false,
				eduDegreeShow: false,
				workExprienceShow: false,
				nationalityShow: false,
				birthdayShow: false,
				languageShow: false,
				isOpenShow: false,
				imgURL: this.$IMAGE_URL,
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
				nationalityDefaultSelector: [0, 0, 0],
				form: {
					userId: '', 
					newPositionId: '', //应聘职务
					oldPositionId: '', // 原有职务
					workRequire: '', // 作业方式 
					workExprience: '', // 工作经验 
					salary: '', // 期望月薪
					speciality: '', // 特殊技能
					realName: '', // 姓名
					phone: '', // 电话
					nationality: '', // 籍贯
					birthday: '', // 出生日期
					eduDegree: '', // 教育程度
					language: '', // 外语水平
					height: '', // 身高
					isOpen: '', // 是否公开 
					remark: '', // 补充说明
				},
				rules: {
					newPositionId: [
						{ required: true, message: '请选择应聘职务', trigger: 'change' }
					],
					oldPositionId: [
						{ required: true, message: '请选择原有职务', trigger: 'change' }
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
					nationalityLabel: [
						{ required: true, message: '请选择籍贯', trigger: 'change' }
					],
					birthday: [
						{ required: true, message: '请选择出生日期', trigger: 'change' }
					],
					eduDegree: [
						{ required: true, message: '请选择教育程度', trigger: 'change' }
					],
					isOpen: [
						{ required: true, message: '请选择是否公开', trigger: 'change' }
					],
				}
			}
		},
		computed: {
			newPositionIdList () {
				return this.dictMap ? this.dictMap['tyb_resume_position'] : [] 
			},
			oldPositionIdList () {
				return this.dictMap ? this.dictMap['tyb_resume_position'] : [] 
			},
			workRequireList () {
				return this.dictMap ? this.dictMap['tyb_resume_worktype'] : [] 
			},
			workExprienceList () {
				return this.dictMap ? this.dictMap['tyb_work_exprience'] : []
			},
			eduDegreeList () {
				return this.dictMap ? this.dictMap['tyb_education_degree'] : []
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
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
			onConfirmNationality (val) {
				this.nationalityDefaultSelector = val
				let third = this.cityAddressList[2]
				if (third && third.length > 0) {
					let nationality = third[val[2]].areaCode
					let nationalityLabel = `${this.cityAddressList[0][val[0]].shortName}-${this.cityAddressList[1][val[1]].shortName}-${this.cityAddressList[2][val[2]].shortName}`
					this.$set(this.form, 'nationalityLabel', nationalityLabel)
					this.$set(this.form, 'nationality', nationality)
					console.log('third', this.form)
					return
				} 
				let second = this.cityAddressList[1]
				if (second && second.length > 0) {
					let nationality = second[val[1]].areaCode
					let nationalityLabel = `${this.cityAddressList[0][val[0]].shortName}-${this.cityAddressList[1][val[1]].shortName}`
					this.$set(this.form, 'nationalityLabel', nationalityLabel)
					this.$set(this.form, 'nationality', nationality)
					console.log('second', this.form)
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
			openNationality () {
				if (!(this.cityAddressList.length > 0 && this.cityAddressList[0].length > 0)) {
					this.getCityAddressFirst('0')
				}
				this.nationalityShow = true
			},
			// 出生日期
			birthdayConfirm (e) {
				this.form.birthday = `${e.year}-${e.month}-${e.day}`
			},
			onConfirm (e, prop) {
				this.form[prop] = e[0].value
				this.form[`${prop}Label`] = e[0].label
			},
			// 发布简历
			onSubmit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('form', this.form)
						console.log('验证通过')
					} else {
						console.log('验证失败')
					}
				})
			}
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
	}
</style>
