<template>
	<div class="tab-buttons">
		<div class="tab-button tab-topics" :class="{active: (currentTab == 'groups' || currentTab == 'group-pois')}" data-translation-element="topics" @click="switchTab('groups')">Topics</div>
		<div class="tab-button tab-az" :class="{active: currentTab == 'az'}" data-translation-element="az" @click="switchTab('az')">A-z</div>
		<div class="tab-button tab-search" :class="{active: currentTab == 'search'}" data-translation-element="search" @click="switchTab('search')">Search</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Tabs',
	computed: {
		...mapState([ 'searchVisible'])
	},
	props: {
		currentTab: String,
	},
	methods: {
		switchTab (tab) {
			this.$emit('switchTab', tab);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../theme/variables';
.tab-buttons {
	display: flex;
	align-content: stretch;
	justify-content: space-between;

	.tab-button {
		background-size: auto 30%;
		background-repeat: no-repeat;
		background-color: @main-background;

		&.active, &:active {
			background-color: @tertiary-color;
		}
	}

	.tab-topics {
		background-image: url("data:image/svg+xml,%3Csvg width='50' height='33' viewBox='0 0 50 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.253906' y='0.746338' width='49.378' height='5.06879' fill='url(%23paint0_linear)'/%3E%3Crect x='0.253906' y='14.263' width='49.378' height='5.06879' fill='url(%23paint1_linear)'/%3E%3Crect x='0.253906' y='27.78' width='49.378' height='5.06879' fill='url(%23paint2_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='24.9429' y1='0.746338' x2='24.9429' y2='5.81513' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFDD65'/%3E%3Cstop offset='1' stop-color='%23FF9900'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='24.9429' y1='14.263' x2='24.9429' y2='19.3318' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFDD65'/%3E%3Cstop offset='1' stop-color='%23FF9900'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear' x1='24.9429' y1='27.78' x2='24.9429' y2='32.8488' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFDD65'/%3E%3Cstop offset='1' stop-color='%23FF9900'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	}

	.tab-az {
		background-image: url("data:image/svg+xml,%3Csvg width='48' height='33' viewBox='0 0 48 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='4.32889' cy='4.56804' rx='3.78299' ry='3.82171' fill='url(%23paint0_linear)'/%3E%3Cellipse cx='4.3284' cy='16.7976' rx='3.78299' ry='3.82171' fill='url(%23paint1_linear)'/%3E%3Cellipse cx='4.3284' cy='29.0271' rx='3.78299' ry='3.82171' fill='url(%23paint2_linear)'/%3E%3Crect x='10.3813' y='2.27499' width='37.0733' height='4.58605' fill='url(%23paint3_linear)'/%3E%3Crect x='10.3813' y='14.5045' width='37.0733' height='4.58605' fill='url(%23paint4_linear)'/%3E%3Crect x='10.3813' y='26.734' width='37.0733' height='4.58605' fill='url(%23paint5_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='4.32889' y1='0.746338' x2='4.32889' y2='8.38975' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='4.3284' y1='12.9759' x2='4.3284' y2='20.6193' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear' x1='4.3284' y1='25.2054' x2='4.3284' y2='32.8488' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear' x1='28.918' y1='2.27499' x2='28.918' y2='6.86104' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear' x1='28.918' y1='14.5045' x2='28.918' y2='19.0905' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear' x1='28.918' y1='26.734' x2='28.918' y2='31.32' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	}

	.tab-search {
		background-image: url("data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.4163 24.9709C19.2339 24.9709 24.7607 19.4431 24.7607 12.624C24.7607 5.80493 19.2339 0.276855 12.4163 0.276855C5.59863 0.276855 0.0717773 5.80493 0.0717773 12.624C0.0717773 19.4431 5.59863 24.9709 12.4163 24.9709ZM12.4163 22.5017C17.8706 22.5017 22.292 18.0793 22.292 12.624C22.292 7.1687 17.8706 2.74634 12.4163 2.74634C6.96216 2.74634 2.54077 7.1687 2.54077 12.624C2.54077 18.0793 6.96216 22.5017 12.4163 22.5017Z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M19.8228 23.5245L23.3143 20.0322L35.5347 32.2551C36.4989 33.2195 36.4989 34.7831 35.5347 35.7474C34.5706 36.7118 33.0073 36.7118 32.0432 35.7474L19.8228 23.5245Z' fill='url(%23paint1_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='12.4163' y1='0.276855' x2='12.4163' y2='24.971' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D67FFE'/%3E%3Cstop offset='1' stop-color='%23AC92F7'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='21.5685' y1='21.7783' x2='35.5376' y2='35.7445' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D67FFE'/%3E%3Cstop offset='1' stop-color='%23AC92F7'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	}

}
</style>
