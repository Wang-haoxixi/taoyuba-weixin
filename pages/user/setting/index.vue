<template>
	<view class="setting-container">
		<u-button @click="onSignOut" type="default" :custom-style="{backgroundColor: '#409EFF', color: '#fff'}" hover-class="none" shape="circle" :loading="loading">退出登录</u-button>
	</view>
</template>

<script>
	import { logout } from '@/common/utils/login.js'
	export default {
		data () {
			return {
				loading: false
			}
		},
		methods: {
			onSignOut () {
				this.loading = true
				logout().then((data) => {
					if (!(data.code === 0 && data.data === true)) {
						uni.showToast({
							icon: 'none',
							title: '退出登录失败'
						})
					} else {
						uni.navigateTo({
							url: '/pages/base/login'
						})
						this.$cache.clear()
					}
					this.loading = false
				}).catch(e => {
					uni.showToast({
						icon: 'none',
						title: '退出登录失败'
					})
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting-container {
		padding: 30rpx;
	}
</style>
