import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app.js'
import user from './module/user.js'
import map from './module/map.js'
import html from './module/html.js'

import carList from './module/carList.js'
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
		map,
		html,
		carList
	}
})