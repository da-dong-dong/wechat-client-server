export default{
	namespaced: true,
	state:{
        carList: [], // 购物车商品
        quickList: [], // 立刻下单
        typeHeader:null, // 档期类型
	},
	getters:{
        get_carList:state => state.carList,
        get_quickList:state => state.quickList,
        get_typeHeader:state => state.typeHeader,
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
            let {id,index,times,filesTime,filesPrice,typographyTypeId,times1,filesTime1,filesPrice1,typographyTypeId1} = data
            // 多个预约时间 待讨论
            state.quickList = state.quickList.map((item,idx)=>{
                if(item.id == id && idx == index){
                    // 判断
                    if(times !== undefined){
                        item.times = times
                        item.filesTime = filesTime
                        item.filesPrice = filesPrice
                        item.typographyTypeId = typographyTypeId
                    }else{
                        item.times1 = times1
                        item.filesTime1 = filesTime1
                        item.filesPrice1 = filesPrice1
                        item.typographyTypeId1 = typographyTypeId1
                    }
                }
                return item
            })
        },

        // 更新立刻下单门店
        mut_quickListUpDataShopId(state,data){
            let {id,index,shopId,shopName,shopNo} = data
            state.quickList.map((item,idx)=>{
                if(item.id == id && idx == index){
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

        // 设置档期类型
        mut_typeHeader(state,data){
            state.typeHeader = data
        },
	},
  actions: {
        // 购物车
		act_carList({ commit }, data) {
			commit('mut_carListAdd', data)
        },
        
        // 设置档期类型
        act_typeHeader({ commit }, data) {
			commit('mut_typeHeader', data)
        },
  }
}