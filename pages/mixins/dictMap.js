export default {
	data () {
		return {
			dictMap: []
		}
	},
	onLoad () {
		this.getDicMap()
	},
	methods: {
		getDicMap () {
			let dictMap = this.$cache.get('historySearchList')
			if (dictMap && dictMap.length > 0) {
				return
			}
			this.$http.get('/admin/dict/all_map').then(({ data }) => {
				this.dictMap = data
				this.$cache.set('dictMap', data)
			})
		}
	}
}