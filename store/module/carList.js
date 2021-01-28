export default{
	namespaced: true,
	state:{
		carList: [ {
            id:201001001,
            name:'889宝宝照',
            price:8889,
            imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            times:'2020-10-18',
            filesTime:'16:00',
            filesPrice:'123',
            noOrder:false
        },{
            id:201001001,
            name:'889宝宝照',
            price:8889,
            imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            times:'2020-10-18',
            filesTime:'16:00',
            filesPrice:'123',
            noOrder:false
        },{
            id:201001001,
            name:'889宝宝照',
            price:8889,
            imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            times:'2020-10-18',
            filesTime:'16:00',
            filesPrice:'123',
            noOrder:false
        },{
            id:201001001,
            name:'889宝宝照',
            price:8889,
            imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            times:'2020-10-18',
            filesTime:'16:00',
            filesPrice:'123',
            noOrder:false
        },{
            id:201001001,
            name:'889宝宝照',
            price:8889,
            imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            times:'2020-10-18',
            filesTime:'16:00',
            filesPrice:'123',
            noOrder:false
        },{
            id:201001001,
            name:'889宝宝照',
            price:8889,
            imgs:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619181582,1012377832&fm=26&gp=0.jpg',
            times:'2020-10-18',
            filesTime:'16:00',
            filesPrice:'123',
            noOrder:false
        },
    ], // 购物车商品
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