<template>
	<view class="" @tap="onTo">
		<view class="video-item-wrapper" :style="[videoStyle]" ref="video">
			<image :src="imageUrl || 'https://cdn.uviewui.com/uview/swiper/1.jpg'" mode="scaleToFill"></image>
			<view class="play-wrapper" :class="playType === 'mini' ? 'mini-play' : ''" :style="[playStyle]"></view>
			<view class="title ellipsis" v-if="textPosition !== 'bottom'">
				{{title}}
			</view>
		</view>
		<view class="title-bottom u-line-1 ellipsis" v-if="textPosition === 'bottom'">
			{{title}}
		</view>
	</view>
	
</template>

<script>
	export default {
		props: {
			// bottom
			textPosition: {
				type: String,
				default: ''
			},
			// large mini
			playType: {
				type: String,
				default: 'large'
			},
			title: String,
			videoStyle: {
				type: Object,
				default: () => {}
			},
			imageUrl: {
				type: String,
				default: ''
			},
			id: [String, Number]
		},
		data () {
			return {
				playStyle: {}
			}
		},
		methods: {
			onTo () {
				if (this.id) {
					console.log('this.id', this.id)
					uni.navigateTo({
						url: `/pages/home/video/detail/index?id=${this.id}`
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-item-wrapper {
		position: relative;
		width: 100%;
		height: 260rpx;
		overflow: hidden;
		border-radius: 8rpx;
		image {
			width: 100%;
			height: 100%;
		}
		.play-wrapper {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			overflow: hidden;
			position: absolute;
			left: 50%;
			top: 50%;
			margin: -35rpx 0 0 -35rpx;
			background: url('#{$img-url}/play.jpg') no-repeat;
			background-size: cover;
			&.mini-play {
				width: 35rpx;
				height: 35rpx;
				margin: -17rpx 0 0 -17rpx;
			}
		}
		.title {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 6rpx 10rpx;
			background-color: rgba(255, 255, 255, .8);
			font-size: 24rpx;
			color: #333;
		}
	}
	.title-bottom {
		font-size: 24rpx;
		margin-top: 6rpx;
		color: #333;
		// text-overflow: -o-ellipsis-lastline;
		// overflow: hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 2;
		// line-clamp: 2;
		// -webkit-box-orient: vertical;
	}
</style>
