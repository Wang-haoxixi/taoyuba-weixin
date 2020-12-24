export default {
	data () {
		return {
			organizationList: [],
			organizationTypeList: {
				21: '浙岱',
				32: '浙普',
				1: '浙象'
			}
		}
	},
	created () {
		this.getOrganizationList()
	},
	methods: {
		getOrganizationList () {
			this.$http.get('/admin/org/page', {
				params: {
					current: 1,
					size: 100
				}
			}).then(({ data }) => {
				if (data.code === 0) {
					let result = data.data.records
					let arr = []
					result.forEach((item) => {
						if (item.orgId !== 15) {
							let obj = {
								value: item.orgId + '',
								label: item.name
							}
							arr.push(obj)
						}
					})
					this.organizationList = arr
				}
			})
		}
		
	}
}