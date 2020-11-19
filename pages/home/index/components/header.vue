<template>
	<view class="home-header">
		<view class="header-wrapper">
			<!-- <view class="address-wrapper">
				<u-icon class="ic-left" name="map-fill" size="38"></u-icon>
				<text class="text">舟山市</text>
				<u-icon class="ic-right" name="arrow-down" size="28"></u-icon>
			</view> -->
			<view class="img-wrapper">
				<image :src="`${imgUrl}/logo.png`" mode="scaleToFill"></image>
			</view>
			<view class="static-search-wrapper">
				<static-search to="/pages/home/search/index" placeholder="搜索你感兴趣的内容"></static-search>
			</view>
			
			
		</view>
		<view class="content-wrapper">
			<view class="swiper-wrapper">
				<u-swiper :list="list" mode="dot" height="300"></u-swiper>
			</view>
			<view class="menu-wrapper">
				<u-grid :col="4" :border="false">
					<u-grid-item v-for="(item, index) in menu" :key="index" class="" @click="onTo(item)">
						<template v-if="item.outreach">
							 <navigator 
							 target="miniProgram" 
							 open-type="navigate" 
							 app-id="wxd43c7f6f30974960" 
							 version="release">
								 <view class="ic-wrapper" :style="{background: item.color}">
									<u-icon :name="item.icon" size="45" color="#fff"></u-icon>
								 </view>
								 <view class="text">{{item.label}}</view>
							 </navigator>
						</template>
						<template v-else>
							<view class="ic-wrapper" :style="{background: item.color}">
								<u-icon :name="item.icon" size="45" color="#fff"></u-icon>
							</view>
							<view class="text">{{item.label}}</view>
						</template>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<u-modal v-model="modalShow" @cancel="modalShow = false" title="合同" :mask-close-able="true" :show-confirm-button="false" show-cancel-button cancel-text="取消">
			<view class="slot-content" style="padding: 30rpx 10rpx;display: flex;justify-content: center;">
				<u-button @click="onToPath('/pages/user/myship/ship/index')" style="margin-right: 20rpx;">船东合同</u-button>
				<u-button type="primary" @click="onToPath('/pages/user/contract/list/index')">船员合同</u-button>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import staticSearch from './search.vue'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	import menuMixin from '@/pages/mixins/menu.js'
	export default {
		mixins: [userInfoMixin, menuMixin],
		components: {
			staticSearch
		},
		data () {
			return {
				modalShow: false,
				list: [
					{
						image: this.$IMAGE_URL + '/banner3.png'
					},
					{
						image: this.$IMAGE_URL + '/banner1.jpg',
					},
					{
						image: this.$IMAGE_URL + '/banner2.jpg'
					}
				],
				imgUrl: this.$IMAGE_URL
			}
		},
		methods: {
			onToPath (path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
					this.modalShow = false
				}
			},
			onTo (row) {
				if (row.path1 && row.path2) {
					// console.log(this.roles, this.roles.length > 0, this.roles[1])
					this.getUserInfoApi().then(() => {
						if (this.roles && this.roles.length > 0) {
							if (this.roles.includes(this.rolesType.crew.type) && this.roles.includes(this.rolesType.shipowner.type)) {
								this.modalShow = true
							} else if (this.roles.includes(this.rolesType.crew.type)) {
								uni.navigateTo({
									url: '/pages/user/contract/list/index'
								})
							} else if (this.roles.includes(this.rolesType.shipowner.type)) {
								uni.navigateTo({
									url: '/pages/user/myship/ship/index'
								})
							} else {
								uni.navigateTo({
									url: '/pages/home/contract/list/index'
								})
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '您还未登录，请先登录后查看'
							})
							this.$cache.clear()
							uni.navigateTo({
								url: '/pages/base/login'
							})
						}
						return
					})
				}
				if (row.path === '') {
					return
				}
				uni.navigateTo({
					url: row.path
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.home-header {
		margin-bottom: 30rpx;
		padding: 20rpx 20rpx;
		width: 100%;
		min-height: 600rpx;
		background: url('#{$img-url}/home-bg.png') no-repeat;
		background-size: 100%;
		.header-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.address-wrapper {
				color: #fff;
				flex: 1 0 180rpx;
				display: flex;
				font-size: 30rpx;
				.ic-left {
					margin-right: 6rpx;
				}
				.ic-right {
					margin-left: 6rpx;
				}
			}
			.static-search-wrapper {
				width: 100%;
				margin-left: 30rpx;
			}
			.img-wrapper {
				width: 78rpx;
				height: 58rpx;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.content-wrapper {
			margin-top: 30rpx;
			width: 100%;
			padding: 30rpx 30rpx 10rpx;
			background-color: #fff;
			border-radius: 10rpx;
			.menu-wrapper {
				margin-top: 50rpx;
				/* #ifdef MP-WEIXIN */
				margin-top: 10rpx;
				/* #endif */
				margin-left: -20rpx;
				margin-right: -20rpx;
				.grid-item {
					overflow: hidden;
					margin: -15rpx 0;
				}
				.ic-wrapper {
					height: 90rpx;
					width: 90rpx;
					overflow: hidden;
					border-radius: 50%;
					text-align: center;
					line-height: 90rpx;
					justify-content: center;
					display: flex;
					align-items: center;
					margin: 0 auto;
				}
				.text {
					display: block;
					margin-top: 18rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
