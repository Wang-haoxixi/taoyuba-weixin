<template>
	<view class="center-content">
		<view>
			<view class="center-card">
				<view class="center-card-main">
					<u-image :src="form.photo" width="125rpx" height="125rpx" shape="circle"></u-image>
					<view class="center-card-name">
						<view>姓名: {{ form.name }}</view>
						<view>身份证号: {{ form.idCard }}</view>
					</view>
				</view>
				<view class="center-logo">
					<u-image :src="logo" width="55rpx" height="50rpx"></u-image>
				</view>
				<view class="issuccess">
					<u-image :src="success" width="175rpx" height="175rpx" shape="circle"></u-image>
				</view>
			</view>
			<view class="center-img">
				<view>
					<view class="center-img-title">证件照片</view>
					<view>上传证件照片,提升实名速度</view>
				</view>
				<view>已上传</view>
			</view>
			<view class="center-img">
				<view>
					<view class="center-img-title">人脸照片</view>
					<view>体验刷脸科技,享受更多服务</view>
				</view>
				<view>已验证</view>
			</view>
		</view>
		<view class="my-customer" @click="callNumber">我的客服</view>
	</view>
</template>

<script>
	export default {
		mixins: [],
		components: {
		},
		data () {
			return {
				logo: `${this.$IMAGE_URL}/blueLogo.png`,
				success: `${this.$IMAGE_URL}/success.png`,
				form: {}
			}
		},
		onShow () {
			this.$http.get('/tmlms/tyb_order_certificate_holder/my_info').then(({data})=>{
				this.form = data.data
			})
		},
		onLoad () {
		},
		watch: {
		},
		methods: {
			callNumber () {
				uni.makePhoneCall({
				    phoneNumber: '0580-2299669'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100vh;
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		background: white;
		.my-customer {
			color: $color-blue;
		}
		.center-card {
			width: 800rpx;
			width: 600rpx;
			border: 1px solid #ccc;
			box-sizing: border-box;
			padding: 20rpx;
			margin-bottom: 50rpx;
			position: relative;
			border-radius: 20rpx;
			.issuccess {
				position: absolute;
				right: -14px;
				bottom: -44rpx;
			}
		}
		.center-card-main {
			display: flex;
		}
		.center-card-name {
			line-height: 65rpx;
			font-size: 27rpx;
			margin-left: 26rpx;
		}
		.center-logo {
			margin: 30rpx 0 10rpx 0;
		}
		.center-img {
			height: 200rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid rgba($color: #ccc, $alpha: .5);
			font-size: 27rpx;
		}
		.center-img-title {
			font-size: 33rpx;
			font-weight: 600;
			margin-bottom: 30rpx;
		}
	}
</style>
