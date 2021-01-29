export default{
	namespaced: true,
	state:{
		carList: [], // 购物车商品
	},
	getters:{
		get_carList:state => state.carList,
	},
	mutations:{
        // 新增
		mut_carListAdd(state,data){
			state.carList.push(data) 
        },
        
        // 更新
        mut_carListUpData(state,data){
            let {index,times,filesTime,filesPrice} = data
            state.carList[index].times = times
            state.carList[index].filesTime = filesTime
            state.carList[index].filesPrice = filesPrice
        },

        // 删除单个
        mut_carListDel(state,data){
            state.carList.splice(data,1)
        },

        // 删除全部
        mut_carListDelAll(state,data){
            state.carList = []
        },
	},
  actions: {
		act_carList({ commit }, data) {
			commit('mut_carListAdd', data)
		},
  }
}