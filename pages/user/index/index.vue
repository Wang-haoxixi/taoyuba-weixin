<template>
	<view class="user-container page-bottom">
		<template v-if="!showLoginBtn">
			<view class="user-header">
				<view class="base-info-wrapper">
					<view class="base-info-wrapper-left">
						<view class="avatar-wrapper">
							<image :src="userInfo.avatar || `${imageUrl}/avatar.jpg`" mode="scaleToFill"></image>
						</view>
						<view class="content">
							<view>
								<text class="name">{{userInfo.realName}}</text>
							</view>
							<view class="phone-all">
								<text class="phone">{{userInfo.username}}</text>
								<text class="phone">{{roleLabel}}</text>
							</view>
							<!-- <view v-if="arr.includes(user.userId)"> -->
							<view>
								<u-button type="primary" shape="square" size="mini" plain @click="onTo('/pages/user/real/index')" v-if="!isname">实名认证</u-button>
								<!-- <u-button type="primary" shape="square" size="mini" plain @click="onTo('/pages/user/real/faceCollection/index?openid=1')" v-if="!isname">实名认证</u-button> -->
								<u-button type="primary" shape="square" size="mini" plain @click="onTo('/pages/user/real/authenticationCenter')" v-if="isname">已实名</u-button>
								<!-- <u-button type="primary" shape="square" size="mini" plain @click="onTo('/pages/user/real/faceCollection/index?openid=1')" v-if="isname">已实名</u-button> -->
							</view>
						</view>
					</view>
				</view>
				<view class="content-wrapper">
					<view class="item" @tap="onToUser" v-if="!roles.includes(rolesType.police.type)">
						<view class="iconfont iconziliao"></view>
						<text>个人资料</text>
					</view>
					<view class="item" @tap="onTo('/pages/user/collection/index')">
						<view class="iconfont iconshoucang other-ic"></view>
						<text>我的收藏</text>
					</view>
					<view class="item" @tap="onTo('/pages/user/change-password/index')">
						<view class="iconfont iconmima other-ic"></view>
						<text>密码修改</text>
					</view>
					<view class="item" v-if="isBecome" @click="onChoose">
						<view class="iconfont iconchengyuan other-ic"></view>
						<text>我要成为</text>
						<u-select v-if="show" v-model="show" mode="single-column" :list="list" @confirm="onConfirm"></u-select>
					</view>
				</view>
			</view>
			<!-- 菜单 -->
			<user-menu :text="text" :isShipOwer="isShipOwer" :role="roles"></user-menu>
			<u-modal v-model="modalShow" @cancel="modalShow = false" title="个人资料" :mask-close-able="true" :show-confirm-button="false" show-cancel-button cancel-text="取消">
				<view class="slot-content" style="padding: 30rpx 10rpx;display: flex;justify-content: center;">
					<u-button @click="onToPath('/pages/release/shipowner-resume/edit')" style="margin-right: 20rpx;">船东简历</u-button>
					<u-button type="primary" @click="onToPath('/pages/release/resume/edit')">船员简历</u-button>
				</view>
			</u-modal>
		</template>
		<template v-else="showLoginBtn">
			<no-login/>
		</template>
		<tyb-tarbar :current-index="4"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	import userMenu from './components/menu.vue'
	import { TOKEN } from '@/common/config/index.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	import { isLogin } from '@/common/utils/login.js'
	import noLogin from '@/pages/components/noLogin/index.vue'
	export default {
		mixins: [dictMapMixin, userInfoMixin],
		components: {
			tybTarbar,
			userMenu,
			noLogin
		},
		data () {
			return {
				text: '',
				modalShow: false,
				isShipOwer: false,
				userInfo: this.$cache.get('userInfo') || {},
				roles: this.$cache.get('roles') || [],
				imageUrl: this.$IMAGE_URL,
				show: false,
				showLoginBtn: true,
				list: [
					{ value: 1, label: '船员' },
					{ value: 2, label: '船东' },
				],
				isname: false,
				user: this.$cache.get('userInfo'),
				arr: [4201,4221,4183,4193,4196],
			}
		},
		computed: {
			isBecome () {
				if (this.roles.includes(this.rolesType.shipowner.type)) {
					return false
				}
				if (this.roles.includes(this.rolesType.crew.type)) {
					return false
				}
				if (this.roles.includes(this.rolesType.police.type)) {
					return false
				}
				return true
			},
			roleLabel () {
				let result = []
				
				if (Array.isArray(this.roles)) {
					// console.log('this.roles', this.roles)
					for (let key in this.rolesType) {
						if (this.roles.includes(this.rolesType[key].type)) {
							result.push(this.rolesType[key].label)
						}
					}
					// result = this.roles[1] === 108 ? '船东' : (this.roles[1] === 105 ? '船员' : '')
				}
				return result.join('/')
			}
		},
		onShow () {
			isLogin().then(data => {
				if (data) {
					this.showLoginBtn = false
					this.userInfo = this.$cache.get('userInfo') || {}
					this.roles = this.$cache.get('roles') || []
					console.log('this.userInfo', this.userInfo, 'this.roles', this.roles)
					this.text = ''
					this.getUserInfo().then(() => {
						this.getShipOwer()
						this.init()
					})
					// // 判断是否实名完成
					this.$http.get('/tmlms/tyb_order_certificate_holder/my_info').then(({ data }) => {
						if(data.data){
							this.isname = true
						}else{
							this.isname = false
						}
					})
				} else {
					this.showLoginBtn = true
				}
			})
			// if (Object.keys(this.userInfo).length === 0) {
			// 	this.getUserInfo().then(() => {
			// 		this.init()
			// 	})
			// } else {
			// 	this.init()
			// }
		},
		methods: {
			// 判断是否已登录
			// 获取船东是否是持证人信息
			getShipOwer () {
				if (this.roles.includes(this.rolesType.shipowner.type)) {
					this.$http.get('/tmlms/ship_owner/getDetail', {
						params: {
							idcard: this.userInfo.idCard
						}
					}).then(({ data }) => {
						if (data.data && data.data.type == 1) {
							this.isShipOwer = true
						}
					})
				}
			},
			init () {
				if (this.roles.length > 1) {
					return
				}
				let userInfo = this.userInfo
				if (userInfo && userInfo.idCard) {
					// 判断是否已注册船员
					this.$http.get('/tmlms/crew/getCrewByidcard', {
						params: {
							idcard: userInfo.idCard
						}
					}).then(({ data }) => {
						if(data.msg == '成功获取船员信息' && data.data.status == 1){
						    this.text = "您的船员信息正在审核中..."
						} else {
							this.text = ''
						}
					})
					
				}
				if (userInfo && userInfo.userId) {
					this.$http.get(`/tmlms/tybshiphaver/userShip/${userInfo.userId}`).then(({ data }) => {
						if (data.code === 0) {
							// 判断是否已注册船东
							if(data.data[data.data.length - 1].status === 0){
								this.text= '您的船东信息正在审核中...'
							} else {
								this.text = ''
							}
							// this.$http.get('/tmlms/ship_owner/getDetail', {
							// 	params: {
							// 		idcard: data.data[data.data.length - 1].idcard
							// 	}
							// }).then(({ data }) => {
							// 	if(data.data){
							// 		if(data.msg == 'success' && data.data.status === 1 && data.data.userId !== 0){
							// 		    this.text= '您的船东信息正在审核中...'
							// 		} else {
							// 			this.text = ''
							// 		}
							// 	}
							// })
						}
					})
				}
			},
			onToUser () {
				if (this.text) {
					uni.showToast({
						icon: 'none',
						title: this.text
					})
					return
				}
				let status = {
					shipowner: false,
					crew: false
				}
				status.shipowner = this.roles.includes(this.rolesType.shipowner.type)
				status.crew = this.roles.includes(this.rolesType.crew.type)
				console.log(this.roles, status.shipowner, status.crew)
				if (status.shipowner && status.crew) {
					this.modalShow = true
				} else if (status.shipowner) {
					this.onTo('/pages/release/shipowner-resume/edit')
				} else if (status.crew) {
					this.onTo('/pages/release/resume/edit')
				}else {
					uni.showToast({
						icon: 'none',
						title: '请先成为船东或者船员!'
					})
				}
			},
			getUserInfo () {
				return new Promise((resolve, reject) => {
					this.$http.get('/admin/user/info').then(({ data }) => {
						if (data.code === 0) {
							this.userInfo = data.data.sysUser
							this.$cache.set('userInfo', this.userInfo)
							this.roles = data.data.roles
							this.$cache.set('roles', this.roles)
							resolve()
						}
					})
				})
			},
			onTo (path) {
				if (path) {
					uni.navigateTo({
						url: path
					});
				}
			},
			onToPath (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
					this.modalShow = false
				}
			},
			onChoose () {
				if (this.text) {
					uni.showToast({
						icon: 'none',
						title: this.text
					})
				} else {
					this.show = true
				}
			},
			onConfirm (e) {
				let val = e[0].value
				if (val === 1) {
					uni.navigateTo({
						url: '/pages/release/resume/edit?type=add'
					})
				} else if (val === 2) {
					uni.navigateTo({
						url: '/pages/release/ship/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-container {
		.user-header {
			height: 300rpx;
			width: 100%;
			position: relative;
			background: url('#{$img-url}/user-bg.png') no-repeat;
			background-size: cover;
		}
		.base-info-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 50rpx 60rpx;
			&.login-btn-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}
			.base-info-wrapper-left {
				display: flex;
				align-items: center;
				.avatar-wrapper {
					height: 100rpx;
					width: 100rpx;
					border: 4rpx solid #fff;
					border-radius: 50%;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.content {
					margin-left: 30rpx;
					color: #666;
					font-size: 32rpx;
					.phone {
						margin-right: 30rpx;
					}
					.phone-all {
						margin: 10rpx 0;
					}
					::v-deep .u-size-mini {
						height: 40rpx;
						line-height: 40rpx;
					}
				}
				
			}
			.base-info-wrapper-right {
				color: #666;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				text {
					margin-right: 8rpx;
				}
			}
		}
		.content-wrapper {
			height: 130rpx;
			background-color: #fff;
			width: 90%;
			position: absolute;
			bottom: -65rpx;
			left: 5%;
			border-radius: 8rpx;
			display: flex;
			justify-content: space-around;
			padding: 0 20rpx;
			text-align: center;
			align-items: center;
			.item {
				color: #666;
				position: relative;
				// width: 25%;
				.iconfont {
					font-size: 38rpx;
					color: #999;
				}
				.other-ic {
					font-size: 44rpx;
				}
				text {
					margin-top: 10rpx;
					display: block;
					font-size: 27rpx;
				}
			}
		}
		
	}
</style>
