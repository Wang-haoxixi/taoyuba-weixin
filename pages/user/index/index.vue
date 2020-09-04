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
				<!-- <view class="base-info-wrapper-right">
					<text @click="show = true">{{getLabel}}</text>
					<u-icon name="arrow-down-fill" color="#666" size="16"></u-icon>
					<u-select v-model="show" :list="list" @confirm="onConfirm"></u-select>
				</view> -->
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
				<view class="item">
					<view class="iconfont iconchengyuan other-ic"></view>
					<text>我要成为</text>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<user-menu :type="type"></user-menu>
		<tyb-tarbar :current-index="4"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	import userMenu from './components/menu.vue'
	import { TOKEN } from '@/common/config/index.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	// import cloneDeep from 'lodash/cloneDeep'
	export default {
		mixins: [dictMapMixin],
		components: {
			tybTarbar,
			userMenu
		},
		data () {
			return {
				userInfo: this.$cache.get('userInfo'),
				roles: this.$cache.get('roles'),
				imageUrl: this.$IMAGE_URL,
				type: 0,
				show: false,
				list: [
					{ value: 1, label: '船员' },
					{ value: 2, label: '船东' },
					{ value: 3, label: '培训机构' },
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
		onReady () {
			this.getUserInfo()
		},
		onShow () {
			this.userInfo = this.$cache.get('userInfo')
			this.roles = this.$cache.get('roles')
			if (Object.keys(this.userInfo).length === 0) {
				this.getUserInfo()
			}
			if (this.roles && this.roles.length > 0) {
				this.type = this.roles[1]
			}
			this.getDicMap()
		},
		methods: {
			onToUser () {
				if (this.type === 108) {
					this.onTo('/pages/release/shipowner-resume/edit')
				} else {
					this.onTo('/pages/release/resume/edit')
				}
			},
			onConfirm (e) {
				this.type = e[0].value
			},
			getUserInfo () {
				this.$http.get('/admin/user/info').then(({ data }) => {
					if (data.code === 0) {
						this.userInfo = data.data.sysUser
						this.$cache.set('userInfo', this.userInfo)
						this.roles = data.data.roles
						this.$cache.set('roles', this.roles)
						if (this.roles && this.roles.length > 0) {
							this.type = this.roles[1]
						}
						console.log('this.type', this.type)
					}
				})
			},
			onTo (path) {
				if (path) {
					uni.navigateTo({
						url: path
					});
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
			justify-content: space-between;
			padding: 0 20rpx;
			text-align: center;
			align-items: center;
			.item {
				color: #666;
				position: relative;
				width: 25%;
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
				&::after {
					content: '';
					width: 2rpx;
					background-color: #d7d7d7;
					height: 40rpx;
					position: absolute;
					top: 50%;
					right: 0;
					margin-top: -20rpx;
				}
				&:last-child {
					&::after {
						display: none;
					}
				}
			}
		}
	}
</style>
