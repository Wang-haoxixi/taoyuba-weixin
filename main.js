import Vue from 'vue'
import App from './App'
import store from '@/common/store'
import http from '@/common/request/index'
import tools from '@/common/utils/tools'
import cache from '@/common/utils/cache'

import uView from "uview-ui"
Vue.use(uView)

import {
	API_URL,
	IMAGE_URL
} from './env.js'

Vue.prototype.$http = http
Vue.prototype.$tools = tools
Vue.prototype.$cache = cache
Vue.prototype.$API_URL = API_URL
Vue.prototype.$IMAGE_URL = IMAGE_URL

App.mpType = 'app'
Vue.config.productionTip = false

const app = new Vue({
	store,
	...App
})
app.$mount()
