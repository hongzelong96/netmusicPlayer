import Vue from 'vue'
import Vuex from 'vuex'

import {ZAudioStore} from "../components/zaudio/index.js"

Vue.use(Vuex)


const store = new Vuex.Store({
	modules: {
		// zaudio组件状态数据
		ZAudioStore: ZAudioStore,
		//这是其他数据
		other: {
			state: {
				a: '123',
				requestLoading: false
			},
			mutations: {
					//显示请求加载动画
				request_show_loading(state) {
					console.log('触发')
					console.log(state.requestLoading)
					state.requestLoading = true;
					console.log(state.requestLoading)
				},
				//隐藏请求加载动画
				request_hide_loading(state) {
					state.requestLoading = false;
				}
			},
			// getters:{
			// 	isone:state => state.isone,
			// }
		},
		
		
	}
})



export default store