<template>
	<!-- 证书部分 -->
	<view class="certificate-wrapper">
		<view class="item">
			<view class="">1.捕捞许可证</view>
			<view class="">
				<choose-img @get-imgs="getImgs" :imgs="form.img"></choose-img>
			</view>
		</view>
	</view>
</template>

<script>
	import chooseImg from './chooseImg.vue'
	export default {
		components: {
			chooseImg
		},
		data () {
			return {
				form: {
					img: []
				}
			}
		},
		methods: {
			getImgs (url) {
				console.log('url', url)
				this.form.img = url
			}
		}
	}
</script>

<style scoped lang="scss">
	.certificate-wrapper {
		.item {
			margin-bottom: 30rpx;
		}
	}
</style>
