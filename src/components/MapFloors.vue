<template>
		<div class="map-floors-container">
			<div class="map-floors">
				<div v-for="(floor, index) in floors" :key='index' v-if="floor.showInMenu" @click="changeFloor(floor)" class="button button-floor" :class='["lang-" + language, "floor-" + floor.index, { active: floor.getActive(), undeground: undeground(floor)}]'>
					{{floor.getName(language)}}
				</div>
			</div>
		</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: 'HelloWorld',
	data () {
		return {
		}
	},
	computed: {
		...mapState(['floors', 'language']),
	},
	mounted () {

	},
	methods: {
		changeFloor (floor) {
			this.$wayfinder.showFloor(floor);
		},

		undeground (floor) {
			return floor.index < 0;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';

	@floor-button-margin: 0.4rem;
	@floor-button-padding: @floor-button-size / 4;

	.map-floors {		
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.button-floor {
			width: @floor-button-size;
			height: @floor-button-size;
			background-color: white;
			border: none;
			margin: @floor-button-margin;
			text-overflow: ellipsis;
			border-radius: @floor-button-radius;
			color: @floor-button-color;
			position: relative;
			font-size: @floor-button-size / 2;
			text-align: center;
			line-height: @floor-button-size;
			.default-drop-shadow();
			margin-left: auto;
			font-weight: 400;
			overflow: hidden;
		}

		.active {
			.highlight-gradient();
			color: @highlight-font-color;
			width: @floor-button-size * 1.3;
			height: @floor-button-size * 1.3;
			font-size: (@floor-button-size / 2) * 1.4;
			line-height: @floor-button-size * 1.3;
		}

		.undeground {
			background-color: @floor-underground-background;
		}
	}


@media @landscape {
	.map-floors {		

	}
}
</style>
