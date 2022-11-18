<template>
	<div class="layout-view" v-if="currentPOI">
		<div class="poi-header">
			<div class="poi-image" :style="{'background-image': getImage()}" :class="[isImage()]" v-if="getImage()"></div>
			<div class="poi-info">
				<h2>{{currentPOI.getName(language)}}</h2>
				<div class="show-path" v-touch:tap="showPath">
					<button class="button secondary round button-small">
						<span data-translation-element="show_path">{{show_path}}</span> <i class="icon icon-pin"></i>
					</button>
					<div v-show="displayPathToText && pathText != null">
						<div class="path-time">{{pathTime}} ~ {{pathSteps}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="poi-body">
			<div class="poi-room-id">{{roomId}}</div>
			<div class="poi-description" v-html="currentPOI.getDescription(language) || ''"></div>
		</div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['currentPOI', 'language', 'displayPathToText']),
		roomId () {
			if (this.currentPOI) {
				if (this.currentPOI.room_id) {
					return this.currentPOI.room_id;
				}
			}

			return '';
		},
		pathTime () {
			if (this.pathText != null && this.pathText.distance) {
				var dist = this.pathText.distance;
				var sec = Math.ceil(dist / 1.4);
				var min = Math.floor(sec / 60);
				sec -= min * 60;

				return min + "min " + sec + "sec";
			}
			else {
				return '';
			}
		},

		pathSteps () {
			if (this.pathText != null && this.pathText.distance) {
				var steps = Math.ceil(this.pathText.distance / 0.76);
				
				return steps + " steps";
			}
			else {
				return '';
			}
		}
	},
	watch: {
		language () {
			if (wayfinder) {
				this.show_path = wayfinder.translator.get('show_path');
			}
		}
	},
	methods: {
		update (id) {
			/* global wayfinder window */
			if (wayfinder.pois[id]) {
				this.poi = wayfinder.pois[id]
				this.$emit('titleChanged', this.poi.getName(wayfinder.getLanguage()))
				this.description = this.poi.getDescription(wayfinder.getLanguage()) ? this.poi.getDescription(wayfinder.getLanguage()) : '';
			
				if (this.poi.shop_logo) {
					var scope = this;
					window.requestAnimationFrame(function () {
						scope.$app.getImage(scope.poi.shop_logo).then(function (image) {
							scope.logo = image.url
						})
					});
				}
			}
		},
		showPath () {
			if (this.poi) {
				var path = wayfinder.showPath(this.currentPOI.getNode(), this.currentPOI)
				wayfinder.clearHighlights();
				wayfinder.setHighlights([this.currentPOI]);
				this.pathText = wayfinder.pathToText(path);
				console.log('pathText', this.pathText)
			}
		},
		open (type) {
			if (type && this.poi[type]) {
				if (type === 'shop_email') {
					window.open('mailto:' + this.poi[type], '_system')
				}
				else if (type === 'shop_phone') {
					window.open('tel:' + this.poi[type], '_system')
				}
				else {
					window.open(this.poi[type], '_system')
				}
			}
		},
		getImage () {
			if (this.currentPOI.getBackgroundUrl())
				return 'url("' + this.currentPOI.getBackgroundUrl() + '")';
				
			else if (this.currentPOI.getIconUrl()) {
				return 'url("' + this.currentPOI.getIconUrl() + '")';
			}
			else {
				return false;
			}
		},
		isImage () {
			if(this.currentPOI.getBackgroundUrl()) return "image-background";
			else if (this.currentPOI.getIconUrl()) return "image-logo";
			else return "image-none";
		},
		truncate (str, len) {
			if (str && str.length > len) {
				return str.substring(0, len) + '...';
			}
			else {
				return str;
			}
		}
	},
	data: function () {
		return {
			poi: {},
			description: '',
			logo: '',
			show_path: 'Show Path',
			pathText: null
		}
	}
};
</script>

<style scoped lang="less">
	@import '../theme/variables';

	.path-time {
		height: 24px;
		min-width: 24px;
		line-height: 24px;
		vertical-align: middle;
		font-size: 22px;
		text-align: center;
		text-transform: initial;
		margin-top: 0.5rem;
	}

	.path-time:before {
		content: '';
		width: 22px;
		height: 22px;
		margin-right: 4px;
		margin-top: 4px;
		display: inline-block;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url('data:image/png;base64,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')
	}

	.layout-view {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.poi-info {
		padding: 1rem;
		h2 {
			text-align: center;
			margin-top: 1.5rem;
			margin-bottom: 1.5rem;
		}
	}

	.poi-body {
		box-shadow: 0px -2px 1px 0 rgba(0, 0, 0, 0.05);
		padding: 1rem;
		flex-grow: 1;

		.poi-room-id {
			margin-bottom: 0.5rem;
			font-weight: 500;
		}
	}

	.poi-image {
		height: 14rem;
		width: 100%;
		background-position: 50% 50%;
		background-size: contain;
		background-repeat: no-repeat;

		&.image-background {
			background-size: cover;
		}
	}
	
	.show-path {
		bottom: 1rem;
		right: 1rem;
		text-transform: uppercase;
		z-index: 10;
		line-height: 2.8rem;
		margin-bottom: 1.5rem;

		button {
			.action-gradient();
			height: 3rem;
			font-size: 1.2rem;
			.default-drop-shadow();
			border-radius: @corner-radius-medium;
			line-height: 2.8rem;
			padding-left: 2.5rem;
			padding-right: 2.5rem;
			margin: auto;
			border: 0;
			display: block;

			i {
				background-image: url("data:image/svg+xml,%3Csvg width='15' height='26' viewBox='0 0 15 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.98746 4.57051C7.55784 4.55304 8.03625 4.34316 8.42264 3.94088C8.80903 3.5386 8.99301 3.06638 8.97463 2.52422C8.95625 1.98195 8.74461 1.51849 8.33984 1.13379C7.93507 0.749034 7.44744 0.565392 6.87707 0.582865C6.3067 0.600337 5.82829 0.810213 5.44189 1.21249C5.0555 1.61477 4.8623 2.08699 4.8623 2.62916C4.8623 3.17132 5.07388 3.63483 5.49709 4.01959C5.9203 4.40434 6.41709 4.58798 6.98746 4.57051Z' fill='white'/%3E%3Cpath d='M13.9704 11.2079L10.9344 9.63381L8.45047 5.85604C7.97206 5.29636 7.3833 5.01654 6.6841 5.01654C6.20569 5.01654 5.74572 5.20894 5.30412 5.5937L1.55059 9.21406C1.4402 9.354 1.36662 9.5114 1.3298 9.68628L0.833008 13.7264V13.8313C0.833008 14.0762 0.925024 14.286 1.109 14.461C1.29298 14.6358 1.51378 14.7233 1.77139 14.7233C2.029 14.7233 2.24058 14.6358 2.40618 14.461C2.57178 14.286 2.67296 14.0937 2.70977 13.8838L3.09617 10.4208L4.42094 9.16159L3.20656 18.8159L1.0538 23.3808C0.980223 23.5906 0.943406 23.7826 0.943406 23.958C0.943406 24.3422 1.0814 24.6663 1.3574 24.9287C1.63339 25.191 1.9738 25.3046 2.37858 25.2697C2.93057 25.2697 3.33534 25.0243 3.59296 24.5352L5.91131 19.603C5.91131 19.5678 5.92969 19.5067 5.96651 19.4193C6.00338 19.3317 6.0402 19.253 6.07691 19.1832C6.11373 19.1132 6.13211 19.0431 6.13211 18.9734L6.4081 16.6122L8.78166 24.3778C9.03927 25.0074 9.49925 25.3047 10.1616 25.2697C10.5296 25.2697 10.8516 25.1386 11.1276 24.8762C11.4036 24.6139 11.5416 24.2897 11.5416 23.9055C11.5416 23.87 11.5324 23.8268 11.514 23.7744C11.4956 23.7219 11.4864 23.678 11.4864 23.6431L8.17447 12.8869L8.56086 9.37147L9.49925 10.7881C9.57283 10.8931 9.66484 10.9805 9.77524 11.0505L13.032 12.782C13.2528 12.8519 13.4 12.8869 13.4736 12.8869C13.7312 12.8869 13.952 12.7907 14.136 12.5983C14.3199 12.4059 14.412 12.1873 14.412 11.9425C14.412 11.6276 14.2647 11.3828 13.9704 11.2079Z' fill='white'/%3E%3C/svg%3E%0A");
			}
		}
		
	}
	
	.poi-description {
		line-height: 1.2;
		
	}

	.poi-contact .address {
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.poi-contact .address span {
		padding-top: 4px;
		vertical-align: top;
		display: inline-block;
	}

	.poi-contact .address a {
		text-decoration: none;
		display: block;
		line-height: 1.5;
	}

	.poi-contact .address .icon:before {
		mix-blend-mode: initial;
		color: white;
	}

	@media (min-height: 568px) and (max-height: 768px) and (orientation: portrait) {
		.poi-image {
			height: 8rem;
		}

		.poi-info {
			h2 {
				font-size: 1.5rem;
				margin-top: 1rem;
				margin-bottom: 1rem;
			}
		}
	}

</style>
