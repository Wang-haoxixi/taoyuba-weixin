import Request from '@/utils/luch-request/index.js'
import { API_URL } from '@/env.js'
import { TOKEN } from '@/common/config/index.js'
// import cache from '@/common/utils/cache'
import tools from '@/common/utils/tools'

const errorCode = {
	"401": "当前操作没有权限或者登入过期",
	"403": "当前操作没有权限",
	"404": "资源不存在",
	"417": "未绑定登录账号，请使用密码登录后绑定",
	"426": "用户名不存在或密码错误",
	"429": "请求过频繁",
	"428": "验证码错误,请重新输入",
}

const ignoreUrl = [
	'/tybhrms/tybarticle/page',
	'/tmlms/dept/pageForAll',
	'/tybhrms/tyblessonvideo/page',
	'/tmlms/exam_examination/page',
	'/tybhrms/tybrecruit/page',
	'/tybhrms/tybrecruit/:id',
	'/tybhrms/tybarticle/:id',
	'/admin/region/getinfo/',
	'/tmlms/crew/xsPage',
	'/tmlms/dept/pageForAll',
	'/tmlms/dept/detail',
	'/tybhrms/tybarticle/page',
	'/tybhrms/tyblessonvideo/:id',
	'/admin/tybadpos/page',
	'/admin/tybad/pageAndSort',
	// '/tmlms/exam_examination/page',
	// '/tybhrms/tyblessonvideo/page',
	// '/tybhrms/tyblessonvideo/',
	'/tmlms/crew_cert/getPage',
	'/tybhrms/tybbook/page',
	'/admin/dict/all_map',
	'/tmlms/crew/idcardcheck',
	'/tmlms/crew/createByWx',
	'/tmlms/crew/checkMoreRelations',
	'/tmlms/crew/batchCreate',
	'/tybship/tybship/findmyshipWx',
	'/admin/org/page',
	'/tmlms/crew/PageWithOutOrg',
	'/admin/social/get_mini_user_exist',
	'/auth/mobile/token/social',
	'/admin/social/get_mini_mobile'
]
const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync(TOKEN)
	} catch (e) {}
	return token
}

const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = API_URL /* 根域名不同 */
	config.header = {
		...config.header,
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
// console.log('config', config)
// 这里之前配置了调接口就loading 但是我有一个接口不能这么做单独判断下
	if( config.url !== '/admin/gather/face_location' ){
		uni.showLoading({
			icon: 'none',
			title: '加载中',
			mask: true,
		});
	}
	config.header = {
		...config.header,
	}
	let status = true
	let url = config.url
	ignoreUrl.forEach((item) => {
		
		let isNum = new RegExp('[0-9]').test(url)
		// 判断是否含有数字
		if (isNum) {
			let itemIndex = item.indexOf(':id')
			if (itemIndex > -1) {
				let newItem = item.slice(0, itemIndex)
				let reg = /[0-9]+/g
				let newUrl = url.replace(reg, '')
				// console.log(newItem, newUrl)
				if (newUrl === newItem) {
					status = false
					return false
				}
			} else {
				if (url.indexOf(item) === 0) {
					status = false
					return false
				}
			}
			// let value = url.slice(index)
			// status = !tools.isRealNum(value)
			// console.log(url, value, status)
		} else {
			if (url.indexOf(item) === 0) {
				status = false
				return false
			}
		}
	})
	
	// console.log(config.url, status)
	let token = status ? getTokenStorage() : ''
	// console.log('token', token)
	if (token) {
		config.header.Authorization = 'Bearer ' + token
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

// 必须使用异步函数，注意
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
	uni.hideLoading();
	// if (response.data.code == 1) {
	// 	uni.showToast({
	// 		icon: 'none',
	// 		title: response.data.msg
	// 	})
	// }
	return response
}, (response) => { // 请求错误后执行
	uni.hideLoading()
	if (response.errMsg == 'request:fail ') {
		uni.showToast({
			icon: 'none',
			title: '网络请求失败，请检查网络连接！'
		})
		return
	}
	if (response.statusCode === 401) {
		uni.showToast({
			icon: 'none',
			title: '请登录后再查看',
			duration: 1000,
		})
		setTimeout(res=>{
			uni.redirectTo({
			    url: '/pages/base/login'
			});
		},1000)
		// tools.clear()
		// return response
	}
	// if(response.data.code === 1){
	// 	uni.showToast({
	// 		icon: 'none',
	// 		title: response.data.msg
	// 	})
	// 	return
	// }
	console.log('response', response)
	return response
})

export default http
