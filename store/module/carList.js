export default{
	namespaced: true,
	state:{
		carList: [], // 购物车商品
	},
	getters:{
		get_carList:state => state.carList,
	},
	mutations:{
		mut_carList(state,data){
            console.log(data)
			state.carList.push(data) 
		},
	},
  actions: {
		act_carList({ commit }, data) {
			commit('mut_carList', data)
		},
  }
}