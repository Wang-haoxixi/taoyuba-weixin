<template>
	<view class="id-boss">
		<face @phoneSrcTrain="phoneSrcTrain" ref="facetrain" :disabled="isAddress" v-if="isShow"></face>
		<view class="idCard-box">
			<u-image height="250rpx" :src="imgUrlHeader"></u-image>
			<view class="id-title">
				请拍摄本人的二代身份证
			</view>
			<view class="u-text-center">
				确保拍摄的证件完整清晰
			</view>
			<view class="id-img-boss">
				<u-image width="622rpx" class="id-img" height="396rpx" :src="imgUrlImg || imgUrl" @click="imgLook"></u-image>
				<view class="id-close" v-if="imgUrlImg">
					<u-icon name="close" @click="imgUrlImg = ''"></u-icon>
				</view>
			</view>
			<view class="id-check">
				<u-checkbox-group>
					<u-checkbox v-model="checked" :disabled="false">同意保存证件以便查看</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="id-button">
				<u-button type="primary" @click="onphone">拍摄</u-button>
			</view>
			<view class="id-button">
				<u-button @click="sumbit">保存</u-button>
			</view>
			<u-modal v-model="content" content="拍摄人脸与身份证不符,是否继续操作？" @confirm="confirmSure" :show-cancel-button="true" ></u-modal>
		</view>
	</view>
</template>

<script>
	import face from './components/face-recognition/indexNew.vue'
	export default {
		mixins: [],
		components: {
			face
		},
		data () {
			return {
				content: false,
				imgUrl: `${this.$IMAGE_URL}/idcardBack.jpg`,
				imgUrlHeader: `${this.$IMAGE_URL}/release-bg.png`,
				user: this.$cache.get('userInfo'),
				checked: false,
				imgUrlImg: '',
				form: {},
				isface: '',
				photo: '',
				
				isAddress: false,
				isShow: false,
				isTrain: '',
			}
		},
		onShow () {
		},
		watch: {
		},
		onLoad (option) {
			this.isface = option.isface || ''
			this.isTrain = option.isTrain || ''
		},
		onUnload () {
			// let pages = getCurrentPages();//获取页面栈
			// let beforePage = pages[pages.length - 2];//上一页
			// beforePage.$vm.getFace();//直接调用上一页的方法
		},
		methods: {
			// 开始进行人脸识别
			phoneSrcTrain (phoneSrc) {
				this.$http.upload('/admin/file/faceMatch2', {
					filePath: phoneSrc,
					name: 'fileOne',
					formData:{
						baseImage: this.photo
					},
				}).then(({data})=>{
					if (data.data >= 75) {
						uni.setStorage({
							key: 'cardInformation',
							data: {...this.form,isTrain: true},
							success:  ()=> {
									uni.navigateTo({
										url: '/pages/user/real/faceCollection/collegeInfo'
									})
							}
						})
					}else if(data.code == 1){
						uni.showToast({
							icon: 'none',
							title: '无法识别，请重新识别!',
							duration: 2500,
						})
						setTimeout(()=>{
							this.$refs.facetrain.phoneSrc111 = ''
							this.$refs.facetrain.takePhoto()
						},2500)
					} else if(data.data < 75) {
						uni.showToast({
							icon: 'none',
							title: '人脸与身份证不符!请重新识别!',
							duration: 2500,
						})
						setTimeout(()=>{
							this.$refs.facetrain.phoneSrc111 = ''
							this.$refs.facetrain.takePhoto()
						},2500)
					}
				})
			},
			
			// 拍照
			onphone () {
				uni.chooseImage({
					quality: 'high',
					success: (res) => {
						this.$http.upload('/admin/file/upload/idcard2', {
							filePath: res.tempFilePaths[0],
							name: 'file'
						}).then(({ data }) => {
							console.log('idcard2..', data)
							// 将图片上传给阿辉哥 根据imageState是否为normal字段来判断
							if( data.data.imageState === 'normal' ){
								this.form = data.data
								this.imgUrlImg = data.data.url
								this.photo = this.form.photo
								// 吧BASE64给阿辉哥 他转成url给我 然后他需要吧地址给我 窝在最后一步将地址发给他 
								this.$http.post('/admin/file/upload/avatarBase64', {
									photo: this.form.photo,
								}).then(({ data }) => {
									this.form.photo = data.data.url
									// 大B哥的参数名叫做facePhoto 和阿辉哥的不一样
									this.form.facePhoto = data.data.url
								})
							}else{
								uni.showToast({
									icon: 'none',
									title: '无法识别!请上传正确且清晰的身份证正面照片！'
								})
							}
						})
					}
				})
			},
			// 保存跳转个人信息
			sumbit () {
				if( this.checked && this.form.name && this.imgUrlImg){
					
					if(this.isTrain){
						this.isShow = true
						this.$nextTick(function(){
							this.$refs.facetrain.takePhoto()
						})
						console.log(123)
						return
					}
					
					if( uni.getStorageSync('phoneSrc') ){
						console.log(456)
						this.$http.upload('/admin/file/faceMatch2', {
							filePath: uni.getStorageSync('phoneSrc'),
							name: 'fileOne',
							formData:{
								baseImage: this.photo
							},
						}).then(({data})=>{
							if( data.data < 75 ){
								this.content = true
							}else{
								uni.setStorage({
								    key: 'cardInformation',
								    data: {...this.form,isTrain: true},
								    success:  ()=> {
								        uni.navigateTo({
								        	url: `/pages/user/real/${ this.isface ? 'faceCollection/information' : 'personalInformation' }`
								        })
								    }
								})
							}
						})
					}else{
						uni.setStorage({
						    key: 'cardInformation',
						    data: this.form,
						    success:  ()=> {
						        uni.navigateTo({
						        	url: `/pages/user/real/${ this.isface ? 'faceCollection/information' : 'personalInformation' }`
						        })
						    }
						})
					}
					// 需要点击保存证件
				}else if( !this.checked ){
					uni.showToast({
						icon: 'none',
						title: '请先同意保存证件以便查看'
					})
					// 需要上传身份证并且成功获取到信息
				}else if( !this.form.name || !this.imgUrlImg ){
					uni.showToast({
						icon: 'none',
						title: '请上传身份证!'
					})
				}
			},
			// 打开图片看大图
			imgLook () {
				if(this.imgUrlImg){
					uni.previewImage({
						current: 0,
						urls: [this.imgUrlImg]
					});
				}
			},
			confirmSure () {
				uni.setStorage({
				    key: 'cardInformation',
				    data: {...this.form,isTrain: true},
				    success:  ()=> {
				        uni.navigateTo({
				        	url: `/pages/user/real/${ this.isface ? 'faceCollection/information' : 'personalInformation' }`
				        })
				    }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.id-boss {
	.idCard-box{
		width: 100%;
		height: 100vh;
		position: fixed;
	}
	
	.id-title {
		text-align: center;
		font-size: 35rpx;
		margin: 35rpx 0;
	}
	.id-img-boss {
		position: relative;
		.id-close {
			position: absolute;
			background: white;
			color:#ccc;
			top: -20rpx;
			right: 37rpx;
			border: 1px solid #ccc;
			text-align: center;
			line-height: 60rpx;
			border-radius: 50%;
			width: 60rpx;
			height: 60rpx;
		}
	}
	.id-img {
		margin: 30rpx 0;
		display: flex;
		justify-content: center;
	}
	.id-check {
		width: 622rpx;
		margin: 20rpx auto 80rpx auto;
	}
	.id-button {
		width: 400rpx;
		margin: 20rpx auto;
	}
}
</style>
