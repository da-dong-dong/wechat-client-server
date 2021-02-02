export default{
	namespaced: true,
	state:{
        carList: [], // 购物车商品
        quickList: [], // 立刻下单
	},
	getters:{
        get_carList:state => state.carList,
        get_quickList:state => state.quickList,
	},
	mutations:{
        // 新增
		mut_carListAdd(state,data){
			state.carList.push(data) 
        },
        // 新增立刻下单
		mut_quickListAdd(state,data){
            state.quickList = data
        },

        
        // 更新立刻下单时间
        mut_quickListUpData(state,data){
            let {id,index,times,filesTime,filesPrice} = data
            state.quickList.map((item,idx)=>{
                if(item.id = id && idx == index){
                    item.times = times
                    item.filesTime = filesTime
                    item.filesPrice = filesPrice
                }
            })
        },

        // 更新立刻下单门店
        mut_quickListUpDataShopId(state,data){
            let {id,index,shopId,shopName,shopNo} = data
            state.quickList.map((item,idx)=>{
                if(item.id = id && idx == index){
                    item.shopId = shopId
                    item.shopName = shopName
                    item.shopNo = shopNo
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