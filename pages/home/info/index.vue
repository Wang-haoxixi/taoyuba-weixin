<template>
	<view class="info-container">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				current: 0,
				list: []
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-container {
		
	}
</style>
