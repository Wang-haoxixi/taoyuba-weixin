export default {
	methods: {
		onClose () {
			this.$emit('show')
		},
		onOpen () {
			this.$emit('hide')
		},
		setForm (name) {
			this.form[`${name}Result`] = this[`${name}Data`].flag
			this.form[`${name}Image`] = (this[`${name}Data`].url || []).join(',')
		},
		setHistoryData (name) {
			if (this.historyData && Object.keys(this.historyData).length > 0) {
				this.$set(this[`${name}HistoryData`], 'flag', this.historyData[`${name}Result`])
				this.$set(this[`${name}HistoryData`], 'url', this.historyData[`${name}Image`] || '')
			}
		},
		validateItem (value, title, name) {
			if (value.flag === 2 || value.flag === '') {
				this.$emit('validate', `${title}中排查记录不能为空`)
				return false
			}
			if (value.flag === 0 && !value.reason ) {
				this.$emit('validate', `${title}中不合格原因不能为空`)
				return false
			}
			// if (value.flag === 0 && value.url.length === 0) {
			// 	this.$emit('validate', `${title}中照片不能为空`)
			// 	return false
			// }
			// if (this.historyData && Object.keys(this.historyData).length > 0) {
			// 	if (this.historyData[`${name}Result`] === 0 && value.flag === 1 && value.url.length === 0) {
			// 		this.$emit('validate', `${title}中照片不能为空`)
			// 		return false
			// 	}
			// }
			return true
		}
	}
}