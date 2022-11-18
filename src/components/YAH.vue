<template>
	<button class="yah-logo" :style="{'background-image': yahLogo}" @click="onClicked()" data-translation-element="yah">
		YAH
	</button>
</template>

<script>
/* global wayfinder */
import { mapState } from 'vuex';

export default {
	name: 'BuildingLogo',
	
	computed: {//yahLogo
		...mapState(['yahLogo', 'language'])
	},
	methods: {
		getLogo () {
			if (wayfinder) {
				return 
			}
		},
		onClicked () {
			wayfinder.showKiosk();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';
	.yah-logo {
		background-repeat: no-repeat;
		background-color: @main-background;
		font-weight: 600;
		text-align: center;
		.default-drop-shadow();
		margin-right: 0.5rem;
		text-transform: uppercase;
		border: none;
		outline: none;

		&:active {
			background-color: @tertiary-color;
		}
	}
</style>
