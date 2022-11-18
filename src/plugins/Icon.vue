<template>
    <svg class="icon" :class='["icon-"+ this.name]' width="100" height="100" viewbox="0 0 32 32">
        <use :xlink:href="iconName" style="{'--color1': 'yellow'}"></use>
    </svg>
</template>
<script>
//import Icons from '../assets/icons.svg';
export default {
    props: ["name", "width", "height"],
    computed: {
		iconName () {
            return "#icon-" + this.name;
        }
    }
}
</script>
<style scoped>
    svg {
        height: 1rem;
        width: auto;
        display: inline-block;
    }
</style>