<template>
	<div class="topics-menu">
		<ul class="list">
			<li class="list-item" v-touch:tap="onClick(topic)" :class='{"active": topic.id == currentGroup.id}' v-for="(topic, index) in sortedGroups" :key='index' v-if="topic && topic.getShowInMenu()" v-html="topic.getName(language)"></li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'TopicsMenu',
	mounted () {

	},
	data () {
		return {

		}
	},
	computed: {
		...mapState(['poiGroups', 'currentGroup', 'language']),
		sortedGroups () {
			let arr = []; // Copy arr for sorting
			for (let i in this.poiGroups) {
				arr.push(this.poiGroups[i]);
			}

			return arr.sort((a, b) => {
				if (a && b) {
					return a.getName(this.language).localeCompare(b.getName(this.language), this.language, {sensitivity: 'accent'});
				}
				else {
					return 0;
				}
			});
		}
	},
	updated () {

	},
	methods: {
		onClick (group) {
			return () => {
				this.$emit('clicked', group);
			};
		},
		reset () {
			this.$store.dispatch('SET_CURRENT_GROUP', false);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';

	.az-menu {
		overflow: hidden;
		user-select: none;

		ul {
			margin: 0;
			padding: 0;
		}

		.list-item {
			list-style: none;
			padding: 0.3rem;
			border-bottom: 1px solid @menu-item-border-color;
			padding: 1.5rem 2rem 1.5rem 4rem;
			font-size: 120%;
		}

		.list-item:active, .list-item.active {
			.list-item-gradient();
		}
	}

	@media @landscape {
		.az-menu {
			.az-menu-inner {
				align-content: stretch;
				align-items: stretch;

				.floor {
					width: auto;
				}
			}
		}
	}
</style>
