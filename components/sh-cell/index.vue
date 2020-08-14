<template>
	<view class="sh-cell-wrapper">
		<view class="sh-cell-item" @tap="onClick">
			<i class="ic-left iconfont" v-if="icon" :class="icon"></i>
			<view class="sh-cell_title">
				<template v-if="titleSlot">
					<slot item="title"></slot>
				</template>
				<template v-else>
					<text>{{title}}</text>
					<text class="desc" v-if="desc">{{desc}}</text>
				</template>
			</view>
			
			<view class="sh-cell_value" v-if="value || defaultSlot" :style="{color: valueColor ? valueColor: '#999'}">
				<template v-if="defaultSlot">
					<slot item="default"></slot>
				</template>
				<template v-else>
					<text>{{value}}</text>
				</template>	
			</view>
			<view class="sh-cell_ic_right" >
				<view class="dot" v-if="dot"></view>
				<i class="iconfont iconiconfontjiantou5 ic-right" v-if="isLink" :style="{color: linkColor ||'#c7c7c7'}"></i>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ShCell',
		props: {
			// 提醒/描述
			desc: String,
			// 点击后跳转的目标路由对象
			to: String,
			// 左侧标题
			title: String,
			// 左侧图标名称或图片链接
			icon: String,
			// 右侧内容
			value: String,
			// 右侧内容颜色
			valueColor: String,
			// 是否展示右侧箭头并开启点击反馈
			isLink: {
				type: Boolean,
				default: false
			},
			// 原点提示
			dot: {
				type: Boolean,
				default: false
			},
			// 自定义左侧 title 的内容
			titleSlot: {
				type: Boolean,
				default: false
			},
			// 自定义右侧 value 的内容
			defaultSlot: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClick () {
				this.$emit('on-click')
				if (this.to) {
					uni.navigateTo({
						url: this.to
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sh-cell-wrapper {
		.sh-cell-item {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			padding: 20rpx 38rpx;
			overflow: hidden;
			color: #323233;
			font-size: 30rpx;
			line-height: 68rpx;
			// &:first-child {
			// 	border-top-left-radius: 10rpx;
			// 	border-top-right-radius: 10rpx;
			// }
			// &:last-child {
			// 	border-bottom-left-radius: 10rpx;
			// 	border-bottom-right-radius: 10rpx;
			// }
			.sh-cell_title {
				flex: 1;
				position: relative;
				.desc {
					font-size: 22rpx;
					position: absolute;
					right: -160rpx;
					top: 0rpx;
					color: #999;
				}
			}
			.ic-left {
				margin-right: 10rpx;
				display: inline-block;
				line-height: 68rpx;
				font-size: 36rpx;
				color: #999;
			}
			.sh-cell_ic_right {
				display: inline-block;
				position: relative;
				.dot {
					height: 16rpx;
					width: 16rpx;
					background-color: #ff6323;
					overflow: hidden;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 4rpx;
					transform: translateY(-50%);
				}
				.ic-right {
					line-height: 68rpx;
					display: inline-block;
					margin-left: 20rpx;
					font-size: 40rpx;
				}
			}
			.sh-cell_value {
				position: relative;
				overflow: hidden;
				color: #969799;
				text-align: right;
				vertical-align: middle;
				flex: 1;
			}
		}
	}
</style>
