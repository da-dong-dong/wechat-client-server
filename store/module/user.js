export default{
	namespaced: true,
	state:{
		// code
		code:null,
		
	},
	getters:{
		get_code:state => state.code,
	},
	mutations:{
		mut_code(state,data){
			state.code = data
		},
	},
  actions: {
		act_code({ commit }, data) {
			commit('mut_code', data)
		},
  }
}