<template>
	<!-- 多选题 -->
	<view class="radio-wrapper">
		<view class="title">{{data.title}}</view>
		<view class="">
			<u-checkbox-group :disabled="disabled" wrap @change="checkboxGroupChange">
				<view class="radio" v-for="(item, index) in data.optionsJson" :key="index">
					<u-checkbox
						class="clearfix"
						v-model="item.checked"
						:name="item.key"
						active-color="#409EFF"
					>{{item.key}}.  {{item.value}}-{{item.checked}}</u-checkbox>
				</view>
			</u-checkbox-group>
		</view>
	</view>
</template>

<script>
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		props: {
			info: Object,
			value: [String, Array],
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				data: {}
			}
		},
		watch: {
			info: {
				handler (newVal) {
					console.log('checkbox newVal', this.value)
					let data =  cloneDeep(newVal)
					data.optionsJson.forEach(item => {
						if (Array.isArray(this.value)) {
							if (this.value.includes(item.key)) {
								item.checked = true
							}
						} else {
							item.checked = false
						}
					})
					this.data = data
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			checkboxGroupChange (e) {
				this.$emit('choose', e)
			}
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
