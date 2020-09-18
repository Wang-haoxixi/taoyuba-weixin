export default {
	data () {
		return {
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