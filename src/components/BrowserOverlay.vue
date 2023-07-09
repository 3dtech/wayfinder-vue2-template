<template>
    <div class="overlay-window">
        <div class="overlay__frame">
            <WFBrowser :src="url" :resetPage="false"/>
            <div class="tab-button close" data-translation-element="close"  @click="close()">Close</div>
        </div>
    </div>
</template>

<script>
    import { WFBrowser } from '@3dwayfinder/wayfinder-vue-components'

    /* global WayfinderAPI */
	export default {
		name: "overlay",
        components: {
		    WFBrowser,
        },
		props: {
            url: String,
            imageId: Number
        },
        data: () => ({
            newUrl: false
        }),
		methods: {
			close () {
                console.log('close')
				this.$emit('close');
            },
            urlFromId () {
                console.log('WayfinderAPI', !!WayfinderAPI.PROJECT, this.imageId)
                if (WayfinderAPI.PROJECT) {
                    console.log('url',  WayfinderAPI.getURL("images", "get", [this.imageId]))
                    this.newUrl = WayfinderAPI.getURL("images", "get", [this.imageId]);
                }
                else {
                    this.newUrl = "";
                }
            }
            
        },
        mounted () {
            this.urlFromId();
        },
        watch: {
            imageId (newValue, oldValue) {
                this.urlFromId();
            } 
        },
	}
</script>

<style lang="less" scoped>
    @import '../theme/variables';

    .wf-browser {
        pointer-events: none;
    }
    .overlay-window {
        background-color: @search-background;
        user-select: none;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 10;
        flex-direction: column;
        overflow: hidden;
        top: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        align-items: center;
        display: flex;
        justify-content: center;
        transition: top 0.3s ease;

        .overlay__frame {
            height: 100%;
            width: 100%;
            margin: auto;
            margin-top: 12.5%;
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            

            img {
                user-select: none;
                height: auto;
            }

            .close {
                position: absolute;
				margin-right: 0.5rem;
				width: 12rem;
                height: 9rem;
                text-align: center;
				background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' enable-background='new 0 0 20 20' viewBox='0 0 20 20' y='0px' x='0px' id='Cross' version='1.1'%3E%3Cmetadata id='metadata9'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs7'%3E%3ClinearGradient spreadMethod='pad' gradientUnits='userSpaceOnUse' y2='29.3118' x2='11.0536' y1='16.0077' x1='24.5509' id='paint1_linear' gradientTransform='translate(-6.9097825,12.894087)'%3E%3Cstop id='stop16' stop-color='%23FF4C54' /%3E%3Cstop id='stop18' stop-color='%23BE3F45' offset='1' /%3E%3C/linearGradient%3E%3ClinearGradient gradientUnits='userSpaceOnUse' y2='34.9828' x2='34.294201' y1='14.605' x1='13.6189' id='paint0_linear'%3E%3Cstop id='stop11' stop-color='%23FF4C54' /%3E%3Cstop id='stop13' stop-color='%23BE3F45' offset='1' /%3E%3C/linearGradient%3E%3ClinearGradient gradientTransform='matrix(1.9229845,0,0,1.9229845,-9.2288833,-9.2308069)' gradientUnits='userSpaceOnUse' y2='14.322534' x2='6.3946652' y1='7.6276183' x1='12.290775' id='linearGradient4161' xlink:href='%23paint0_linear' /%3E%3C/defs%3E%3Cpath style='fill:url(%23linearGradient4161);fill-opacity:1' id='path3' d='m 18.362098,19.32359 c -0.90188,0.90188 -2.363348,0.90188 -3.263305,0 l -5.097832,-5.826643 -5.0978311,5.82472 c -0.9018797,0.90188 -2.3633479,0.90188 -3.2633047,0 -0.90187984,-0.90188 -0.90187984,-2.363347 0,-3.263304 L 6.9434164,10.000961 1.6379022,3.9397144 c -0.90187974,-0.9018798 -0.90187974,-2.361425 0,-3.26330476 0.9018798,-0.9018797 2.3614249,-0.9018797 3.2633048,0 l 5.099754,5.82856596 5.097832,-5.82856596 c 0.90188,-0.9018797 2.361425,-0.9018797 3.263305,0 0.901879,0.90187976 0.901879,2.36334796 0,3.26330476 l -5.30359,6.0612466 5.30359,6.057402 c 0.901879,0.90188 0.901879,2.363347 0,3.265227 z' /%3E%3C/svg%3E");
			}
        }

        &.active {
        	top: 0;
        }
    }

    @media @portrait {
        .overlay__frame {
            height: 100% !important;
            margin-top: auto !important;

            img {
                user-select: none;
                width: 100%;
                height: auto !important;
            }

            .close {
                //position: relative !important;
                top: 2rem !important;
                right: 1.2rem;
            }
        }
    }
</style>
