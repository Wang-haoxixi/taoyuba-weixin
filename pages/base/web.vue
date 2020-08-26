<template>
	<web-view :src="src"></web-view>
</template>

<script>
	export default {
		data () {
			return {
				src: ''
			}
		},
		onLoad (params) {
			console.log('params', params)
			if (params.src) {
				this.src = params.src
				console.log('this.src', this.src)
			}
		}
	}
</script>

<style>
</style>
