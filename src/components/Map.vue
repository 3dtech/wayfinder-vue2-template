<template>
	<div class="map-container">
		<canvas id="map"/>
		<div class="map-path-text" v-show="showPathText">{{pathText}}</div>
		<!--div class="map-shadow"></div-->
	</div>
</template>

<script>
/* global wayfinder: true, Wayfinder3D */
import { mapActions } from 'vuex';
export default {
	name: 'Map',
	props: {
		project: String
	},
	mounted () {
		wayfinder = new Wayfinder3D();
		wayfinder.options.assetsLocation = "//static.3dwayfinder.com/shared/";
		
		if (wayfinder.options.project === "demo") {
			wayfinder.options.project = this.project;
		}
		
		wayfinder.open();
		var scope = this;
		var pathTextTime = wayfinder.settings.getInt('path.message.duration', 5) * 1000;
		wayfinder.cbOnDataLoaded = function () {
			if(!scope.loaded) {
				// update getters
				scope.update();
				scope.$store.dispatch('SET_INACTIVITY_TIME', wayfinder.settings.getInt('kiosk.max-inactivity', 30));
				scope.$emit('loaded');

				if (wayfinder.options.destination) {
					var poi = wayfinder.parsePOIFromURLParam(wayfinder.options.destination);
					if (poi) {
						scope.$emit('poiClicked', poi);
						wayfinder.statistics.onClick(poi.id, "url");
					}
				}
			}
		}

		wayfinder.events.listen('language-change', () => {
			this.update();
		});

		wayfinder.cbOnBeforeFloorChange = (currentFloor, nextFloor, destinationFloor) => {
			this.pathText = wayfinder.translator.get("go_to_floor", [currentFloor.getName(wayfinder.getLanguage()), destinationFloor.getName(wayfinder.getLanguage()), nextFloor.getName(wayfinder.getLanguage())])
			this.showPathText = true;
		};

		wayfinder.cbOnFloorChange = (floor) => {
			// console.log('cbOnFloorChange', floor, wayfinder.settings.getInt('path.message.duration', 1))
			if (floor) {
				this.currentFloor = floor.getName(wayfinder.getLanguage());
				this.$emit('onTouch');
			}
			if (this.showPathText) {
				setTimeout(() => {
					this.showPathText = false;
				}, pathTextTime);
			}
		};

		wayfinder.cbOnPOIClick = (poi) => {
			if (poi) {
				this.$emit('poiClicked', poi);
				wayfinder.statistics.onClick(poi.id, "map");
			}
		};

		wayfinder.cbOnTouch = () => {
			this.$emit('onTouch');
		};

		window.addEventListener('resize', () => {
			if (wayfinder) {
				wayfinder.resize();
			}
		});
	},
	methods: {
		...mapActions(['updateData']),
		update () {
			for(var i in this.$store._wrappedGetters) {
				this.$store._wrappedGetters[i](this.$store.state);
			}
		},
		reset () {
			wayfinder.restoreDefaultState();
			wayfinder.statistics.onSessionStart();
		},
		pause () {
			wayfinder.engine.pause();
			wayfinder.statistics.onSessionEnd();
		},
		run () {
			wayfinder.engine.run();
		}
	},
	data () {
		return {
			loaded: false,
			currentFloor: '',
			showPathText: false,
			pathText: ''
		}
	}

};
</script>

<style scoped lang="less">
	@import '../theme/variables';

	.map-container {
		position: relative;
		width: 100%;
		height: 100%;

		.map-path-text {
			margin-top: 50%;
			width: 20rem;
			text-align: center;
			background-color: @main-background;
			position: absolute;
			bottom: 15%;
			margin: auto;
			left: 50%;
			margin-left: -10rem;
			border-radius: @corner-radius-small;
			padding: 0.5rem;
			font-size: 2rem;
			font-weight: 600;
			text-transform: uppercase;
			.default-drop-shadow();
		}

		.map-shadow {
			position: absolute;
			bottom: -1px;
			width: 100%;
			height: 9rem;
			background: linear-gradient(0deg, @main-background -10%, transparent 100%);
		}
	}

	.currentFloor {
		color: white;
		font-size: 9rem;
		position: absolute;
		font-weight: 800;
		text-shadow: 0.1rem 0.1rem 0.3rem #666;
		text-align: center;
		width: 8rem;
		top: 0rem;
		right: 1rem;
	}
	
</style>
