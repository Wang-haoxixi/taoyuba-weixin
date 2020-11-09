import dictMapMixin from '@/pages/mixins/dictMap.js'
export default {
	mixins: [dictMapMixin],
	computed: {
		// 教育程度
		eduDegreeLabel () {
			let dict = this.dictMap['tyb_education_degree'] || []
			return this.getDictLabel(this.data.eduDegree, dict)
		},
		// 工作经验
		workExprienceLabel () {
			let dict = this.dictMap['tyb_work_exprience'] || []
			return this.getDictLabel(this.data.workExprience, dict)
		},
		// 作业方式
		workRequireLabel () {
			let dict = this.dictMap['tyb_resume_worktype'] || []
			return this.getDictLabel(this.data.workRequire, dict)
		},
		// 应聘职务
		newPositionIdLabel () {
			let dict = this.dictMap['tyb_resume_position'] || []
			return this.getDictLabel(this.data.positionId, dict)
		},
		// 原任职务
		oldPositionIdLabel () {
			let dict = this.dictMap['tyb_resume_position'] || []
			return this.getDictLabel(this.data.positionId, dict)
		},
		// 职务
		positionIdLabel () {
			let dict = this.dictMap['tyb_resume_position'] || []
			return this.getDictLabel(this.data.positionId, dict)
		},
		// 货币种类
		salaryCurrencyLabel () {
			let dict = this.dictMap['salaryCurrency'] || []
			return this.getDictLabel(this.data.salaryCurrency, dict)
		},
		// 证书职务
		certTitleLabel () {
			let dict = this.dictMap['tyb_crew_cert_title'] || []
			return this.getDictLabel(this.data.certTitle, dict)
		},
		// 证书等级
		certLevelLabel () {
			let dict = this.dictMap['certLevel'] || []
			return this.getDictLabel(this.data.certLevel, dict)
		},
		workModeLabel () {
			let dict = this.dictMap['tyb_resume_worktype'] || []
			return this.getDictLabel(this.data.workMode, dict)
		},
		// 上船地点
		// salaryCurrencyLabel () {
		// 	let dict = this.dictMap['salaryCurrency'] || []
		// 	return this.getDictLabel(this.data.salaryCurrency, dict)
		// },
		// 年龄要求
		ageRequireLabel () {
			let dict = this.dictMap['tyb_position_agerequirement'] || []
			return this.getDictLabel(this.data.ageRequire, dict)
		},
		// 性别
		genderLabel () {
			let dict = this.dictMap['sex'] || []
			return this.getDictLabel(this.data.gender, dict)
		},
		// 民族
		nationLabel () {
			let dict = this.dictMap['nationals'] || []
			return this.getDictLabel(this.data.nation, dict)
		},
		// 婚姻状况
		maritalLabel () {
			let dict = this.dictMap['marital'] || []
			return this.getDictLabel(this.data.maritalStatus, dict)
		}
	},
	methods: {
		getDictLabel (val, data = []) {
			if (val === '' || val == null) {
				return
			}
			let result = ''
			for (let i = 0, len = data.length; i < len; i++) {
				if (data[i].value === val) {
					result = data[i].label
				}
			}
			return result
		},
		getCity (id) {
			this.$http.get(`/admin/region/getinfo/${id}`).then(({ data }) => {
				if (data.code === 0) {
					this.cityLabel = data.data ? data.data.mergerName : ''
				}
			})
		}
	}
}