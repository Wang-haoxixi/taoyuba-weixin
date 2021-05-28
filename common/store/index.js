import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user.js'

const store = new Vuex.Store({
	modules: {
		user,
	},
	state: {
		trainMeetId: 0,
		orgId: 21,
		collectionType: '',
		sign: '',
	}
})

export default store
