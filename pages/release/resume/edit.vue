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
						<u-form-item label="应聘职务" prop="newsJob" required>
							<u-input type="select" :select-open="newsJobShow" v-model="form.newsJobLabel" placeholder="请选择应聘职务" @click="newsJobShow = true"></u-input>
						</u-form-item>
						<u-form-item label="原有职务" prop="oldJob" required>
							<u-input type="select" :select-open="oldJobShow" v-model="form.oldJobLabel" placeholder="请选择原有职务" @click="oldJobShow = true"></u-input>
						</u-form-item>
						<u-form-item label="作业方式" prop="type" required>
							<u-input type="select" :select-open="typeShow" v-model="form.typeLabel" placeholder="请选择作业方式" @click="typeShow = true"></u-input>
						</u-form-item>
						<u-form-item label="工作经验" prop="experience" required>
							<u-input type="select" :select-open="experienceShow" v-model="form.experienceLabel" placeholder="请选择工作经验" @click="experienceShow = true"></u-input>
						</u-form-item>
						<u-form-item label="期望月薪" prop="monthlyPay" required>
							<u-input type="select" :select-open="monthlyPayShow" v-model="form.monthlyPayLabel" placeholder="请选择期望月薪" @click="monthlyPayShow = true"></u-input>
						</u-form-item>
						<u-form-item label="特殊技能">
							<u-input v-model="form.skill" placeholder="请输入特殊技能"/>
						</u-form-item>
					</view>
				</view>
				<view class="content-container">
					<view class="title">个人资料</view>
					<view class="body-wrapper">
						<u-form-item label="姓名" prop="name" required>
							<u-input v-model="form.name" trim placeholder="请输入姓名"/>
						</u-form-item>
						<u-form-item label="电话" prop="phone" required>
							<u-input placeholder="请输入电话" trim v-model="form.phone" type="number"></u-input>
						</u-form-item>
						<u-form-item label="籍贯" prop="nativePlace" required>
							<u-input type="select" :select-open="nativePlaceShow" v-model="form.nativePlaceLabel" placeholder="请选择籍贯" @click="nativePlaceShow = true"></u-input>
						</u-form-item>
						<u-form-item label="出生日期" prop="birthday" required>
							<u-input type="select" :select-open="birthdayShow" v-model="form.birthday" placeholder="请选择出生日期" @click="birthdayShow = true"></u-input>
						</u-form-item>
						<u-form-item label="教育程度" prop="education" required>
							<u-input type="select" :select-open="educationShow" v-model="form.educationLabel" placeholder="请选择教育程度" @click="educationShow = true"></u-input>
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
							<u-input v-model="form.supplement" trim type="textarea" :border="false" height="100" auto-height placeholder="补充说明" />
						</u-form-item>
					</view>
				</view>
				<view class="btn-wrapper">
					<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">发布简历</u-button>
				</view>
			</u-form>
		</view>
		<!-- 应聘职务 -->
		<u-select mode="single-column" :list="newsJobList" v-model="newsJobShow" @confirm="(e) => onConfirm(e, 'newsJob')"></u-select>
		<!-- 原有职务 -->
		<u-select mode="single-column" :list="oldJobList" v-model="oldJobShow" @confirm="(e) => onConfirm(e, 'oldJob')"></u-select>
		<!-- 作业方式 -->
		<u-select mode="single-column" :list="typeList" v-model="typeShow" @confirm="(e) => onConfirm(e, 'type')"></u-select>
		<!-- 期望月薪 -->
		<u-select mode="single-column" :list="experienceList" v-model="experienceShow" @confirm="(e) => onConfirm(e, 'experience')"></u-select>
		<!-- 期望月薪 -->
		<u-select mode="single-column" :list="monthlyPayList" v-model="monthlyPayShow" @confirm="(e) => onConfirm(e, 'monthlyPay')"></u-select>
		<!-- 籍贯 -->
		<u-picker mode="region" v-model="nativePlaceShow" @confirm="nativePlaceConfirm"></u-picker>
		<!-- 出生日期 -->
		<u-picker mode="time" v-model="birthdayShow" @confirm="birthdayConfirm" :params="{year: true, month: true, day: true, hour: false, minute: false, second: false}"></u-picker>
		<!-- 教育程度 -->
		<u-select mode="single-column" :list="educationList" v-model="educationShow" @confirm="(e) => onConfirm(e, 'education')"></u-select>
		<!-- 外语水平 -->
		<u-select mode="single-column" :list="languageList" v-model="languageShow" @confirm="(e) => onConfirm(e, 'language')"></u-select>
		<!-- 是否公开 -->
		<u-select mode="single-column" :list="isOpenList" v-model="isOpenShow" @confirm="(e) => onConfirm(e, 'isOpen')"></u-select>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				loading: false,
				newsJobShow: false,
				oldJobShow: false,
				typeShow: false,
				experienceShow: false,
				monthlyPayShow: false,
				educationShow: false,
				nativePlaceShow: false,
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
				newsJobList: [
					{
						value: '1',
						label: '一级船长'
					},
					{
						value: '2',
						label: '二级船长'
					}
				],
				oldJobList: [
					{
						value: '1',
						label: '一级船长'
					},
					{
						value: '2',
						label: '二级船长'
					}
				],
				typeList: [
					{
						value: '1',
						label: '张网类1'
					},
					{
						value: '2',
						label: '张网类2'
					}
				],
				experienceList: [
					{
						value: '1',
						label: '不限'
					},
					{
						value: '2',
						label: '5年'
					}
				],
				educationList: [
					{
						value: '1',
						label: '大学'
					},
					{
						value: '2',
						label: '高中'
					}
				],
				languageList: [
					{
						value: '1',
						label: '精通'
					},
					{
						value: '2',
						label: '不精通'
					}
				],
				isOpenList: [
					{
						value: '1',
						label: '是'
					},
					{
						value: '0',
						label: '否'
					}
				],
				monthlyPayList: [
					{
						value: '1',
						label: '5k-10k'
					},
					{
						value: '2',
						label: '10-15k'
					}
				],
				form: {
					userId: '', 
					newsJob: '', //应聘职务
					oldJob: '', // 原有职务
					type: '', // 作业方式 
					experience: '', // 工作经验 
					monthlyPay: '', // 期望月薪
					skill: '', // 特殊技能
					name: '', // 姓名
					phone: '', // 电话
					nativePlace: '', // 籍贯
					birthday: '', // 出生日期
					education: '', // 教育程度
					language: '', // 外语水平
					height: '', // 身高
					isOpen: '', // 是否公开 
					supplement: '', // 补充说明
				},
				rules: {
					newsJob: [
						{
							required: true,
							message: '请选择应聘职务',
							trigger: 'change'
						}
					],
					oldJob: [
						{
							required: true,
							message: '请选择原有职务',
							trigger: 'change' ,
						}
					],
					type: [
						{
							required: true,
							message: '请选择作业方式',
							trigger: 'change' ,
						}
					],
					experience: [
						{
							required: true,
							message: '请选择工作经验',
							trigger: 'change' ,
						}
					],
					monthlyPay: [
						{
							required: true,
							message: '请选择期望月薪',
							trigger: 'change' ,
						}
					],
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						}
					],
					phone: [
						{
							required: true,
							message: '请输入电话',
							trigger: 'blur' ,
						}
					],
					nativePlace: [
						{
							required: true,
							message: '请选择籍贯',
							trigger: 'change'
						}
					],
					birthday: [
						{
							required: true,
							message: '请选择出生日期',
							trigger: 'change'
						}
					],
					education: [
						{
							required: true,
							message: '请选择教育程度',
							trigger: 'change'
						}
					],
					isOpen: [
						{
							required: true,
							message: '请选择是否公开',
							trigger: 'change'
						}
					],
				}
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			// 籍贯
			nativePlaceConfirm(e) {
				this.form.monthlyPayLabel = e.province.label + '-' + e.city.label + '-' + e.area.label
				this.form.nativePlace = [e.province.label, e.city.label, e.area.label]
				console.log(e)
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
