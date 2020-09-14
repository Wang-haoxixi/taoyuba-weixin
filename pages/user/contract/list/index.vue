<template>
	<view class="user-contract-container">
		<view class="">
			<contract-item v-for="item in data" :key="item.id" :info="item"></contract-item>
		</view>
	</view>
</template>

<script>
	import contractItem from './components/contract-item.vue'
	export default {
		components: {
			contractItem
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
				this.$http.get('/tmlms/tybcontract/page').then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-contract-container {
		
	}
</style>
