<template>
	<!-- 判断题 -->
	<view class="radio-wrapper">
		<view class="title">{{info.title || ''}}</view>
		<view class="">
			<u-radio-group wrap size="40" width="100%" :disabled="disabled" v-model="defaultValue" @change="radioGroupChange">
				<view class="radio" v-for="(item, index) in info.optionsJson" :key="index">
					<u-radio
						label-size="36"
						class="clearfix "
						active-color="#409EFF"
						:name="item.key">
						{{item.value}}
					</u-radio>
				</view>
			</u-radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object,
			value: String,
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				defaultValue: ''
			}
		},
		watch: {
			value: {
				handler (newVal) {
					this.defaultValue = newVal ? (newVal === 'empty' ? '' : newVal.trim()) : ''
				},
				deep: true,
				immediate: true
			} 
		},
		methods: {
			radioGroupChange (name) {
				this.$emit('choose', name)
			},
		}
	}
</script>
<style>
	/deep/.u-radio .u-radio__label {
		width: 100%;
	}
</style>
<style scoped lang="scss">
	.radio-wrapper {
		margin-top: 20rpx;
		font-size: 32rpx;
		.title {
			font-size: 36rpx;
			margin-bottom: 30rpx;
			line-height: 1.8;
		}
		
	}
	.radio {
		margin-bottom: 50rpx;
	}
</style>
