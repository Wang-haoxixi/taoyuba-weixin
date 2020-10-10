<template>
	<!-- 判断题 -->
	<view class="radio-wrapper">
		<view class="title">{{info.title}}</view>
		<view class="">
			<u-radio-group wrap v-model="defaultValue" @change="radioGroupChange">
				<view class="radio" v-for="(item, index) in info.optionsJson" :key="index">
					<u-radio
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
			value: String
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
