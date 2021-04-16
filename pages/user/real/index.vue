<template>
	<view class="id-boss">
		<u-image height="250rpx" :src="imgUrlHeader"></u-image>
		<view class="id-title">
			请拍摄{{ isface ? '' : user.realName }}本人的二代身份证
		</view>
		<view class="u-text-center">
			确保拍摄的证件完整清晰
		</view>
		<u-image width="622rpx" class="id-img" height="396rpx" :src="imgUrlImg || imgUrl" @click="imgLook"></u-image>
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
	</view>
</template>

<script>
	export default {
		mixins: [],
		components: {
		},
		data () {
			return {
				imgUrl: `${this.$IMAGE_URL}/idcardBack.jpg`,
				imgUrlHeader: `${this.$IMAGE_URL}/release-bg.png`,
				user: this.$cache.get('userInfo'),
				checked: false,
				imgUrlImg: '',
				form: {},
				isface: ''
			}
		},
		onShow () {
		},
		watch: {
		},
		onLoad (option) {
			this.isface = option.isface || ''
		},
		methods: {
			// 拍照
			onphone () {
				uni.chooseImage({
					quality: 'high',
					success: (res) => {
						this.$http.upload('/admin/file/upload/idcard2', {
							filePath: res.tempFilePaths[0],
							name: 'file'
						}).then(({ data }) => {
							// 将图片上传给阿辉哥 根据imageState是否为normal字段来判断
							if( data.data.imageState === 'normal' ){
								this.form = data.data
								this.imgUrlImg = data.data.url
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
				if( this.checked && this.form.name){
					console.log(this.isface)
					uni.setStorage({
					    key: 'cardInformation',
					    data: this.form,
					    success:  ()=> {
					        uni.navigateTo({
					        	url: `/pages/user/real/${ this.isface ? 'faceCollection/information' : 'personalInformation' }`
					        })
					    }
					})
					// 需要点击保存证件
				}else if( !this.checked ){
					uni.showToast({
						icon: 'none',
						title: '请先同意保存证件以便查看'
					})
					// 需要上传身份证并且成功获取到信息
				}else if( !this.form.name ){
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
			}
		}
	}
</script>

<style lang="scss" scoped>
.id-boss {
	.id-title {
		text-align: center;
		font-size: 35rpx;
		margin: 35rpx 0;
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
