export default {
	data () {
		return {
			cityAddressList: []
		}
	},
	methods: {
		// 获取上船地点数据
		getCityAddress (id, index) {
			return new Promise((resolve, reject) => {
				this.$http.get(`/tybship/tybregion/parent/${id}`).then(({ data }) => {
					if (data.code === 0) {
						this.$set(this.cityAddressList, index, data.data)
						resolve(data.data)
					}
				})
			})
		},
		getCityAddressFirst (id) {
			this.getCityAddress(id, 0).then((data) => {
				return this.getCityAddressSecond(data[0].areaCode)
			}).then((data) => {
				return this.getCityAddressThird(data[0].areaCode)
			})
		},
		getCityAddressSecond (id) {
			return this.getCityAddress(id, 1)
		},
		getCityAddressThird (id) {
			return this.getCityAddress(id, 2)
		},
	}
}