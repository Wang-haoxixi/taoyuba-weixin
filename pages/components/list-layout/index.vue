<template>
	<view class="list-layout-container">
		<template v-if="loading">
			<view class="loading-img-wrapper">
				<image class="loading-img" :src="`${imgApi}/loading.jpg`" mode="scaleToFill"></image>
			</view>
		</template>
		<template v-else>
			<template v-if="data.length">
				<slot></slot>
			</template>
			<template v-else>
				<view class="empty-container">
					<u-empty :text="emptyText" :mode="mode"></u-empty>
				</view>
			</template>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			loading: {
				type: Boolean,
				default: false
			},
			emptyText: {
				type: String,
				default: '数据为空'
			},
			mode: {
				type: String,
				default: 'list'
			},
			data: Array
		},
		data () {
			return {
				imgApi: this.$IMAGE_URL
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-layout-container {
		.empty-container {
			padding-top: 100rpx;
		}
		.loading-img-wrapper {
			position: fixed;
			background-color: #fff;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 100;
			.loading-img {
				position: absolute;
				width: 400rpx;
				height: 400rpx;
				overflow: hidden;
				top: 50%;
				left: 50%;
				margin-left: -200rpx;
				margin-top: -300rpx;
			}
		}
	}
</style>
