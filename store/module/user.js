export default{
	namespaced: true,
	state:{
		
		code:null, // code
		shopId:null, // 门店
		phone:null, //手机号
		nickName:null, // 用户名
		headimgUrl:null, // 用户头像
		sex:null, //性别 
		birthday:null, // 生日
		province:null, // 省
		city:null, // 市
		area:null, // 区
	},
	getters:{
		get_code:state => state.code,
		get_shopId:state => state.shopId,
		get_phone:state => state.phone,
		get_nickName:state => state.nickName,
		get_headimgUrl:state => state.headimgUrl,
		get_sex:state => state.sex,
		get_birthday:state => state.birthday,
		get_province:state => state.province,
		get_city:state => state.city,
		get_area:state => state.area,
	},
	mutations:{
		mut_code(state,data){
			state.code = data
		},

		mut_shopId(state,data){
			state.shopId = data
		},

		// 设置用户
		mut_nickName(state,data){
			state.phone = data.phone
			state.nickName = data.nickName
			state.headimgUrl = data.headimgUrl?data.headimgUrl:state.headimgUrl
			state.sex = data.sex
			state.birthday = data.birthday
			state.province = data.province
			state.city = data.city
			state.area = data.area
		},
	},
  actions: {
	  	// 获取cood
		act_code({ commit }, data) {
			commit('mut_code', data)
		},

		// 获取用户
		act_nickName({ commit }, data) {
			commit('mut_nickName', data)
		},
  }
}