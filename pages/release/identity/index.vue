<template>
	<view class="identity-container">
		<u-form :model="form" ref="uForm" :rules="rules" label-width="150" :label-style="{color: '#999'}">
			<u-form-item label="你的身份" prop="bindTypeLabel" required>
				<u-input type="select" :select-open="bindTypeShow" v-model="form.bindTypeLabel" placeholder="请选择你的身份" @click="bindTypeShow = true"></u-input>
			</u-form-item>
			<u-form-item label="身份证图片" required prop="idcardPhoto" label-position="top">
				<u-upload custom-btn width="500" :show-progress="false" @on-success="onSuccessIdcardPhoto" @on-remove="onRemoveIdcardPhoto" ref="uUpload1" :file-list="idcardPhotoList" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/idcard`">
					<view class="img-wrapper" slot="addBtn">
						<image :src="`${imgUrl}/homo-face.png`" mode="scaleToFill"></image>
					</view>
				</u-upload>
			</u-form-item>
			<u-form-item label="渔船所有权登记证书" required prop="certPhoto" label-position="top">
				<u-upload :show-progress="false"  @on-success="onSuccessCertPhoto" @on-remove="onRemoveCertPhoto" ref="uUpload2" :file-list="certPhotoList" max-count="1" :header="header" :action="`${apiUrl}/admin/file/upload/avatar`"></u-upload>
			</u-form-item>
		</u-form>
		<view class="btn-wrapper">
			<u-button size="default" hover-class="none" :loading="loading" :custom-style="btnStyle" @click="onSubmit">申请</u-button>
		</view>
		<!-- 你的身份 -->
		<u-select safe-area-inset-bottom mode="single-column" :list="areaList" v-model="bindTypeShow" @confirm="(e) => onConfirm(e, 'bindType')"></u-select>
	</view>
</template>

<script>
	import { TOKEN } from '@/common/config/index.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		data () {
			return {
				imgUrl: this.$IMAGE_URL,
				apiUrl: this.$API_URL, 
				header: {
					'Authorization': 'Bearer ' + uni.getStorageSync(TOKEN)
				},
				idcardPhotoList: [],
				certPhotoList: [],
				areaList:[
					{ label: '持证人',value:1 },
					{ label: '经营人',value:2 },
					{ label: '经营人家属',value:3 },
				],
				imageState:[
				    { label:'reversed_side', value:'未摆正身份证' },
				    { label:'non_idcard', value:'上传的图片不包含身份证' },
				    { label:'blurred', value:'身份证模糊' },
				    { label:'over_exposure', value:'身份证关键字段反光或过曝' },
				    { label:'unknown', value:'未知状态' },
				],
				bindTypeShow: false,
				form: {
					userId: '',
					shipId: '',
					realname: '', // 姓名
					idcard: '', // 身份证号
					bindType: '', // 你的身份
					idcardPhoto: '', // 身份证图片
					certPhoto: '', // 渔船所有权登记证
				},
				loading: false,
				btnStyle: {
					backgroundColor: 'rgba(232, 103, 73, 1)',
					color: '#fff',
					fontSize: '32rpx',
					lineHeight: '100rpx'
				},
				rules: {
					bindTypeLabel: [{ required: true, message: '请选择你的身份', trigger: ['change', 'blur'] }],
					idcardPhoto: [{ required: true, message: '请上传身份证图片', trigger: 'change' }],
					certPhoto: [{ required: true, message: '请上传渔船所有权登记证', trigger: 'change' }]
				}
			}
		},
		onReady () {
			this.$refs.uForm.setRules(this.rules)
			this.idcardPhotoList = this.$refs.uUpload1.lists
			this.certPhotoList = this.$refs.uUpload2.lists
		},
		onLoad (params) {
			console.log('params', params)
			this.form.userId = params.userId
			this.form.shipId = params.shipId
		},
		methods: {
			onSubmit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.loading = true
						this.$http.post('/tmlms/tybshiphaver/save', this.form).then(({ data }) => {
							this.loading = false
							if(data.data){
								uni.showToast({
									icon: 'none',
									title: '您的申请已提交，请等待审核！'
								})
								this.getUserInfoApi()
								uni.switchTab({
									url: '/pages/user/index/index'
								})
							}
						}).catch(() => {
							this.loading = false
						})
					} else {
						console.log('验证失败')
					}
				})
			},
			onConfirm (e, prop) {
				this.form[prop] = e[0].value
				this.form[`${prop}Label`] = e[0].label
			},
			onRemoveCertPhoto (index, lists, name) {
				this.certPhotoList = lists
				this.form.certPhoto = ''
			},
			onRemoveIdcardPhoto (index, lists, name) {
				this.idcardPhotoList = lists
				this.form.idcardPhoto = ''
			},
			onSuccessIdcardPhoto (data, index, lists, name) {
				if (data.data.imageState === 'normal') {
					this.form.idcard= data.data.idcard
					this.form.realname = data.data.name
					this.form.idcardPhoto = data.data.url
					// this.idcardPhotoList = [{url: this.form.idcardPhoto}]
				} else {
					uni.showToast({
						icon: 'none',
						title: data.data.nonIdcard || '无法识别'
					});
					this.form.idcardPhoto = ''
					this.idcardPhotoList.splice(0, 1)
				}
			},
			onSuccessCertPhoto (data, index, lists, name) {
				this.form.certPhoto = data.data.url
			}
		}
	}
</script>

<style scoped lang="scss">
	.identity-container {
		background-color: #fff;
		padding: 0 30rpx 30rpx;
		.btn-wrapper {
			margin: 30rpx;
		}
		.img-wrapper {
			width: 600rpx;
			height: 400rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
