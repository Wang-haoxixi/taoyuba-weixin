<template>
	<view class="user-container page-bottom">
		<view class="user-header">
			<view class="base-info-wrapper">
				<view class="base-info-wrapper-left">
					<view class="avatar-wrapper">
						<image :src="`${imageUrl}/avatar.jpg`" mode="scaleToFill"></image>
					</view>
					<view class="content">
						<text class="name">{{userInfo.realName}}</text>
						<text class="phone">{{userInfo.username}}</text>
					</view>
				</view>
			</view>
			<view class="content-wrapper">
				<view class="item" @tap="onToUser">
					<view class="iconfont iconziliao"></view>
					<text>个人资料</text>
				</view>
				<view class="item">
					<view class="iconfont iconshoucang other-ic"></view>
					<text>我的收藏</text>
				</view>
				<view class="item" @tap="onTo('/pages/user/change-password/index')">
					<view class="iconfont iconmima other-ic"></view>
					<text>密码修改</text>
				</view>
				<view class="item" v-if="!roles[1]" @click="onChoose">
					<view class="iconfont iconchengyuan other-ic"></view>
					<text>我要成为</text>
					<u-select v-model="show" :list="list" @confirm="onConfirm"></u-select>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<user-menu :type="type" :text="text"></user-menu>
		<tyb-tarbar :current-index="4"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	import userMenu from './components/menu.vue'
	import { TOKEN } from '@/common/config/index.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [dictMapMixin, userInfoMixin],
		components: {
			tybTarbar,
			userMenu
		},
		data () {
			return {
				text: '',
				userInfo: this.$cache.get('userInfo'),
				roles: this.$cache.get('roles'),
				imageUrl: this.$IMAGE_URL,
				type: 0,
				show: false,
				list: [
					{ value: 1, label: '船员' },
					{ value: 2, label: '船东' },
				]
			}
		},
		computed: {
			getLabel () {
				let result= ''
				let value = this.list.find((item) => {
					return item.value === this.type
				})
				if (value) {
					result = value.label
				}
				return result
			}
		},
		// onReady () {
		// 	this.getUserInfo()
		// },
		onShow () {
			this.userInfo = this.$cache.get('userInfo')
			this.roles = this.$cache.get('roles')
			if (Object.keys(this.userInfo).length === 0) {
				this.getUserInfo().then(() => {
					this.init()
				})
			} else {
				this.init()
			}
			if (this.roles && this.roles.length > 0) {
				this.type = this.roles[1] || ''
			} else {
				this.type = ''
			}
			this.getDicMap()
		},
		methods: {
			init () {
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
						}
					})
					this.$http.get('/tmlms/ship_owner/getDetail', {
						params: {
							idcard: userInfo.idCard
						}
					}).then(({ data }) => {
						if(data.data){
							if(data.msg == 'success' && data.data.status === 1 && data.data.userId !== 0){
							    this.text= '您的船东信息正在审核中...'
							}
						}
					})
					// 判断是否已注册船东
				}
			},
			onToUser () {
				if (this.type === 108) {
					this.onTo('/pages/release/shipowner-resume/edit')
				} else {
					this.onTo('/pages/release/resume/edit')
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
							if (this.roles && this.roles.length > 0) {
								this.type = this.roles[1]
							}
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
					text {
						display: block;
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
