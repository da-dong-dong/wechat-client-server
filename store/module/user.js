export default{
	namespaced: true,
	state:{
		// code
		code:null,
		shopId:null, // 门店
	},
	getters:{
		get_code:state => state.code,
		get_shopId:state => state.shopId,
	},
	mutations:{
		mut_code(state,data){
			state.code = data
		},
		mut_shopId(state,data){
			state.shopId = data
		},
	},
  actions: {
		act_code({ commit }, data) {
			commit('mut_code', data)
		},
  }
}