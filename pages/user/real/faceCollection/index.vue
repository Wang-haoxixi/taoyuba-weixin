<template>
	<view class="face-boss" v-if="show">
		<view class="title">注意事项</view>
		<!-- <view class="content" @click="goFace(true)">
			<image :src="`${imgUrl}/people.png`"></image>
			<text>本人采集</text>
				<u-icon name="arrow-right" size="30" color="#2979ff"></u-icon>
		</view>
		<view class="content" @click="goFace(false)">
			<image :src="`${imgUrl}/peopleTwo.png`"></image>
			<text>代人采集</text>
				<u-icon name="arrow-right" size="30" color="#2979ff"></u-icon>
		</view> -->
		<view class="face-main">
			注意一下,别去外面打工！
		</view>
		<view class="id-check">
			<u-checkbox-group>
				<u-checkbox v-model="checked" :disabled="false">同意以上事项</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="id-button">
			<u-button @click="sumbit" type="primary">保存</u-button>
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
				checked: false,
				show: false,
			}
		},
		components: {
		},
		watch: {
		},
		created () {
		},
		onLoad (option) {
			this.option = option
			if( this.option.type == 0 ){
				uni.redirectTo({
					url: `/pages/user/real/faceCollection/face?openid=${this.option.openid}&unionid=${this.option.unionid}&orgId=${this.option.orgId}&type=${this.option.type}`
				})
			}else{
				this.show = true
			}
		},
		methods: {
			// goFace (val) {
			// 	if( val ){
			// 		uni.navigateTo({
			// 			url: `/pages/user/real/faceCollection/face?openid=${this.option.openid}&unionid=${this.option.unionid}&orgId=${this.option.orgId}&isTrue=1`
			// 		})
			// 	}else{
			// 		uni.navigateTo({
			// 			url: `/pages/user/real/faceCollection/face?openid=${this.option.openid}&unionid=${this.option.unionid}&orgId=${this.option.orgId}`
			// 		})
			// 	}
			// },
			sumbit () {
				if( this.checked ){
					uni.navigateTo({
						url: `/pages/user/real/faceCollection/face?openid=${this.option.openid}&unionid=${this.option.unionid}&orgId=${this.option.orgId}&type=${this.option.type}`
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: '请先同意注意事项！'
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
			.id-check {
				width: 622rpx;
				margin: 20rpx auto 80rpx auto;
			}
			.id-button {
				width: 400rpx;
				margin: 20rpx auto;
			}
			.face-main {
				width: 622rpx;
				margin: 0 auto;
				min-height: 50vh;
			}
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