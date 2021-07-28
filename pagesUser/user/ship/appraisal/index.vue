<template>
	<view class="appraisal">
		<u-form :model="form" ref="uForm" :label-width="200" :required="true">
			<u-form-item label="申报人" prop="realName" :required="true">
				<u-input v-model="form.realName" />
			</u-form-item>
			<u-form-item label="联系电话" prop="phone" :required="true">
				<u-input v-model="form.phone" />
			</u-form-item>
			<u-form-item label="船名号" prop="shipName" :required="true">
				<u-input v-model="form.shipName" />
			</u-form-item>
			<u-form-item label="欲转入地" prop="address" :required="true">
				<u-input v-model="form.address" :type="'select'" @click="show = true" />
			</u-form-item>
			<u-form-item label="欲挂靠单位">
				<u-input v-model="form.affiliation" />
			</u-form-item>
			<u-form-item label="渔船停泊位置" prop="anchor" :required="true">
				<u-input v-model="form.anchor" />
			</u-form-item>
		</u-form>
		<u-picker v-model="show" mode="region" @confirm="confirm"></u-picker>
		<view style="margin-top: 100rpx;">
			<u-button type="primary" @click="sumbit()">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {  },
		mixins: [],
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		data () {
			return {
				form: {
					realName: '',
					phone: '',
					shipName: '',
					address: '',
					anchor: '',
				},
				rules: {
					realName: [
						{ required: true, message: '请输入姓名', trigger: ['blur'] },
					],
					phone: [
						{ required: true, message: '请输入联系电话', trigger: ['blur'] },
					],
					shipName: [
						{ required: true, message: '请输入船名号', trigger: ['blur'] },
					],
					address: [
						{ required: true, message: '请输入欲转入地', trigger: ['change'] },
					],
					anchor: [
						{ required: true, message: '请输入渔船停泊位置', trigger: ['blur'] },
					],
				},
				show: false,
			}
		},
		computed: {
		},
		watch: {
		},
		methods: {
			sumbit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$http.post('/tmlms/verification/create', this.form).then(res=>{
							uni.showToast({
								title: '提交成功!',
							})
							setTimeout(()=>{
								uni.navigateBack({
								    delta: 1
								})
							},1000)
						})
					} else {
						console.log('验证失败');
					}
				})
			},
			confirm (value) {
				this.form.address = value.province.label + ' ' + value.city.label + ' ' + value.area.label
			},
		}
	}
</script>


<style lang="scss" scoped>
	.appraisal {
		background: white;
		padding: 30rpx;
		min-height: 100vh;
	}
</style>
