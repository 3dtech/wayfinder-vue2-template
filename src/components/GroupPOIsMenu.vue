<template>
	<div class="topics-menu">
		<ul class="list">
			<li class="list-item list-header" v-touch:tap="back()">{{ currentGroupName }}</li>
			<li class="list-item" v-touch:tap="onClick(poi)" :class='{"active": currentPOI && poi.id == currentPOI.id}' v-for="poi in getPOIs" :key='poi.id' v-if="poi && poi.getShowInMenu()" v-html="poi.getName(language)"></li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'GroupPOIsMenu',
	props: {
		group: {

		}
	},
	mounted () {

	},
	computed: {
		...mapState(['currentGroup', 'currentPOI', 'language']),
		getPOIs() {
			if (this.currentGroup.pois) {
				let arr = this.currentGroup.pois.slice(0);
				return arr.sort((a, b) => {
					return a.getName(this.language).localeCompare(b.getName(this.language));
				});
			}
			else {
				return [];
			}
		},
		currentGroupName () {
			return this.currentGroup ? this.currentGroup.getName(this.language) : '';
		}
	},
	methods: {
		onClick (poi) {
			return () => {
				this.$emit('clicked', poi);
			};
		},
		back () {
			return () => {
				this.$emit('back');
			};
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';

	.list-header {
		.highlight-gradient();
		color: @highlight-font-color;

		&:before {
			content: '';
			background-repeat: no-repeat;
			background-size: contain;
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath d='M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z' id='path2' style='fill:%23ffffff' /%3E%3C/svg%3E%0A");
			width: 2rem;
			height: 2rem;
			display: block;
			position: absolute;
			margin-left: -1.3rem;
			margin-top: -0.2rem;
		}
	}

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
