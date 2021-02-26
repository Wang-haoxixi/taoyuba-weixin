<template>
	<view class="lifesaving-wrapper">
		<!-- 船员配置 -->
	</view>
</template>

<script>
	import componentChoose from './choose.vue'
	import validateMixin from './validate.js'
	import constText from './text.js'
	export default {
		mixins: [validateMixin],
		components: {
			componentChoose
		},
		data () {
			return {
				constText,
				form: {
					lifeRaftResult: '', // 救生筏
					lifeRaftImage: ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lifesaving-wrapper {
		padding-bottom: 150rpx;
		.title {
			font-size: 34rpx;
			color: #333;
			font-weight: 700;
		}
		.item-wrapper {
			padding: 30rpx 0;
			&:first-child {
				padding-top: 0;
			}
			border-bottom: 1px solid #f6f6f6;
			&:last-child {
				border-bottom: none;
			}
		}
	}
	
</style>
