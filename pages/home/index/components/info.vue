<template>
	<view class="info-wrapper">
		<home-container>
			<view class="title" slot="header">在线测试</view>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	export default {
		components: {
			homeContainer
		},
		data () {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.info-wrapper {
		.title {
			padding: 0 50rpx;
			line-height: 80rpx;
			color: #fff;
		}
	}
</style>
