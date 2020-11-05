<template>
	<!-- 招聘 -->
	<view class="release-recruit-edit-container phonex-mb">
		<view class="image-wrapper">
			<image :src="`${imgURL}/release-bg.png`"></image>
		</view>
		<view class="edit-form-wrapper">
			<u-form :model="form" ref="uForm" :rules="rules" label-width="150" :label-style="{color: '#999'}">
				<view class="content-container">
					<view class="title">基本信息</view>
					<view class="body-wrapper">
						<u-form-item label="招聘岗位" prop="positionId" required>
							<u-input type="select" :select-open="positionIdShow" v-model="form.positionIdLabel" placeholder="请选择招聘岗位" @click="positionIdShow = true"></u-input>
						</u-form-item>
						<u-form-item label="招聘人数" prop="recruitNo" required>
							<u-input v-model="form.recruitNo" placeholder="请输入招聘人数" type="number"/>
						</u-form-item>
						<u-form-item label="月薪" prop="salary" required>
							<u-input type="select" :select-open="salaryShow" v-model="form.salaryLabel" placeholder="请选择月薪" @click="salaryShow = true"></u-input>
							<!-- <u-input v-model="form.salary" placeholder="请输入月薪" type="number"/> -->
						</u-form-item>
						<!-- <u-form-item label="货币种类" prop="salaryCurrency" required>
							<u-input type="select" :select-open="salaryCurrencyShow" v-model="form.salaryCurrencyLabel" placeholder="请选择货币种类" @click="salaryCurrencyShow = true"></u-input>
						</u-form-item> -->
						<u-form-item label="证书职务" prop="certTitle" required>
							<u-input type="select" :select-open="certTitleShow" v-model="form.certTitleLabel" placeholder="请选择证书职务" @click="certTitleShow = true"></u-input>
						</u-form-item>
						<u-form-item label="证书等级" prop="certLevel" required>
							<u-input type="select" :select-open="certLevelShow" v-model="form.certLevelLabel" placeholder="请选择证书等级" @click="certLevelShow = true"></u-input>
						</u-form-item>
						<u-form-item label="作业方式" prop="workMode" required>
							<u-input type="select" :select-open="workModeShow" v-model="form.workModeLabel" placeholder="请选择作业方式" @click="workModeShow = true"></u-input>
						</u-form-item>
						<!-- <u-form-item label="上船地点" prop="cityLabel" required>
							<u-input type="select" :select-open="cityShow" v-model="form.cityLabel" placeholder="请选择上船地点" @click="openCity"></u-input>
						</u-form-item> -->
					</view>
				</view>
				<view class="content-container">
					<view class="title">其他要求</view>
					<view class="body-wrapper">
						<u-form-item label="年龄要求" prop="ageRequire" required>
							<u-input type="select" :select-open="ageRequireShow" v-model="form.ageRequireLabel" placeholder="请选择年龄要求" @click="ageRequireShow = true"></u-input>
						</u-form-item>
						<u-form-item label="工作经验" prop="workExprience" required>
							<u-input type="select" :select-open="workExprienceShow" v-model="form.workExprienceLabel" placeholder="请选择工作经验" @click="workExprienceShow = true"></u-input>
						</u-form-item>
					</view>
				</view>
				<view class="content-container">
					<view class="title">基本信息</view>
					<view class="body-wrapper">
						<u-form-item label="船名" prop="shipName" required>
							<u-input type="select" :select-open="shipNameShow" v-model="form.shipName" placeholder="请选择船名" @click="shipNameShow = true"></u-input>
							<!-- <u-input v-model="form.shipName" trim placeholder="请输入船名" @blur="onBlur"/> -->
						</u-form-item>
						<u-form-item label="船长(m)">
							<u-input v-model="form.hullLength" type="number" trim placeholder="请输入船长"/>
						</u-form-item>
						<u-form-item label="主机总功率(kw)" label-width="210">
							<u-input v-model="form.totalPower" type="number" trim placeholder="请输入主机总功率"/>
						</u-form-item>
						<u-form-item label="姓名">
							<u-input v-model="form.contactName" trim placeholder="请输入姓名"/>
						</u-form-item>
						<u-form-item label="联系电话">
							<u-input v-model="form.contactPhone" trim placeholder="请输入联系电话" type="number"/>
						</u-form-item>
					</view>
				</view>
				<view class="btn-wrapper">
					<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">免费发布招聘</u-button>
				</view>
			</u-form>
		</view>
		<!-- 渔船 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="shipNameList" v-model="shipNameShow" @confirm="(e) => onShipNameConfirm(e)"></u-select>
		<!-- 年龄要求 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="ageRequireList" v-model="ageRequireShow" @confirm="(e) => onConfirm(e, 'ageRequire')"></u-select>
		<!-- 工作经验 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="workExprienceList" v-model="workExprienceShow" @confirm="(e) => onConfirm(e, 'workExprience')"></u-select>
		<!-- 招聘岗位 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="positionIdList" v-model="positionIdShow" @confirm="(e) => onConfirm(e, 'positionId')"></u-select>
		<!-- 月薪 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="salaryList" v-model="salaryShow" @confirm="(e) => onConfirm(e, 'salary')"></u-select>
		<!-- 证书职务 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="certTitleList" v-model="certTitleShow" @confirm="(e) => onConfirm(e, 'certTitle')"></u-select>
		<!-- 证书等级 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="certLevelList" v-model="certLevelShow" @confirm="(e) => onConfirm(e, 'certLevel')"></u-select>
		<!-- 作业方式 -->
		<u-select mode="single-column" safe-area-inset-bottom :list="workModeList" v-model="workModeShow" @confirm="(e) => onConfirm(e, 'workMode')"></u-select>
		<!-- 上船地点 -->
		<u-picker safe-area-inset-bottom :default-selector="cityDefaultSelector" mode="multiSelector" @confirm="onConfirmCity" v-model="cityShow" range-key="shortName" @columnchange="onColumnChangeCity" :range="cityAddressList"></u-picker>
	</view>
</template>

<script>
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import cityMixin from '@/pages/mixins/city.js'
	import cloneDeep from 'lodash/cloneDeep'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [dictMapMixin, cityMixin, userInfoMixin],
		data () {
			return {
				id: '',
				loading: false,
				positionIdShow: false,
				salaryShow: false,
				certTitleShow: false,
				certLevelShow: false,
				workModeShow: false,
				cityShow: false,
				ageRequireShow: false,
				workExprienceShow: false,
				shipNameShow: false,
				imgURL: this.$IMAGE_URL,
				cityDefaultSelector: [0, 0, 0],
				shipNameList: [],
				btnStyle: {
					backgroundColor: 'rgba(232, 103, 73, 1)',
					color: '#fff',
					fontSize: '32rpx',
					lineHeight: '100rpx'
				},
				form: {
					positionId: '',  // 招聘岗位
					recruitNo: undefined, // 招聘人数
					salary: '', // 月薪
					salaryCurrency: '', // 货币种类
					certTitle: '', // 证书职务
					certLevel: '', // 证书等级
					workMode: '', // 作业方式
					// city: [], // 上船地点
					ageRequire: '', // 年龄要求
					workExprience: '', // 工作经验
					hullLength: '', // 船长
					totalPower: '', // 主机总功率
					contactName: '', // 联系人
					contactPhone: '', // 联系电话
				},
				rules: {
					shipName: [ { required: true, message: '请选择渔船', trigger: 'change' } ],
					positionId: [ { required: true, message: '请选择招聘岗位', trigger: 'change' } ],
					recruitNo: [ { required: true, message: '请输入招聘人数', trigger: 'blur,change' } ],
					salary: [ { required: true, message: '请输入月薪', trigger: ['blur', 'change'] } ],
					salaryCurrency: [ { required: true, message: '请选择货币种类', trigger: 'change' } ],
					certTitle: [ { required: true, message: '请选择证书职务', trigger: 'change' } ],
					certLevel: [ { required: true, message: '请选择证书等级', trigger: 'change' } ],
					workMode: [ { required: true, message: '请选择作业方式', trigger: 'change' } ],
					city: [ { required: true, message: '请选择上船地点', trigger: ['change', 'blur'] } ],
					ageRequire: [ { required: true, message: '请选择年龄要求', trigger: 'change' } ],
					workExprience: [ { required: true, message: '请选择工作经验', trigger: 'change' } ],
				}
			}
		},
		computed: {
			ageRequireList () {
				return cloneDeep(this.dictMap)['tyb_position_agerequirement'] || []
			},
			workExprienceList () {
				return cloneDeep(this.dictMap)['tyb_work_exprience'] || []
			},
			salaryList () {
				return cloneDeep(this.dictMap)['salaryList1']
			},
			certTitleList () {
				return cloneDeep(this.dictMap)['tyb_crew_cert_title'] || []
			},
			certLevelList () {
				return cloneDeep(this.dictMap)['certLevel']
			},
			workModeList () {
				return cloneDeep(this.dictMap)['tyb_resume_worktype'] || [] 
			},
			positionIdList () {
				return cloneDeep(this.dictMap)['tyb_resume_position'] || [] 
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad (params) {
			console.log('params', params)
			if (params.id) {
				this.id = params.id
				this.getList(params.id)	
			}
			this.getShipList()
		},
		methods: {
			// 获取名下船只
			getShipList () {
				this.$http.get(`/tmlms/tybshiphaver/getMyShip/${this.userInfo.userId}`).then(({ data }) => {
					if (data.code === 0) {
						let result = []
						data.data.forEach((item) => {
							let obj = {}
							obj.label = item.shipName
							obj.value = item.shipName
							result.push(obj)
						})
						this.shipNameList = result
					}
				})
			},
			onShipNameConfirm (e) {
				this.form['shipName'] = e[0].value
				this.onBlur(this.form['shipName'])
			},
			onBlur (value) {
				if (value) {
					this.$http.get(`/tybship/tybship/findmyship/${value}`).then(({ data }) => {
						if (data.code === 0) {
							let result = data.data
							this.$set(this.form, 'contactName', result.shipowner) // 联系人
							this.$set(this.form, 'contactPhone', result.mobile) // 联系电话
							this.$set(this.form, 'hullLength', result.hullLength) // 船长
							this.$set(this.form, 'totalPower', result.engineTotalPower) // 主机总功率
						}
					})
				}
			},
			getList (id) {
				this.$http.get(`/tybhrms/tybrecruit/getdetail/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.form = data.data.data
						if (this.form.city) {
							this.initCityLabel(this.form.city)
						}
						setTimeout(() => {
							this.initForm()
						}, 500)
						
						
						this.form.salary = this.form.salary + ''
						this.form.recruitNo = this.form.recruitNo + ''
					}
				})
			},
			initForm () {
				this.getDictLabel('positionId', this.form.positionId, this.positionIdList)
				this.getDictLabel('salary', this.form.salary, this.salaryList)
				this.getDictLabel('certTitle', this.form.certTitle, this.certTitleList)
				this.getDictLabel('certLevel', this.form.certLevel, this.certLevelList)
				this.getDictLabel('workMode', this.form.workMode, this.workModeList)
				this.getDictLabel('ageRequire', this.form.ageRequire, this.ageRequireList)
				this.getDictLabel('workExprience', this.form.workExprience, this.workExprienceList)
			},
			getDictLabel (prop, value, data) {
				// console.log(prop, data)
				for (let i = 0, len = data.length; i < len; i++) {
					if (data[i].value === value) {
						this.$set(this.form, `${prop}Label`, data[i].label)
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
						this.$set(this.form, 'cityLabel', result.join('-'))
						// this.form.cityLabel = result.join('-')
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
			onConfirm (e, prop) {
				this.form[prop] = e[0].value
				this.form[`${prop}Label`] = e[0].label
			},
			updateApi () {
				this.$http.post('/tybhrms/tybrecruit/update', this.form).then(({ data }) => {
					if (data.code === 0 && data.data === true) {
						uni.showToast({
							icon: 'none',
							title: '更新成功'
						})
						console.log('更新成功')
						uni.switchTab({
							url: '/pages/user/index/index'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '更新失败'
						})
					}
					this.loading = false
				}).catch(() => {
					uni.showToast({
						icon: 'none',
						title: '更新失败'
					})
					this.loading = false
				})
			},
			createApi () {
				this.$http.post('/tybhrms/tybrecruit/save', this.form).then(({ data }) => {
					if (data.code === 0 && data.data.data === true) {
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
			// 发布招聘
			onSubmit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.loading = true
						this.form.salary = +this.form.salary
						this.form.recruitNo = +this.form.recruitNo
						this.form.salaryCurrency = '1'
						if (this.id) {
							this.updateApi()
						} else {
							this.createApi()
						}
						
					} else {
						console.log('验证失败')
						this.loading = false
					}
				})
			},
			openCity () {
				if (!(this.cityAddressList.length > 0 && this.cityAddressList[0].length > 0)) {
					this.getCityAddressFirst('330000000000')
				}
				this.cityShow = true
			},
			onConfirmCity (val) {
				this.cityDefaultSelector = val
				let third = this.cityAddressList[2]
				if (third && third.length > 0) {
					let city = third[val[2]].areaCode
					let cityLabel = `${this.cityAddressList[0][val[0]].shortName}-${this.cityAddressList[1][val[1]].shortName}-${this.cityAddressList[2][val[2]].shortName}`
					this.$set(this.form, 'cityLabel', cityLabel)
					this.$set(this.form, 'city', city)
					return
				} 
				let second = this.cityAddressList[1]
				if (second && second.length > 0) {
					let city = second[val[1]].areaCode
					let cityLabel = `${this.cityAddressList[0][val[0]].shortName}-${this.cityAddressList[1][val[1]].shortName}`
					this.$set(this.form, 'cityLabel', cityLabel)
					this.$set(this.form, 'city', city)
					return
				} 
				let first = this.cityAddressList[0]
				if (first && first.length > 0) {
					let city = first[val[0]].areaCode
					let cityLabel = `${this.cityAddressList[0][val[0]].shortName}`
					this.$set(this.form, 'cityLabel', cityLabel)
					this.$set(this.form, 'city', city)
				} 
			},
			onColumnChangeCity ({column, index}) {
				if (column === 0) {
					let areaCode = this.cityAddressList[column][index].areaCode
					this.getCityAddressSecond(areaCode)
				} else if (column === 1) {
					let areaCode = this.cityAddressList[column][index].areaCode
					this.getCityAddressThird(areaCode)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.release-recruit-edit-container {
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
