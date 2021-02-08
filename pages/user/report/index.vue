<template>
	<view class="repore-container user-contract-container safe-padding-bottom">
		<page-info @next="onNextByInfo" v-show="current === 1"></page-info>
		<page-certificate v-show="current === 2"></page-certificate>
	</view>
</template>

<script>
	import pageInfo from './component/info.vue'
	import pageCertificate from './component/certificate.vue'
	export default {
		components: {
			pageInfo,
			pageCertificate
		},
		data () {
			return {
				current: 2
			}
		},
		methods: {
			onNextByInfo () {
				this.current = 2
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.repore-container {
		padding: 0 20px;
		background-color: #fff;
	}
</style>
