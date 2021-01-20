import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app.js'
import user from './module/user.js'
import map from './module/map.js'
Vue.use(Vuex)

export default  new Vuex.Store({
	state:{
	},
	getters:{
	
	},
	mutations:{
	},
	modules:{
		app,
		user,
		map
	}
})