export default {
	data () {
		return {
			dropdownRef: 'dropdown',
			dropdownTop: 0,
			// dropdownEl: null,
			dropDownPosition: ''
		}
	},
	mounted () {
		let el = uni.createSelectorQuery().select(`#${this.dropdownRef}`)
		el.boundingClientRect((data) => {
			this.dropdownTop = data.top
		}).exec()
	},
	onPageScroll ({scrollTop}) {
		if (scrollTop >= this.dropdownTop) {
			this.dropDownPosition = 'fixed'
		} else {
			this.dropDownPosition = 'relative'
		}
	}
}