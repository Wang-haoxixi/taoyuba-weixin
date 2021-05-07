<template>
	<view class="face-boss">
		<view class="isrelation">
			<face @phoneSrc="phoneSrc" ref="face" :disabled="isAddress"></face>
		</view>
		<view class="isHelp" v-if="isAddress">提示：您的签到地点不在范围内</view>
		<view v-if="noAddress" class="isHelp">
			<u-button @click="getAuthorizeInfo" >开启定位</u-button>
		</view>
		<!-- <u-modal v-model="show" :content="'是否为本人采集?'" :show-cancel-button="true" :confirm-text="'本人'" :cancel-text="'非本人'" @confirm="confirm" @cancel="cancel"></u-modal> -->
		<u-modal v-model="showModel" @confirm="sumbit" :show-title="false" :async-close="true" ref="uModal">
			<view class="slot-content">
				<view class="page-base page-base-nomargin">
					<u-image :src="form.image" height="250rpx" width="250rpx" shape="circle"></u-image>
					<u-form :model="form" ref="uForm" label-width="150">
						<u-form-item label="姓名" prop="realName"><u-input v-model="form.realName" :disabled="true"/></u-form-item>
						<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" :disabled="true"/></u-form-item>
						<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" :disabled="true"/></u-form-item>
						<u-form-item label="职务类型" :right-icon="signOut ? '' :'arrow-down-fill'" v-if="showModel && isCrew == 2">
							<div @click="showTrue('showSelect')" v-if="!signOut">{{ getTypeName(form.positionId,'list') }}</div>
							<div v-else>{{ getTypeName(form.positionId,'list') }}</div>
						</u-form-item>
					</u-form>
				</view>
			</view>
		</u-modal>
		<u-select v-model="showSelect" :list="list" mode="mutil-column-auto" @confirm="confirmSelect"></u-select>
		<!-- <u-select v-model="shipSelect" :list="listType" @confirm="confirmSelectShip"></u-select> -->
		<u-modal v-model="iscontent" :content="content" @confirm="confirmSure"></u-modal>
		<!-- <u-modal v-model="isSure" :content="isSureContent" @confirm="sumbitSure" :show-cancel-button="true"></u-modal> -->
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
				isSure: false,
				iscontent: false,
				signOut: false,
				show: true,
				isSureContent: '',
				showModel: false,
				shipSelect: false,
				content: false,
				form: {
					type: {},
					position: {},
				},
				showSelect: false,
				isAddress: false,
				noAddress: false,
				url: '',
				name: '',
				showSelect: false,
				list: [
					{
						label: '驾驶',
						value: 1
					},
					{
						label: '轮机',
						value: 2
					}
				],
				isCrew: 1,
				sign: 1
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
			uni.clearStorage()
			this.option = option
			uni.setStorageSync('orgId', option.orgId )
			uni.setStorageSync('trainMeetId', option.id )
			uni.setStorageSync('isCrew', option.isCrew)
			uni.setStorageSync('sign', option.sign )
			// 在签到的时候进行的采集 船东会议的都是家属 船员会议的就是船员
			if( option.isCrew == 0 ){
				uni.setStorageSync('collectionType', 2 )
			}else{
				uni.setStorageSync('collectionType', 1 )
			}
			this.isCrew = option.isCrew
			this.sign = option.sign
			console.log(option)
			uni.showLoading({
				title: '加载中...'
			})
			this.name = this.organizationTypeList[Number(uni.getStorageSync('orgId'))]
		},
		onReady() {
			this.getaddress()
		},
		methods: {
			// 获取地理位置
			getaddress () {
				this.noAddress = false
				uni.getLocation({
				    type: 'gcj02',
					altitude: true,
				    success: (res) => {
						let locations = [res.longitude,res.latitude]
						// let locations = [122.212505,29.977092]
						const keys= locations.map(_=>`locations=${_}`).join('&');
						this.$http.get(`/tmlms/trainMeetSign/checkLocation?${keys}&trainMeetId=${ this.option.id }`).then(({ data })=>{
							uni.hideLoading()
							if( data.code === 0 ){
								this.$refs.face.takePhoto()
							}else{
								if( data.msg === '签到时间结束' || data.msg === '会议结束' || data.msg == '会议未开始'){
									this.content = data.msg
									this.iscontent = true
								}else{
									uni.showToast({
										icon: 'none',
										title: data.msg
									})
									this.isAddress = true
								}
							}
						})
				    },
					fail: (res)=> {
						uni.getSetting();
						uni.hideLoading()
				        uni.showToast({
				        	icon: 'none',
							title: '请打开地理位置!'
				        })
						// 拒绝了给他一个按钮 让他改过自新 允许定位
						this.noAddress = true
				    },
				});
			},
			getAuthorizeInfo(a="scope.userLocation"){  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
			        var _this=this;
			        uni.authorize({
			            scope: a,
			            success() { //1.1 允许授权
			                _this.getaddress()
			            },
			            fail(){    //1.2 拒绝授权
							uni.openSetting({
								success: (res) => {
									_this.getaddress()
								}
							})
			            }
			        })
			    },
			getFace () {
				this.$refs.face.takePhoto()
			},
			// 确认提交签到
			sumbit () {
				// 点击确认 先判断渔船名和类型是否填写
				// let form = JSON.parse(JSON.stringify(this.form))
				// this.$http.post(`/tmlms/trainMeetSign/getSignStatus?idcard=${form.idcard}&trainMeetId=${this.option.id}`).then(({data})=>{
				// 	this.$refs.uModal.clearLoading()
				// 	this.$getCode(data).then(res=>{
				// 		let data = ['您还未签到,是否签到？','您已签到,是否签退？','您已签退,是否重新签退？','您已超时未签到,是否签退？','会议已结束','会议未开始','会议未结束,是否提前签退？']
				// 		this.isSureContent = data[res.data]
				// 		this.isSure = true
				// 	})
				// })
				this.sumbitSure()
			},
			// 签到
			sumbitSure () {
				// if( this.isSureContent === '会议已结束' ||  this.isSureContent === '会议未开始'){
				// 	this.isSure = false
				// }else{
					let form = JSON.parse(JSON.stringify(this.form))
					form.userType = form.gatherType
					this.$http.post('/tmlms/trainMeetSign/signInOut',{ ...form,orgId: uni.getStorageSync('orgId'),trainMeetId: this.option.id,signInImage: this.url,type: uni.getStorageSync('sign') }).then(({data})=>{
						this.$refs.uModal.clearLoading()
						this.$getCode(data).then(res=>{
							this.content = res.msg
							this.iscontent = true
						})
					})
				// }
			},
			confirmSelect (e) {
				this.$set(this.form,'positionId',e[0].value)
			},
			// 开始拍照
			phoneSrc (phoneSrc) {
				// 这个接口用来判断是否成功获取到信息
				this.$http.upload('/tmlms/trainMeetSign/getFace', {
					filePath: phoneSrc,
					name: 'file',
					formData:{
						trainMeetId: this.option.id,
						orgId: uni.getStorageSync('orgId')
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
						if( this.form.positionId || this.form.positionId === 0 ){
							console.log(1)
							this.signOut = true
						}else{
							console.log(2)
							this.signOut = false
						}
						// setTimeout(()=>{
							this.showModel = true
						// },1000)
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
							this.$refs.face.takePhoto()
						}
					}
				})
			},
			showTrue (name) {
				this[name] = true
			},
			confirmSure () {
				uni.switchTab({
					url: '/pages/home/index/index'
				})
			},
			// 获取名称
			getTypeName (val,name) {
				if( !val ){
					return '请点击选择'
				}
				let data = ''
				this[name].forEach(res=>{
					if( res.value === val ){
						data = res.label
					}
				})
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
			::v-deep button {
				width: 300rpx;
			}
			font-size: 40rpx;
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