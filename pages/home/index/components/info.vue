<template>
	<view class="info-wrapper">
		<home-container>
			<view class="title" slot="header">模拟考试</view>
			<view class="">
				<info-item v-for="(item, index) in data" v-if="index < 6" :key="item.id" :info="item" @tap="onTo(item)"></info-item>
				<view class="more" @tap="onTo">更多</view>
			</view>
		</home-container>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	import infoItem from './info-item.vue'
	export default {
		components: {
			homeContainer,
			infoItem
		},
		data () {
			return {
				data: []
			}
		},
		onReady () {
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get('/tmlms/exam_examination/page', {
					params: {
						size: 6,
						current: 1
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = result.records
					}
				})
			},
			onTo (row) {
				uni.navigateTo({
					url: '/pages/home/examination/list/index'
				})
				return
				// this.$http.get('/tmlms/crew/checkUser').then(({ data }) => {
				// 	if (data.data) {
				// 		uni.navigateTo({
				// 			url: '/'
				// 		})
				// 	} else{
				// 		this.$refs.uToast.show({
				// 			title: '请登录后进行模拟考试'
				// 		})
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-wrapper {
		.title {
			padding: 0 50rpx;
			line-height: 80rpx;
			color: #fff;
		}
		.more {
			text-align: right;
			font-size: 28rpx;
			padding: 20rpx 30rpx;
			color: $color-blue;
		}
	}
</style>
