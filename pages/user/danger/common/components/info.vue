<template>
	<view class="info-wrapper">
		<u-form ref="uForm" label-width="150">
			<u-form-item label="船名号:"><u-input v-model="form.shipName" disabled placeholder="船名号"/></u-form-item>
			<u-form-item label="排查单位:"><u-input v-model="form.enterprise" disabled placeholder="排查单位"/></u-form-item>
			<u-form-item label="排查人员:"><u-input v-model="form.registrant" disabled placeholder="排查人员"/></u-form-item>
			<u-form-item label="排查地点:"><u-input v-model="form.address" placeholder="排查地点"/></u-form-item>
		</u-form>
		<view class="history-wrapper" v-show="showHistory">
			<view class="history-title">历史记录</view>
			<view class="text">船名号：{{historyData.shipName}}</view>
			<view class="text">排查单位：{{historyData.enterprise}}</view>
			<view class="text">排查人员：{{historyData.registrant}}</view>
			<view class="text">排查时间：{{historyData.updateTime}}</view>
			<view class="text">排查地点：{{historyData.address}}</view>
		</view>
		<!-- <view class="btn-next">
			<u-button @click="onNext">下一步</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			shipInfo: Object,
			historyData: Object
		},
		data () {
			return {
				showHistory: false,
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
			historyData: {
				handler (newVal) {
					if (newVal && Object.keys(newVal).length > 0) {
						this.showHistory = true
					}
				},
				deep: true
			},
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
		.history-wrapper {
			margin-top: 20rpx;
			padding: 30rpx 30rpx;
			border: 1px solid #f6f6f6;
			background-color: #f6f6f6;
			overflow: hidden;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: #333;
			.history-title {
				margin-bottom: 20rpx;
				color: #666;
				font-weight: 700;
			}
			.text {
				margin-bottom: 15px;
			}
		}
		.btn-next {
			margin-top: 20rpx;
		}
	}
	
</style>
