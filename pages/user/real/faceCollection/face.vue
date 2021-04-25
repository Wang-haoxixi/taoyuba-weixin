<template>
	<view class="face-boss">
		<view style="font-size: 45rpx;font-weight: 700;padding: 20rpx;">{{ isCollet ? '请拍摄本人人脸' : '请拍摄受协助人人脸' }}</view>
		<view class="isrelation">
			<face @phoneSrc="phoneSrc" ref="face"></face>
		</view>
		<!-- <view class="isHelp" @click="isCollet = !isCollet">{{ !isCollet ? '协助采集' : '本人采集' }}</view> -->
		<!-- <u-modal v-model="show" :content="'是否为本人采集?'" :show-cancel-button="true" :confirm-text="'本人'" :cancel-text="'非本人'" @confirm="confirm" @cancel="cancel"></u-modal> -->
		<u-modal v-model="showModel" @confirm="sumbit" :show-title="false" >
			<view class="slot-content">
				<view class="page-base page-base-nomargin">
					<u-image :src="form.image" height="250rpx" width="250rpx" shape="circle"></u-image>
					<u-form :model="form" ref="uForm" label-width="150">
						<u-form-item label="姓名" prop="realName"><u-input v-model="form.realName" :disabled="true"/></u-form-item>
						<u-form-item label="性别" prop="gender">{{ form.gender === 1 ? '男' : '女' }}</u-form-item>
						<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" :disabled="true"/></u-form-item>
						<u-form-item label="联系地址" prop="address"><u-input v-model="form.address" :disabled="true"/></u-form-item>
						<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" :disabled="true"/></u-form-item>
						<u-form-item label="民族" prop="nation"><u-input v-model="form.nation" :disabled="true"/></u-form-item>
					</u-form>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import face from '../../../../pages/components/face-recognition/indexNew.vue'
	export default {
		props: {
		},
		data () {
			return {
				show: true,
				showModel: false,
				form: {},
				isCollet: true,
				openIdObj: {}
			}
		},
		components: {
			face
		},
		watch: {
		},
		created () {
		},
		onLoad (option) {
			uni.clearStorage()
			console.log(option)
			this.openIdObj = {
				realWxOpenid: option.openid,
				unionId: option.unionid
			}
			
			uni.setStorageSync('orgId', option.orgId )
			if( option.isTrue ){
				this.isCollet = true
			}else{
				this.isCollet = false
			}
			this.$refs.face.takePhoto()
			// uni.setStorageSync('orgId', 1 )
		},
		methods: {
			sumbit () {
				uni.switchTab({
					url: '/pages/user/index/index'
				})
			},
			// confirm () {
			// 	this.show = false
			// 	this.$refs.face.takePhoto()
			// },
			// cancel () {
			// 	uni.setStorageSync('openIdObj', {
			// 		realWxOpenid: '',
			// 		unionId: ''
			// 	});
			// 	this.confirm()
			// },
			phoneSrc (phoneSrc) {
				this.$http.upload('/admin/gather/getFace', {
					filePath: phoneSrc,
					name: 'file'
				}).then(({ data })=>{
					console.log(data)
					if( data.code === 0 ){
						uni.showToast({
							icon: 'none',
							title: '您已完成采集,请查看具体信息!'
						})
						this.form = data.data
						setTimeout(()=>{
							this.showModel = true
						},1000)
					}else{
						if( data.msg === '未找到匹配的用户:match user is not found' ){
							this.$refs.face.loading = false
							this.$refs.face.phoneSrc = ''
							if(!this.isCollet){
								uni.setStorageSync('openIdObj', {
									realWxOpenid: '',
									unionId: ''
								})
							}else{
								uni.setStorageSync('openIdObj', {
									realWxOpenid: this.openIdObj.realWxOpenid,
									unionId: this.openIdObj.unionid
								});
							}
							uni.showToast({
								icon: 'none',
								title: '请上传身份证进行采集!'
							})
							setTimeout(res=>{
								uni.navigateTo({
									url: `/pages/user/real/index?isface=1`
								})
							},1000)
						}else{
							uni.showToast({
								icon: 'none',
								title: '无法识别!请对准摄像头再来一次!'
							})
							this.$refs.face.loading = false
							this.$refs.face.phoneSrc = ''
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.face-boss {
		min-height: 100vh;
		background: white;
		text-align:center;
		.isHelp {
			position: absolute;
			text-align: center;
			top: 850rpx;
			left: 0;
			width: 100%;
			color: $color-blue;
			z-index: 10001;
		}
	}
	.page-base {
		::v-deep .u-form{
			margin: 50rpx 0;
		}
		::v-deep .u-btn{
			margin: 50rpx 0;
		}
	}
	.page-base-nomargin {
		::v-deep .u-form{
			margin: 0;
		}
		::v-deep .u-btn{
			margin: 0;
		}
		::v-deep .u-form-item {
			padding: 5rpx;
		}
		::v-deep .u-image{
			margin: 20rpx auto;
		}
	}
	::v-deep .u-form-item--right__content__slot {
		text-align: left;
	}
</style>