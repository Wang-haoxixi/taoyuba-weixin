<template>
	<view class="face-boss">
		<view style="font-size: 45rpx;font-weight: 700;padding: 20rpx;">{{ '请拍摄本人人脸' }}</view>
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
		<u-modal v-model="loginState" :show-title="false" :content="'请先登录!'">
			<u-button slot="confirm-button" open-type="getUserInfo" @getuserinfo="onWechat" class="button-color">
				微信登录
			</u-button>
		</u-modal>
		<u-popup
			v-model="showPhone"
			mode="bottom"
			safe-area-inset-bottom
			:border-radius="20"
			closeable
			@close="onClosePhone"
			:mask-close-able="false">
			<view class="wechat-phone-wrapper">
				<view class="btn-wrapper">
					<u-button type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle">手机号绑定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import face from '../../../../pages/components/face-recognition/indexNew.vue'
	import getUser from '@/common/utils/user'
	import { isLogin } from '@/common/utils/login.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		props: {
		},
		data () {
			return {
				show: true,
				showModel: false,
				form: {},
				isCollet: true,
				openIdObj: {},
				option: {},
				loginState: false,
				showPhone: false
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
			uni.setStorageSync('openIdObj', {
				realWxOpenid: option.openid,
				unionId: option.unionid
			})
			uni.setStorageSync('orgId', option.orgId )
			uni.setStorageSync('collectionType', option.type )
			this.option = option
		},
		onShow () {
			// type是1的时候 需要进行授权登录
			if( this.option.type == 0 ){
				isLogin().then(data=>{
					if( !data ){
						this.loginState = true
					}else{
						this.$refs.face.takePhoto()
					}
				})
			}else{
				this.$refs.face.takePhoto()
			}
		},
		methods: {
			getFace () {
				this.$refs.face.takePhoto()
			},
			sumbit () {
				uni.switchTab({
					url: '/pages/user/index/index'
				})
			},
			onWechat () {
				getUser.onLogin().then((res) => {
					if (res) {
						this.loginState = false
						this.getUserInfoApi()
						this.$refs.face.takePhoto()
					} else {
						this.loginState = false
						this.showPhone = true
					}
				})
			},
			getPhoneNumber (e) {
				if (e.detail.iv) {
					getUser.getPhoneNumber(e).then(() => {
						this.showPhone = false
						this.getUserInfoApi()
						this.$refs.face.takePhoto()
					})
				}
			},
			onClosePhone () {
				this.showPhone = false
			},
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
							uni.showToast({
								icon: 'none',
								title: '请上传身份证进行采集!'
							})
							this.$cache.set('isQD','')
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
							this.$refs.face.takePhoto()
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
	::v-deep .u-hairline-border:after {
		border: none!important;
	}
	::v-deep .button-color{
		color: $color-blue;
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