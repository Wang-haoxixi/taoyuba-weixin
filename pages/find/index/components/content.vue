<template>
	<view class="content-container">
		<view class="title">证书查询</view>
		<view class="">
			<u-form :model="form" ref="uForm" label-width="100" :label-style="{color: '#999'}" :border-bottom="false">
				<u-form-item label="姓名" required prop="phone">
					<u-input v-model="form.realName" border trim placeholder="请输入姓名"/>
				</u-form-item>
				<u-form-item label="身份证" required prop="phone">
					<u-input v-model="form.idcard" border trim placeholder="请输入身份证"/>
				</u-form-item>
			</u-form>
			<view class="btn-wrapper">
				<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">查询</u-button>
			</view>
			<view class="content-wrapper" v-if="data.length">
				<view class="item" v-for="item in data" :key="item.certId">
					<view class="text">证书编码：{{item.certNo}}</view>
					<view class="text">证书类型：{{getCertTypeLabel(item.certType)}}</view>
					<view class="text">证书等级：{{getCertLevelLabel(item.certLevel)}}</view>
					<view class="text">证书职务：{{getCertTitleLabel(item.certTitle)}}</view>
					<view class="text">证书起始日期：{{getTime(item.certDateIssue)}}</view>
					<view class="text">证书结束日期：{{getTime(item.certDateExpire)}}</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		mixins: [dictMapMixin],
		data () {
			return {
				loading: false,
				form: {
					idcard: '',
					realName: ''
				},
				data: []
			}
		},
		methods: {
			clearData () {
				this.data = []
			},
			getCertTypeLabel (type) {
				let dict = cloneDeep(this.dictMap)['tyb_crew_cert_type'] || []
				return this.getDictLabel(dict, type) || ''
			},
			getCertLevelLabel (type) {
				let dict = cloneDeep(this.dictMap)['tyb_crew_cert_level'] || []
				return this.getDictLabel(dict, type) || ''
			},
			getCertTitleLabel (type) {
				let dict = cloneDeep(this.dictMap)['tyb_crew_cert_title'] || []
				return this.getDictLabel(dict, type) || ''
			},
			onSubmit () {
				if (this.form.realName === '') {
					this.$refs.uToast.show({
						title: '姓名不能为空',
					})
					return
				}
				if (this.form.idcard === '') {
					this.$refs.uToast.show({
						title: '身份证不能为空',
					})
					return
				}
				let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				if (!reg.test(this.form.idcard)) {
					this.$refs.uToast.show({
						title: '身份证号码不正确',
					})
					return
				}
				this.loading = true
				this.data = []
				this.$http.get('/tmlms/crew_cert/getPage', {
					params: {
						idcard: this.form.idcard,
						realName: this.form.realName
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data.records
						this.form.idcard = ''
						this.form.realName = ''
						if (this.data.length === 0) {
							this.$refs.uToast.show({
								title: '查不到此条信息',
							})
						}
					}
					this.loading = false
				}).catch(() => {
					this.loading = false
				})
			},
			getTime (date) {
				let result = ''
				if (date) {
					let time = +new Date(date)
					if (!isNaN(time)) {
						return this.$tools.timestamp(time / 1000)
					}
				}
				return result
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-container {
		background-color: #FFFFFF;
		padding: 40rpx;
		border-radius: 8rpx;
		margin: 20rpx 30rpx 0;
		min-height: 300rpx;
		.content-wrapper {
			margin-top: 30rpx;
			font-size: 30rpx;
			color: #666;
			.item {
				padding: 20rpx;
				border: 1px solid #d7d7d7;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
			}
			.text {
				margin-bottom: 10rpx;
			}
		}
	}
</style>
