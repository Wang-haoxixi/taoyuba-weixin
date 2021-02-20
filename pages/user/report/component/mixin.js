export default {
	props: {
		value: Object
	},
	data () {
		return {
			form: {}
		}
	},
	methods: {
		concatImg (name, data) {
			this.form[name] = this.form[name].concat(data)
		},
		getForm () {
			let form = this.form
			let value = Object.assign({}, this.value)
			for (let key in form) {
				if (Array.isArray(form[key])) {
					form[key] = value[key] || []
				} else {
					form[key] = value[key] || ''
				}
			}
		},
	},
	watch: {
		value: {
			handler () {
				this.getForm()
			},
			deep: true,
			immediate: true
		}
	}
}