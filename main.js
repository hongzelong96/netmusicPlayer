import App from './App'
import request from 'components/common/request.js'
import Vuecookies from 'vue-cookies'
import {ZAudio} from 'components/zaudio/index.js'
import store from 'store/index.js'
import Vue from 'vue'

Vue.use(ZAudio)
Vue.use(Vuecookies)

function showLoading(){
	store.commit('request_show_loading');
}
function hideLoading(){
	store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();


//请求
Vue.prototype.$http = request;
//vuex状态管理
Vue.prototype.$store = store;



Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
