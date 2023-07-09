<template>
	<div class="shortcuts-container">
		<div v-for="(shortcut, index) in shortcuts" :key='index' class="tab-button shortcut" @click="showShortcut(shortcut)" :class='["shortcut-" + shortcut.getID()]' :style="{ backgroundImage: 'url('+getImage(shortcut.imageID)+')'}">
			{{shortcut.getName(language)}}
		</div>
		<div v-for="i in fakeButtons" :key="i" class="tab-button shortcut">
			{{i}}
		</div>
	</div>
</template>

<script>
/* global wayfinder: false, WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'ShortcutsMenu',
	computed: {
		...mapState('wf', ['shortcuts', 'language', 'landscape']),
		fakeButtons () {
			if (!this.shortcuts) return 0;
			return (Math.ceil((this.shortcuts.length) / 3) * 3) - (this.shortcuts.length);
		}
	},
	methods: {
		showShortcut (shortcut) {
			this.$emit('showShortcut', shortcut);
		},
		getImage (id) {
			return WayfinderAPI.getURL("images", "thumbnail", [id]);		
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';

	.shortcuts-container {
		display: flex;
		flex-wrap: wrap-reverse;
		align-content: stretch;
		justify-content: space-between;
		margin-bottom: 0.1rem;
		flex-direction: row-reverse;
	}
</style>