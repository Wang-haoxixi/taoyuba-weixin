import cache from '@/common/utils/cache'

export default {
	/**
	 * 查看授权信息
	 */
	onGetSetting () {
		return new Promise ((resolve, reject) => {
			uni.getSetting({
				success(res) {
					console.log('res', res)
					if (res.authSetting['scope.userInfo']) {
						// 用户信息已授权，获取用户信息
						uni.getUserInfo({
							success (res) {
								resolve(res)
							},
							fail () {
								reject('获取用户信息失败')
							}
						})
					} else if (!res.authSetting['scope.userInfo']) {
						reject('需要点击按钮手动授权')
					}
				},
				fail () {
					reject('获取已授权选项失败')
				}
			})
		})
	},
	/**
	 * 手动授权方法
	 */
	onGetUserInfo () {
		// 获取用户信息
		return new Promise((resolve, reject) => {
			uni.getUserInfo({
				provider: 'weixin',
				// 获取信息成功
				success (res) {
					resolve(res)
				},
				fail () {
					reject('获取用户信息失败')
				}
			})
		})
	},
	// 微信登录
	onLogin () {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					cache.set('code', loginRes.code)
					console.log('login', loginRes)
					uni.getUserInfo({
						provider: 'weixin',
						success: function (infoRes) {
							console.log('getUserInfo')
							resolve(infoRes)
						},
						fail: function (err) {
							console.log('err')
						}
					})
				},
				fail: function (err) {
					reject(err)
					uni.showToast({
						title: '授权失败'
					})
					uni.hideToast()
				}
			})
		})
	},
	// 获取手机号
	onGetPhoneNumber (e) {
		return new Promise((resolve) => {
			resolve(e)
		})
	}
}