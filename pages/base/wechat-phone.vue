<template>
	<u-popup v-model="show" mode="bottom">
		
	</u-popup>
</template>

<script>
	export default {
		props: {
			value: Boolean
		},
		data () {
			return {
				show: false,
			}
		},
		watch: {
			value (newVal) {
				this.show = newVal
			}
		},
		methods: {
		}
	}
</script>

<style>
</style>
