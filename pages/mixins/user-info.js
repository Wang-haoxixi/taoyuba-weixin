export default {
	data () {
		return {
			rolesType: {
				shipowner: {
					type: 108,
					label: '船东'
				}, // 船东
				crew: {
					type: 105,
					label: '船员'
				}, // 船员
				police: {
					type: 115,
					label: '公安边防'
				}, // 公安
			},
			userInfo: this.$cache.get('userInfo') || {},
			roles: this.$cache.get('roles') || []
		}
	},
	methods: {
		getUserInfoApi () {
			return new Promise((resolve, reject) => {
				this.$http.get('/admin/user/info').then(({ data }) => {
					if (data.code === 0) {
						this.userInfo = data.data.sysUser
						this.$cache.set('userInfo', this.userInfo)
						this.roles = data.data.roles
						this.$cache.set('roles', this.roles)
					}
					resolve(data)
				}).catch((e) => {
					reject(e)
				})
			})
			
		}
	}
}