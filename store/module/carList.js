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
            let {id,index,times,filesTime,filesPrice} = data
            state.carList.map((item,idx)=>{
                if(item.id = id && idx == index){
                    item.times = times
                    item.filesTime = filesTime
                    item.filesPrice = filesPrice
                }
            })
            
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
        // 购物车
		act_carList({ commit }, data) {
			commit('mut_carListAdd', data)
		},
  }
}