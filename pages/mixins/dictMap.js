export default {
	data () {
		return {
			dictMap: {
				salaryCurrency: [
					{ label: '人民币(RMB)', value: '1' },
					{ label: '美元(USD)', value: '2' }
				],
				certLevel: [
					{ value: '0', label: '--' },
					{ value: '1', label: '一级' },
					{ value: '2', label: '二级' },
					{ value: '3', label: '三级' }
				],
				salaryList: [
					{ value: '1', label: '3千以下', salaryStart: '0', salaryEnd: '3000' }, 
					{ value: '2', label: '3千到5千', salaryStart: '3000', salaryEnd: '5000' }, 
					{ value: '3',label: '5千到7千', salaryStart: '5000', salaryEnd: '7000' }, 
					{ value: '4', label: '7千到1万', salaryStart: '7000', salaryEnd: '10000' }, 
					{ value: '5', label: '1万到1.5万', salaryStart: '10000', salaryEnd: '15000' }, 
					{ value: '6', label: '1.5万以上', salaryStart: '15000', salaryEnd: '99999' },
				]
			}
		}
	},
	created () {
		this.getDicMap()
	},
	methods: {
		getDicMap () {
			let dictMap = this.$cache.get('dictMap') || {}
			this.dictMap = Object.assign(this.dictMap, dictMap)
			if (dictMap && Object.keys(dictMap).length > 0) {
				return
			}
			this.$http.get('/admin/dict/all_map').then(({ data }) => {
				this.dictMap = Object.assign(this.dictMap, data)
				this.$cache.set('dictMap', this.dictMap)
			})
		}
	}
}