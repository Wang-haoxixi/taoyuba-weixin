<template>
	<view class="btn-container">
		<button type="default" class="collection" @tap="onCollection">收藏</button>
		<button type="default" class="share" open-type="share">分享</button>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		methods: {
			onCollection () {
				this.$emit('collection')
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
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
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
		margin-top: 20rpx;
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
			
		}
		.share {
			background-color: $color-blue;
			color: #fff;
		}
	}
</style>
