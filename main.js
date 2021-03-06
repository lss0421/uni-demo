import Vue from 'vue'
import App from './App'

Vue.prototype.$api = 'https://www.imovietrailer.com/superhero'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
