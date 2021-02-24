<template>
	<view class="info-wrapper">
		<u-form ref="uForm" label-width="150">
			<u-form-item label="船名号:"><u-input v-model="form.shipName" disabled/></u-form-item>
			<u-form-item label="排查单位:"><u-input v-model="form.shipName" disabled/></u-form-item>
			<u-form-item label="排查人员:"><u-input v-model="form.shipName" disabled placeholder=" "/></u-form-item>
			<u-form-item label="排查地点:"><u-input v-model="form.shipName" placeholder=" "/></u-form-item>
		</u-form>
		<view class="btn-next">
			<u-button @click="onNext">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				form: {
					shipName: '',
				}
			}
		},
		methods: {
			onNext () {
				this.$emit('next', 1)
			},
		}
	}
</script>

<style scoped lang="scss">
	.btn-next {
		margin-top: 20rpx;
	}
</style>
