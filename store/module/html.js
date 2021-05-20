import amap from '@/util/lib/amap-wx.js'
import { listBrand,getCityShop } from '@/util/api/map.js' 
export default{
	namespaced: true,
	state:{
        htmlStr: ''
	},
	getters:{
        getHtmlStr: state => state.htmlStr
	},
	mutations:{
        mut_setHtml(state,data){
			state.htmlStr = data
		}
	},
  actions: {
    act_setHtml({ commit }, data) {
        commit('mut_setHtml', data)
    }
  }
}