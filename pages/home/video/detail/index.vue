<template>
	<view class="video-detail-wrapper">
		<view class="video-detail-content">
			<video src="https://ggkkmuup9wuugp6ep8d.exp.bcevod.com/mda-kghrj4j2yi38z6yt/navideo720/mda-kghrj4j2yi38z6yt.mp4"></video>
		</view>
		
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.video-detail-wrapper {
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		/* #endif */
		.video-detail-content {
			video {
				width: 100%;
			}
		}
	}
</style>
