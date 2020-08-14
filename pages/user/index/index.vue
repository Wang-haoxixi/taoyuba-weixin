<template>
	<view class="">
		我的
		<tyb-tarbar :current-index="4"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	export default {
		components: {
			tybTarbar
		}
	}
</script>

<style>
</style>
