export default {
	data () {
		return {
			form: {},
			showImg: false
		}
	},
	methods: {
		concatImg (name, data) {
			this.form[name] = this.form[name].concat(data)
		},
		deleteImg (name, index) {
			this.form[name].splice(1, index)
		},
		openImg (url) {
			this.showImg = true
		},
		closeImh (url) {
			this.showImg = false
		}
	}
}