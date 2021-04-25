<template>
	<view class="face-boss">
		<view class="isrelation">
			<face @phoneSrc="phoneSrc" ref="face" :disabled="isAddress"></face>
		</view>
		<view class="isHelp" v-if="isAddress">提示：您的签到地点不在范围内</view>
		<!-- <u-modal v-model="show" :content="'是否为本人采集?'" :show-cancel-button="true" :confirm-text="'本人'" :cancel-text="'非本人'" @confirm="confirm" @cancel="cancel"></u-modal> -->
		<u-modal v-model="showModel" @confirm="sumbit" :show-title="false" :async-close="true" ref="uModal">
			<view class="slot-content">
				<view class="page-base page-base-nomargin">
					<u-image :src="form.image" height="250rpx" width="250rpx" shape="circle"></u-image>
					<u-form :model="form" ref="uForm" label-width="150">
						<u-form-item label="姓名" prop="realName"><u-input v-model="form.realName" :disabled="true"/></u-form-item>
						<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" :disabled="true"/></u-form-item>
						<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" :disabled="true"/></u-form-item>
						<u-form-item label="船名号" prop="shipName"><u-input v-model="form.shipName" :disabled="signOut" /></u-form-item>
						<u-form-item label="类型" :right-icon="signOut ? '' :'arrow-down-fill'">
							<div @click="showTrue" v-if="!signOut">{{ getTypeName(form.userType,true) }} {{ getTypeName(form.positionId) }}</div>
							<div v-else>{{ getTypeName(form.userType,true) }} {{ getTypeName(form.positionId) }}</div>
						</u-form-item>
					</u-form>
				</view>
			</view>
		</u-modal>
		<u-select v-model="showSelect" :list="list" mode="mutil-column-auto" :default-value="[0,0]" @confirm="confirmSelect"></u-select>
		<u-modal v-model="content" :content="content" @confirm="confirmSure"></u-modal>
	</view>
</template>

<script>
	import face from '../../../../pages/components/face-recognition/indexNew.vue'
	export default {
		props: {
		},
		mixins: [],
		data () {
			return {
				signOut: false,
				show: true,
				showModel: false,
				content: false,
				form: {
					type: {},
					position: {},
				},
				showSelect: false,
				list: [
					{
						label: '船东',
						value: 0,
						children: [{
							label: '',
							value: 0,
						}]
					},{
						label: '职务船员',
						value: 1,
						children: this.$cache.get('dictMap')['tyb_resume_position']
					},{
						label: '家属',
						value: 2,
						children: [{
							label: '',
							value: 0,
						}]
					}
				],
				isAddress: false,
				url: ''
			}
		},
		components: {
			face
		},
		watch: {
		},
		created () {
		},
		mounted() {
		},
		onLoad (option) {
			this.option = option
			uni.setStorageSync('orgId', option.orgId )
			uni.setStorageSync('trainMeetId', option.id )
			console.log(option)
			uni.showLoading({
				title: '加载中...'
			})
		},
		onReady() {
			uni.getLocation({
			    type: 'gcj02',
				altitude: true,
			    success: (res) => {
					console.log(res)
					let locations = [res.longitude,res.latitude]
					// let locations = [122.212505,29.977092]
					const keys= locations.map(_=>`locations=${_}`).join('&');
					this.$http.get(`/tmlms/trainMeetSign/checkLocation?${keys}&trainMeetId=${ this.option.id }`).then(({ data })=>{
						uni.hideLoading()
						if( data.code === 0 ){
							this.$refs.face.takePhoto()
						}else{
							uni.showToast({
								icon: 'none',
								title: data.msg
							})
							this.isAddress = true
						}
					})
			    },
				fail: function (res) {
					uni.hideLoading()
			        uni.showToast({
			        	icon: 'none',
						title: '请打开地理位置!'
			        })
					uni.openSetting();
			    },
			});
		},
		methods: {
			getFace () {
				this.$refs.face.takePhoto()
			},
			// 确认提交签到
			sumbit () {
				// 点击确认 先判断渔船名和类型是否填写
				if( !this.form.shipName ){
					uni.showToast({
						icon: 'none',
						title: '渔船名称不能为空!'
					})
					this.$refs.uModal.clearLoading();
					return false
				}
				if( !this.form.userType && this.form.userType !== 0 ){
					uni.showToast({
						icon: 'none',
						title: '请选择类型!'
					})
					this.$refs.uModal.clearLoading();
					return false
				}
				let form = JSON.parse(JSON.stringify(this.form))
				this.$http.post('/tmlms/trainMeetSign/signInOut',{ ...form,trainMeetId: this.option.id,signInImage: this.url }).then(({data})=>{
					this.$refs.uModal.clearLoading()
					this.$getCode(data).then(res=>{
						this.content = res.msg
					})
				})
			},
			// 打开选择
			confirmSelect (e) {
				this.$set(this.form,'userType',e[0].value)
				console.log(this.form)
				if( e[0].value === 1 ){
					this.$set(this.form,'positionId',e[1].value)
				}else{
					this.$set(this.form,'positionId','')
				}
			},
			// 开始拍照
			phoneSrc (phoneSrc) {
				// 这个接口用来判断是否成功获取到信息
				this.$http.upload('/tmlms/trainMeetSign/getFace', {
					filePath: phoneSrc,
					name: 'file',
					formData:{
						trainMeetId: this.option.id
					},
				}).then(({ data })=>{
					console.log(data)
					if( data.code === 0 ){
						this.$http.upload('/admin/file/upload/avatar', {
							filePath: phoneSrc,
							name: 'file'
						}).then(({data})=>{
							this.$getCode(data).then(data=>{
								this.url = data.data.url
							})
						})
						uni.showToast({
							icon: 'none',
							title: '请进行信息确认!'
						})
						this.form = data.data
						if( this.form.userType || this.form.userType === 0 ){
							this.signOut = true
						}else{
							this.signOut = false
						}
						setTimeout(()=>{
							this.showModel = true
						},1000)
					}else{
						if( data.msg === '未找到匹配的用户:match user is not found' ){
							this.$refs.face.loading = false
							this.$refs.face.phoneSrc = ''
							uni.showToast({
								icon: 'none',
								title: '您还未采集过数据!请上传身份证进行采集!',
								duration: 2000,
							})
							setTimeout(res=>{
								this.$cache.set('isQD',1)
								uni.navigateTo({
									url: `/pages/user/real/index?isface=1`
								})
							},1000)
						}else{
							uni.showToast({
								icon: 'none',
								title: '无法识别!请对准摄像头再拍一次!',
								duration: 2500,
							})
							this.$refs.face.loading = false
							this.$refs.face.phoneSrc = ''
						}
					}
				})
			},
			showTrue () {
				this.showSelect = true
			},
			confirmSure () {
				uni.switchTab({
					url: '/pages/user/index/index'
				})
			},
			// 获取名称
			getTypeName (val,status) {
				let data = ''
				if( status ){
					data = '请点击选择'
					this.list.forEach(res=>{
						if( res.value === val ){
							data = res.label
						}
					})
				}else{
					this.list[1].children.forEach(res=>{
						if( res.value === val ){
							data = res.label
						}
					})
				}
				return data
			}
		},
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
			top: 820rpx;
			left: 0;
			width: 100%;
			color: #999999;
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