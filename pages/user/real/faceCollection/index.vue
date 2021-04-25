<template>
	<view class="face-boss">
		<view class="title">人脸采集</view>
		<view class="content" @click="goFace(true)">
			<image :src="`${imgUrl}/people.png`"></image>
			<text>本人采集</text>
				<u-icon name="arrow-right" size="30" color="#2979ff"></u-icon>
		</view>
		<view class="content" @click="goFace(false)">
			<image :src="`${imgUrl}/peopleTwo.png`"></image>
			<text>代人采集</text>
				<u-icon name="arrow-right" size="30" color="#2979ff"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		},
		data () {
			return {
				option: {},
				imgUrl: this.$IMAGE_URL,
			}
		},
		components: {
		},
		watch: {
		},
		created () {
		},
		onLoad (option) {
			uni.clearStorage()
			this.option = option
		},
		methods: {
			goFace (val) {
				if( val ){
					uni.navigateTo({
						url: `/pages/user/real/faceCollection/face?openid=${this.option.openid}&unionid=${this.option.unionid}&orgId=${this.option.orgId}&isTrue=1`
					})
				}else{
					uni.navigateTo({
						url: `/pages/user/real/faceCollection/face?openid=${this.option.openid}&unionid=${this.option.unionid}&orgId=${this.option.orgId}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.face-boss {
		    min-height: 100vh;
		    background: white;
		.title {
			    text-align: center;
			    padding: 30rpx;
			    font-size: 49rpx;
		}
		.content {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 90%;
			margin: 30rpx auto;
			margin: 30rpx auto;
			font-size: 35rpx;
			padding: 35rpx 0;
			border: 1px solid rgba(204, 204, 204, 0.5);
			border-radius: 15rpx;
			box-shadow: 0 0 9rpx 3rpx rgba(100,149,237, 0.2);
			text {
				font-weight: 800;
			}
			image {
				width: 200rpx;
				height: 150rpx;
			}
		}
		
	}
</style>