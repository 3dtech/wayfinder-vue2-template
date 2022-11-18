<template>
	<div class="banner-set" ref="frames" v-observe-visibility="visibilityChanged">
		<div class="frame" v-for="(frame, index) in frames" :key="frame.id" :class="{ active: index == current }">
			<div class="container" v-for="container in frame.containers" :key="container.id" @click="onClick(frame, container)" :style="{
				left: container.left + '%',
				top: container.top + '%',
				width: container.width + '%',
				height: container.height + '%',
				backgroundImage: 'url(\'' + getUrl(container) + '\')'
			}">
				<video width="100%" height="auto" :src="getUrl(container)" v-if="isVideo(container)" muted></video>'
			</div>
		</div>
	</div>
</template>

<script>
/* global WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'Banner',
	props: {
		template: String,
		container: String
	},
	computed: {//yahLogo
		...mapState(['banners'])
	},
	data () {
		return {
			frames: [],
			current: 0,
			timer: null,
			fadeDuration: 500,
			backgroundColor: "#fff",
			visible: false
		}
	},
	watch: {
		banners () {
			let now = Date.now();
			if (this.template && this.container && this.banners['template-' + this.template] && this.banners['template-' + this.template][this.container]) {
				this.frames = this.banners['template-' + this.template][this.container].filter((frame) => {
					let enabled = frame.enabled;
					
					if (enabled && frame.from_date) {
						enabled = enabled && (new Date(frame.from_date)).getTime() <= now;
					}

					if (enabled && frame.to_date) {
						enabled = enabled && (new Date(frame.to_date)).getTime() >= now;
					}
					return enabled;
				});

				this.$emit('hasbanners', (this.frames.length > 0));
				
				setTimeout(() => {
					if (this.visible) {
						this.play();
					}
				}, 500);
			}
		}
	},
	methods: {
		visibilityChanged (visible) {
			this.visible = visible;
			if (visible) {
				this.play();
			}
			else {
				this.stop();
			}
		},
		play () {
			if (this.current >= this.frames.length) {
				return;
			}
				
			let frame = this.frames[this.current];

			if (this.frames.length > 1) {
				this.next();
			}

			if (this.timer) {
				clearTimeout(this.timer);
			}

			if(this.$refs['frames']) {
				let video = this.$refs['frames'].querySelector('video');
				if (video && video.readyState) {
					setTimeout(() => {
						this.playVideo(video, frame.duration);
					}, 0);
				} else {
					this.timer = setTimeout(this.play, frame.duration);
				}
			}
		},

		playVideo (video, duration) {
			video.pause();
			video.currentTime = 0;
			var playPromise = video.play();
			playPromise.catch((err) => {
				clearTimeout(this.timer);
				setTimeout(() => {
					this.playVideo(video, duration);
				}, 300);
			});
			this.timer = setTimeout(this.play, duration);
		},

		stop () {
			if (this.timer) {
				clearTimeout(this.timer);
			}
		},

		next () {
			if (this.current < this.frames.length - 1) {
				this.current++;
			}
			else {
				this.current = 0;
			}
		},

		onClick (frame, container) {
			this.$emit('clicked', frame, container);
		},

		isImage (container) {
			return !(container.type && container.type.substr(0, 5) === 'video');
		},

		isVideo (container) {
			return container.type && container.type.substr(0, 5) === 'video';
		},

		getUrl (container) {
			return WayfinderAPI.advertisements.data.url(container.advertisement_id);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.banner-set {
		position: relative; 
		width: 100%; 
		height: 100%;

		.frame {
			width: 100%;
			height: 100%;
			position: absolute;
			background-size: cover;
			background-position: 50% 50%;
			background-repeat: no-repeat;
			left: 0%; 
			top: 0%; 
			width: 100%; 
			height: 100%;
			opacity: 0;
			transition: opacity 0.5s ease-in-out;

			.container {
				background-size: cover;
				background-position: 50% 50%;
				background-repeat: no-repeat;
			}

			&.active {
				opacity: 1;
				transition: opacity 0.5s ease-in-out;
			}

			video {
				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
</style>
