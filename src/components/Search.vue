<template>
	<div class="search">
		<div class="tab-button close" @click="close($event)" data-translation-element="close">Close</div>
		<div class="search-container">
			<WFSearch :limit="10" @clicked="onClick" ref="search" :showKeyboard="showKeyboard"/>
		</div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';
import { WFSearch } from '@3dwayfinder/wayfinder-vue-components'

export default {
	name: 'Search',
	components: {
		WFSearch
	},
	props: {
		showKeyboard: Boolean
	},
	computed: {
		...mapState('wf', ['language', 'reset']),
	},
	data () {
		return {
			results: [],
			poi: {},
			currentPOI: false,
			keyboard: false
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.$refs.search.addLayout("et", {
				'name': "Estonian",
				'local_name': "Eesti",
				'lang': "et",
				'keys': {
					"default": [
						["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "\u00FC", "\u00F5"],
						["a", "s", "d", "f", "g", "h", "j", "k", "l", "\u00F6", "\u00E4"],
						["z", "x", "c", "v", "b", "n", "m", {'key': "&#171;", 'action': ["backspace"], cls: "delete"}],
						[{"key": " ", "cls": "key_spacebar"}]
						]
				}
			});

			this.$refs.search.addLayout('ar', {
				"name": "Arabic",
				"keyboard": "Arabic",
				"local_name": "Arabic",
				"lang": "ar",
				"keys": {
					"default": [
						["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", {
							"key": "&#171; Bksp",
							"action": ["backspace"],
							"cls": "key3x"
						}],
						["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
						["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط", {
							"key": "Enter",
							"action": ["submit"],
							"cls": "key3x"
						}],
						["ئ", "ء", "ر", "ل", "ى", "ة", "و", "ز", "ظ"],
						[{
							"key": " ",
							"cls": "key_spacebar"
						}]
					]
				}
			});

		this.$refs.search.addLayout('ru', {
			"name": "Russian",
			"local_name": "Русский",
			"lang": "ru",
			"keys": {
				"default": [
					["\u0439", "\u0446", "\u0443", "\u043A", "\u0435", "\u043D", "\u0433", "\u0448", "\u0449", "\u0437", "\u0445", "\u044A"],
					["\u0444", "\u044B", "\u0432", "\u0430", "\u043F", "\u0440", "\u043E", "\u043B", "\u0434", "\u0436", "\u044D"],
					["\u044F", "\u0447", "\u0441", "\u043C", "\u0438", "\u0442", "\u044C", "\u0431", "\u044E", {'key': "&#171;", 'action': ["backspace"], cls: "delete"}],
					[{"key": " ", "cls": "key_spacebar"}]
					],
				}
			});
		});
	},
	watch: {
		searchVisible (current) {
		},
		reset () {
			this.$refs.search.resetValues();
		},
		language (lang) {
		}
	},
	methods: {
		onClick (poi) {
			this.$emit('clicked', poi);
			this.$store.dispatch('SHOW_SEARCH', false);
		},
		close () {
			this.$store.dispatch('SHOW_SEARCH', false);
			this.$emit('close');
			this.resetValues();
		},
		resetValues () {
			this.$refs.search.resetValues();
		}
	}
};
</script>

<style lang="less">
	@import '../theme/variables';

	.search {
		background-color: @search-background;
		overflow: hidden;
		backdrop-filter: blur(4px);

		.close {
			position: absolute;
			top: 0rem !important;
			right: 0.5rem;
			width: 10rem;
			background-color: rgba(255, 255, 255, 0.85);
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' enable-background='new 0 0 20 20' viewBox='0 0 20 20' y='0px' x='0px' id='Cross' version='1.1'%3E%3Cmetadata id='metadata9'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs7'%3E%3ClinearGradient spreadMethod='pad' gradientUnits='userSpaceOnUse' y2='29.3118' x2='11.0536' y1='16.0077' x1='24.5509' id='paint1_linear' gradientTransform='translate(-6.9097825,12.894087)'%3E%3Cstop id='stop16' stop-color='%23FF4C54' /%3E%3Cstop id='stop18' stop-color='%23BE3F45' offset='1' /%3E%3C/linearGradient%3E%3ClinearGradient gradientUnits='userSpaceOnUse' y2='34.9828' x2='34.294201' y1='14.605' x1='13.6189' id='paint0_linear'%3E%3Cstop id='stop11' stop-color='%23FF4C54' /%3E%3Cstop id='stop13' stop-color='%23BE3F45' offset='1' /%3E%3C/linearGradient%3E%3ClinearGradient gradientTransform='matrix(1.9229845,0,0,1.9229845,-9.2288833,-9.2308069)' gradientUnits='userSpaceOnUse' y2='14.322534' x2='6.3946652' y1='7.6276183' x1='12.290775' id='linearGradient4161' xlink:href='%23paint0_linear' /%3E%3C/defs%3E%3Cpath style='fill:url(%23linearGradient4161);fill-opacity:1' id='path3' d='m 18.362098,19.32359 c -0.90188,0.90188 -2.363348,0.90188 -3.263305,0 l -5.097832,-5.826643 -5.0978311,5.82472 c -0.9018797,0.90188 -2.3633479,0.90188 -3.2633047,0 -0.90187984,-0.90188 -0.90187984,-2.363347 0,-3.263304 L 6.9434164,10.000961 1.6379022,3.9397144 c -0.90187974,-0.9018798 -0.90187974,-2.361425 0,-3.26330476 0.9018798,-0.9018797 2.3614249,-0.9018797 3.2633048,0 l 5.099754,5.82856596 5.097832,-5.82856596 c 0.90188,-0.9018797 2.361425,-0.9018797 3.263305,0 0.901879,0.90187976 0.901879,2.36334796 0,3.26330476 l -5.30359,6.0612466 5.30359,6.057402 c 0.901879,0.90188 0.901879,2.363347 0,3.265227 z' /%3E%3C/svg%3E");
		}

		.wf-search-no-results-text {
			display: none;
		}

		.wf-search-results {
			margin-bottom: 1rem;
			margin-top: 4rem;
			overflow: hidden;

			.wf-list-item {
				background-color: fade(@main-background, 80%);
			}
		}

		.search-container {
			width: 54rem;
			margin: auto;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			height: 100%;
		}

		.wf-search-input-container {
			margin-bottom: 1rem;

			input {
				margin: auto;
				display: block;
				padding: 1rem;
				font-size: 2rem;
				font-weight: 600;
				width: 100%;
				border: 1px solid @highlight-color-dark;
				background-color: @highlight-color;
				color: @highlight-font-color;
				border-radius: @corner-radius-small;
				outline: none;
				background-position: calc(100% - 1rem) 50%;
				background-repeat: no-repeat;
				background-size: 2rem;
				background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 512 512'%3E%3Cpath style='fill:%23ffffff' id='path4' d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' /%3E%3C/svg%3E");
			}			
		}
	}

	.keyboard {
		user-select: none;
		display: flex;
		flex-direction: column;
		margin-bottom: 4rem;
		height: 4.5rem * 5;
		flex-shrink: 0;
	}

	.keyboard-row {
		margin: auto;
		display: flex;
	}

	.keyboard-key {
		text-align: center;
		width: 4rem;
		height: 4rem;
		font-size: 1.8rem;
		line-height: 4rem !important;
		overflow: hidden;
		user-select: none;
		border-radius: @corner-radius-small;
		.default-drop-shadow();
		.keyboard-gradient();
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		&:last-child {
			margin-right: 0;
		}
		&:active {
			background-color: @tertiary-color;
		}
	}

	.keyboard-key-active {
		
	}

	.keyboard-key-pressed {
	}

	.keyboard-key2x {
		width: 8rem;
	}

	.keyboard-key3x {
		width: 12rem;
	}

	.keyboard-key_spacebar {
		width: 24rem;
	}

	@media @portrait {
		.close {
			bottom: 23rem;
			top: initial !important;
		}
	}
</style>
