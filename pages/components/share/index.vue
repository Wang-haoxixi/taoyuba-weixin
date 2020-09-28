<template>
	<view class="btn-container">
		<u-button type="default" :custom-style="customStyle" :hair-line="false" class="collection share-btn" :loading="loading" @click="onCollection">{{name}}</u-button>
		<button type="default" class="share share-btn" open-type="share">分享</button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	const NO_COLLECTION = '收藏'
	const COLLECTION = '已收藏'
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		props: {
			info: Object,
			// 收藏类型
			type: {
				type: [Number, String],
				default: ''
			},
			isCollection: false,
		},
		data () {
			return {
				loading: false,
				defaultCollection: false,
				customStyle: {
					fontSize: '36rpx',
					color: '#409EFF',
					borderRadius: 0
				}
			}
		},
		watch: {
			isCollection (newVal) {
				this.defaultCollection = newVal
			}
		},
		computed: {
			name () {
				return this.defaultCollection ? COLLECTION : NO_COLLECTION
			}
		},
		methods: {
			onCollection () {
				this.loading = true
				this.$http.get('/tmlms/crew/checkUser').then(({ data }) => {
					if (data.data) {
						if (this.defaultCollection) {
							this.onCancel()
						} else {
							this.onSubmit()
						}
					} else {
						this.loading = false
						this.$refs.uToast.show({
							title: '请登录后收藏',
							position: 'bottom'
						})
					}
				}).catch(() => {
					this.loading = false
				})
			},
			onCancel () {
				this.$http.post('/tmlms/crewCollect/remove', {
					collectType: this.type,
					collectedId: this.info.collectedId,
				}).then(({ data }) => {
					if (data.code === 0) {
						this.defaultCollection = false
						this.$refs.uToast.show({
							title: '收藏取消',
							position: 'bottom'
						})
					}
					this.loading = false
				}).catch(() => {
					this.loading = false
				})
			},
			onSubmit () {
				this.$http.post('/tmlms/crewCollect/create', {
					collectType: this.type,
					idcard: this.userInfo.idCard,
					userId: this.userInfo.userId,
					collectedId: this.info.collectedId,
					collectedShowTitle: this.info.collectedShowTitle
				}).then(({ data }) => {
					if (data.code === 0) {
						this.defaultCollection = true
						this.$refs.uToast.show({
							title: '收藏成功',
							position: 'bottom'
						})
					} else {
						this.$refs.uToast.show({
							title: '收藏失败',
							position: 'bottom'
						})
					}
					this.loading = false
				}).catch(() => {
					this.loading = false
				})
			},
			onShare () {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
					title: '爱消费',
					href: 'https://www.baidu.com',
					imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595500268904&di=1510d1051962ddc7e308c37347ca5725&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F10%2F20170710210234_y3Kf5.jpeg',
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res))
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err))
				    }
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.btn-container {
		display: flex;
		justify-content: space-around;
		margin-top: 40rpx;
		padding: 20rpx 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
		/* #endif */
		button {
			width: 50%;
			background-color: #fff;
			border: none;
			border-radius: 0;
			&::after {
				border: none;
			}
		}
		.collection {
			border: 1px solid $color-blue;
			color: $color-blue;
			width: 100%;
			// border-top-left-radius: 36rpx;
			// border-bottom-left-radius: 36rpx;
		}
		.share {
			background-color: $color-blue;
			color: #fff;
			width: 100%;
		}
		.share-btn {
			line-height: 2;
			font-size: 36rpx;
		}
	}
</style>
