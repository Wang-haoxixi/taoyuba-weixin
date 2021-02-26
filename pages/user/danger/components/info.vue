<template>
	<view class="info-wrapper">
		<u-form ref="uForm" label-width="150">
			<u-form-item label="船名号:"><u-input v-model="form.shipName" disabled placeholder="船名号"/></u-form-item>
			<u-form-item label="排查单位:"><u-input v-model="form.enterprise" disabled placeholder="排查单位"/></u-form-item>
			<u-form-item label="排查人员:"><u-input v-model="form.registrant" disabled placeholder="排查人员"/></u-form-item>
			<u-form-item label="排查地点:"><u-input v-model="form.address" placeholder="排查地点"/></u-form-item>
		</u-form>
		<!-- <view class="btn-next">
			<u-button @click="onNext">下一步</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			shipInfo: Object
		},
		data () {
			return {
				form: {
					shipName: '',
					address: '',
					registrant: '',
					enterprise: '',
					shipNo: ''
				}
			}
		},
		watch: {
			shipInfo: {
				handler (newVal) {
					this.form.shipName = newVal.shipName
					this.form.shipNo = newVal.shipNo
				},
				deep: true,
				immediate: true
			}
		},
		mounted () {
			this.init()
		},
		methods: {
			init () {
				let userInfo = this.$cache.get('userInfo')
				this.form.registrant = userInfo.realName
				this.form.enterprise = userInfo.realName
			},
			onValidate () {
				if (!this.form.address) {
					this.$emit('validate', '排查地点不能为空')
					return false
				}
				return true
			},
			onNext () {
				this.$emit('next', 1)
			},
		}
	}
</script>

<style scoped lang="scss">
	.info-wrapper {
		padding-bottom: 150rpx;
	}
	.btn-next {
		margin-top: 20rpx;
	}
</style>
