<template>
	<view class="repore-container user-contract-container safe-padding-bottom">
		<page-info @next="onNext" v-show="current === 1"></page-info>
		<page-certificate v-show="current === 2" @next="onNext" @prev="onNext"></page-certificate>
		<page-ship v-show="current === 3" @next="onNext" @prev="onNext"></page-ship>
		<page-equipment v-show="current === 4" @prev="onNext"></page-equipment>
	</view>
</template>

<script>
	import pageInfo from './component/info.vue'
	import pageCertificate from './component/certificate.vue'
	import pageShip from './component/ship.vue'
	import pageEquipment from './component/equipment.vue'
	export default {
		components: {
			pageInfo,
			pageCertificate,
			pageShip,
			pageEquipment
		},
		data () {
			return {
				current: 2
			}
		},
		methods: {
			onNext (index) {
				uni.pageScrollTo({
		　　　　　　duration: 0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
		　　　　　　scrollTop: 0,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
		　　　　})
				this.current = index
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
		background-color: #fff;
	}
</style>
