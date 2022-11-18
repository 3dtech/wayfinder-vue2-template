import Vue from 'vue'
import App from './App.vue'
//import { WFStore } from '@3dwayfinder/wayfinder-vue-components';
import store from "./store.js";
import './registerServiceWorker'
import Icon from "./plugins/Icon.vue"

import Vue2TouchEvents from 'vue2-touch-events'
import VueObserveVisibility from 'vue-observe-visibility'
import WayfinderVueComponents from '@3dwayfinder/wayfinder-vue-components';

Vue.use(WayfinderVueComponents);
Vue.use(VueObserveVisibility);
Vue.use(Vue2TouchEvents, {tapTolerance: 20});

Vue.config.productionTip = false
Vue.component("icon", Icon);

//const apiHost = "//api.3dwayfinder.com";
//const assetHost = "//static.3dwayfinder.com/shared/";
//const jsHost = "//static.3dwayfinder.com";

const apiHost = "../../../api/"
const assetHost = "../../../shared/";
const jsHost = "../../../";


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
  Vue.prototype.$WF_API_HOST = apiHost;
  Vue.prototype.$WF_ASSET_HOST = assetHost;
  new Vue({
    store: store,
    render: h => h(App)
  }).$mount('#app')
}

function load3D () {
  loadScript(jsHost + "/shared/js/minified/frak-latest.debug.js", function () {
    loadScript(jsHost + "/js/dist/3d/latest/Wayfinder3D.debug.js", function () {
      loadVue();
    });
  });
}

function load2D () {
	loadScript(jsHost + "/js/dist/2d/latest/Wayfinder2D.debug.js", function () {
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