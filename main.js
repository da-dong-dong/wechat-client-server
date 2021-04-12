import Vue from 'vue'
import App from './App'
import store from './store'
// 导航栏
import tabBar from './components/tabBar.vue'

// 全局使用stroe
Vue.prototype.$store = store;

Vue.config.productionTip = false

// 导入导航栏组件
Vue.component('tabBar', tabBar)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

Vue.filter('times',function(dataStr,pattern = ''){
	if(typeof(dataStr)=='string') return dataStr
		if(dataStr){
			 let dt = new Date(dataStr)
			 let y = dt.getFullYear()
			 let m = dt.getMonth()+1;
			 let d = dt.getDate()
			 return `${y}-${m}-${d}`
		}else{
			return '未选定时间'
		}
})