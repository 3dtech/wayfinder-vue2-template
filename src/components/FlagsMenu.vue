<template>
	<div class="languages-container" :class="{'active': active }" v-if="languages.length > 1">
		<div class="languages-container-select">Select language</div>
		<div v-for="(lang, index) in languages" :key='index' @click="changeLanguage(lang)" :class='["language", "lang-" + lang.getName(), { active: lang.getName() == language, display: active}]' :style="{ backgroundImage: 'url('+getFlagImage(lang.flagImage)+')'}">
		</div>
	</div>
</template>

<script>
/* global wayfinder: false, WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'FlagsMenu',
	computed: {
		...mapState(['languages', 'language', 'reset'])
	},
	data () {
		return {
			active: false
		}
	},
	methods: {
		changeLanguage (language) {
			if (this.active) {
				this.$wayfinder.setLanguage(language.name);
			}
			this.active = !this.active;
		},

		getFlagImage (id) {
			return WayfinderAPI.getURL("images", "thumbnail", [id]);		
		}
	},
	watch: {
		reset: function () {
			this.active = false;
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';

	.languages-container {
		padding: 0.5rem;

		&.active {
			height: fit-content;

			.languages-container-select {
				visibility: initial;
				opacity: 1;
			}
		}

		.language {
			width: 63%;
			height: 0rem;
			margin: auto;
			margin-bottom: 0rem;
			background-size: cover;
			background-position: 50% 50%;
			background-repeat: no-repeat;
			transition: height 0.25s ease-in;

			.flag-drop-shadow();

			&.active {
				height: 3.5rem;
				margin-bottom: 1rem;
			}

			&.display {
				height: 3.5rem;
				margin-bottom: 1.5rem;
			}
		}

		.languages-container-select {
			opacity: 0;
			padding-bottom: 0.5rem;
			margin: auto;
			text-align: center;
			transition: opacity 0.2s ease-in;
			overflow: hidden;
			height: 1.5rem;
			font-size: 1rem;
		}
	}
</style>
