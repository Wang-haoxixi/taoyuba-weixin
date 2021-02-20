<template>
	<!-- 证书部分 -->
	<view class="certificate-wrapper">
		<view class="title">
			一、证书部分
		</view>
		<view class="item" v-for="(item, index) in options" :key="item.label">
			<view class="item-title">{{index + 1}}.{{item.title}}</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, item.label) }" 
					v-model="form[item.label]"></choose-img>
			</view>
		</view>
		<view class="btn-next">
			<u-button @click="onPrev">上一步</u-button>
			<u-button @click="onNext">下一步</u-button>
		</view>
	</view>
</template>

<script>
	import chooseImg from './chooseImg.vue'
	import reportMixin from './mixin.js'
	export default {
		mixins: [reportMixin],
		components: {
			chooseImg
		},
		data () {
			return {
				form: {
					fishLicenceImage: [], // 捕捞许可证
					ownershipRegistrationImage: [], // 所有权登记证书
					nationalityRegistrationImage: [], // 国籍登记证书
					fishVesselImage: [], // 渔船检验证书
				},
				options: [
					{ title: '捕捞许可证', label: 'fishLicenceImage' },
					{ title: '所有权登记证书', label: 'ownershipRegistrationImage' }, 
					{ title: '国籍登记证书', label: 'nationalityRegistrationImage' }, 
					{ title: '渔船检验证书', label: 'fishVesselImage' }, 
				]
			}
		},
		methods: {
			getImgs (url, name) {
				this.concatImg(name, url)
			},
			onNext () {
				this.$emit('next', 3)
				// console.log('证书部分', this.form)
			},
			onPrev () {
				this.$emit('prev', 1)
			},
		}
	}
</script>

<style scoped lang="scss">
	.certificate-wrapper {
		padding: 0 20px;
		.title {
			font-size: 34rpx;
			text-align: center;
			padding: 20rpx 0 40rpx;
			font-weight: 700;
		}
		.item {
			margin-bottom: 30rpx;
			.item-title {
				font-size: 30rpx;
				font-weight: 700;
			}
		}
		.btn-next {
			display: flex;
			justify-content: space-around;
			margin: 50rpx 0 30rpx 0;
		}
	}
</style>
