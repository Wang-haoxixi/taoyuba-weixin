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
				let src = params.src
				for (let key in params) {
					if (key !== 'src') {
						src += `?${key}=${params[key]}`
					}
				}
				this.src = src
				console.log('this.src', this.src)
			}
		}
	}
</script>

<style>
</style>
