<template>
	<!-- 通知栏 -->
	<view @tap="onClick" class="sh-notice-bar" :class="wrapable ? 'sh-notice-bar_wrapable' : ''" :style="{color: color || '#ed6a0c', background: background || '#fffbe8'}">
		<i class="iconfont sh-notice-bar_ic-left" v-if="leftIcon" :class="leftIcon ? leftIcon : ''" :style="{color: leftColor || '#ed6a0c'}"></i>
		<view class="sh-notice-bar_wrap">
			<view class="sh-notice-bar_content" :class="wrapable ? '' : 'sh-ellipsis'">
				{{text}}
			</view>
		</view>
		<i @tap="onClose" class="sh-notice-bar_ic-right iconfont" v-if="mode" :style="{'color': rightColor || '#ed6a0c'}" :class="mode === 'link' ? 'iconiconfontjiantou5' : (mode === 'closeable' ? 'iconGroup-' : '')"></i>
	</view>
</template>

<script>
	export default {
		name: 'ShNoticeBar',
		props: {
			text: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			background: {
				type: String,
				default: ''
			},
			leftColor: {
				type: String,
				default: ''
			},
			// 垂直展示
			wrapable: {
				type: Boolean,
				default: false
			},
			// 滚动
			scrollable: {
				type: Boolean,
				default: false
			},
			// 通知栏模式，可选值为 closeable link
			mode: {
				type: String,
				default: ''
			},
			// 左图标
			leftIcon: {
				type: String,
				default: ''
			},
			rightColor: {
				type: String,
				default: ''
			}
		},
		methods: {
			onClick () {
				this.$emit('on-click')
			},
			onClose () {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sh-notice-bar {
		position: relative;
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 0 32rpx;
		color: #ed6a0c;
		font-size: 28rpx;
		line-height: 48rpx;
		background-color: #fffbe8;
		&.sh-notice-bar_wrapable {
			height: auto;
			padding: 16rpx 32rpx;
			.sh-notice-bar_wrap .sh-notice-bar_content {
				white-space: normal;
			}
		}
		.sh-notice-bar_ic-left {
			position: relative;
			display: inline-block;
			margin-right: 15rpx;
		}
		.sh-notice-bar_wrap {
			position: relative;
			display: flex;
			flex: 1;
			align-items: center;
			height: 100%;
			overflow: hidden;
			.sh-notice-bar_content {
				white-space: nowrap;
			}
		}
		.sh-ellipsis {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			max-width: 100%;
		}
		.sh-notice-bar_ic-right {
			text-align: right;
			cursor: pointer;
			display: inline-block;
			min-width: 28rpx;
			font-size: 32rpx;
		}
	}
</style>
