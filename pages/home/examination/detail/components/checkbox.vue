<template>
	<!-- 多选题 -->
	<view class="radio-wrapper">
		<view class="title">{{info.title}}</view>
		<view class="">
			<u-checkbox-group wrap @change="checkboxGroupChange">
				<view class="radio" v-for="(item, index) in info.optionsJson" :key="index">
					<u-checkbox
						class="clearfix"
						v-model="item.checked"
						:name="item.name"
						active-color="#409EFF"
					>{{item.key}}.  {{item.value}}-{{item.checked}}</u-checkbox>
				</view>
				
			</u-checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		methods: {
			checkboxGroupChange (e) {
				console.log('name', e)
				// this.$emit('next', name)
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
