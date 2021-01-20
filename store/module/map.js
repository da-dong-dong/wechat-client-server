export default{
	namespaced: true,
	state:{
		shopIdList: null, // 所有门店信息
	},
	getters:{
		get_shopIdList:state => state.shopIdList,
	},
	mutations:{
		mut_shopIdList(state,data){
			state.shopIdList = data
		},
	},
  actions: {
		act_shopIdList({ commit }, data) {
			commit('mut_shopIdList', data)
		},
  }
}