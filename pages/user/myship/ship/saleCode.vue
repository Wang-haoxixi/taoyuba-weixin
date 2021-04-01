<template>
	<view class="sales-code">
		<canvas canvas-id="qrcode" style="width: 354px;height: 354px;" />
	</view>
</template>

<script>
	import uQRCode from '@/common/utils/uqrcode.js'
	export default {
		components: {
		},
		mixins: [ ],
		data () {
			return {
			}
		},
		onLoad (option) {
			this.qr()
		},
		methods: {
			qr () {
				  uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.$API_URL,
					size: 354,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					success: res => {
					  console.log(res)
					}
				  })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sales-boss {
		background: white;
		padding: 30rpx;
	}
	.sumbit-button {
		margin-top: 30rpx;
	}
</style>
