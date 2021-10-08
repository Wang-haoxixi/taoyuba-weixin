<template>
	<u-button :ripple="true" :custom-style="customStyleC" :hair-line="false" @click="tap($event)" :disabled="disabled">
		<slot></slot>
	</u-button>
</template>

<script>
	export default {
		name: "hiButton",
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			// 按钮是否镂空
			plain: {
				type: Boolean,
				default: false
			},
			// 圆角矩形 square   半圆 circle
			shape: {
				type: String,
				default: 'square'
			},
			width: {
				type: Number,
				default: 686
			},
			height: {
				type: Number,
				default: 92
			},
			customStyle: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		watch: {
			disabled(val) {
				if (val === true) {
					this.initCustomStyle.backgroundColor = '#CECECE'
				} else {
					if (this.plain) {
						this.initCustomStyle.backgroundColor = '#FFFFFF'
					} else {
						this.initCustomStyle.backgroundColor = '#415BFD'
					}
				}
			}
		},
		data() {
			return {
				initCustomStyle: {
					height: this.height + 'rpx',
					backgroundColor: '#415BFD',
					color: '#FFFFFF',
					border: 'none',
					borderRadius: '10rpx',
					fontSize: '28rpx',
					lineHeight: this.height + 'rpx',
					width: this.width + 'rpx'
				}
			};
		},
		computed: {
			customStyleC() {
				return {
					...this.initCustomStyle,
					...this.customStyle
				}
			}
		},
		methods: {
			tap(e) {
				this.$emit('tap', e);
			},
		},
		created() {
			if (this.plain) {
				this.initCustomStyle.backgroundColor = '#FFFFFF';
				this.initCustomStyle.color = '#415BFD';
				this.initCustomStyle.border = '1px #415BFD solid';
			} else {
				this.initCustomStyle.backgroundColor = '#415BFD';
				this.initCustomStyle.color = '#FFFFFF';
			}
			if (this.shape === 'square') {
				this.initCustomStyle.borderRadius = '10rpx';
			} else if (this.shape === 'circle') {
				this.initCustomStyle.borderRadius = '64rpx';
			}
			if (this.disabled === true) {
				this.initCustomStyle.backgroundColor = '#CECECE'
			} else {
				if (this.plain) {
					this.initCustomStyle.backgroundColor = '#FFFFFF';
				} else {
					this.initCustomStyle.backgroundColor = '#415BFD'
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
