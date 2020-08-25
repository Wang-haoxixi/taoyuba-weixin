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