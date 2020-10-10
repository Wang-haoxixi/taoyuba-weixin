<template>
	<!-- 单选题 -->
	<view class="radio-wrapper">
		<view class="title">{{info.title}}</view>
		<view class="">
			<u-form ref="uForm">
				<u-form-item>
					<u-radio-group wrap :disabled="disabled" v-model="defaultValue" @change="radioGroupChange">
						<view class="radio" v-for="(item, index) in info.optionsJson" :key="index">
							<u-radio
								class="clearfix "
								active-color="#409EFF"
								:name="item.key">
								{{item.key}}.  {{item.value}}
							</u-radio>
						</view>
					</u-radio-group>
				</u-form-item>
			</u-form>
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
					this.defaultValue = newVal ? newVal.trim() : ''
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

<style scoped lang="scss">
	.radio-wrapper {
		margin-top: 20rpx;
		font-size: 32rpx;
		.title {
			margin-bottom: 30rpx;
		}
		
	}
	.radio {
		margin-bottom: 20rpx;
	}
</style>
