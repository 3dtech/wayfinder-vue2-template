import Vue from 'vue'
import Vuex from 'vuex'
import Vue2TouchEvents from 'vue2-touch-events'
import VueObserveVisibility from 'vue-observe-visibility'
import WayfinderVueComponents from '@3dwayfinder/wayfinder-vue-components';
import { loadWayfinder } from '@3dwayfinder/wayfinder-vue-components';


import App from './App.vue'
import './registerServiceWorker'

Vue.use(Vuex);
Vue.use(VueObserveVisibility);
Vue.use(Vue2TouchEvents, {tapTolerance: 20});

Vue.config.productionTip = false

let WF_MAP_TYPE = "3d";
let WF_PROJECT = "demo"
const WF_API = "cdn";

const store = new Vuex.Store({
	state: {
		appName: "Wayfinder Vue Components",
		currentPOI: null,
		currentGroup: null,
		searchVisible: false,
		currentTab: "groups",
	},
	mutations: {
		setPOI (state, poi) {
			state.currentPOI = poi;
		},
		setGroup (state, group ) {
			state.currentGroup = group;
		},
		showSearch (state, show) {
			state.searchVisible = show;
		},
		setTab (state, tab) {
			state.currentTab = tab;
		}
	},
	actions: {
		setPOI : (context, poi) => {
			context.commit('setPOI', Object.freeze(poi));
		},
		setGroup : (context, group) => {
			context.commit('setGroup', Object.freeze(group));
		},
		showSearch : (context, show) => {
			context.commit('showSearch',  show);
		},
		setTab : (context, show) => {
			context.commit('setTab', show);
		}
	}
})

loadWayfinder(WF_MAP_TYPE, WF_API, loadVue);

function loadVue () {
	new Vue({
		store,
		render: h => h(App),
		created () {
			Vue.use(WayfinderVueComponents, this.$store, WF_MAP_TYPE, WF_PROJECT)
		}
	}).$mount('#app')
}
