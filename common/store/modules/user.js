// 用户数据模块
import http from '@/common/request/index'
import store from '@/common/store'
import tools from '@/common/utils/tools'

import {
	USER_INFO,
	ORDER_NUMBER,
	OUT_LOGIN,
	// #ifdef MP-WEIXIN
	FORCE_OAUTH,
	// #endif
} from '../types.js'

const state = {
	userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
	orderNum: {},
	// #ifdef MP-WEIXIN
	forceOauth: false,
	// #endif

}

const actions = {
	//设置token并返回上次页面
	setTokenAndBack({
		commit
	}, token) {
		uni.setStorageSync('token', token);
		store.dispatch('getUserInfo');
		let fromLogin = uni.getStorageSync('fromLogin');
		if (fromLogin) {
			// tools.routerTo(fromLogin.path, fromLogin.query, true);
			uni.removeStorageSync('fromLogin')
		} else {
			//默认跳转首页S
			// router.replaceAll('/pages/index/index')
		}
	},

	// 获取用户信息
	getUserInfo({
		commit
	}) {
		
	},
	// 订单信息
	getOrderNum({
		commit
	}) {
		return new Promise((resolve, reject) => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	},
}

const mutations = {
	[USER_INFO](state, data) {
		state.userInfo = data
	},
	[ORDER_NUMBER](state, data) {
		state.orderNum = data
	},
	// #ifdef MP-WEIXIN
	[FORCE_OAUTH](state, data) {
		state.forceOauth = data
		data ? uni.hideTabBar() : uni.showTabBar();
	},
	// #endif
	[OUT_LOGIN](state, data) {
		uni.removeStorageSync('token');
		uni.removeStorageSync('userInfo');
		uni.removeStorageSync('cartNum');
		store.commit('USER_INFO', {});
		store.commit('CART_LIST', []);
		store.commit('CART_NUM');
		store.commit('ORDER_NUMBER', 0);
	},

}

const getters = {

}

export default {
	state,
	mutations,
	actions,
	getters
}
