<template>
	<view class="id-boss">
		<u-image height="250rpx" :src="`${imgUrl}/release-bg.png`"></u-image>
		<view class="id-title">
			请拍摄{{ user.realName }}本人的二代身份证
		</view>
		<view class="u-text-center">
			确保拍摄的证件完整清晰
		</view>
		<u-image width="622rpx" class="id-img" height="396rpx" :src="`${imgUrl}/homo-face.png`"></u-image>
		<view class="id-check">
			<u-checkbox-group>
				<u-checkbox v-model="checked" :disabled="false">同意保存证件以便查看</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="id-button">
			<u-button type="primary" @click="onphone">拍摄</u-button>
		</view>
		<view class="id-button">
			<u-button >保存</u-button>
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
				imgUrl: this.$IMAGE_URL,
				user: this.$cache.get('userInfo'),
				checked: false
			}
		},
		onShow () {
		},
		watch: {
		},
		methods: {
			onphone () {
				console.log(2323)
				uni.chooseImage({
					quality: 'high',
					success: (res) => {
						console.log(res)
					}
				})
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
