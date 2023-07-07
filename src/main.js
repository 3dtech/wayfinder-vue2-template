import Vue from 'vue'
import Vuex from 'vuex'
import Vue2TouchEvents from 'vue2-touch-events'
import VueObserveVisibility from 'vue-observe-visibility'
import WayfinderVueComponents from '@3dwayfinder/wayfinder-vue-components';

import App from './App.vue'
import './registerServiceWorker'
import Icon from "./plugins/Icon.vue"

Vue.use(Vuex);
Vue.use(VueObserveVisibility);
Vue.use(Vue2TouchEvents, {tapTolerance: 20});

Vue.config.productionTip = false
Vue.component("icon", Icon);

const env = "live";
let WF_MAP_TYPE = "3d";   

const urls = {
  api: {
    live: "//api.3dwayfinder.com",
    enterprise: "//example.com/api/",
    dev: "//api.3dwayfinder.com",
    snapshot: "../../../api/"
  },
  assets: {
    live: "https://wayfinder-cdn.com/shared/",
    dev: "//static.3dwayfinder.com/shared/",
    enterprise: "//example.com/shared/",
    snapshot: "../../../shared/"
  },
  js: {
    live: "https://wayfinder-cdn.com/",
    dev: "//static.3dwayfinder.com",
    enterprise: "//example.com/js/",
    snapshot: "../../../"
  }
}

const store = new Vuex.Store({
  state: {
    appName: "Wayfinder Vue Components",
    currentPOI: null,
    currentGroup: null,
    searchVisible: false,
  },
  mutations: {
    setPOI (state, poi) {
      state.currentPOI = poi;
    },
    setGroup (state, group ) {
      state.currentGroup = group;
    },
    showSarch (state, show) {
      state.searchVisible = show;
    }
  },
  actions: {
		setPOI : (context, poi) => {
			context.commit('setPOI',  Object.freeze(poi));
		},
    setGroup : (context, group) => {
			context.commit('setGroup',  Object.freeze(group));
		},
    SHOW_SEARCH : (context, show) => {
			context.commit('showSarch',  show);
		},
  }
})

function getURL(_env, type) {
  return urls[type][_env];
}

/* global WF_MAP_TYPE WayfinderAPI wayfinder*/

function loadScript(url, callback) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  
  var x = document.getElementsByTagName('head')[0];
  x.appendChild(s);
  if (typeof callback == "function") {
    s.onload = callback;
    s.src = url;
  }
}

function loadVue () {
  Vue.prototype.$WF_MAP_TYPE = WF_MAP_TYPE;
  Vue.prototype.$WF_API_HOST = getURL(env, "api");
  Vue.prototype.$WF_ASSET_HOST = getURL(env, "assets");
  new Vue({
    store,
    render: h => h(App),
    created () {
      Vue.use(WayfinderVueComponents, this.$store) // Create it by passing in the store you want to use
    }
  }).$mount('#app')
}


function load3D () {
  loadScript(getURL(env, "js") + "/shared/js/minified/frak-latest.debug.js", function () {
    loadScript(getURL(env, "js") + "/js/dist/3d/latest/Wayfinder3D.debug.js", function () {
      loadVue();
    });
  });
}

function load2D () {
	loadScript(getURL(env, "js") + "/js/dist/2d/latest/Wayfinder2D.debug.js", function () {
  	loadVue();
	});
}

if(location && location.search) {
	var options = decodeURI(location.search.substring(1));
	if (options.indexOf("mobile=") > -1) {
		WF_MAP_TYPE = "2d";
		load2D();
	} else if (WF_MAP_TYPE == "2d") {
		load2D();
	}
  else {
    load3D();
  }
} else {
  console.log('WF_MAP_TYPE', WF_MAP_TYPE);
	if (typeof WF_MAP_TYPE == "undefined" ||  WF_MAP_TYPE == "3d") {
		load3D();
	} else {
		load2D();
	}
}