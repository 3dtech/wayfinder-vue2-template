<template>
	<div class="building-logo" v-bind:style="{'background-image': getLogo()}">
	</div>
</template>

<script>
/* global WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'BuildingLogo',
	
	computed: {
		...mapState(['building'])
	},
	methods: {
		getLogo () {
			if (this.building && this.building.logoID) {
				return 'url(' + WayfinderAPI.getURL("images", "get", this.building.logoID) + ')'
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';
	.building-logo {
		background-size: auto 60%;
		background-repeat: no-repeat;
		background-position: 50%;
	}
</style>
