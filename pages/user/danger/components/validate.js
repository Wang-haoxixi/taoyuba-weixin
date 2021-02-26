export default {
	methods: {
		validateItem (value, title) {
			if (value.flag === 2) {
				this.$emit('validate', `${title}中排查记录不能为空`)
				return false
			}
			if (value.flag === 0 && value.url.length === 0) {
				this.$emit('validate', `${title}中照片不能为空`)
				return false
			}
			return true
		}
	}
}