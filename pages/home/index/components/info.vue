<template>
	<view class="info-wrapper">
		<home-container>
			<view class="title" slot="header">在线测试</view>
			<view class="">
				<info-item v-for="(item, index) in data" v-if="index < 6" :key="item.id" :info="item"></info-item>
			</view>
		</home-container>
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
				this.$http.get('/tybhrms/tybbook/page').then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = result.records
					}
				})
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
	}
</style>
