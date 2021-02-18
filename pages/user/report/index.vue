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
				current: 1
			}
		},
		methods: {
			onNext (index) {
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
