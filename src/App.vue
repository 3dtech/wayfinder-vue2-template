<template>
	<WFApp id="app">
		<div class="map-area-container" :class="{'map-search-visible': searchVisible}">
			<WFMap @poiClicked="onMapPOIClick" @onTouch="onClick" @loaded="mapLoaded" ref="map"/>
			<WFFloorsMenu :currentFloor="currentFloor" :hideWhenSingleFloor="true"/>
			<div class="loading" v-if="loading"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
			<div class="header">
				<WFFlagsMenu :showFlags="true"/>
				<div class="header-content">
					<WFBuildingLogo class="hide-landscape" />
					<div class="clock-container hide-mobile">
						<div class="clock">
							<WFClock/>
						</div>
					</div>
					<div v-show="mobile"></div>
				</div>
				<WFYAH class="hide-portrait tab-button" />
			</div>
			<Search @clicked="onSearchPOIClick" @close="onSearchClose" ref="search" :showKeyboard="!mobile" :class='{"search-visible": searchVisible}'/>
		</div>
		<div class="menus">
			<div class="menus-top">
				<div class="col col-building-logo hide-portrait">
					<WFBuildingLogo />
				</div>
				<div class="col col-tabs">
					<WFYAH class="hide-landscape tab-button hide-mobile"/>
					<TabButtons @switchTab="switchMainTab"/>
				</div>
				<div class="col col-shortcuts">
					<ShortcutsMenu @activateMenu="activateMenu" @showShortcut="showShortcut"/>
				</div>
			</div>
			<div class="menus-bottom" :class="[{'active': menuActive}]">
				<div class="col col-tabs-container tabs-container">
					<WFTabs ref="tabs" :activeTab="currentTab" animate="horizontal">
						<WFTab name="groups">
							<WFScrollableArea>
								<WFGroupsMenu @clicked="onGroupMenuClick" @poiClicked="onPOIClick" @subGroupClicked="onGroupMenuClick" :showPOIs="false"/>
							</WFScrollableArea>
						</WFTab>
						<WFTab name="group-pois">
							<WFScrollableArea>
								<WFSubGroupMenu :parent="currentGroup ? parseInt(currentGroup.id) : -1" @poiClicked="onPOIClick" @back="toGroups" :showPOIs="true" :showParentGroup="true"/>
							</WFScrollableArea>
						</WFTab>
						<WFTab name="az">
							<WFScrollableArea>
								<WFAZMenu @clicked="onPOIClick"></WFAZMenu>
							</WFScrollableArea>
						</WFTab>
						<WFTab name="poi-info" class="hide-portrait">
							<WFPOI 
								:poi="currentPOI" 
								:showLogo="template.poiinfoShowLogo" 
								:showRoomID="template.poiinfoShowRoomId" 
								:showPathButton="true" 
								:showAccessibilityPathButton="template.poiinfoShowAccessibilityPathButton"
								:showDistance="template.poiInfoShowDistance"
								:showDescription="true"/>
						</WFTab>
					</WFTabs>
				</div>
				<div class="col col-poi hide-landscape" ref="poiinfo">
					<WFPOI 	
						:poi="currentPOI" 
						:showLogo="template.poiinfoShowLogo" 
						:showRoomID="template.poiinfoShowRoomId" 
						:showPathButton="true" 
						:showAccessibilityPathButton="template.poiinfoShowAccessibilityPathButton"
						:showDistance="template.poiinfoShowDistance"
						:showDescription="true"/>
					<div data-translation-element="no-menu" class="no-poi-info hide-landscape">Choose from the menu</div>
				</div>
			</div>
		</div>
		<div id="screensaver" class="banners-screensaver hide-mobile" v-show="screensaver" @click="hideBanner()">
			<WFBanner template="default" container="screensaver" class="hide-portrait" @clicked="onBannerClick" @hasbanners="hasBanners" :qrURL="qrURL"></WFBanner>
			<WFBanner template="default" container="screensaver-portrait" class="hide-landscape" @clicked="onBannerClick" @hasbanners="hasBanners" :qrURL="qrURL"></WFBanner>
		</div>
	</WFApp>
</template>

<script>
/* global wayfinder */
import { WFApp, WFMap, WFClock, WFFloorsMenu, WFFlagsMenu, WFTabs, WFTab, WFGroupsMenu, WFAZMenu, WFScrollableArea, WFPOI, WFBanner, WFBuildingLogo, WFYAH, WFGroupPOIsMenu, WFSubGroupMenu} from '@3dwayfinder/wayfinder-vue-components'

import TabButtons from './components/TabButtons.vue'
import Search from './components/Search.vue'
import ShortcutsMenu from './components/ShortcutsMenu.vue'

import { mapState } from 'vuex';

export default {
	name: 'app',
	components: {
		WFApp,
		WFMap,
		WFFloorsMenu,
		WFAZMenu,
		WFGroupsMenu,
		WFSubGroupMenu,
		WFFlagsMenu,
		WFBuildingLogo,
		WFYAH,
		WFClock,
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
			screensaver: false,
			hasScreensaver: false,
			menuActive: false,
			currentTab: "groups",
			currentGroup: null,
			searchVisible: false,
			loading: true,
			qrURL: "https://clients.3dwayfinder.com/Amanda/?kiosk={kiosk}&map2DRotation={rot}",
		}
	},
	computed: {//yahLogo
		...mapState('wf', ['maxInActivity', 'currentFloor', 'landscape', 'portrait', 'template', 'mobile']),
		...mapState(['currentPOI']),
		apiHost () {
			return this.$WF_API_HOST;
		},
		assetHost () {
			return this.$WF_ASSET_HOST;
		}
	},
	methods: {
		onClick () {
			clearTimeout(this.lastClick);
			this.$refs['map'].run();
			
			this.lastClick = setTimeout(() => {
				if(this.$refs.map) {
					this.$refs.map.reset();
				}
				this.reset();
			}, this.maxInActivity * 1000);
			return false;
		},
		changeTab (tab) {
			this.currentTab = tab;			
		},
		onGroupMenuClick (group) {
			this.currentGroup = Object.freeze(group);
			this.changeTab('group-pois');
		},
		onMapPOIClick (poi) {
			this.$store.dispatch('setPOI', poi);

			this.$wayfinder.clearHighlights();
			this.$wayfinder.clearDisplaying();
			this.$wayfinder.setHighlights([poi]);
			this.$wayfinder.setDisplaying([poi]);

			if (this.landscape) {
				this.changeTab('poi-info');
			}
		},
		activateMenu (active) {
			this.menuActive = active;
			this.searchVisible = false;
		},
		onPOIClick (poi) {
			this.$store.dispatch('setPOI', poi);
			this.activateMenu(false);
			this.$wayfinder.clearHighlights();
			this.$wayfinder.clearDisplaying();
			this.$wayfinder.clearPath();

			if (this.landscape) {
				this.changeTab('poi-info');
			}

			if (this.template.poiinfoShowFloor && poi.getNode()) {
				this.$wayfinder.showFloor(poi.getNode().getFloor());
			}
			if (this.template.poiinfoShowPath && poi.getNode()) {
				this.$wayfinder.showPath(poi.getNode(), poi);
			}

			this.$wayfinder.setHighlights([poi]);
			this.$wayfinder.setDisplaying([poi]);
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
			this.searchVisible = false;
		},
		reset () {
			this.changeTab('groups');
			this.searchVisible = false;
			this.currentGroup = null;
			this.$store.dispatch('wf/SET_RESET');
			this.screensaver = this.hasScreensaver;
			this.$refs['map'].pause();
			this.$refs['search'].resetValues();
		},
		switchMainTab (tab) {
			if (tab !== 'search') {
				if (!(tab === 'poi-info' && !this.landsape)) {
					this.changeTab(tab);
				}

				this.activateMenu(true);
			}
			else {
				this.searchVisible = !this.searchVisible;
			}
		},
		onBannerClick (/*frame, container*/) {
			this.screensaver = false;
			this.$refs['map'].run();
		},
		toGroups () {
			this.changeTab('groups');
		},
		hideBanner () {
			this.screensaver = false;
		},
		mapLoaded () {
			this.$refs['map'].run();
			this.qrURL = this.qrURL.replace("{kiosk}", this.$wayfinder.getKiosk());
			this.qrURL = this.qrURL.replace("{rot}", 0);
			this.loading = false;
		},
		hasBanners (has) {
			this.hasScreensaver = has;
		},
		showShortcut (shortcut) {
			var nearest = this.$wayfinder.getNearestPOI(this.$wayfinder.getKiosk(), shortcut.pois);
			if (nearest && typeof nearest === 'object') {
				this.menuActive = false;
				if(this.template.showShortcutPath) {
					this.$wayfinder.showPath(nearest.node, nearest);
				}
				else {
					this.$wayfinder.setHighlights(shortcut.pois);
					this.$wayfinder.setDisplaying(shortcut.pois);
					if(nearest.node) {
						this.$wayfinder.showFloor(nearest.node.getFloor())
					}
					
				}
				
			}
		}
	}
};
</script>

<style lang="less">
	@import 'theme/styles';
	@import 'theme/responsive';
</style>
