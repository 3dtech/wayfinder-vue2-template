<template>
	<div id="app" v-touch:tap='onClick'>
		<div class="map-area-container" :class="{'map-search-visible': searchVisible}">
			<WFMap @poiClicked="onMapPOIClick" @onTouch="onClick" @loaded="mapLoaded" ref="map" :api="apiHost" :assets="assetHost"/>
			<WFFloorsMenu :currentFloor="currentFloor" :hideWhenSingleFloor="true"/>

			<div class="header">
				<FlagsMenu />
				<div class="header-content">
					<WFBuildingLogo class="hide-landscape" />
					<div class="clock-container">
						<div class="clock">
							<ClockComponent format="HH:mm" />
						</div>
					</div>
				</div>
				<WFYAH class="hide-portrait tab-button" />
			</div>
			<Search @clicked="onSearchPOIClick" @close="onSearchClose"/>
		</div>
		<div class="menus">
			<div class="menus-top">
				<div class="col col-building-logo hide-portrait">
					<WFBuildingLogo />
				</div>
				<div class="col col-tabs">
					<WFYAH class="hide-landscape tab-button"/>
					<TabButtons @switchTab="switchMainTab"/>
				</div>
				<div class="col">
					<ShortcutsMenu/>
				</div>
			</div>
			<div class="menus-bottom">
				<div class="col col-tabs-container tabs-container">
					<WFTabs ref="tabs" :activeTab="currentTab" animate="horizontal">
						<WFTab name="groups">
							<WFScrollableArea>
								<WFGroupsMenu @clicked="onGroupMenuClick"/>
							</WFScrollableArea>
						</WFTab>
						<WFTab name="group-pois">
							<WFScrollableArea>
								<WFGroupPOIsMenu v-show="currentGroup" :group="currentGroup" @clicked="onPOIClick" @back="toGroups"/>
							</WFScrollableArea>
						</WFTab>
						<WFTab name="az">
							<WFScrollableArea>
								<WFAZMenu @clicked="onPOIClick"></WFAZMenu>
							</WFScrollableArea>
						</WFTab>
						<WFTab name="poi-info" class="hide-portrait">
							<WFPOI :poi="currentPOI" :showLogo="true" :showPathButton="true" :showDescription="true"/>
						</WFTab>
					</WFTabs>
				</div>
				<div class="col col-poi hide-landscape" ref="poiinfo">
					<WFPOI :poi="currentPOI" :showLogo="true" :showPathButton="true" :showDescription="true"/>
					<div data-translation-element="no-menu" class="no-poi-info hide-landscape">Choose from the menu</div>
				</div>
			</div>
		</div>
		<div id="screensaver" class="banners-screensaver" v-show="screensaver" @click="hideBanner()">
			<WFBanner template="default" container="screensaver" class="hide-portrait" @clicked="onBannerClick" @hasbanners="hasBanners"></WFBanner>
			<WFBanner template="default" container="screensaver-portrait" class="hide-landscape" @clicked="onBannerClick" @hasbanners="hasBanners"></WFBanner>
		</div>
	</div>
</template>

<script>
/* global wayfinder */
import { WFMap, WFFloorsMenu, WFTabs, WFTab, WFGroupsMenu, WFAZMenu, WFScrollableArea, WFPOI, WFBanner, WFBuildingLogo, WFYAH, WFGroupPOIsMenu} from '@3dwayfinder/wayfinder-vue-components'

import TabButtons from './components/TabButtons.vue'
import Search from './components/Search.vue'
import FlagsMenu from './components/FlagsMenu.vue'
import ShortcutsMenu from './components/ShortcutsMenu.vue'

import {ClockComponent} from 'vue-clock'
import { mapState } from 'vuex';

export default {
	name: 'app',
	components: {
		WFMap,
		WFFloorsMenu,
		WFAZMenu,
		WFGroupsMenu,
		FlagsMenu,
		WFBuildingLogo,
		WFYAH,
		ClockComponent,
		TabButtons,
		WFPOI,
		WFTabs,
		WFTab,
		Search,
		ShortcutsMenu,
		WFBanner,
		WFScrollableArea,
		WFGroupPOIsMenu
	},
	data () {
		return {
			lastClick: false,
			landscape: false,
			screensaver: false,
			hasScreensaver: false,
		}
	},
	computed: {//yahLogo
		...mapState(['currentTab', 'searchVisible', 'maxInActivity', 'currentGroup', 'currentFloor', 'currentPOI']),
		apiHost () {
			console.log('apiHost', this.$WF_API_HOST);
			return this.$WF_API_HOST;
		},
		assetHost () {
			return this.$WF_ASSET_HOST;
		}
	},
	mounted () {
		this.resize();

		window.onresize = () => {
			this.resize();
		}
	},
	methods: {
		onClick () {
			clearTimeout(this.lastClick);
			this.$refs['map'].run();
			
			this.lastClick = setTimeout(() => {
				this.$refs.map.reset();
				this.reset();
			}, this.maxInActivity * 1000);
			return false;
		},
		onGroupMenuClick (group) {
			this.$store.dispatch('SET_CURRENT_GROUP', group);
			this.$store.dispatch('SET_CURRENT_TAB', 'group-pois');
		},
		onMapPOIClick (poi) {
			this.$store.dispatch('SET_CURRENT_POI', poi);

			if (this.landscape) {
				this.$store.dispatch('SET_CURRENT_TAB', 'poi-info');
			}
		},
		onPOIClick (poi) {
			console.log('onPOIClick', poi, this.landscape);
			this.$store.dispatch('SET_CURRENT_POI', poi);

			if (this.landscape) {
				this.$store.dispatch('SET_CURRENT_TAB', 'poi-info');
			}

			this.$wayfinder.statistics.onClick(poi.id, "menu");
		},
		onSearchPOIClick (poi) {
			if (poi) {
				this.onPOIClick(poi);
				this.$wayfinder.showPath(poi.getNode(), poi)
				this.$wayfinder.clearHighlights();
				this.$wayfinder.setHighlights([poi]);
			}
		},
		onSearchClose () {
			if (this.landscape) {
				//this.$store.dispatch('SET_CURRENT_TAB', 'poi-info');
			}
		},
		reset () {
			this.$store.dispatch('SET_CURRENT_TAB', 'az');
			this.$store.dispatch('SHOW_SEARCH', false);
			this.$store.dispatch('SET_RESET');
			this.screensaver = this.hasScreensaver;
			this.$refs['map'].pause();
		},
		resize () {
			let _l = window.matchMedia("(orientation: landscape)");
			this.landscape = _l ? _l.matches : false;
			this.$store.dispatch('SET_LANDSCAPE', this.landscape);
		},
		doSomething () {},
		switchMainTab (tab) {
			if (tab !== 'search') {
				if (!(tab === 'poi-info' && !this.landsape)) {
					this.$store.dispatch('SET_CURRENT_TAB', tab);
				}
			}
			else {
				this.$store.dispatch('SHOW_SEARCH', !this.searchVisible);
			}
		},
		onBannerClick (/*frame, container*/) {
			this.screensaver = false;
			this.$refs['map'].run();
		},
		toGroups () {
			this.$store.dispatch('SET_CURRENT_TAB', 'groups');
		},
		hideBanner () {
			this.screensaver = false;
		},
		mapLoaded () {
			this.$refs['map'].run();


		},
		hasBanners (has) {
			this.hasScreensaver = has;
		}
	}
};
</script>

<style lang="less">
	@import 'theme/styles';
	@import 'theme/responsive';
</style>
